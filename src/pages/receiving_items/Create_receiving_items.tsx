// src/pages/receiving/CreateReceivingItem.tsx
import { useState } from "react";
import {
  Box,
  Button,
  Heading,
  Input,
  VStack,
  Flex,
} from "@chakra-ui/react";
import { createReceivingItem } from "../../utils/receivingItems"; // sesuaikan utils
import { useNavigate } from "react-router-dom";

const CreateReceivingItem = () => {
  const [form, setForm] = useState({
    receiving_id: "",
    item_id: "",
    part_no: "",
    qty: "",
    unit_type: "",
    price: "",
    subtotal: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...form,
        qty: form.qty ? Number(form.qty) : null,
        price: form.price ? Number(form.price) : null,
        subtotal: form.subtotal ? Number(form.subtotal) : null,
      };

      await createReceivingItem(payload);
      alert("Receiving item berhasil dibuat!");
      navigate("/receiving-items");
    } catch (err) {
      console.error(err);
      alert("Gagal membuat receiving item!");
    }
  };

  return (
    <Box flex="1" bg="gray.50" p={8} minH="100vh">
      {/* Title */}
      <Box mb={8} textAlign="left">
        <Heading size="xl" color="gray.700" fontWeight="extrabold">
          Tambah Receiving Item
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
          Form Input Receiving Item
        </Heading>

        <VStack gap={4}>
          <Input
            placeholder="Receiving ID"
            name="receiving_id"
            value={form.receiving_id}
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
            name="qty"
            type="number"
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

          <Input
            placeholder="Price"
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            bg="gray.100"
          />

          <Input
            placeholder="Subtotal"
            name="subtotal"
            type="number"
            value={form.subtotal}
            onChange={handleChange}
            bg="gray.100"
          />

          <Button colorScheme="green" width="full" onClick={handleSubmit}>
            Simpan
          </Button>

          <Button
            width="full"
            variant="outline"
            onClick={() => navigate("/receiving-items")}
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

export default CreateReceivingItem;
