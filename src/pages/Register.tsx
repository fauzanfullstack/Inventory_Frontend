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
      <Flex maxW="450px" w="full" align="center" justify="center">
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          w="full"
        >
          <Box
            bg="white"
            rounded="2xl"
            boxShadow="0 20px 60px rgba(0,0,0,0.15)"
            p={8}
            border="1px solid"
            borderColor="gray.200"
          >
            {/* Logo */}
            <Box textAlign="center" mb={6}>
              <MotionBox
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.15 }}
              >
                <Image
                  src="/zuri.jpg"
                  alt="Hotel Zuri Express"
                  w="110px"
                  h="110px"
                  objectFit="contain"
                  mx="auto"
                  mb={4}
                />
              </MotionBox>

              <Heading
                size="lg"
                bgGradient="linear(to-r, #667eea, #764ba2)"
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
              <Stack gap={5}>
                {/* Username */}
                <Box>
                  <Text
                    as="label"
                    fontWeight="bold"
                    mb={2}
                    color="gray.700"
                    fontSize="sm"
                    display="block"
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
                    _hover={{ borderColor: "purple.300" }}
                    _focus={{
                      borderColor: "purple.500",
                      boxShadow: "0 0 0 3px rgba(102, 126, 234, 0.15)",
                    }}
                    rounded="xl"
                    fontWeight="medium"
                    color="gray.800"
                  />
                </Box>

                {/* Full Name */}
                <Box>
                  <Text
                    as="label"
                    fontWeight="bold"
                    mb={2}
                    color="gray.700"
                    fontSize="sm"
                    display="block"
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
                    _hover={{ borderColor: "purple.300" }}
                    _focus={{
                      borderColor: "purple.500",
                      boxShadow: "0 0 0 3px rgba(102, 126, 234, 0.15)",
                    }}
                    rounded="xl"
                    fontWeight="medium"
                    color="gray.800"
                  />
                </Box>

                {/* Email */}
                <Box>
                  <Text
                    as="label"
                    fontWeight="bold"
                    mb={2}
                    color="gray.700"
                    fontSize="sm"
                    display="block"
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
                    _hover={{ borderColor: "purple.300" }}
                    _focus={{
                      borderColor: "purple.500",
                      boxShadow: "0 0 0 3px rgba(102, 126, 234, 0.15)",
                    }}
                    rounded="xl"
                    fontWeight="medium"
                    color="gray.800"
                  />
                </Box>

                {/* Password */}
                <Box>
                  <Text
                    as="label"
                    fontWeight="bold"
                    mb={2}
                    color="gray.700"
                    fontSize="sm"
                    display="block"
                  >
                    🔒 Password
                  </Text>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                    h="50px"
                    bg="white"
                    border="2px solid"
                    borderColor="gray.200"
                    _hover={{ borderColor: "purple.300" }}
                    _focus={{
                      borderColor: "purple.500",
                      boxShadow: "0 0 0 3px rgba(102, 126, 234, 0.15)",
                    }}
                    rounded="xl"
                    fontWeight="medium"
                    color="gray.800"
                  />
                </Box>

                {/* Role */}
                <Box>
                  <Text
                    as="label"
                    fontWeight="bold"
                    mb={2}
                    color="gray.700"
                    fontSize="sm"
                    display="block"
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
                    _hover={{ borderColor: "purple.300" }}
                    _focus={{
                      borderColor: "purple.500",
                      boxShadow: "0 0 0 3px rgba(102, 126, 234, 0.15)",
                    }}
                    rounded="xl"
                    fontWeight="medium"
                    color="gray.800"
                    cursor="pointer"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </chakra.select>
                </Box>

                {/* Submit */}
                <MotionButton
                  type="submit"
                  w="full"
                  h="55px"
                  bgGradient="linear(to-r, #667eea, #764ba2)"
                  color="white"
                  rounded="xl"
                  fontWeight="bold"
                  fontSize="md"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  disabled={loading}
                  boxShadow="0 10px 30px rgba(102, 126, 234, 0.3)"
                >
                  {loading ? "Creating Account..." : "✨ Register"}
                </MotionButton>

                {/* Link to Login */}
                <Flex justify="center" align="center" gap={2} fontSize="sm">
                  <Text color="gray.600">Already have an account?</Text>
                  <Text
                    color="purple.600"
                    fontWeight="bold"
                    cursor="pointer"
                    _hover={{ textDecoration: "underline" }}
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
