// src/pages/sr/SRItems.tsx
import { useState, useEffect, useMemo } from "react";
import { Box, Button, Heading, HStack, Spacer, Text, Spinner } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Table from "../components/Table";
import { getSRItems, deleteSRItem } from "../../utils/srItems"; // sesuaikan utils
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

const SRItems = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const payload = await getSRItems();
      if (!Array.isArray(payload)) throw new Error("Response bukan array. Cek API backend!");
      setData(payload);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err?.message || "Network error saat mengambil data SR items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: number | string) => {
    if (!window.confirm("Yakin ingin menghapus SR item ini?")) return;
    try {
      await deleteSRItem(id);
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus SR item!");
    }
  };

  const sampleKeys = useMemo(() => (data.length > 0 ? Object.keys(data[0]) : []), [data]);

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        return String(item[key]).toLowerCase().includes(value.toLowerCase());
      })
    );
  }, [filters, data]);

  const uniqueValuesMap = useMemo(() => {
    const map: Record<string, string[]> = {};
    sampleKeys.forEach((key) => {
      const values = [...new Set(data.map((d) => d[key]))].filter(Boolean);
      map[key] = values.slice(0, 50);
    });
    return map;
  }, [data, sampleKeys]);

  const columns: ColumnDef<any>[] = useMemo(() => {
    const base: ColumnDef<any>[] = [
      {
        accessorFn: (_row: any, i: number) => i + 1,
        id: "no",
        header: "No",
        cell: (info) => info.getValue(),
      },
    ];

    const dyn: ColumnDef<any>[] = sampleKeys.map((key) => ({
      accessorKey: key,
      header: () => (
        <Box>
          {key}
          <select
            style={selectStyle}
            value={filters[key] || ""}
            onChange={(e) => setFilters((prev) => ({ ...prev, [key]: e.target.value }))}
          >
            <option value="">Semua</option>
            {uniqueValuesMap[key]?.map((v: string) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </Box>
      ),
    }));

    const actionCol: ColumnDef<any> = {
      id: "aksi",
      header: "Aksi",
      cell: ({ row }) => (
        <HStack gap={2}>
          <Button
            size="sm"
            colorScheme="blue"
            onClick={() => navigate(`/updatesritems/${row.original.id}`)}
          >
            Edit
          </Button>
          <Button
            size="sm"
            colorScheme="red"
            onClick={() => handleDelete(row.original.id)}
          >
            Hapus
          </Button>
        </HStack>
      ),
    };

    return [...base, ...dyn, actionCol];
  }, [sampleKeys, filters, uniqueValuesMap, navigate]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading)
    return (
      <Box textAlign="center" py={20}>
        <Spinner size="xl" />
        <Text mt={4}>Sedang memuat data SR items...</Text>
      </Box>
    );

  if (errorMsg)
    return (
      <Box p={4}>
        <Text color="red.500" mb={2}>Gagal mengambil data SR items!</Text>
        <Text fontSize="sm" mb={3}>{errorMsg}</Text>
        <Button onClick={fetchData}>Coba lagi</Button>
      </Box>
    );

  return (
    <Box overflowX="auto">
      <HStack mb={4}>
        <MotionButton
          bg="red.500"
          color="white"
          size="sm"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setFilters({})}
        >
          Reset Filter
        </MotionButton>
        <Spacer />
        <Button
          bg="green.500"
          color="white"
          size="sm"
          onClick={() => navigate("/createsritems")}
        >
          Tambah SR Item
        </Button>
      </HStack>

      <Heading fontSize="2xl" mb={2} borderBottom="2px solid" pb={2}>
        Data SR Items
      </Heading>

      <Table table={table} />

      <Text mt={4} fontSize="sm" textAlign="right">
        Total Data: {filteredData.length}
      </Text>
    </Box>
  );
};

export default SRItems;
