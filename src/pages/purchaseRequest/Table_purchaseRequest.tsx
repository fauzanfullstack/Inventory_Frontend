// src/pages/purchase_request/TablePurchaseRequest.tsx
import { useState, useEffect, useMemo } from "react";
import {
  Box,
  Button,
  Heading,
  HStack,
  Spacer,
  Text,
  Spinner,
  Input,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Table from "../components/Table";
import {
  getPurchaseRequests,
  deletePurchaseRequest,
} from "../../utils/purchaseRequest";
import type { ColumnDef } from "@tanstack/react-table";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";

const MotionButton = motion(Button);

const selectStyle: React.CSSProperties = {
  width: "100%",
  marginTop: 4,
  color: "#1a202c",
  backgroundColor: "#f7fafc",
  padding: "4px",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

const filterableKeys = [
  "item_id",
  "currency",
  "team",
  "request_by",
  "department",
  "status",
];

// ✅ Kolom yang TIDAK ingin ditampilkan
const hiddenColumns = ["created_by", "updated_by", "created_at", "updated_at"];

const statusColorMap: Record<string, string> = {
  pending: "yellow.400",
  process: "blue.400",
  ordered: "purple.400",
  completed: "green.400",
};

const TablePurchaseRequest = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Ambil data user dari localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const fetchData = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const payload = await getPurchaseRequests();
      if (!Array.isArray(payload))
        throw new Error("Response bukan array. Cek API backend!");

      // Filter data untuk user biasa → hanya PR miliknya
      const filtered = user.role === "admin"
        ? payload
        : payload.filter((pr: any) => pr.request_by === user.full_name || pr.created_by === user.id);

      setData(filtered);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(
        err?.message || "Network error saat mengambil data purchase request"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    if (user.role !== "admin") {
      alert("Hanya admin yang bisa menghapus PR!");
      return;
    }
    if (!window.confirm("Yakin ingin menghapus PR ini?")) return;
    try {
      await deletePurchaseRequest(id);
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus PR!");
    }
  };

  const filteredData = useMemo(() => {
    return data
      .filter((item) =>
        filterableKeys.every((key) => {
          const value = filters[key];
          if (!value) return true;
          return String(item[key]).toLowerCase() === value.toLowerCase();
        })
      )
      .filter((item) => {
        if (!search) return true;
        return Object.values(item)
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase());
      });
  }, [filters, data, search]);

  const uniqueValuesMap = useMemo(() => {
    const map: Record<string, string[]> = {};
    filterableKeys.forEach((key) => {
      const values = [...new Set(data.map((d) => d[key]))].filter(Boolean);
      map[key] = values.slice(0, 50);
    });
    return map;
  }, [data]);

  const columns: ColumnDef<any>[] = useMemo(() => {
    const base: ColumnDef<any>[] = [
      {
        accessorFn: (_row: any, i: number) => i + 1,
        id: "no",
        header: "No",
        cell: (info) => info.getValue(),
      },
    ];

    // ✅ Filter kolom yang tidak ingin ditampilkan
    const visibleKeys = Object.keys(data[0] || {}).filter(
      (key) => !hiddenColumns.includes(key)
    );

    const dyn: ColumnDef<any>[] = visibleKeys.map((key) => {
      const isFilterable = filterableKeys.includes(key);
      return {
        accessorKey: key,
        header: () => (
          <Box fontWeight="bold">
            {key}
            {isFilterable && (
              <select
                style={selectStyle}
                value={filters[key] || ""}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, [key]: e.target.value }))
                }
              >
                <option value="">Semua</option>
                {uniqueValuesMap[key]?.map((v: string) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            )}
          </Box>
        ),
        cell: ({ getValue }) =>
          key === "status" ? (
            <Text
              fontWeight="bold"
              color={
                statusColorMap[String(getValue()).toLowerCase()] || "gray.500"
              }
            >
              {String(getValue())}
            </Text>
          ) : (
            <Text>{String(getValue())}</Text>
          ),
      } as ColumnDef<any>;
    });

    const actionCol: ColumnDef<any> = {
      id: "aksi",
      header: "Aksi",
      cell: ({ row }) => (
        <HStack gap={2}>
          {user.role === "admin" && (
            <>
              <Button
                size="sm"
                bg="blue.600"
                color="white"
                _hover={{ bg: "blue.500" }}
                onClick={() =>
                  navigate(`/updatepurchaserequests/${row.original.id}`)
                }
              >
                Edit
              </Button>

              <Button
                size="sm"
                bg="red.600"
                color="white"
                _hover={{ bg: "red.500" }}
                onClick={() => handleDelete(Number(row.original.id))}
              >
                Hapus
              </Button>
            </>
          )}

          <Button
            size="sm"
            bg="green.600"
            color="white"
            _hover={{ bg: "green.500" }}
            onClick={() =>
              navigate(`/printpurchaserequests/${row.original.id}`)
            }
          >
            Print
          </Button>
        </HStack>
      ),
    };

    return [...base, ...dyn, actionCol];
  }, [data, filters, uniqueValuesMap, navigate, user.role]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading)
    return (
      <Box textAlign="center" py={20}>
        <Spinner size="xl" />
        <Text mt={4} fontWeight="bold">
          Sedang memuat data purchase request...
        </Text>
      </Box>
    );

  if (errorMsg)
    return (
      <Box p={4}>
        <Text color="red.500" mb={2}>
          Gagal mengambil data purchase request!
        </Text>
        <Text fontSize="sm" mb={3}>
          {errorMsg}
        </Text>
        <Button onClick={fetchData}>Coba lagi</Button>
      </Box>
    );

  return (
    <Box overflowX="auto">
      <HStack mb={4} gap={3}>
        <MotionButton
          bg="blue.600"
          color="white"
          size="sm"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setFilters({})}
        >
          Reset Filter
        </MotionButton>

        <Input
          placeholder="Cari PR..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          bg="white"
          color="black"
          borderColor="gray.300"
          borderRadius="md"
          size="sm"
          maxW="250px"
        />

        <Spacer />

        <Button
          bg="green.600"
          color="white"
          size="sm"
          _hover={{ bg: "green.500" }}
          onClick={() => navigate("/createpurchaserequests")}
        >
          Tambah PR
        </Button>
      </HStack>

      <Heading fontSize="2xl" mb={2} color="gray.800" fontWeight="bold">
        Data Purchase Request
      </Heading>

      <Table table={table} />

      <Text
        mt={4}
        fontSize="sm"
        textAlign="right"
        fontWeight="bold"
        color="gray.700"
      >
        Total Data: {filteredData.length}
      </Text>
    </Box>
  );
};

export default TablePurchaseRequest;