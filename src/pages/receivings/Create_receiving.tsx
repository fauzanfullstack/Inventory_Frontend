// src/pages/receiving/CreateReceiving.tsx
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
import { createReceiving } from "../../utils/receivings";
import { useNavigate } from "react-router-dom";

const CreateReceiving = () => {
  const [form, setForm] = useState({
    number: "",
    document: "",
    item_name: "",
    unit_type: "",
    qty: "",
    status: "accepted",
    location: "",
    cost_center: "",
    supplier: "",
    idr: "",
    total: "",
    notes: "",
    created_by: "",
    condition_status: "", // tambahkan field baru ini
  });

  const [documentation, setDocumentation] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      if (documentation) {
        formData.append("documentation", documentation);
      }

      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });

      await createReceiving(formData);

      alert("Receiving berhasil dibuat!");
      navigate("/receiving");
    } catch (error) {
      console.error("Create receiving error:", error);
      alert("Gagal membuat receiving!");
    }
  };

  return (
    <Box flex="1" bg="gray.50" p={8} minH="100vh">
      <Box mb={8} textAlign="left">
        <Heading size="xl" color="gray.700" fontWeight="extrabold">
          Tambah Receiving
        </Heading>
      </Box>

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
          Form Input Receiving
        </Heading>

        <VStack gap={4}>
          <Input
            placeholder="Number"
            name="number"
            value={form.number}
            onChange={handleChange}
            bg="gray.100"
            color="black"
          />

          <Input
            placeholder="Document"
            name="document"
            value={form.document}
            onChange={handleChange}
            bg="gray.100"
            color="black"
          />

          <Input
            placeholder="Item Name"
            name="item_name"
            value={form.item_name}
            onChange={handleChange}
            bg="gray.100"
            color="black"
          />

          <Input
            placeholder="Unit Type (ex: pcs, box)"
            name="unit_type"
            value={form.unit_type}
            onChange={handleChange}
            bg="gray.100"
            color="black"
          />

          <Input
            placeholder="Qty"
            type="number"
            name="qty"
            value={form.qty}
            onChange={handleChange}
            bg="gray.100"
            color="black"
          />

          <Input
            type="file"
            accept="image/*"
            onChange={(e: any) => {
              if (e.target.files && e.target.files[0]) {
                setDocumentation(e.target.files[0]);
              }
            }}
            bg="gray.100"
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #E2E8F0",
              background: "rgba(243, 244, 246, 0.9)",
              color: "black",
            }}
          >
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>

          {/* Tambahkan condition_status */}
          <select
            name="condition_status"
            value={form.condition_status}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #E2E8F0",
              background: "rgba(243, 244, 246, 0.9)",
              color: "black",
            }}
          >
            <option value="">Pilih Kondisi Barang</option>
            <option value="good">Good</option>
            <option value="damaged">Damaged</option>
            <option value="expired">Expired</option>
          </select>

          <Input
            placeholder="Location"
            name="location"
            value={form.location}
            onChange={handleChange}
            bg="gray.100"
            color="black"
          />

          <Input
            placeholder="Cost Center"
            name="cost_center"
            value={form.cost_center}
            onChange={handleChange}
            bg="gray.100"
            color="black"
          />

          <Input
            placeholder="Supplier"
            name="supplier"
            value={form.supplier}
            onChange={handleChange}
            bg="gray.100"
            color="black"
          />

          <Input
            placeholder="IDR"
            type="number"
            name="idr"
            value={form.idr}
            onChange={handleChange}
            bg="gray.100"
            color="black"
          />

          <Input
            placeholder="Total"
            type="number"
            name="total"
            value={form.total}
            onChange={handleChange}
            bg="gray.100"
            color="black"
          />

          <Textarea
            placeholder="Notes"
            name="notes"
            value={form.notes}
            onChange={handleChange}
            bg="gray.100"
            color="black"
          />

          <Input
            placeholder="Created By"
            name="created_by"
            value={form.created_by}
            onChange={handleChange}
            bg="gray.100"
            color="black"
          />

          <Button colorScheme="green" width="full" onClick={handleSubmit}>
            Simpan
          </Button>

          <Button
            width="full"
            variant="outline"
            onClick={() => navigate("/receiving")}
          >
            Kembali
          </Button>
        </VStack>
      </Flex>

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

export default CreateReceiving;
