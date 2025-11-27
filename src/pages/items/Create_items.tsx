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
import { createItem } from "../../utils/items"; // pastikan endpoint utils items
import { useNavigate } from "react-router-dom";

const CreateItems = () => {
  const [form, setForm] = useState({
    part_no: "",
    name: "",
    supplier: "",
    unit_type: "",
    conversion: "",
    unit: "",
    qty: "",
    aksi_centang: "false", // pakai string supaya dropdown mudah
    notes: "",
    created_by: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        part_no: form.part_no,
        name: form.name,
        supplier: form.supplier || null,
        unit_type: form.unit_type,
        conversion: form.conversion || null,
        unit: form.unit || null,
        qty: Number(form.qty),
        aksi_centang: form.aksi_centang === "true", // konversi ke boolean
        notes: form.notes,
        created_by: form.created_by || null,
      };

      await createItem(payload);

      alert("Item berhasil dibuat!");
      navigate("/items");
    } catch (err) {
      console.error(err);
      alert("Gagal membuat item!");
    }
  };

  return (
    <Box flex="1" bg="gray.50" p={[4, 8]} minH="100vh">
      {/* Title */}
      <Box mb={8} textAlign="left">
        <Heading size={["lg", "xl"]} color="gray.700" fontWeight="extrabold">
          Tambah Item
        </Heading>
      </Box>

      {/* Card */}
      <Flex
        maxW={["100%", "lg"]}
        mx="auto"
        p={[4, 6]}
        rounded="lg"
        direction="column"
        position="relative"
        className="rgb-card"
        bg="white"
      >
        <Heading
          size={["md", "lg"]}
          color="gray.700"
          fontWeight="bold"
          textAlign="center"
          mb={4}
        >
          Form Input Item
        </Heading>

        <VStack gap={4}>
          <Input
            placeholder="Part No (contoh: FLT-098)"
            name="part_no"
            value={form.part_no}
            onChange={handleChange}
            bg="gray.100"
            color="black"
            fontSize={["sm", "md"]}
          />

          <Input
            placeholder="Nama Item (contoh: Filter AC)"
            name="name"
            value={form.name}
            onChange={handleChange}
            bg="gray.100"
            color="black"
            fontSize={["sm", "md"]}
          />

          <Input
            placeholder="Supplier (contoh: Supplier A)"
            name="supplier"
            value={form.supplier}
            onChange={handleChange}
            bg="gray.100"
            color="black"
            fontSize={["sm", "md"]}
          />

          <Input
            placeholder="Unit Type (contoh: pcs)"
            name="unit_type"
            value={form.unit_type}
            onChange={handleChange}
            bg="gray.100"
            color="black"
            fontSize={["sm", "md"]}
          />

          <Input
            placeholder="Conversion (opsional)"
            name="conversion"
            value={form.conversion}
            onChange={handleChange}
            bg="gray.100"
            color="black"
            fontSize={["sm", "md"]}
          />

          <Input
            placeholder="Unit (opsional)"
            name="unit"
            value={form.unit}
            onChange={handleChange}
            bg="gray.100"
            color="black"
            fontSize={["sm", "md"]}
          />

          <Input
            placeholder="Quantity"
            type="number"
            name="qty"
            value={form.qty}
            onChange={handleChange}
            bg="gray.100"
            color="black"
            fontSize={["sm", "md"]}
          />

          {/* Dropdown Aksi Centang */}
          <select
            name="aksi_centang"
            value={form.aksi_centang}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "8px",
              border: "1px solid #CBD5E0",
              backgroundColor: "#F7FAFC",
              color: "black",
              fontSize: "1rem",
            }}
          >
            <option value="true">TRUE</option>
            <option value="false">FALSE</option>
          </select>

          {/* Input Created By */}
          <Input
            placeholder="Created By"
            name="created_by"
            value={form.created_by}
            onChange={handleChange}
            bg="gray.100"
            color="black"
            fontSize={["sm", "md"]}
          />

          <Textarea
            placeholder="Notes (opsional)"
            name="notes"
            value={form.notes}
            onChange={handleChange}
            bg="gray.100"
            color="black"
            fontSize={["sm", "md"]}
          />

          <Button colorScheme="green" width="full" onClick={handleSubmit}>
            Simpan
          </Button>

          <Button
            width="full"
            variant="outline"
            onClick={() => navigate("/items")}
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

export default CreateItems;
