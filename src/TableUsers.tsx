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
  Badge,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Table from "../src/pages/components/Table";
import { getUsers, deleteUser } from "../src/utils/users";
import type { ColumnDef } from "@tanstack/react-table";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";

const MotionButton = motion(Button);

const filterableKeys = ["role"];
const selectStyle: React.CSSProperties = {
  width: "100%",
  marginTop: 4,
  color: "#1a202c",
  backgroundColor: "#f7fafc",
  padding: "4px",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

// Fungsi untuk mendapatkan warna berdasarkan role
const getRoleColor = (role: string) => {
  const roleLower = role?.toLowerCase();
  if (roleLower === "admin") return "purple";
  if (roleLower === "user") return "blue";
  return "gray";
};

const TableUsers = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const payload = await getUsers();
      if (!Array.isArray(payload)) throw new Error("Response bukan array!");
      setData(payload);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err?.message || "Network error saat mengambil data Users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Yakin ingin menghapus User ini?")) return;
    try {
      await deleteUser(id);
      fetchData();
    } catch {
      alert("Gagal menghapus User!");
    }
  };

  const filteredData = useMemo(() => {
    return data
      .filter((item) =>
        Object.entries(filters).every(([key, value]) => {
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
  }, [data, search, filters]);

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
      {
        accessorKey: "username",
        header: "USERNAME",
        cell: ({ getValue }) => (
          <Text fontWeight="semibold" color="gray.800">
            {String(getValue() || "-")}
          </Text>
        ),
      },
      {
        accessorKey: "full_name",
        header: "FULL NAME",
        cell: ({ getValue }) => <Text>{String(getValue() || "-")}</Text>,
      },
      {
        accessorKey: "email",
        header: "EMAIL",
        cell: ({ getValue }) => (
          <Text color="blue.600">{String(getValue() || "-")}</Text>
        ),
      },
      {
        accessorKey: "role",
        header: () => (
          <Box fontWeight="bold">
            ROLE
            <select
              style={selectStyle}
              value={filters["role"] || ""}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, role: e.target.value }))
              }
            >
              <option value="">Semua</option>
              {uniqueValuesMap["role"]?.map((v: string) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </Box>
        ),
        cell: ({ getValue }) => {
          const value = String(getValue() || "-");
          return (
            <Badge
              colorScheme={getRoleColor(value)}
              fontSize="sm"
              px={3}
              py={1}
              borderRadius="md"
              textTransform="uppercase"
            >
              {value}
            </Badge>
          );
        },
      },
      {
        accessorKey: "created_at",
        header: "REGISTERED AT",
        cell: ({ getValue }) => {
          const date = getValue();
          if (!date) return "-";
          return new Date(date as string).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });
        },
      },
    ];

    const actionCol: ColumnDef<any> = {
      id: "aksi",
      header: "AKSI",
      cell: ({ row }) => (
        <HStack gap={2}>
          
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

    return [...base, actionCol];
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
          Sedang memuat data Users...
        </Text>
      </Box>
    );

  if (errorMsg)
    return (
      <Box p={4}>
        <Text color="red.500" mb={2}>
          Gagal mengambil data Users!
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
          onClick={() => {
            setSearch("");
            setFilters({});
          }}
        >
          Reset Search & Filter
        </MotionButton>

        <Input
          placeholder="Cari User..."
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

        <Text fontSize="sm" color="gray.600" fontStyle="italic">
          User baru dapat mendaftar melalui halaman Register
        </Text>
      </HStack>

      <Heading fontSize="2xl" mb={2} color="gray.800" fontWeight="bold">
        Data Registered Users
      </Heading>

      <Table table={table} />

      <Text
        mt={4}
        fontSize="sm"
        textAlign="right"
        fontWeight="bold"
        color="gray.700"
      >
        Total Users: {filteredData.length}
      </Text>
    </Box>
  );
};

export default TableUsers;