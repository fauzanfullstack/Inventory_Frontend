// src/pages/StockBalance.tsx
import { Box, Heading, Text, SimpleGrid, Flex, Spinner, Badge, HStack, VStack, Icon } from "@chakra-ui/react";
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

// RGB Border Animation Styles
const rgbStyles = `
  @keyframes rgbBorder {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  .rgb-card {
    position: relative;
    background: white;
    z-index: 0;
  }
  .rgb-card::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 12px;
    padding: 2px;
    background: linear-gradient(270deg, red, orange, yellow, lime, cyan, blue, violet, red);
    background-size: 400% 400%;
    animation: rgbBorder 6s linear infinite;
    -webkit-mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    z-index: -1;
  }
`;

// Import semua utils
import { getItems } from "../src/utils/items";
import { getReceivings } from "../src/utils/receivings";
import { getPurchaseRequests } from "../src/utils/purchaseRequest";
import { getMarketLists } from "../src/utils/marketlist";
import { getSRequests } from "../src/utils/sRequest";
import { getIssuings } from "../src/utils/issuings";

const COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899"];

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

      const [items, receivings, purchaseRequests, marketlists, sRequests, issuings] = 
        await Promise.all([
          getItems(),
          getReceivings(),
          getPurchaseRequests(),
          getMarketLists(),
          getSRequests(),
          getIssuings(),
        ]);

      // DEBUG: Cek data receivings
      console.log("Total Receivings:", receivings.length);
      console.log("Sample Receiving:", receivings[0]);
      console.log("All Status:", receivings.map((r: any) => r.status));

      // Hitung stats dengan case-insensitive comparison
      const totalStock = items.reduce((sum: number, item: any) => sum + (item.qty || 0), 0);
      const totalReceived = receivings.filter((rcv: any) => 
        rcv.status && rcv.status.toLowerCase() === 'accepted'
      ).length;
      const totalIssued = issuings.length;
      const totalValue = receivings
        .filter((rcv: any) => rcv.status && rcv.status.toLowerCase() === 'accepted')
        .reduce((sum: number, rcv: any) => sum + parseFloat(rcv.total || 0), 0);

      setStats({
        totalStock,
        totalReceived,
        totalIssued,
        totalValue,
      });

      // Data untuk Bar Chart - Stock per Item (limit 10 items dengan stock terbanyak)
      const itemsData = items
        .sort((a: any, b: any) => (b.qty || 0) - (a.qty || 0))
        .slice(0, 10)
        .map((item: any) => ({
          name: item.name || "Unknown",
          qty: item.qty || 0,
          partNo: item.part_no || "-",
        }));
      setItemsChart(itemsData);

      // Data untuk Line Chart - Receivings Trend (hanya yang Accepted)
      const receivingsByDate = receivings
        .filter((rcv: any) => rcv.status && rcv.status.toLowerCase() === 'accepted')
        .reduce((acc: any, rcv: any) => {
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

      // Data untuk Pie Chart - Status Distribution
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

      // Data untuk Pie Chart - Top 5 Suppliers
      const supplierCount: any = {};
      
      receivings
        .filter((rcv: any) => rcv.status && rcv.status.toLowerCase() === 'accepted' && rcv.supplier)
        .forEach((rcv: any) => {
          const supplier = rcv.supplier;
          supplierCount[supplier] = (supplierCount[supplier] || 0) + 1;
        });

      const supplierData = Object.entries(supplierCount)
        .map(([name, value]) => ({ name, value }))
        .sort((a: any, b: any) => b.value - a.value)
        .slice(0, 5);
      
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
      <Box 
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        justifyContent="center" 
        minH="100vh"
        bg="gray.50"
      >
        <Spinner 
          size="xl" 
          color="indigo.500"
        />
        <Text mt={6} color="gray.600" fontSize="lg" fontWeight="500">
          Loading Dashboard...
        </Text>
      </Box>
    );
  }

  const StatCard = ({ icon, label, value, unit, color }: any) => (
    <Box 
      className="rgb-card"
      bg="white" 
      p={6} 
      rounded="xl" 
      shadow="sm"
      transition="all 0.3s"
      _hover={{ 
        shadow: "md", 
        transform: "translateY(-2px)"
      }}
    >
      <Flex align="center" justify="space-between">
        <VStack align="start" gap={1}>
          <Text fontSize="sm" color="gray.600" fontWeight="500" letterSpacing="wide">
            {label}
          </Text>
          <Heading size="xl" color={`${color}.600`} fontWeight="700">
            {value}
          </Heading>
          <Text fontSize="xs" color="gray.500" fontWeight="500">
            {unit}
          </Text>
        </VStack>
        <Box 
          bg={`${color}.50`} 
          p={4} 
          rounded="xl"
        >
          <Icon as={icon} boxSize={7} color={`${color}.500`} />
        </Box>
      </Flex>
    </Box>
  );

  const ChartCard = ({ title, children }: any) => (
    <Box 
      className="rgb-card"
      bg="white" 
      p={6} 
      rounded="xl" 
      shadow="sm"
      transition="all 0.3s"
      _hover={{ shadow: "md" }}
    >
      <Heading size="md" mb={6} color="gray.700" fontWeight="600">
        {title}
      </Heading>
      {children}
    </Box>
  );

  return (
    <Box bg="gray.50" minH="100vh" p={{ base: 4, md: 8 }}>
      {/* RGB Border Animation Styles */}
      <style>{rgbStyles}</style>

      {/* Header */}
      <Box mb={8}>
        <Heading 
          size="2xl" 
          color="gray.800" 
          fontWeight="700" 
          mb={2}
          letterSpacing="tight"
        >
          Stock Balance Dashboard
        </Heading>
        <Text fontSize="md" color="gray.500" fontWeight="400">
          Real-time overview dan analisis inventory management
        </Text>
      </Box>

      {/* Summary Cards */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6} mb={8}>
        <StatCard 
          icon={FaBox}
          label="Total Stock"
          value={stats.totalStock.toLocaleString('id-ID')}
          unit="Items"
          color="red"
        />
        <StatCard 
          icon={FaTruck}
          label="Total Received"
          value={stats.totalReceived.toLocaleString('id-ID')}
          unit="Transactions"
          color="green"
        />
        <StatCard 
          icon={FaShoppingCart}
          label="Total Issued"
          value={stats.totalIssued.toLocaleString('id-ID')}
          unit="Transactions"
          color="orange"
        />
        <StatCard 
          icon={FaWarehouse}
          label="Total Value"
          value={`Rp ${(stats.totalValue / 1000000).toFixed(1)}M`}
          unit="IDR"
          color="purple"
        />
      </SimpleGrid>

      {/* Charts Grid */}
      <SimpleGrid columns={{ base: 1, lg: 2 }} gap={6}>
        {/* Bar Chart - Top 10 Stock per Item */}
        <ChartCard title="Top 10 Stock per Item">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={itemsChart}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="name" 
                angle={-45} 
                textAnchor="end" 
                height={100}
                tick={{ fontSize: 11, fill: '#6B7280' }}
              />
              <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '8px', 
                  border: '1px solid #E5E7EB',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend wrapperStyle={{ fontSize: '14px' }} />
              <Bar 
                dataKey="qty" 
                fill="#4F46E5" 
                name="Quantity" 
                radius={[8, 8, 0, 0]} 
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Line Chart - Receivings Trend */}
        <ChartCard title="📈 Tren Penerimaan Barang (Trading View Style)">
          <VStack align="stretch" gap={4}>
            {/* Trading Stats Header */}
            <SimpleGrid columns={{ base: 2, md: 4 }} gap={3}>
              <Box bg="gradient-to-br from-green-50 to-emerald-50" p={3} rounded="lg" border="1px" borderColor="green.200">
                <VStack align="start" gap={1}>
                  <HStack>
                    <Box w={2} h={2} bg="green.500" rounded="full" />
                    <Text fontSize="xs" color="gray.600" fontWeight="600">
                      TOTAL TRANSAKSI
                    </Text>
                  </HStack>
                  <Text fontSize="2xl" color="green.700" fontWeight="800">
                    {receivingsChart.reduce((sum: number, r: any) => sum + r.count, 0)}
                  </Text>
                  <Text fontSize="xs" color="green.600" fontWeight="500">
                    Transactions
                  </Text>
                </VStack>
              </Box>
              
              <Box bg="gradient-to-br from-orange-50 to-amber-50" p={3} rounded="lg" border="1px" borderColor="orange.200">
                <VStack align="start" gap={1}>
                  <HStack>
                    <Box w={2} h={2} bg="orange.500" rounded="full" />
                    <Text fontSize="xs" color="gray.600" fontWeight="600">
                      TOTAL VALUE
                    </Text>
                  </HStack>
                  <Text fontSize="2xl" color="orange.700" fontWeight="800">
                    {(receivingsChart.reduce((sum: number, r: any) => sum + r.total, 0) / 1000000).toFixed(1)}M
                  </Text>
                  <Text fontSize="xs" color="orange.600" fontWeight="500">
                    IDR
                  </Text>
                </VStack>
              </Box>

              <Box bg="gradient-to-br from-blue-50 to-cyan-50" p={3} rounded="lg" border="1px" borderColor="blue.200">
                <VStack align="start" gap={1}>
                  <HStack>
                    <Box w={2} h={2} bg="blue.500" rounded="full" />
                    <Text fontSize="xs" color="gray.600" fontWeight="600">
                      AVG/DAY
                    </Text>
                  </HStack>
                  <Text fontSize="2xl" color="blue.700" fontWeight="800">
                    {receivingsChart.length > 0 
                      ? (receivingsChart.reduce((sum: number, r: any) => sum + r.count, 0) / receivingsChart.length).toFixed(1)
                      : '0'}
                  </Text>
                  <Text fontSize="xs" color="blue.600" fontWeight="500">
                    Transactions
                  </Text>
                </VStack>
              </Box>

              <Box bg="gradient-to-br from-purple-50 to-pink-50" p={3} rounded="lg" border="1px" borderColor="purple.200">
                <VStack align="start" gap={1}>
                  <HStack>
                    <Box w={2} h={2} bg="purple.500" rounded="full" />
                    <Text fontSize="xs" color="gray.600" fontWeight="600">
                      AVG VALUE
                    </Text>
                  </HStack>
                  <Text fontSize="2xl" color="purple.700" fontWeight="800">
                    {receivingsChart.length > 0 
                      ? (receivingsChart.reduce((sum: number, r: any) => sum + r.total, 0) / receivingsChart.length / 1000000).toFixed(1)
                      : '0'}M
                  </Text>
                  <Text fontSize="xs" color="purple.600" fontWeight="500">
                    IDR/Day
                  </Text>
                </VStack>
              </Box>
            </SimpleGrid>

            {/* Chart Area with Dark Background */}
            <Box bg="gray.900" p={4} rounded="lg" border="1px" borderColor="gray.700">
              <ResponsiveContainer width="100%" height={340}>
                <LineChart 
                  data={receivingsChart}
                  margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                >
                  <defs>
                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" strokeOpacity={0.3} />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 11, fill: '#9CA3AF' }}
                    stroke="#4B5563"
                    angle={-30}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis 
                    yAxisId="left"
                    tick={{ fontSize: 11, fill: '#10B981' }}
                    stroke="#10B981"
                    label={{ 
                      value: '📊 Transaksi', 
                      angle: -90, 
                      position: 'insideLeft',
                      style: { fontSize: 12, fill: '#10B981', fontWeight: 600 }
                    }}
                  />
                  <YAxis 
                    yAxisId="right"
                    orientation="right"
                    tick={{ fontSize: 11, fill: '#F59E0B' }}
                    stroke="#F59E0B"
                    label={{ 
                      value: '💰 Nilai (Jt)', 
                      angle: 90, 
                      position: 'insideRight',
                      style: { fontSize: 12, fill: '#F59E0B', fontWeight: 600 }
                    }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937',
                      borderRadius: '8px', 
                      border: '1px solid #374151',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
                      fontSize: '13px',
                      color: '#F9FAFB'
                    }}
                    labelStyle={{ color: '#F9FAFB', fontWeight: 600, marginBottom: '4px' }}
                    formatter={(value: any, name: string) => {
                      if (name === 'Jumlah Transaksi') {
                        return [`${value} transaksi`, name];
                      }
                      return [`Rp ${(value / 1000000).toFixed(2)}M`, name];
                    }}
                  />
                  <Legend 
                    wrapperStyle={{ 
                      fontSize: '13px', 
                      paddingTop: '10px',
                      color: '#F9FAFB'
                    }}
                    iconType="line"
                  />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="count" 
                    stroke="#10B981" 
                    strokeWidth={3}
                    name="Jumlah Transaksi"
                    dot={{ r: 4, fill: '#10B981', strokeWidth: 2, stroke: '#1F2937' }}
                    activeDot={{ r: 8, fill: '#10B981', stroke: '#fff', strokeWidth: 2 }}
                    fill="url(#colorCount)"
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="total" 
                    stroke="#F59E0B" 
                    strokeWidth={3}
                    name="Total Nilai (IDR)"
                    dot={{ r: 4, fill: '#F59E0B', strokeWidth: 2, stroke: '#1F2937' }}
                    activeDot={{ r: 8, fill: '#F59E0B', stroke: '#fff', strokeWidth: 2 }}
                    fill="url(#colorValue)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>

            {/* Trading-Style Info Panel */}
            <SimpleGrid columns={{ base: 1, md: 3 }} gap={3}>
              <Box bg="gray.800" p={3} rounded="lg" border="1px" borderColor="gray.700">
                <HStack justify="space-between">
                  <Text fontSize="xs" color="gray.400" fontWeight="600">HIGHEST DAY</Text>
                  <Badge colorScheme="green" fontSize="xs">
                    {receivingsChart.length > 0 
                      ? receivingsChart.reduce((max, r) => r.count > max.count ? r : max, receivingsChart[0]).date
                      : '-'}
                  </Badge>
                </HStack>
                <Text fontSize="lg" color="green.400" fontWeight="700" mt={1}>
                  {receivingsChart.length > 0 
                    ? receivingsChart.reduce((max, r) => r.count > max.count ? r : max, receivingsChart[0]).count
                    : 0} transaksi
                </Text>
              </Box>

              <Box bg="gray.800" p={3} rounded="lg" border="1px" borderColor="gray.700">
                <HStack justify="space-between">
                  <Text fontSize="xs" color="gray.400" fontWeight="600">BIGGEST VALUE</Text>
                  <Badge colorScheme="orange" fontSize="xs">
                    {receivingsChart.length > 0 
                      ? receivingsChart.reduce((max, r) => r.total > max.total ? r : max, receivingsChart[0]).date
                      : '-'}
                  </Badge>
                </HStack>
                <Text fontSize="lg" color="orange.400" fontWeight="700" mt={1}>
                  Rp {receivingsChart.length > 0 
                    ? (receivingsChart.reduce((max, r) => r.total > max.total ? r : max, receivingsChart[0]).total / 1000000).toFixed(1)
                    : 0}M
                </Text>
              </Box>

              <Box bg="gray.800" p={3} rounded="lg" border="1px" borderColor="gray.700">
                <HStack justify="space-between">
                  <Text fontSize="xs" color="gray.400" fontWeight="600">PERIOD</Text>
                  <Badge colorScheme="purple" fontSize="xs">ACTIVE</Badge>
                </HStack>
                <Text fontSize="lg" color="purple.400" fontWeight="700" mt={1}>
                  {receivingsChart.length} hari
                </Text>
              </Box>
            </SimpleGrid>

            {/* Guide */}
            <Box bg="blue.50" p={3} rounded="lg" border="1px" borderColor="blue.200" fontSize="xs" color="gray.700">
              <HStack gap={4} flexWrap="wrap">
                <HStack>
                  <Box w={3} h={1} bg="green.500" />
                  <Text fontWeight="600">Hijau = Jumlah Transaksi</Text>
                </HStack>
                <HStack>
                  <Box w={3} h={1} bg="orange.500" />
                  <Text fontWeight="600">Oranye = Total Nilai (IDR)</Text>
                </HStack>
                <Text color="gray.500">• Hover untuk detail • Dual axis untuk scale berbeda</Text>
              </HStack>
            </Box>
          </VStack>
        </ChartCard>

        {/* Pie Chart - Status Distribution */}
        <ChartCard title="Request Status Distribution">
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={statusChart}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
              >
                {statusChart.map((_entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '8px', 
                  border: '1px solid #E5E7EB',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Pie Chart - Top 5 Suppliers */}
        <ChartCard title="Top 5 Suppliers (Accepted Receivings)">
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={supplierChart}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
              >
                {supplierChart.map((_entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '8px', 
                  border: '1px solid #E5E7EB',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </SimpleGrid>

      {/* Footer Stats */}
      <Box 
        className="rgb-card"
        mt={8} 
        bg="white" 
        p={8} 
        rounded="xl" 
        shadow="sm"
      >
        <HStack gap={8} justify="space-around" flexWrap="wrap">
          <VStack gap={2}>
            <Text fontSize="sm" color="gray.600" fontWeight="500" letterSpacing="wide">
              TOTAL ITEMS
            </Text>
            <Badge 
              colorScheme="indigo" 
              fontSize="xl" 
              px={6} 
              py={2}
              rounded="lg"
              fontWeight="600"
            >
              {itemsChart.length}
            </Badge>
          </VStack>
          <VStack gap={2}>
            <Text fontSize="sm" color="gray.600" fontWeight="500" letterSpacing="wide">
              ACTIVE SUPPLIERS
            </Text>
            <Badge 
              colorScheme="green" 
              fontSize="xl" 
              px={6} 
              py={2}
              rounded="lg"
              fontWeight="600"
            >
              {supplierChart.length}
            </Badge>
          </VStack>
          <VStack gap={2}>
            <Text fontSize="sm" color="gray.600" fontWeight="500" letterSpacing="wide">
              TOTAL TRANSACTIONS
            </Text>
            <Badge 
              colorScheme="purple" 
              fontSize="xl" 
              px={6} 
              py={2}
              rounded="lg"
              fontWeight="600"
            >
              {receivingsChart.reduce((sum: number, r: any) => sum + r.count, 0)}
            </Badge>
          </VStack>
        </HStack>
      </Box>
    </Box>
  );
}