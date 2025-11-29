import { useState } from "react";
import { Box, Heading, Input, Text, chakra, Image } from "@chakra-ui/react";
import api from "../utils/api";
import { useNavigate, Link as RouterLink } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // default role
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
        role, // kirim role ke backend
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
            <Heading size="md" color="gray.800">
              Register - Hotel Zuri Express
            </Heading>
          </Box>

          <form onSubmit={handleSubmit}>
            <Box>
              <Box mb={4}>
                <Text
                  as="label"
                  display="block"
                  fontWeight="semibold"
                  mb={2}
                  color="gray.800"
                >
                  Username
                </Text>
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  borderColor="gray.300"
                  _placeholder={{ color: "gray.400" }}
                  color="gray.800"
                />
              </Box>

              <Box mb={4}>
                <Text
                  as="label"
                  display="block"
                  fontWeight="semibold"
                  mb={2}
                  color="gray.800"
                >
                  Full Name
                </Text>
                <Input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  borderColor="gray.300"
                  _placeholder={{ color: "gray.400" }}
                  color="gray.800"
                />
              </Box>

              <Box mb={4}>
                <Text
                  as="label"
                  display="block"
                  fontWeight="semibold"
                  mb={2}
                  color="gray.800"
                >
                  Email
                </Text>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  borderColor="gray.300"
                  _placeholder={{ color: "gray.400" }}
                  color="gray.800"
                />
              </Box>

              <Box mb={4}>
                <Text
                  as="label"
                  display="block"
                  fontWeight="semibold"
                  mb={2}
                  color="gray.800"
                >
                  Password
                </Text>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  borderColor="gray.300"
                  _placeholder={{ color: "gray.400" }}
                  color="gray.800"
                />
              </Box>

              <Box mb={4}>
                <Text
                  as="label"
                  display="block"
                  fontWeight="semibold"
                  mb={2}
                  color="gray.800"
                >
                  Role
                </Text>
                <select
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #E2E8F0",
                    background: "rgba(243, 244, 246, 0.9)",
                  }}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </Box>

              <chakra.button
                type="submit"
                width="100%"
                bg="blue.500"
                color="white"
                p={3}
                borderRadius="md"
                disabled={loading}
                _hover={{ bg: "blue.600" }}
              >
                {loading ? "Loading..." : "Register"}
              </chakra.button>

              <Text fontSize="sm" color="gray.600" mt={2}>
                Sudah punya akun? <RouterLink to="/login">Login</RouterLink>
              </Text>
            </Box>
          </form>
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
    </Box>
  );
}
