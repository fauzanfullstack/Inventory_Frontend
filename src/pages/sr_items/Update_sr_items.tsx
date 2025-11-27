// src/pages/sr/UpdateSRItem.tsx
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
import { getSRItemById, updateSRItem } from "../../utils/srItems"; // sesuaikan utils
import { useNavigate, useParams } from "react-router-dom";

const UpdateSRItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    s_request_id: "",
    item_id: "",
    part_no: "",
    qty: "",
    unit_type: "",
    notes: "",
  });

  const [placeholders, setPlaceholders] = useState({ ...form });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const fetchData = async () => {
    try {
      if (!id) return;
      const srItem = await getSRItemById(Number(id));

      setForm({
        s_request_id: srItem.s_request_id || "",
        item_id: srItem.item_id || "",
        part_no: srItem.part_no || "",
        qty: srItem.qty?.toString() || "",
        unit_type: srItem.unit_type || "",
        notes: srItem.notes || "",
      });

      setPlaceholders({
        s_request_id: srItem.s_request_id || "",
        item_id: srItem.item_id || "",
        part_no: srItem.part_no || "",
        qty: srItem.qty?.toString() || "",
        unit_type: srItem.unit_type || "",
        notes: srItem.notes || "",
      });
    } catch (err) {
      console.error(err);
      alert("Gagal mengambil data SR Item!");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...form,
        qty: form.qty ? parseFloat(form.qty) : 0,
        item_id: form.item_id || null,
      };

      await updateSRItem(Number(id!), payload);
      alert("SR Item berhasil diupdate!");
      navigate("/sr-items");
    } catch (err) {
      console.error(err);
      alert("Gagal mengupdate SR Item!");
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <Box textAlign="center" py={20}>
        <Spinner size="xl" />
        <Text mt={4}>Sedang memuat data SR Item...</Text>
      </Box>
    );
  }

  return (
    <Box flex="1" bg="gray.50" p={8} minH="100vh">
      <Box mb={8} textAlign="left">
        <Heading size="xl" color="gray.700" fontWeight="extrabold">
          Update SR Item
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
          Form Update SR Item
        </Heading>

        <VStack gap={4}>
          <Input
            placeholder={placeholders.s_request_id || "S Request ID"}
            _placeholder={{ color: "gray.500" }}
            name="s_request_id"
            value={form.s_request_id}
            onChange={handleChange}
            bg="gray.100"
            color="gray.700"
          />
          <Input
            placeholder={placeholders.item_id || "Item ID (opsional)"}
            _placeholder={{ color: "gray.500" }}
            name="item_id"
            value={form.item_id}
            onChange={handleChange}
            bg="gray.100"
            color="gray.700"
          />
          <Input
            placeholder={placeholders.part_no || "Part No"}
            _placeholder={{ color: "gray.500" }}
            name="part_no"
            value={form.part_no}
            onChange={handleChange}
            bg="gray.100"
            color="gray.700"
          />
          <Input
            placeholder={placeholders.qty || "Qty"}
            _placeholder={{ color: "gray.500" }}
            type="number"
            name="qty"
            value={form.qty}
            onChange={handleChange}
            bg="gray.100"
            color="gray.700"
          />
          <Input
            placeholder={placeholders.unit_type || "Unit Type"}
            _placeholder={{ color: "gray.500" }}
            name="unit_type"
            value={form.unit_type}
            onChange={handleChange}
            bg="gray.100"
            color="gray.700"
          />
          <Textarea
            placeholder={placeholders.notes || "Notes (opsional)"}
            _placeholder={{ color: "gray.500" }}
            name="notes"
            value={form.notes}
            onChange={handleChange}
            bg="gray.100"
            color="gray.700"
          />

          <Button colorScheme="blue" width="full" onClick={handleSubmit}>
            Update
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

export default UpdateSRItem;
