import { useState } from "react";
import {
  Box,
  Heading,
  Input,
  Text,
  chakra,
  Image,
  Stack,
  Flex,
  Button,
} from "@chakra-ui/react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionButton = motion(Button);

export default function Register() {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/auth/register", {
        username,
        full_name: fullName,
        email,
        password,
        role,
      });

      alert("Registrasi berhasil. Silakan login.");
      navigate("/login");
    } catch (err: any) {
      console.error(err);
      alert(err?.response?.data?.message || "Registrasi gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      minH="100vh"
      bg="gray.50"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
    >
      <Flex
        maxW="500px"
        w="full"
        align="center"
        justify="center"
      >
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          maxW="500px"
          w="full"
        >
          <Box
            bg="rgba(255, 255, 255, 0.95)"
            backdropFilter="blur(10px)"
            rounded="2xl"
            boxShadow="0 20px 60px rgba(0,0,0,0.3)"
            p={8}
            border="1px solid rgba(255,255,255,0.2)"
          >
            {/* Logo & Title */}
            <Box textAlign="center" mb={6}>
              <MotionBox
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              >
                <Box
                  position="relative"
                  display="inline-block"
                  mb={4}
                  _before={{
                    content: '""',
                    position: "absolute",
                    inset: "-10px",
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, #f093fb, #f5576c, #4facfe)",
                    opacity: 0.3,
                    filter: "blur(20px)",
                  }}
                >
                  <Image
                    src="/zuri.jpg"
                    alt="Hotel Zuri Express"
                    w="100px"
                    h="100px"
                    objectFit="cover"
                    borderRadius="full"
                    border="4px solid white"
                    boxShadow="0 8px 32px rgba(0,0,0,0.2)"
                  />
                </Box>
              </MotionBox>

              <Heading
                size="lg"
                bgGradient="linear(to-r, #f093fb, #f5576c)"
                bgClip="text"
                fontWeight="extrabold"
                mb={2}
                letterSpacing="tight"
              >
                Create Account
              </Heading>
              <Text color="gray.600" fontSize="sm" fontWeight="medium">
                Join Hotel Zuri Express today
              </Text>
            </Box>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <Stack gap={4}>
                <Box>
                  <Text
                    as="label"
                    display="block"
                    fontWeight="bold"
                    mb={2}
                    color="gray.700"
                    fontSize="sm"
                    letterSpacing="wide"
                  >
                    👤 Username
                  </Text>
                  <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Choose a username"
                    h="50px"
                    bg="white"
                    border="2px solid"
                    borderColor="gray.200"
                    _hover={{ borderColor: "pink.300" }}
                    _focus={{
                      borderColor: "pink.500",
                      boxShadow: "0 0 0 3px rgba(240, 147, 251, 0.1)",
                      outline: "none",
                    }}
                    fontSize="md"
                    fontWeight="medium"
                    color="gray.800"
                    rounded="xl"
                  />
                </Box>

                <Box>
                  <Text
                    as="label"
                    display="block"
                    fontWeight="bold"
                    mb={2}
                    color="gray.700"
                    fontSize="sm"
                    letterSpacing="wide"
                  >
                    ✨ Full Name
                  </Text>
                  <Input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    h="50px"
                    bg="white"
                    border="2px solid"
                    borderColor="gray.200"
                    _hover={{ borderColor: "pink.300" }}
                    _focus={{
                      borderColor: "pink.500",
                      boxShadow: "0 0 0 3px rgba(240, 147, 251, 0.1)",
                      outline: "none",
                    }}
                    fontSize="md"
                    fontWeight="medium"
                    color="gray.800"
                    rounded="xl"
                  />
                </Box>

                <Box>
                  <Text
                    as="label"
                    display="block"
                    fontWeight="bold"
                    mb={2}
                    color="gray.700"
                    fontSize="sm"
                    letterSpacing="wide"
                  >
                    📧 Email Address
                  </Text>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    h="50px"
                    bg="white"
                    border="2px solid"
                    borderColor="gray.200"
                    _hover={{ borderColor: "pink.300" }}
                    _focus={{
                      borderColor: "pink.500",
                      boxShadow: "0 0 0 3px rgba(240, 147, 251, 0.1)",
                      outline: "none",
                    }}
                    fontSize="md"
                    fontWeight="medium"
                    color="gray.800"
                    rounded="xl"
                  />
                </Box>

                <Box>
                  <Text
                    as="label"
                    display="block"
                    fontWeight="bold"
                    mb={2}
                    color="gray.700"
                    fontSize="sm"
                    letterSpacing="wide"
                  >
                    🔒 Password
                  </Text>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a strong password"
                    h="50px"
                    bg="white"
                    border="2px solid"
                    borderColor="gray.200"
                    _hover={{ borderColor: "pink.300" }}
                    _focus={{
                      borderColor: "pink.500",
                      boxShadow: "0 0 0 3px rgba(240, 147, 251, 0.1)",
                      outline: "none",
                    }}
                    fontSize="md"
                    fontWeight="medium"
                    color="gray.800"
                    rounded="xl"
                  />
                </Box>

                <Box>
                  <Text
                    as="label"
                    display="block"
                    fontWeight="bold"
                    mb={2}
                    color="gray.700"
                    fontSize="sm"
                    letterSpacing="wide"
                  >
                    🛡️ Role
                  </Text>
                  <chakra.select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    h="50px"
                    bg="white"
                    border="2px solid"
                    borderColor="gray.200"
                    _hover={{ borderColor: "pink.300" }}
                    _focus={{
                      borderColor: "pink.500",
                      boxShadow: "0 0 0 3px rgba(240, 147, 251, 0.1)",
                      outline: "none",
                    }}
                    fontSize="md"
                    fontWeight="medium"
                    color="gray.800"
                    rounded="xl"
                    cursor="pointer"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </chakra.select>
                </Box>

                <MotionButton
                  type="submit"
                  w="full"
                  h="55px"
                  bgGradient="linear(to-r, #f093fb, #f5576c)"
                  color="white"
                  rounded="xl"
                  fontWeight="bold"
                  fontSize="md"
                  letterSpacing="wide"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loading}
                  boxShadow="0 10px 30px rgba(245, 87, 108, 0.3)"
                  _hover={{
                    bgGradient: "linear(to-r, #f5576c, #f093fb)",
                  }}
                  mt={2}
                >
                  {loading ? "Creating Account..." : "✨ Register"}
                </MotionButton>

                <Flex
                  justify="center"
                  align="center"
                  gap={2}
                  fontSize="sm"
                  color="gray.600"
                  fontWeight="medium"
                >
                  <Text>Already have an account?</Text>
                  <Text
                    color="pink.600"
                    fontWeight="bold"
                    _hover={{ color: "pink.700", textDecoration: "underline" }}
                    cursor="pointer"
                    onClick={() => navigate("/login")}
                  >
                    Login here
                  </Text>
                </Flex>
              </Stack>
            </form>
          </Box>
        </MotionBox>
      </Flex>
    </Box>
  );
}