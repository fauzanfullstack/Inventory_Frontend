// src/pages/sr/CreateSRItem.tsx
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
import { createSRItem } from "../../utils/srItems"; // sesuaikan utils
import { useNavigate } from "react-router-dom";

const CreateSRItem = () => {
  const [form, setForm] = useState({
    s_request_id: "",
    item_id: "",
    part_no: "",
    qty: "",
    unit_type: "",
    notes: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...form,
        qty: form.qty ? parseFloat(form.qty) : 0,
        item_id: form.item_id || null,
      };

      await createSRItem(payload);
      alert("SR Item berhasil dibuat!");
      navigate("/sr-items");
    } catch (err) {
      console.error(err);
      alert("Gagal membuat SR Item!");
    }
  };

  return (
    <Box flex="1" bg="gray.50" p={8} minH="100vh">
      {/* Title */}
      <Box mb={8} textAlign="left">
        <Heading size="xl" color="gray.700" fontWeight="extrabold">
          Tambah SR Item
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
          Form Input SR Item
        </Heading>

        <VStack gap={4}>
          <Input
            placeholder="S Request ID"
            name="s_request_id"
            value={form.s_request_id}
            onChange={handleChange}
            bg="gray.100"
          />

          <Input
            placeholder="Item ID (opsional)"
            name="item_id"
            value={form.item_id}
            onChange={handleChange}
            bg="gray.100"
          />

          <Input
            placeholder="Part No"
            name="part_no"
            value={form.part_no}
            onChange={handleChange}
            bg="gray.100"
          />

          <Input
            placeholder="Qty"
            type="number"
            name="qty"
            value={form.qty}
            onChange={handleChange}
            bg="gray.100"
          />

          <Input
            placeholder="Unit Type"
            name="unit_type"
            value={form.unit_type}
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
            onClick={() => navigate("/sr-items")}
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

export default CreateSRItem;
