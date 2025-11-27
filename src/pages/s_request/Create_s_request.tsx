// src/pages/sRequest/CreateSRequest.tsx
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
import { createSRequest } from "../../utils/sRequest";
import { useNavigate } from "react-router-dom";

const CreateSRequest = () => {
  const [form, setForm] = useState({
    number: "",
    documents: "",
    status: "open",
    open_date: "",
    expected_date: "",
    cost_center: "",
    location: "",
    request_by: "",
    notes: "",
  });

  const [documentation, setDocumentation] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDocumentation(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([key, val]) => fd.append(key, String(val)));

      if (documentation) {
        fd.append("documentation", documentation); // 👈 sesuai receiving
      }

      await createSRequest(fd);
      alert("Store Request berhasil dibuat!");
      navigate("/srequest");
    } catch (err) {
      console.error(err);
      alert("Gagal membuat StoreRequest!");
    }
  };

  return (
    <Box flex="1" bg="gray.50" p={8} minH="100vh">
      {/* Title */}
      <Box mb={8} textAlign="left">
        <Heading size="xl" color="gray.700" fontWeight="extrabold">
          Tambah Store Request
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
          Form Input Store Request
        </Heading>

        <VStack gap={4}>
          <Input
            placeholder="Number (contoh: SR-001)"
            name="number"
            value={form.number}
            onChange={handleChange}
            bg="gray.100"
          />

          <Input
            placeholder="Documents (opsional)"
            name="documents"
            value={form.documents}
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
            placeholder="Open Date"
            type="date"
            name="open_date"
            value={form.open_date}
            onChange={handleChange}
            bg="gray.100"
          />

          <Input
            placeholder="Expected Date"
            type="date"
            name="expected_date"
            value={form.expected_date}
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
            placeholder="Location"
            name="location"
            value={form.location}
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

          <Textarea
            placeholder="Notes (opsional)"
            name="notes"
            value={form.notes}
            onChange={handleChange}
            bg="gray.100"
          />

          {/* 📸 Upload Documentation */}
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            bg="gray.100"
            p={1}
          />

          <Button colorScheme="green" width="full" onClick={handleSubmit}>
            Simpan
          </Button>

          <Button
            width="full"
            variant="outline"
            onClick={() => navigate("/srequest")}
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

export default CreateSRequest;
