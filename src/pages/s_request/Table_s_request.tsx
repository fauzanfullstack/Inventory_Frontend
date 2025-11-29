// src/pages/srequest/TableSRequest.tsx
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
  Badge,
  Input,
  Flex,
} from "@chakra-ui/react";
// Icons removed - using emoji instead
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Table from "../components/Table";
import { getSRequests, deleteSRequest } from "../../utils/sRequest";
import type { ColumnDef } from "@tanstack/react-table";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";

const MotionButton = motion.create(Button);

const selectStyle: React.CSSProperties = {
  width: "100%",
  marginTop: 4,
  color: "#1a202c",
  backgroundColor: "#f7fafc",
  padding: "4px",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

// Status color helper
const getStatusColor = (status: string) => {
  const s = status?.toLowerCase();
  switch (s) {
    case "open":
      return { bg: "rgba(66,153,225,0.2)", color: "#2b6cb0" };
    case "waiting":
      return { bg: "rgba(246,173,85,0.2)", color: "#c05621" };
    case "approved":
      return { bg: "rgba(72,187,120,0.2)", color: "#2f855a" };
    case "purchase":
      return { bg: "rgba(214,188,250,0.4)", color: "#553c9a" };
    default:
      return { bg: "gray.200", color: "gray.700" };
  }
};

const TableSRequest = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const payload = await getSRequests();
      if (!Array.isArray(payload)) throw new Error("Response bukan array!");
      setData(payload);
    } catch (err: any) {
      setErrorMsg(err?.message || "Network error mengambil data sRequest");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: number | string) => {
    if (!window.confirm("Yakin ingin menghapus sRequest ini?")) return;
    try {
      await deleteSRequest(id);
      fetchData();
    } catch {
      alert("Gagal menghapus sRequest!");
    }
  };

  const toggleRow = (id: number) => {
    setExpandedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Kolom yang WAJIB ditampilkan (sesuai form create)
  const displayColumns = [
    'number',
    'status',
    'open_date',
    'expected_date',
    'cost_center',
    'location',
    'request_by',
    'notes'
  ];

  // Kolom yang bisa difilter dengan dropdown
  const filterableColumns = ['status', 'cost_center', 'location', 'request_by'];

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      // Filter by dropdown filters
      const matchesFilters = Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        return String(item[key]).toLowerCase().includes(value.toLowerCase());
      });

      // Filter by search query (cari di semua kolom)
      const matchesSearch = searchQuery
        ? displayColumns.some((key) =>
            String(item[key])
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
          )
        : true;

      return matchesFilters && matchesSearch;
    });
  }, [filters, searchQuery, data]);

  const uniqueValuesMap = useMemo(() => {
    const map: Record<string, string[]> = {};
    filterableColumns.forEach((key) => {
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

    const dyn: ColumnDef<any>[] = displayColumns.map((key) => {
      // ============================
      // STATUS BADGE
      // ============================
      if (key === "status") {
        return {
          accessorKey: key,
          header: () => (
            <Box>
              Status
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
          cell: ({ row }) => {
            const val = row.original.status;
            const { bg, color } = getStatusColor(val);

            return (
              <Badge
                px={3}
                py={1}
                borderRadius="8px"
                fontSize="0.8rem"
                bg={bg}
                color={color}
                fontWeight="600"
                textTransform="capitalize"
              >
                {val}
              </Badge>
            );
          },
        };
      }

      // ============================
      // FILTERABLE COLUMNS (cost_center, location, request_by)
      // ============================
      if (filterableColumns.includes(key)) {
        return {
          accessorKey: key,
          header: () => (
            <Box>
              {key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
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
          cell: ({ row }) => {
            const value = row.original[key];
            return value || "—";
          }
        };
      }

      // ============================
      // DEFAULT COLUMNS (number, dates, notes)
      // ============================
      return {
        accessorKey: key,
        header: key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
        cell: ({ row }) => {
          const value = row.original[key];
          
          // Format date columns
          if (key.includes('date') && value) {
            return new Date(value).toLocaleDateString('id-ID');
          }

          // Truncate notes if too long
          if (key === 'notes' && value) {
            return value.length > 50 ? value.substring(0, 50) + "..." : value;
          }
          
          return value || "—";
        }
      };
    });

    // ============================
    // ITEMS OVERVIEW COLUMN (COLLAPSIBLE)
    // ============================
    const itemsCol: ColumnDef<any> = {
      accessorKey: "items",
      header: "Items",
      cell: ({ row }) => {
        const items = row.original.items;
        const rowId = row.original.id;
        const isExpanded = expandedRows.has(rowId);
        
        if (!items || !Array.isArray(items) || items.length === 0) {
          return <Text color="gray.400" fontSize="sm">Tidak ada item</Text>;
        }

        const totalQty = items.reduce((sum: number, item: any) => sum + (item.qty || 0), 0);

        return (
          <Box>
            {/* Overview Button */}
            <Button
              size="sm"
              variant="outline"
              colorScheme="blue"
              onClick={() => toggleRow(rowId)}
              width="100%"
            >
              <Flex gap={2} align="center" justify="space-between" width="100%">
                <Flex gap={2}>
                  <Badge colorScheme="purple">{items.length} Items</Badge>
                  <Badge colorScheme="green">Total: {totalQty}</Badge>
                </Flex>
                <Text fontSize="lg">{isExpanded ? "▲" : "▼"}</Text>
              </Flex>
            </Button>

            {/* Collapsible Detail */}
            {isExpanded && (
              <Box
                mt={2}
                bg="gray.50"
                p={3}
                borderRadius="md"
                border="1px solid"
                borderColor="gray.200"
                style={{
                  animation: "fadeIn 0.2s ease-in",
                }}
              >
                <Box overflowX="auto">
                  <Box as="table" width="100%" style={{ borderCollapse: "collapse" }}>
                    <Box as="thead" bg="blue.100">
                      <Box as="tr">
                        <Box as="th" p={2} textAlign="center" fontSize="xs" fontWeight="700" borderBottom="2px solid" borderColor="blue.300" width="60px">
                          No
                        </Box>
                        <Box as="th" p={2} textAlign="left" fontSize="xs" fontWeight="700" borderBottom="2px solid" borderColor="blue.300">
                          Item Name
                        </Box>
                        <Box as="th" p={2} textAlign="center" fontSize="xs" fontWeight="700" borderBottom="2px solid" borderColor="blue.300" width="100px">
                          Qty
                        </Box>
                      </Box>
                    </Box>
                    <Box as="tbody">
                      {items.map((item: any, idx: number) => (
                        <Box 
                          as="tr" 
                          key={idx}
                          _hover={{ bg: "blue.50" }}
                          style={{ transition: "background-color 0.2s" }}
                        >
                          <Box 
                            as="td" 
                            p={2} 
                            textAlign="center" 
                            fontSize="sm"
                            borderBottom="1px solid" 
                            borderColor="gray.200"
                          >
                            {idx + 1}
                          </Box>
                          <Box 
                            as="td" 
                            p={2} 
                            fontSize="sm"
                            borderBottom="1px solid" 
                            borderColor="gray.200"
                          >
                            {item.name || "—"}
                          </Box>
                          <Box 
                            as="td" 
                            p={2} 
                            textAlign="center" 
                            fontSize="sm"
                            fontWeight="600"
                            color="blue.600"
                            borderBottom="1px solid" 
                            borderColor="gray.200"
                          >
                            {item.qty || 0}
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
        );
      }
    };

    // ============================
    // ACTION BUTTONS
    // ============================
    const actionCol: ColumnDef<any> = {
      id: "aksi",
      header: "Aksi",
      cell: ({ row }) => (
        <HStack gap={2}>
          <Button
            size="sm"
            bg="blue.500"
            color="white"
            _hover={{ bg: "blue.600" }}
            onClick={() => navigate(`/updatesrequest/${row.original.id}`)}
          >
            Edit
          </Button>
          <Button
            size="sm"
            bg="red.500"
            color="white"
            _hover={{ bg: "red.600" }}
            onClick={() => handleDelete(row.original.id)}
          >
            Hapus
          </Button>
          <Button
            size="sm"
            bg="green.500"
            color="white"
            _hover={{ bg: "green.600" }}
            onClick={() => navigate(`/printsrequest/${row.original.id}`)}
          >
            Print
          </Button>
        </HStack>
      ),
    };

    return [...base, ...dyn, itemsCol, actionCol];
  }, [filters, uniqueValuesMap, navigate, expandedRows]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading)
    return (
      <Box textAlign="center" py={20}>
        <Spinner size="xl" />
        <Text mt={4}>Sedang memuat data sRequest...</Text>
      </Box>
    );

  if (errorMsg)
    return (
      <Box p={4}>
        <Text color="red.500" mb={2}>Gagal mengambil data sRequest!</Text>
        <Text fontSize="sm" mb={3}>{errorMsg}</Text>
        <Button onClick={fetchData}>Coba lagi</Button>
      </Box>
    );

  return (
    <Box overflowX="auto">
      {/* CSS Animation */}
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>

      {/* Search and Action Buttons */}
      <Flex mb={4} gap={3} wrap="wrap" align="center">
        <Box position="relative" flex="1" minW="250px" maxW="400px">
          <Input
            placeholder="🔍 Cari number, location, request by, dll..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            bg="white"
            color="gray.800"
            borderColor="gray.300"
            _placeholder={{ color: "gray.400" }}
            _hover={{ borderColor: "gray.400" }}
            _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px #3182ce" }}
            pl={4}
          />
        </Box>

        <MotionButton
          bg="red.500"
          color="white"
          size="md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setFilters({});
            setSearchQuery("");
          }}
        >
          Reset Filter
        </MotionButton>

        <Spacer />

        <Button
          bg="green.500"
          color="white"
          size="md"
          _hover={{ bg: "green.600" }}
          onClick={() => navigate("/createsrequest")}
        >
          + Tambah Store Request
        </Button>
      </Flex>

      <Heading fontSize="2xl" mb={2} borderBottom="2px solid" pb={2}>
        Data Store Request
      </Heading>

      {filteredData.length === 0 && !loading ? (
        <Box textAlign="center" py={10}>
          <Text fontSize="lg" color="gray.500">
            {searchQuery || Object.keys(filters).length > 0
              ? "Tidak ada data yang sesuai dengan filter"
              : "Belum ada data Store Request"}
          </Text>
        </Box>
      ) : (
        <Table table={table} />
      )}

      <Flex mt={4} justify="space-between" align="center" fontSize="sm">
        <Text>
          Menampilkan {filteredData.length} dari {data.length} data
        </Text>
        {(searchQuery || Object.keys(filters).length > 0) && (
          <Badge colorScheme="blue" px={3} py={1}>
            Filter Aktif
          </Badge>
        )}
      </Flex>

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

export default TableSRequest;