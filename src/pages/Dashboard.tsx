import { Box, Heading, Text, SimpleGrid, Flex, Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { getItems } from "../utils/items";
import { getPurchaseRequests } from "../utils/purchaseRequest";
import { getPrItems } from "../utils/prItems"; // ← sudah benar
import { getMarketLists } from "../utils/marketlist";
import { getReceivings } from "../utils/receivings";
import { getReceivingItems } from "../utils/receivingItems";
import { getSRequests } from "../utils/sRequest";
import { getSRItems } from "../utils/srItems";
import { getIssuings } from "../utils/issuings";
import { getIssuingItems } from "../utils/issuingsItem";

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
    { key: "users", title: "Users", path: "/users", icon: FaUser },
    { key: "items", title: "Items", path: "/tableitem", icon: FaBox },
    { key: "pr", title: "Purchase Requests", path: "/tablepurchaserequests", icon: FaClipboardList },
    { key: "prItems", title: "PR Items", path: "/pritems", icon: FaListAlt },
    { key: "marketlists", title: "Marketlists", path: "/tablemarketlist", icon: FaShoppingCart },
    { key: "rcv", title: "Receivings", path: "/tablereceiving", icon: FaTruckLoading },
    { key: "rcvItems", title: "Receiving Items", path: "/tablereceivingitems", icon: FaTruck },
    { key: "sreq", title: "Service Requests", path: "/tablesrequests", icon: FaClipboardCheck },
    { key: "sreqItems", title: "SR Items", path: "/tablesritems", icon: FaClipboard },
    { key: "issuing", title: "Issuings", path: "/tableissuings", icon: FaFileInvoice },
    { key: "issuingItems", title: "Issuing Items", path: "/tableissuingitem", icon: FaBoxes },
    { key: "stock", title: "Stock Balance", path: "/stock-balance", icon: FaWarehouse },
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

      setCounts({
        users: 0,                // kamu belum punya API users di sini
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
      <Box mb={8} textAlign="left">
        <Heading size="2xl" color="gray.700" fontWeight="extrabold" mb={2}>
          Inventory Dashboard
        </Heading>
        <Text fontSize="md" color="gray.600">
          Pilih modul untuk mulai bekerja.
        </Text>
      </Box>

      {loading ? (
        <Flex justify="center" align="center" minH="50vh">
          <Spinner size="xl" />
        </Flex>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
          {cards.map((card) => (
            <Flex
              key={card.key}
              position="relative"
              rounded="lg"
              p={6}
              direction="column"
              align="center"
              cursor="pointer"
              transition="all 0.2s"
              _hover={{ transform: "scale(1.03)" }}
              onClick={() => navigate(card.path)}
              className="rgb-card"
            >
              <card.icon size={60} color="#4A5568" style={{ marginBottom: 16 }} />
              <Heading size="md" color="gray.800" mb={2} textAlign="center">
                {card.title}
              </Heading>

              <Text fontSize="2xl" fontWeight="bold" color="blue.600" mt={2}>
                {counts[card.key] ?? 0}
              </Text>

              <Text fontSize="sm" color="gray.700">Total Data</Text>
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
            background: transparent;
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
