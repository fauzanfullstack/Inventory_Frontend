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
    { key: "users", title: "Users", path: "/tableusers", icon: FaUser, showCount: false, color: "#6366F1" },
    { key: "items", title: "Items", path: "/tableitem", icon: FaBox, showCount: true, color: "#8B5CF6" },
    { key: "pr", title: "Purchase Requests", path: "/tablepurchaserequests", icon: FaClipboardList, showCount: true, color: "#3B82F6" },
    { key: "prItems", title: "PR Items", path: "/pritems", icon: FaListAlt, showCount: true, color: "#0EA5E9" },
    { key: "marketlists", title: "Marketlists", path: "/tablemarketlist", icon: FaShoppingCart, showCount: true, color: "#06B6D4" },
    { key: "rcv", title: "Receivings", path: "/tablereceiving", icon: FaTruckLoading, showCount: true, color: "#10B981" },
    { key: "rcvItems", title: "Receiving Items", path: "/tablereceivingitems", icon: FaTruck, showCount: true, color: "#14B8A6" },
    { key: "sreq", title: "Service Requests", path: "/tablesrequests", icon: FaClipboardCheck, showCount: true, color: "#F59E0B" },
    { key: "sreqItems", title: "SR Items", path: "/tablesritems", icon: FaClipboard, showCount: true, color: "#EF4444" },
    { key: "issuing", title: "Issuings", path: "/tableissuings", icon: FaFileInvoice, showCount: true, color: "#EC4899" },
    { key: "issuingItems", title: "Issuing Items", path: "/tableissuingitem", icon: FaBoxes, showCount: true, color: "#8B5CF6" },
    { key: "stock", title: "Stock Balance", path: "/stockbalance", icon: FaWarehouse, showCount: false, color: "#6366F1" },
  ];

  const fetchCounts = async () => {
    try {
      const results = await Promise.all([
        getItems(),
        getPurchaseRequests(),
        getPrItems(),
        getMarketLists(),
        getReceivings(),
        getReceivingItems(),
        getSRequests(),
        getSRItems(),
        getIssuings(),
        getIssuingItems(),
      ]);

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

      {/* Header → tambahkan RGB border */}
      <Box 
        mb={8} 
        className="gradient-card rgb-border"
        bg="white"
        p={8}
        rounded="xl"
        shadow="lg"
      >
        <Heading size="2xl" color="gray.800" fontWeight="700" mb={3}>
          Inventory Dashboard
        </Heading>
        <Text fontSize="lg" color="gray.600">
          Pilih modul untuk mulai bekerja
        </Text>
      </Box>

      {loading ? (
        <Flex justify="center" align="center" minH="50vh">
          <Spinner size="xl" color="indigo.500" />
        </Flex>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} gap={6}>
          
          {cards.map((card) => {
            const hex = card.color.replace("#", "");
            const r = parseInt(hex.substring(0, 2), 16);
            const g = parseInt(hex.substring(2, 4), 16);
            const b = parseInt(hex.substring(4, 6), 16);
            const rgbaBg = `rgba(${r}, ${g}, ${b}, 0.15)`;

            return (
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
                shadow="md"
                borderWidth="1px"
                borderColor="gray.100"
                _hover={{ transform: "translateY(-6px)", shadow: "xl" }}
                onClick={() => navigate(card.path)}
                className="card-hover rgb-border"
              >
                <Box 
                  bg={rgbaBg}
                  p={4}
                  rounded="full"
                  mb={4}
                  className="icon-container"
                  transition="all 0.3s"
                >
                  <card.icon size={40} color={card.color} />
                </Box>

                <Heading size="md" color="gray.800" mb={3} textAlign="center">
                  {card.title}
                </Heading>

                {card.showCount ? (
                  <>
                    <Text fontSize="3xl" fontWeight="700" mb={1} style={{ color: card.color }}>
                      {counts[card.key]?.toLocaleString("id-ID") ?? 0}
                    </Text>
                    <Text fontSize="sm" color="gray.500">Total Data</Text>
                  </>
                ) : null}

              </Flex>
            );
          })}

        </SimpleGrid>
      )}

      <style>
        {`
          @keyframes subtleGradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          /* Desain gradient-card tetap */
          .gradient-card {
            position: relative;
            overflow: hidden;
          }

          .gradient-card::before {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: 12px;
            padding: 2px;
            background: linear-gradient(135deg, #667eea, #764ba2, #f093fb, #4facfe, #667eea);
            background-size: 300% 300%;
            animation: subtleGradient 8s ease infinite;
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            opacity: 0.6;
            z-index: -1;
          }

          /* 🔥 Tambahan RGB Border seperti contoh kedua */
          @keyframes rgbBorder {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          .rgb-border {
            position: relative;
          }

          .rgb-border::after {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: 12px;
            padding: 2px;
            background: linear-gradient(270deg, rgba(255,0,0,0.7), rgba(255,154,0,0.7), rgba(208,222,33,0.7), rgba(79,220,74,0.7), rgba(63,218,216,0.7), rgba(47,201,226,0.7), rgba(28,127,238,0.7), rgba(95,21,242,0.7), rgba(186,12,248,0.7));
            background-size: 400% 400%;
            animation: rgbBorder 8s linear infinite;
            -webkit-mask:
              linear-gradient(#fff 0 0) content-box,
              linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            pointer-events: none;
            z-index: -1;
          }

          .card-hover:hover .icon-container {
            transform: scale(1.12);
          }
        `}
      </style>

    </Box>
  );
}
