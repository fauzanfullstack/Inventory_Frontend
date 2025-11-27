// src/pages/Login.tsx
import { useState } from "react";
import {
  Box,
  Heading,
  Input,
  Stack,
  Flex,
  Spinner,
  chakra,
  Text,
  Image,
} from "@chakra-ui/react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import api from "../utils/api";
import { motion } from "framer-motion";

const MotionButton = motion(chakra.button);

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

      // FIX di sini ⬇⬇⬇
      const resp = await api.post("/auth/login", { email, password });

      const { token, user } = resp.data;

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        alert(`Login berhasil. Selamat datang, ${user.full_name}`);
        navigate("/dashboard");
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
      flex="1"
      bg="gray.50"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
    >
      <Box maxW="md" w="full" position="relative" className="rgb-card">
        <Box p={8} bg="white" rounded="lg" boxShadow="lg">
          <Box textAlign="center" mb={4}>
            <Image
              src="/zuri.jpg"
              alt="Hotel Zuri Express"
              mx="auto"
              maxW={{ base: "72px", md: "96px" }}
              maxH={{ base: "72px", md: "96px" }}
              objectFit="contain"
              mb={3}
            />
            <Heading size="md" color="gray.800" fontWeight="extrabold">
              Hotel Zuri Express
            </Heading>
          </Box>

          {errorMsg && (
            <Box
              mb={4}
              p={2}
              bg="red.100"
              color="red.700"
              rounded="md"
              textAlign="center"
            >
              {errorMsg}
            </Box>
          )}

          <form onSubmit={handleSubmit}>
            <Stack direction="column" gap={4}>
              <Box>
                <Text as="label" display="block" fontWeight="semibold" mb={2}>
                  Email
                </Text>
                <Input
                  placeholder="Masukkan email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  mb={3}
                />
              </Box>

              <Box>
                <Text as="label" display="block" fontWeight="semibold" mb={2}>
                  Password
                </Text>
                <Input
                  type="password"
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Box>

              <MotionButton
                type="submit"
                bg="blue.500"
                color="white"
                w="full"
                p={3}
                rounded="md"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                disabled={submitting}
              >
                {submitting ? "Loading..." : "Login"}
              </MotionButton>

              <Text fontSize="sm" color="gray.600">
                Belum punya akun?{" "}
                <RouterLink to="/register" style={{ color: "#3182CE" }}>
                  Register
                </RouterLink>
              </Text>
            </Stack>
          </form>

          {loading && (
            <Flex
              position="absolute"
              inset={0}
              bg="whiteAlpha.800"
              justify="center"
              align="center"
              rounded="lg"
            >
              <Spinner size="xl" />
            </Flex>
          )}
        </Box>
      </Box>
      <style>{`
        @keyframes rgbBorder {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .rgb-card {
          background: transparent;
          z-index: 0;
          border-radius: 12px;
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
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
                  mask-composite: exclude;
          z-index: -1;
        }
      `}</style>
    </Box>
  );
};

export default Login;
