import { useState } from "react";
import {
  Box,
  Heading,
  Input,
  Stack,
  Flex,
  Spinner,
  Text,
  Image,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionButton = motion(Button);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg(null);

    try {
      setLoading(true);

      const resp = await api.post("/auth/login", { email, password });
      const { token, user } = resp.data;

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        alert(`Login berhasil. Selamat datang, ${user.full_name}`);

        if (user.role === "user") {
          navigate("/tablepurchaserequests");
        } else if (user.role === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/dashboard");
        }
      } else {
        setErrorMsg("Gagal mendapatkan token");
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err?.response?.data?.message || "Login gagal");
    } finally {
      setSubmitting(false);
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
      <Flex maxW="450px" w="full" align="center" justify="center">
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          maxW="450px"
          w="full"
        >
          <Box
            bg="white"
            rounded="2xl"
            boxShadow="0 20px 60px rgba(0,0,0,0.15)"
            p={8}
            border="1px solid"
            borderColor="gray.200"
            position="relative"
          >
            {/* Logo & Title */}
            <Box textAlign="center" mb={6}>
              <MotionBox
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              >
                {/* ⭐ PERBAIKAN LOGO: Tidak terpotong, tanpa bingkai */}
                <Image
                  src="/zuri.jpg"
                  alt="Hotel Zuri Express"
                  w="120px"
                  h="auto"
                  mx="auto"
                  mb={4}
                  objectFit="contain" // gambar tidak terpotong
                />
              </MotionBox>

              {/* ⭐ PERBAIKAN FONT: lebih kontras, lebih kebaca */}
              <Heading
                size="lg"
                bgGradient="linear(to-r, #5a67d8, #7f5dc9)"
                bgClip="text"
                fontWeight="extrabold"
                mb={2}
                letterSpacing="tight"
                fontSize="2xl"
              >
                Hotel Zuri Express
              </Heading>

              <Text
                color="gray.700"
                fontSize="md"
                fontWeight="semibold"
              >
                Welcome back! Please login to continue
              </Text>
            </Box>

            {/* Error Message */}
            {errorMsg && (
              <MotionBox
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                mb={4}
                p={3}
                bg="red.50"
                border="1px solid"
                borderColor="red.200"
                color="red.700"
                rounded="lg"
                fontSize="sm"
                fontWeight="medium"
              >
                {errorMsg}
              </MotionBox>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <Stack gap={5}>
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
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    h="50px"
                    bg="white"
                    border="2px solid"
                    borderColor="gray.200"
                    _hover={{ borderColor: "purple.300" }}
                    _focus={{
                      borderColor: "purple.500",
                      boxShadow: "0 0 0 3px rgba(102, 126, 234, 0.1)",
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
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    h="50px"
                    bg="white"
                    border="2px solid"
                    borderColor="gray.200"
                    _hover={{ borderColor: "purple.300" }}
                    _focus={{
                      borderColor: "purple.500",
                      boxShadow: "0 0 0 3px rgba(102, 126, 234, 0.1)",
                      outline: "none",
                    }}
                    fontSize="md"
                    fontWeight="medium"
                    color="gray.800"
                    rounded="xl"
                  />
                </Box>

                <MotionButton
                  type="submit"
                  w="full"
                  h="55px"
                  bgGradient="linear(to-r, #667eea, #764ba2)"
                  color="white"
                  rounded="xl"
                  fontWeight="bold"
                  fontSize="md"
                  letterSpacing="wide"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={submitting}
                  boxShadow="0 10px 30px rgba(102, 126, 234, 0.3)"
                  _hover={{
                    bgGradient: "linear(to-r, #764ba2, #667eea)",
                  }}
                >
                  {submitting ? "Logging in..." : "🚀 Login"}
                </MotionButton>

                <Flex
                  justify="center"
                  align="center"
                  gap={2}
                  fontSize="sm"
                  color="gray.600"
                  fontWeight="medium"
                >
                  <Text>Don't have an account?</Text>
                  <Text
                    color="purple.600"
                    fontWeight="bold"
                    _hover={{ color: "purple.700", textDecoration: "underline" }}
                    cursor="pointer"
                    onClick={() => navigate("/register")}
                  >
                    Register now
                  </Text>
                </Flex>
              </Stack>
            </form>

            {/* Loading Overlay */}
            {loading && (
              <Flex
                position="absolute"
                inset={0}
                bg="rgba(255, 255, 255, 0.95)"
                justify="center"
                align="center"
                rounded="2xl"
              >
                <Stack gap={3} align="center">
                  <Spinner size="xl" color="purple.500" />
                  <Text fontWeight="bold" color="gray.700">
                    Please wait...
                  </Text>
                </Stack>
              </Flex>
            )}
          </Box>
        </MotionBox>
      </Flex>
    </Box>
  );
};

export default Login;
