import { Box, Heading, Text, SimpleGrid, Flex, Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { getItems } from "../utils/items";
import { getPurchaseRequests } from "../utils/purchaseRequest";
import { getPrItems } from "../utils/prItems";
import { getMarketLists } from "../utils/marketlist";
import { getReceivings } from "../utils/receivings";
import { getReceivingItems } from "../utils/receivingItems";
import { getSRequests } from "../utils/sRequest";
import { getSRItems } from "../utils/srItems";
import { getIssuings } from "../utils/issuings";
import { getIssuingItems } from "../utils/issuingsItem";
// Import untuk mendapatkan data users dari register
import axios from "axios";

import {
  FaUser,
  FaBox,
  FaClipboardList,
  FaListAlt,
  FaShoppingCart,
  FaTruckLoading,
  FaTruck,
  FaClipboardCheck,
  FaClipboard,
  FaFileInvoice,
  FaBoxes,
  FaWarehouse,
} from "react-icons/fa";

export default function Dashboard() {
  const navigate = useNavigate();

  const [counts, setCounts] = useState<any>({});
  const [loading, setLoading] = useState(true);

  const cards = [
    { key: "users", title: "Users", path: "/tableusers", icon: FaUser, showCount: true },
    { key: "items", title: "Items", path: "/tableitem", icon: FaBox, showCount: true },
    { key: "pr", title: "Purchase Requests", path: "/tablepurchaserequests", icon: FaClipboardList, showCount: true },
    { key: "prItems", title: "PR Items", path: "/pritems", icon: FaListAlt, showCount: true },
    { key: "marketlists", title: "Marketlists", path: "/tablemarketlist", icon: FaShoppingCart, showCount: true },
    { key: "rcv", title: "Receivings", path: "/tablereceiving", icon: FaTruckLoading, showCount: true },
    { key: "rcvItems", title: "Receiving Items", path: "/tablereceivingitems", icon: FaTruck, showCount: true },
    { key: "sreq", title: "Service Requests", path: "/tablesrequests", icon: FaClipboardCheck, showCount: true },
    { key: "sreqItems", title: "SR Items", path: "/tablesritems", icon: FaClipboard, showCount: true },
    { key: "issuing", title: "Issuings", path: "/tableissuings", icon: FaFileInvoice, showCount: true },
    { key: "issuingItems", title: "Issuing Items", path: "/tableissuingitem", icon: FaBoxes, showCount: true },
    { key: "stock", title: "Stock Balance", path: "/stockbalance", icon: FaWarehouse, showCount: false },
  ];

  const fetchCounts = async () => {
    try {
      const results = await Promise.all([
        getItems(),            // 0
        getPurchaseRequests(), // 1
        getPrItems(),          // 2
        getMarketLists(),      // 3
        getReceivings(),       // 4
        getReceivingItems(),   // 5
        getSRequests(),        // 6
        getSRItems(),          // 7
        getIssuings(),         // 8
        getIssuingItems(),     // 9
      ]);

      // Fetch users dari endpoint register
      let usersCount = 0;
      try {
        const usersResponse = await axios.get("http://localhost:3000/api/register");
        usersCount = usersResponse.data.length;
      } catch (err) {
        console.error("Gagal fetch users:", err);
      }

      setCounts({
        users: usersCount,
        items: results[0].length,
        pr: results[1].length,
        prItems: results[2].length,
        marketlists: results[3].length,
        rcv: results[4].length,
        rcvItems: results[5].length,
        sreq: results[6].length,
        sreqItems: results[7].length,
        issuing: results[8].length,
        issuingItems: results[9].length,
      });

    } catch (err) {
      console.error("Gagal fetch data dashboard:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  return (
    <Box flex="1" bg="gray.50" p={8} minH="100vh">
      {/* Header Card with RGB Border */}
      <Box 
        mb={8} 
        className="rgb-card"
        bg="white"
        p={8}
        rounded="xl"
        shadow="sm"
      >
        <Heading size="2xl" color="gray.800" fontWeight="700" mb={3} letterSpacing="tight">
          Inventory Dashboard
        </Heading>
        <Text fontSize="lg" color="gray.600" fontWeight="400">
          Pilih modul untuk mulai bekerja
        </Text>
      </Box>

      {loading ? (
        <Flex justify="center" align="center" minH="50vh">
          <Spinner size="xl" color="indigo.500" />
        </Flex>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} gap={6}>
          {cards.map((card) => (
            <Flex
              key={card.key}
              position="relative"
              rounded="xl"
              bg="white"
              p={6}
              direction="column"
              align="center"
              cursor="pointer"
              transition="all 0.3s"
              shadow="sm"
              _hover={{ 
                transform: "translateY(-4px)", 
                shadow: "md" 
              }}
              onClick={() => navigate(card.path)}
              className="rgb-card"
            >
              <Box 
                bg="gray.50" 
                p={4} 
                rounded="full" 
                mb={4}
                transition="all 0.3s"
                _groupHover={{ bg: "indigo.50" }}
              >
                <card.icon size={40} color="#4F46E5" />
              </Box>
              
              <Heading size="md" color="gray.800" mb={3} textAlign="center" fontWeight="600">
                {card.title}
              </Heading>

              {card.showCount ? (
                <>
                  <Text fontSize="3xl" fontWeight="700" color="indigo.600" mb={1}>
                    {counts[card.key]?.toLocaleString('id-ID') ?? 0}
                  </Text>
                  <Text fontSize="sm" color="gray.500" fontWeight="500">
                    Total Data
                  </Text>
                </>
              ) : (
                <Box textAlign="center" mt={2}>
                  <Text fontSize="sm" color="indigo.600" fontWeight="600" letterSpacing="wide">
                    VIEW ANALYTICS
                  </Text>
                  <Text fontSize="xs" color="gray.500" mt={1}>
                    Lihat laporan lengkap
                  </Text>
                </Box>
              )}
            </Flex>
          ))}
        </SimpleGrid>
      )}

      <style>
        {`
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
        `}
      </style>
    </Box>
  );
}