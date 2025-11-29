import { useState, useEffect, useMemo } from "react";
import {
  Box,
  Button,
  Heading,
  HStack,
  Spacer,
  Text,
  Spinner,
  Image,
  CloseButton,
  Input,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Table from "../components/Table";
import { getReceivings, deleteReceiving } from "../../utils/receivings";
import type { ColumnDef } from "@tanstack/react-table";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";

const MotionButton = motion(Button);
const BASE_IMG = "http://localhost:5000/";

// Filter dropdown fields
const filterableKeys = ["status", "document_location", "supplier", "unit_type"];

const selectStyle: React.CSSProperties = {
  width: "100%",
  marginTop: 4,
  color: "#1a202c",
  backgroundColor: "#f7fafc",
  padding: "4px",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

// ----------------------
// WARNA BADGE
// ----------------------
const statusColor = (status: string) => {
  const s = status?.toLowerCase();
  if (s === "accepted") return { bg: "green.100", color: "green.700" };
  if (s === "rejected") return { bg: "red.100", color: "red.700" };
  return { bg: "gray.100", color: "gray.700" };
};

const conditionColor = (cond: string) => {
  const c = cond?.toLowerCase();
  // good -> hijau, damaged -> kuning, expired -> merah
  if (c === "good") return { bg: "green.100", color: "green.700" };
  if (c === "damaged") return { bg: "yellow.100", color: "yellow.700" };
  if (c === "expired") return { bg: "red.100", color: "red.700" };
  return { bg: "gray.100", color: "gray.700" };
};

const TableReceiving = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [modalImage, setModalImage] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const payload = await getReceivings();
      if (!Array.isArray(payload)) throw new Error("Response bukan array!");
      setData(payload);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err?.message || "Network error saat mengambil data Receiving");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Yakin ingin menghapus Receiving ini?")) return;
    try {
      await deleteReceiving(id);
      fetchData();
    } catch {
      alert("Gagal menghapus Receiving!");
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
    ];

    const sampleKeys = data[0] ? Object.keys(data[0]) : [];

    const dyn: ColumnDef<any>[] = sampleKeys.map((key) => {
      // Foto
      if (key === "documentation") {
        return {
          accessorKey: key,
          header: "Foto",
          cell: ({ row }) => {
            const path = row.original.documentation;
            if (!path) return "—";
            const fullUrl = path.startsWith("http") ? path : `${BASE_IMG}${path}`;
            return (
              <Image
                src={fullUrl}
                alt="doc"
                maxW="200px"
                maxH="200px"
                borderRadius="10px"
                objectFit="contain"
                border="2px solid #e2e8f0"
                boxShadow="0 2px 6px rgba(0,0,0,0.15)"
                cursor="pointer"
                onClick={() => setModalImage(fullUrl)}
              />
            );
          },
        };
      }

      // STATUS — kasih warna
      if (key.toLowerCase().includes("status") && key.toLowerCase() === "status") {
        // keep exact 'status' handling as before
        return {
          accessorKey: key,
          header: "STATUS",
          cell: ({ getValue }) => {
            const value = String(getValue() || "-");
            const style = statusColor(value);
            return (
              <Text
                px={3}
                py={1}
                borderRadius="md"
                fontWeight="bold"
                textTransform="capitalize"
                bg={style.bg}
                color={style.color}
                display="inline-block"
              >
                {value}
              </Text>
            );
          },
        };
      }

      // CONDITION — deteksi semua kolom yang mengandung kata 'condition'
      if (key.toLowerCase().includes("condition")) {
        return {
          accessorKey: key,
          header: "CONDITION",
          cell: ({ getValue }) => {
            const raw = getValue();
            const value = raw === undefined || raw === null ? "-" : String(raw);
            const style = conditionColor(value);
            return (
              <Text
                px={3}
                py={1}
                borderRadius="md"
                fontWeight="bold"
                textTransform="capitalize"
                bg={style.bg}
                color={style.color}
                display="inline-block"
              >
                {value}
              </Text>
            );
          },
        };
      }

      // Field filterable biasa
      if (filterableKeys.includes(key)) {
        return {
          accessorKey: key,
          header: () => (
            <Box fontWeight="bold">
              {key.replace(/_/g, " ").toUpperCase()}
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
            </Box>
          ),
          cell: ({ getValue }) => <Text>{String(getValue() || "-")}</Text>,
        };
      }

      // Default field
      return {
        accessorKey: key,
        header: key.replace(/_/g, " ").toUpperCase(),
        cell: ({ getValue }) => <Text>{String(getValue() || "-")}</Text>,
      };
    });

    // Action Buttons
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
            onClick={() => navigate(`/updatereceiving/${row.original.id}`)}
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

  // Loading
  if (loading)
    return (
      <Box textAlign="center" py={20}>
        <Spinner size="xl" />
        <Text mt={4} fontWeight="bold">
          Sedang memuat data Receiving...
        </Text>
      </Box>
    );

  // Error
  if (errorMsg)
    return (
      <Box p={4}>
        <Text color="red.500" mb={2}>
          Gagal mengambil data Receiving!
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
          placeholder="Cari Receiving..."
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
          onClick={() => navigate("/createreceiving")}
        >
          Tambah Receiving
        </Button>
      </HStack>

      <Heading fontSize="2xl" mb={2} color="gray.800" fontWeight="bold">
        Data Receiving
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

      {modalImage && (
        <Box
          position="fixed"
          top={0}
          left={0}
          w="100vw"
          h="100vh"
          bg="rgba(0,0,0,0.6)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          zIndex={9999}
          onClick={() => setModalImage(null)}
        >
          <Box position="relative">
            <CloseButton
              position="absolute"
              right={-10}
              top={-10}
              color="white"
              onClick={() => setModalImage(null)}
            />
            <Image src={modalImage} maxH="80vh" objectFit="contain" />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default TableReceiving;
