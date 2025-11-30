import { useState } from "react";
import { Box, Text, Stack, Icon, Button, chakra } from "@chakra-ui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  FaSignOutAlt,
  FaTachometerAlt, // Icon untuk Dashboard
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const ChakraLink = chakra(Link);
const MotionBox = motion(Box);

export default function Sidebar() {
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const adminMenuGroups = [
    {
      title: "Main",
      items: [
        { label: "Dashboard", path: "/dashboard", icon: FaTachometerAlt },
      ],
    },
    {
      title: "Master Data",
      items: [
        { label: "Users", path: "/tableusers", icon: FaUser },
        { label: "Items", path: "/tableitem", icon: FaBox },
        { label: "Stock Balance", path: "/stockbalance", icon: FaWarehouse },
      ],
    },
    {
      title: "Purchase Request",
      items: [
        { label: "Purchase Requests", path: "/tablepurchaserequests", icon: FaClipboardList },
        { label: "PR Items", path: "/pritems", icon: FaListAlt },
      ],
    },
    {
      title: "Marketlist",
      items: [{ label: "Marketlists", path: "/tablemarketlist", icon: FaShoppingCart }],
    },
    {
      title: "Receiving",
      items: [
        { label: "Receivings", path: "/tablereceiving", icon: FaTruckLoading },
        { label: "Receiving Items", path: "/tablereceivingitems", icon: FaTruck },
      ],
    },
    {
      title: "Service Request",
      items: [
        { label: "Store Requests", path: "/tablesrequests", icon: FaClipboardCheck },
        { label: "Store Items", path: "/tablesritems", icon: FaClipboard },
      ],
    },
    {
      title: "Issuing",
      items: [
        { label: "Issuings", path: "/tableissuings", icon: FaFileInvoice },
        { label: "Issuing Items", path: "/tableissuingitem", icon: FaBoxes },
      ],
    },
  ];

  const userMenuGroups = [
    {
      title: "Main",
      items: [
        { label: "Dashboard", path: "/dashboard", icon: FaTachometerAlt },
      ],
    },
    {
      title: "Purchase Request",
      items: [
        { label: "Purchase Requests", path: "/tablepurchaserequests", icon: FaClipboardList },
      ],
    },
  ];

  const menuGroups = user.role === "admin" ? adminMenuGroups : userMenuGroups;

  return (
    <MotionBox
      minH="100vh"
      bg="gray.50"
      color="gray.800"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      boxShadow="md"
      p={4}
      position="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={false}
      animate={{ width: isHovered ? 240 : 60 }}
      transition={{ type: "tween", duration: 0.3 }}
    >
      <Box mt={isHovered ? 8 : 2}>
        <AnimatePresence>
          {isHovered && (
            <MotionBox
              key="logo"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              mb={8}
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={2}
            >
              <Box
                w={10}
                h={10}
                bg="blue.500"
                rounded="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
                color="white"
                fontWeight="bold"
              >
                INV
              </Box>
              <Text fontSize="xl" fontWeight="extrabold" color="blue.600" letterSpacing="widest">
                Inventory
              </Text>
            </MotionBox>
          )}
        </AnimatePresence>

        {/* ==== MENU ==== */}
        <Stack gap={4}>
          {menuGroups.map((group) => (
            <Box key={group.title}>
              <AnimatePresence>
                {isHovered && (
                  <MotionBox
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    mb={2}
                  >
                    <Text fontSize="sm" fontWeight="bold" color="gray.500" ml={2}>
                      {group.title}
                    </Text>
                  </MotionBox>
                )}
              </AnimatePresence>

              <Stack gap={2}>
                {group.items.map((item) => (
                  <ChakraLink
                    key={item.path}
                    to={item.path}
                    px={4}
                    py={3}
                    rounded="md"
                    display="flex"
                    alignItems="center"
                    justifyContent={isHovered ? "flex-start" : "center"}
                    bg={
                      location.pathname.toLowerCase() === item.path.toLowerCase()
                        ? "gray.200"
                        : "transparent"
                    }
                    _hover={{ bg: "gray.300", transform: "scale(1.03)" }}
                    transition="all 0.2s"
                  >
                    <Icon as={item.icon} boxSize={5} color="gray.700" />

                    <AnimatePresence>
                      {isHovered && (
                        <MotionBox
                          key={item.label}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Text ml={3}>{item.label}</Text>
                        </MotionBox>
                      )}
                    </AnimatePresence>
                  </ChakraLink>
                ))}
              </Stack>
            </Box>
          ))}
        </Stack>
      </Box>

      {/* ==== LOGOUT ==== */}
      <Button
        onClick={handleLogout}
        bg="gray.200"
        _hover={{ bg: "gray.300", transform: "scale(1.03)" }}
        color="gray.800"
        fontWeight="bold"
        transition="all 0.2s"
        display="flex"
        alignItems="center"
        justifyContent={isHovered ? "flex-start" : "center"}
      >
        <FaSignOutAlt style={{ marginRight: isHovered ? 8 : 0 }} />

        <AnimatePresence>
          {isHovered && (
            <MotionBox
              key="logout-text"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
            >
              Logout
            </MotionBox>
          )}
        </AnimatePresence>
      </Button>
    </MotionBox>
  );
}