// src/pages/issuing/CreateIssuing.tsx
import { useState } from "react";
import {
  Box,
  Button,
  Heading,
  Input,
  VStack,
  Textarea,
  Flex,
} from "@chakra-ui/react";
import { createIssuing } from "../../utils/issuings";
import { useNavigate } from "react-router-dom";

const CreateIssuing = () => {
  const [form, setForm] = useState({
    number: "",
    document: "",
    date: "",
    status: "",
    location: "",
    cost_center: "",
    request_by: "",
    total: "",
    notes: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...form,
        date: form.date || null,
        total: form.total ? Number(form.total) : null,
      };

      await createIssuing(payload);
      alert("Issuing berhasil dibuat!");
      navigate("/issuings");
    } catch (err) {
      console.error(err);
      alert("Gagal membuat issuing!");
    }
  };

  return (
    <Box flex="1" bg="gray.50" p={8} minH="100vh">
      {/* Title */}
      <Box mb={8} textAlign="left">
        <Heading size="xl" color="gray.700" fontWeight="extrabold">
          Tambah Issuing
        </Heading>
      </Box>

      {/* Card */}
      <Flex
        maxW="lg"
        mx="auto"
        p={6}
        rounded="lg"
        direction="column"
        position="relative"
        className="rgb-card"
        bg="white"
      >
        <Heading
          size="md"
          color="gray.700"
          fontWeight="bold"
          textAlign="center"
          mb={4}
        >
          Form Input Issuing
        </Heading>

        <VStack gap={4}>
          <Input
            placeholder="Number (contoh: IS-001)"
            name="number"
            value={form.number}
            onChange={handleChange}
            bg="gray.100"
          />

          <Input
            placeholder="Document (opsional)"
            name="document"
            value={form.document}
            onChange={handleChange}
            bg="gray.100"
          />

          <Input
            placeholder="Date"
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            bg="gray.100"
          />

          <Input
            placeholder="Status"
            name="status"
            value={form.status}
            onChange={handleChange}
            bg="gray.100"
          />

          <Input
            placeholder="Location"
            name="location"
            value={form.location}
            onChange={handleChange}
            bg="gray.100"
          />

          <Input
            placeholder="Cost Center"
            name="cost_center"
            value={form.cost_center}
            onChange={handleChange}
            bg="gray.100"
          />

          <Input
            placeholder="Request By"
            name="request_by"
            value={form.request_by}
            onChange={handleChange}
            bg="gray.100"
          />

          <Input
            placeholder="Total (opsional)"
            name="total"
            type="number"
            value={form.total}
            onChange={handleChange}
            bg="gray.100"
          />

          <Textarea
            placeholder="Notes (opsional)"
            name="notes"
            value={form.notes}
            onChange={handleChange}
            bg="gray.100"
          />

          <Button colorScheme="green" width="full" onClick={handleSubmit}>
            Simpan
          </Button>

          <Button
            width="full"
            variant="outline"
            onClick={() => navigate("/issuings")}
          >
            Kembali
          </Button>
        </VStack>
      </Flex>

      {/* RGB Border Style */}
      <style>
        {`
          @keyframes rgbBorder {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .rgb-card {
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
};

export default CreateIssuing;
