// src/pages/receiving/CreateReceivingItem.tsx
import { useState } from "react";
import {
  Box,
  Button,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { createReceivingItem, } from "../../utils/receivingItems";
import { getReceivingById } from "../../utils/receivings";
 // pastikan utils ada function getReceivingById
import { useNavigate } from "react-router-dom";

const CreateReceivingItem = () => {
  const [form, setForm] = useState({
    receiving_id: "",
    item_name: "",
    part_no: "",
    qty: "",
    unit_type: "",
    receive_status: "received",
    source_type: "manual",
    notes: "",
  });

  const navigate = useNavigate();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Jika user mengisi receiving_id, ambil data dari receivings
    if (name === "receiving_id" && value) {
      try {
        const data = await getReceivingById(Number(value));
        setForm(prev => ({
          ...prev,
          item_name: data.item_name || "",
          qty: data.qty ? String(data.qty) : "",
          unit_type: data.unit_type || "",
          receive_status: "supplier",
          source_type: "supplier",
        }));
      } catch (err) {
        console.error(err);
        // reset jika tidak ditemukan
        setForm(prev => ({
          ...prev,
          item_name: "",
          qty: "",
          unit_type: "",
          receive_status: "received",
          source_type: "manual",
        }));
      }
    }
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        receiving_id: form.receiving_id ? Number(form.receiving_id) : null,
        item_name: form.item_name,
        part_no: form.part_no || null,
        qty: form.qty ? Number(form.qty) : 1,
        unit_type: form.unit_type || null,
        receive_status: form.receive_status || "received",
        source_type: form.source_type || "manual",
        notes: form.notes || null,
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
      <Box mb={8} textAlign="left">
        <Heading size="xl" color="gray.700" fontWeight="extrabold">
          Tambah Receiving Item
        </Heading>
      </Box>

      <Box
        maxW="lg"
        mx="auto"
        p={6}
        rounded="lg"
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
            placeholder="Receiving ID (kosongkan jika manual)"
            name="receiving_id"
            value={form.receiving_id}
            onChange={handleChange}
            bg="gray.100"
          />

          <Input
            placeholder="Item Name"
            name="item_name"
            value={form.item_name}
            onChange={handleChange}
            bg="gray.100"
          />

          <Input
            placeholder="Part No (opsional)"
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
            onClick={() => navigate("/receiving-items")}
          >
            Kembali
          </Button>
        </VStack>
      </Box>

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
