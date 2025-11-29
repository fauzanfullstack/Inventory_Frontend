// src/pages/items/TableItems.tsx
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
import { getItems, deleteItem } from "../../utils/items"; 
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

const TableItems = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const payload = await getItems();
      if (!Array.isArray(payload)) throw new Error("Response bukan array");
      setData(payload);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err?.message || "Network error saat mengambil data items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Yakin ingin menghapus item ini?")) return;
    try {
      await deleteItem(id);
      fetchData();
    } catch (err) {
      console.error("delete error:", err);
      alert("Gagal menghapus data!");
    }
  };

  const filterableKeys = ["name", "supplier", "unit_type", "unit", "aksi_centang"];

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
      { accessorFn: (_row: any, i: number) => i + 1, id: "no", header: "No", cell: (info) => info.getValue() },
    ];

    const dyn: ColumnDef<any>[] = Object.keys(data[0] || {}).map((key) => {
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
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            )}
          </Box>
        ),
        cell: ({ getValue }) => {
          // tampilkan true/false untuk aksi_centang
          if (key === "aksi_centang") {
            return (
              <Text
                color={getValue() === true || getValue() === "true" ? "green.500" : "red.500"}
                fontWeight="bold"
              >
                {String(getValue())}
              </Text>
            );
          }
          // tampilkan created_by / updated_by apa adanya
          return getValue() ?? "-";
        },
      } as ColumnDef<any>;
    });

    const actionCol: ColumnDef<any> = {
      id: "aksi",
      header: "Aksi",
      cell: ({ row }) => (
        <HStack gap={2}>
          <Button
            size="sm"
            bg="blue.600"
            color="white"
            _hover={{ bg: "blue.500" }}
            onClick={() => navigate(`/updateitem/${row.original.id}`)}
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
        </HStack>
      ),
    };

    return [...base, ...dyn, actionCol];
  }, [data, filters, uniqueValuesMap, navigate]);

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
          Sedang memuat data items...
        </Text>
      </Box>
    );

  if (errorMsg)
    return (
      <Box p={4}>
        <Text color="red.500" mb={2}>Gagal mengambil data items!</Text>
        <Text fontSize="sm" mb={3}>{errorMsg}</Text>
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
          placeholder="Cari item..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          bg="white"
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
          onClick={() => navigate("/createitem")}
        >
          Tambah Item
        </Button>
      </HStack>

      <Heading fontSize="2xl" mb={2} color="gray.800" fontWeight="bold">
        Data Items
      </Heading>

      <Table table={table} />

      <Text mt={4} fontSize="sm" textAlign="right" fontWeight="bold" color="gray.700">
        Total Data: {filteredData.length}
      </Text>
    </Box>
  );
};

export default TableItems;
