import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Heading,
  Input,
  VStack,
  Textarea,
  Flex,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { getItemById, updateItem } from "../../utils/items";
import { useNavigate, useParams } from "react-router-dom";

const UpdateItems = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    part_no: "",
    name: "",
    supplier: "",
    unit_type: "",
    unit: "",
    qty: "",
    aksi_centang: "false", // string supaya dropdown bisa
    notes: "",
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const fetchData = async () => {
    try {
      const item = await getItemById(id!);

      setForm({
        part_no: item.part_no || "",
        name: item.name || "",
        supplier: item.supplier || "",
        unit_type: item.unit_type || "",
        unit: item.unit || "",
        qty: item.qty?.toString() || "",
        aksi_centang: item.aksi_centang ? "true" : "false",
        notes: item.notes || "",
      });
    } catch (err) {
      console.error(err);
      alert("Gagal mengambil data item!");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        part_no: form.part_no,
        name: form.name,
        supplier: form.supplier || null,
        unit_type: form.unit_type,
        unit: form.unit || null,
        qty: form.qty ? Number(form.qty) : 0,
        aksi_centang: form.aksi_centang === "true",
        notes: form.notes,
      };

      await updateItem(Number(id), payload);

      alert("Item berhasil diupdate!");
      navigate("/items");
    } catch (err) {
      console.error(err);
      alert("Gagal mengupdate item!");
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <Box textAlign="center" py={20}>
        <Spinner size="xl" />
        <Text mt={4}>Sedang memuat data item...</Text>
      </Box>
    );
  }

  return (
    <Box flex="1" bg="gray.50" p={[4, 8]} minH="100vh">
      <Box mb={8} textAlign="left">
        <Heading size={["lg", "xl"]} color="gray.700" fontWeight="extrabold">
          Update Item
        </Heading>
      </Box>

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
          Form Update Item
        </Heading>

        <VStack gap={4}>
          <Input
            placeholder="Part No"
            name="part_no"
            value={form.part_no}
            onChange={handleChange}
            bg="gray.100"
            color="black"
            fontSize={["sm", "md"]}
          />

          <Input
            placeholder="Nama Item"
            name="name"
            value={form.name}
            onChange={handleChange}
            bg="gray.100"
            color="black"
            fontSize={["sm", "md"]}
          />

          <Input
            placeholder="Supplier"
            name="supplier"
            value={form.supplier}
            onChange={handleChange}
            bg="gray.100"
            color="black"
            fontSize={["sm", "md"]}
          />

          <Input
            placeholder="Unit Type"
            name="unit_type"
            value={form.unit_type}
            onChange={handleChange}
            bg="gray.100"
            color="black"
            fontSize={["sm", "md"]}
          />

          <Input
            placeholder="Unit"
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

          <Textarea
            placeholder="Notes"
            name="notes"
            value={form.notes}
            onChange={handleChange}
            bg="gray.100"
            color="black"
            fontSize={["sm", "md"]}
          />

          <Button colorScheme="blue" width="full" onClick={handleSubmit}>
            Update
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

export default UpdateItems;
