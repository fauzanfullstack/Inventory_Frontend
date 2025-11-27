// src/pages/prItem/TablePrItem.tsx
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
import { getPrItems, deletePrItem } from "../../utils/prItems";
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

const filterableKeys = ["item_name"]; // <-- field yang ingin difilter

const TablePrItem = () => {
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
      const payload = await getPrItems();
      if (!Array.isArray(payload))
        throw new Error("Response bukan array. Cek API backend!");
      setData(payload);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err?.message || "Network error saat mengambil data PR Item");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: number | string) => {
    if (!window.confirm("Yakin ingin menghapus PR Item ini?")) return;
    try {
      await deletePrItem(id);
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus PR Item!");
    }
  };

  // Filtered data with filters & global search
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
  }, [data, filters, search]);

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

    const dyn: ColumnDef<any>[] = Object.keys(data[0] || {}).map((key) => {
      const isFilterable = filterableKeys.includes(key);
      return {
        accessorKey: key,
        header: () => (
          <Box fontWeight="bold">
            {key.replace("_", " ").toUpperCase()}
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
        cell: ({ getValue }) => <Text>{String(getValue() || "-")}</Text>,
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
            onClick={() => navigate(`/updatepritems/${row.original.id}`)}
          >
            Edit
          </Button>
          <Button
            size="sm"
            bg="red.600"
            color="white"
            _hover={{ bg: "red.500" }}
            onClick={() => handleDelete(row.original.id)}
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
          Sedang memuat data PR Item...
        </Text>
      </Box>
    );

  if (errorMsg)
    return (
      <Box p={4}>
        <Text color="red.500" mb={2}>
          Gagal mengambil data PR Item!
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
          placeholder="Cari PR Item..."
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
          onClick={() => navigate("/createpritems")}
        >
          Tambah PR Item
        </Button>
      </HStack>

      <Heading fontSize="2xl" mb={2} color="gray.800" fontWeight="bold">
        Data PR Item
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

export default TablePrItem;
