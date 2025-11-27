import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Heading,
  Input,
  VStack,
  Flex,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { getIssuingItemById, updateIssuingItem } from "../../utils/issuingsItem";
import { useNavigate, useParams } from "react-router-dom";

const UpdateIssuingItems = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    issuing_id: "",
    item_id: "",
    part_no: "",
    qty: "",
    unit_type: "",
    notes: "",
  });

  const [placeholders, setPlaceholders] = useState({
    issuing_id: "",
    item_id: "",
    part_no: "",
    qty: "",
    unit_type: "",
    notes: "",
  });

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const data = await getIssuingItemById(Number(id));

        setForm({
          issuing_id: String(data.issuing_id ?? ""),
          item_id: String(data.item_id ?? ""),
          part_no: data.part_no ?? "",
          qty: String(data.qty ?? ""),
          unit_type: data.unit_type ?? "",
          notes: data.notes ?? "",
        });

        setPlaceholders({
          issuing_id: String(data.issuing_id ?? ""),
          item_id: String(data.item_id ?? ""),
          part_no: data.part_no ?? "",
          qty: String(data.qty ?? ""),
          unit_type: data.unit_type ?? "",
          notes: data.notes ?? "",
        });
      } catch (err) {
        console.error(err);
        alert("Gagal mengambil data issuing item!");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        issuing_id: Number(form.issuing_id),
        item_id: Number(form.item_id),
        part_no: form.part_no,
        qty: Number(form.qty),
        unit_type: form.unit_type,
        notes: form.notes,
      };

      await updateIssuingItem(Number(id), payload);

      alert("Data berhasil diupdate!");
      navigate("/issuingitems");
    } catch (err) {
      console.error(err);
      alert("Gagal update data issuing item!");
    }
  };

  if (loading) {
    return (
      <Box textAlign="center" py={20}>
        <Spinner size="xl" />
        <Text mt={3} color="gray.600">
          Mengambil data...
        </Text>
      </Box>
    );
  }

  return (
    <Box flex="1" bg="gray.50" p={8} minH="100vh">
      <Box mb={8} textAlign="left">
        <Heading size="xl" color="gray.700" fontWeight="extrabold">
          Edit Issuing Item
        </Heading>
      </Box>

      <Flex
        maxW="md"
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
          Form Update Issuing Item
        </Heading>

        <VStack gap={4}>
          <Input
            placeholder={placeholders.issuing_id || "Issuing ID"}
            _placeholder={{ color: "gray.500" }}
            bg="gray.100"
            color="gray.700"
            name="issuing_id"
            value={form.issuing_id}
            onChange={handleChange}
          />
          <Input
            placeholder={placeholders.item_id || "Item ID"}
            _placeholder={{ color: "gray.500" }}
            bg="gray.100"
            color="gray.700"
            name="item_id"
            value={form.item_id}
            onChange={handleChange}
          />
          <Input
            placeholder={placeholders.part_no || "Part Number"}
            _placeholder={{ color: "gray.500" }}
            bg="gray.100"
            color="gray.700"
            name="part_no"
            value={form.part_no}
            onChange={handleChange}
          />
          <Input
            placeholder={placeholders.qty || "Quantity"}
            type="number"
            _placeholder={{ color: "gray.500" }}
            bg="gray.100"
            color="gray.700"
            name="qty"
            value={form.qty}
            onChange={handleChange}
          />
          <Input
            placeholder={placeholders.unit_type || "Unit Type"}
            _placeholder={{ color: "gray.500" }}
            bg="gray.100"
            color="gray.700"
            name="unit_type"
            value={form.unit_type}
            onChange={handleChange}
          />
          <Input
            placeholder={placeholders.notes || "Notes"}
            _placeholder={{ color: "gray.500" }}
            bg="gray.100"
            color="gray.700"
            name="notes"
            value={form.notes}
            onChange={handleChange}
          />

          <Button colorScheme="blue" width="full" onClick={handleSubmit}>
            Update
          </Button>

          <Button
            width="full"
            variant="outline"
            onClick={() => navigate("/tableissuingitem")}
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

export default UpdateIssuingItems;
