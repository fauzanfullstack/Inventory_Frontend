// src/pages/StockBalance.tsx
import { Box, Heading, Text, SimpleGrid, Flex, Spinner, Badge } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FaBox, FaTruck, FaShoppingCart, FaWarehouse } from "react-icons/fa";

// Import semua utils
import { getItems } from "../src/utils/items";
import { getReceivings } from "../src/utils/receivings";
import { getReceivingItems } from "../src/utils/receivingItems";
import { getPurchaseRequests } from "../src/utils/purchaseRequest";
import { getMarketLists } from "../src/utils/marketlist";
import { getSRequests } from "../src/utils/sRequest";
import { getIssuings } from "../src/utils/issuings";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];

export default function StockBalance() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>({
    totalStock: 0,
    totalReceived: 0,
    totalIssued: 0,
    totalValue: 0,
  });
  
  const [itemsChart, setItemsChart] = useState<any[]>([]);
  const [receivingsChart, setReceivingsChart] = useState<any[]>([]);
  const [statusChart, setStatusChart] = useState<any[]>([]);
  const [supplierChart, setSupplierChart] = useState<any[]>([]);

  const fetchAllData = async () => {
    try {
      setLoading(true);

      // Fetch semua data
      const [items, receivings, receivingItems, purchaseRequests, marketlists, sRequests, issuings] = 
        await Promise.all([
          getItems(),
          getReceivings(),
          getReceivingItems(),
          getPurchaseRequests(),
          getMarketLists(),
          getSRequests(),
          getIssuings(),
        ]);

      // ===========================
      // 1. SUMMARY STATS
      // ===========================
      const totalStock = items.reduce((sum: number, item: any) => sum + (item.qty || 0), 0);
      const totalReceived = receivingItems.reduce((sum: number, item: any) => sum + (item.qty || 0), 0);
      const totalIssued = issuings.length; // atau bisa dari issuing_items
      const totalValue = receivings.reduce((sum: number, rcv: any) => sum + parseFloat(rcv.total || 0), 0);

      setStats({
        totalStock,
        totalReceived,
        totalIssued,
        totalValue,
      });

      // ===========================
      // 2. BAR CHART - Stock per Item
      // ===========================
      const itemsData = items.map((item: any) => ({
        name: item.name || "Unknown",
        qty: item.qty || 0,
        partNo: item.part_no || "-",
      }));
      setItemsChart(itemsData);

      // ===========================
      // 3. LINE CHART - Receivings Trend (by created_at)
      // ===========================
      const receivingsByDate = receivings.reduce((acc: any, rcv: any) => {
        const date = new Date(rcv.created_at).toLocaleDateString("id-ID", { 
          month: "short", 
          day: "numeric" 
        });
        if (!acc[date]) {
          acc[date] = { date, count: 0, total: 0 };
        }
        acc[date].count += 1;
        acc[date].total += parseFloat(rcv.total || 0);
        return acc;
      }, {});
      setReceivingsChart(Object.values(receivingsByDate));

      // ===========================
      // 4. PIE CHART - Status Distribution (PR + SR + Marketlist)
      // ===========================
      const statusCount: any = {};
      
      [...purchaseRequests, ...sRequests, ...marketlists].forEach((item: any) => {
        const status = (item.status || "unknown").toLowerCase();
        statusCount[status] = (statusCount[status] || 0) + 1;
      });

      const statusData = Object.entries(statusCount).map(([name, value]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        value,
      }));
      setStatusChart(statusData);

      // ===========================
      // 5. PIE CHART - Supplier Distribution
      // ===========================
      const supplierCount: any = {};
      
      [...items, ...receivings].forEach((item: any) => {
        const supplier = item.supplier || "Unknown";
        supplierCount[supplier] = (supplierCount[supplier] || 0) + 1;
      });

      const supplierData = Object.entries(supplierCount)
        .map(([name, value]) => ({ name, value }))
        .sort((a: any, b: any) => b.value - a.value)
        .slice(0, 5); // Top 5 suppliers
      
      setSupplierChart(supplierData);

    } catch (err) {
      console.error("Error fetching stock balance data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  if (loading) {
    return (
      <Box textAlign="center" py={20}>
        <Spinner size="xl" color="blue.500" />
        <Text mt={4} color="gray.600">Loading Stock Balance Dashboard...</Text>
      </Box>
    );
  }

  return (
    <Box bg="gray.50" minH="100vh" p={8}>
      {/* Header */}
      <Box mb={8}>
        <Heading size="2xl" color="gray.700" fontWeight="extrabold" mb={2}>
          📊 Stock Balance Dashboard
        </Heading>
        <Text fontSize="md" color="gray.600">
          Real-time overview dan analisis inventory management
        </Text>
      </Box>

      {/* Summary Cards */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6} mb={8}>
        <Box bg="white" p={6} rounded="lg" shadow="md" borderLeft="4px" borderColor="blue.500">
          <Flex align="center" justify="space-between">
            <Box>
              <Text fontSize="sm" color="gray.600" fontWeight="600">Total Stock</Text>
              <Heading size="2xl" color="blue.600" mt={2}>{stats.totalStock}</Heading>
              <Text fontSize="xs" color="gray.500" mt={1}>Items</Text>
            </Box>
            <FaBox size={40} color="#3b82f6" />
          </Flex>
        </Box>

        <Box bg="white" p={6} rounded="lg" shadow="md" borderLeft="4px" borderColor="green.500">
          <Flex align="center" justify="space-between">
            <Box>
              <Text fontSize="sm" color="gray.600" fontWeight="600">Total Received</Text>
              <Heading size="2xl" color="green.600" mt={2}>{stats.totalReceived}</Heading>
              <Text fontSize="xs" color="gray.500" mt={1}>Items</Text>
            </Box>
            <FaTruck size={40} color="#10b981" />
          </Flex>
        </Box>

        <Box bg="white" p={6} rounded="lg" shadow="md" borderLeft="4px" borderColor="orange.500">
          <Flex align="center" justify="space-between">
            <Box>
              <Text fontSize="sm" color="gray.600" fontWeight="600">Total Issued</Text>
              <Heading size="2xl" color="orange.600" mt={2}>{stats.totalIssued}</Heading>
              <Text fontSize="xs" color="gray.500" mt={1}>Transactions</Text>
            </Box>
            <FaShoppingCart size={40} color="#f59e0b" />
          </Flex>
        </Box>

        <Box bg="white" p={6} rounded="lg" shadow="md" borderLeft="4px" borderColor="purple.500">
          <Flex align="center" justify="space-between">
            <Box>
              <Text fontSize="sm" color="gray.600" fontWeight="600">Total Value</Text>
              <Heading size="2xl" color="purple.600" mt={2}>
                {(stats.totalValue / 1000000).toFixed(1)}M
              </Heading>
              <Text fontSize="xs" color="gray.500" mt={1}>IDR</Text>
            </Box>
            <FaWarehouse size={40} color="#8b5cf6" />
          </Flex>
        </Box>
      </SimpleGrid>

      {/* Charts Grid */}
      <SimpleGrid columns={{ base: 1, lg: 2 }} gap={6}>
        {/* Bar Chart - Stock per Item */}
        <Box bg="white" p={6} rounded="lg" shadow="md">
          <Heading size="md" mb={4} color="gray.700">
            📦 Stock per Item
          </Heading>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={itemsChart}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="qty" fill="#3b82f6" name="Quantity" />
            </BarChart>
          </ResponsiveContainer>
        </Box>

        {/* Line Chart - Receivings Trend */}
        <Box bg="white" p={6} rounded="lg" shadow="md">
          <Heading size="md" mb={4} color="gray.700">
            📈 Receivings Trend
          </Heading>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={receivingsChart}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#10b981" name="Count" />
              <Line type="monotone" dataKey="total" stroke="#f59e0b" name="Total Value" />
            </LineChart>
          </ResponsiveContainer>
        </Box>

        {/* Pie Chart - Status Distribution */}
        <Box bg="white" p={6} rounded="lg" shadow="md">
          <Heading size="md" mb={4} color="gray.700">
            📊 Status Distribution
          </Heading>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusChart}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {statusChart.map((_entry: any, index: number) => (
  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Box>

        {/* Pie Chart - Top Suppliers */}
        <Box bg="white" p={6} rounded="lg" shadow="md">
          <Heading size="md" mb={4} color="gray.700">
            🏭 Top 5 Suppliers
          </Heading>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={supplierChart}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {supplierChart.map((_entry: any, index: number) => (
  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </SimpleGrid>

      {/* Footer Stats */}
      <Box mt={8} bg="white" p={6} rounded="lg" shadow="md">
        <Flex justify="space-around" align="center" wrap="wrap" gap={4}>
          <Box textAlign="center">
            <Text fontSize="sm" color="gray.600">Total Items</Text>
            <Badge colorScheme="blue" fontSize="lg" px={3} py={1}>
              {itemsChart.length}
            </Badge>
          </Box>
          <Box textAlign="center">
            <Text fontSize="sm" color="gray.600">Active Suppliers</Text>
            <Badge colorScheme="green" fontSize="lg" px={3} py={1}>
              {supplierChart.length}
            </Badge>
          </Box>
          <Box textAlign="center">
            <Text fontSize="sm" color="gray.600">Total Transactions</Text>
            <Badge colorScheme="purple" fontSize="lg" px={3} py={1}>
              {receivingsChart.reduce((sum: number, r: any) => sum + r.count, 0)}
            </Badge>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}