// src/pages/receiving/UpdateReceiving.tsx
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
import { getReceivingById, updateReceiving } from "../../utils/receivings";
import { useNavigate, useParams } from "react-router-dom";

const UpdateReceiving = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    number: "",
    document: "",
    status: "pending",
    location: "",
    cost_center: "",
    supplier: "",
    idr: "",
    total: "",
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
      const rcv = await getReceivingById(Number(id));

      setForm({
        number: rcv.number || "",
        document: rcv.document || "",
        status: rcv.status || "pending",
        location: rcv.location || "",
        cost_center: rcv.cost_center || "",
        supplier: rcv.supplier || "",
        idr: rcv.idr?.toString() || "",
        total: rcv.total?.toString() || "",
        notes: rcv.notes || "",
      });

      setPlaceholders({
        number: rcv.number || "",
        document: rcv.document || "",
        status: rcv.status || "pending",
        location: rcv.location || "",
        cost_center: rcv.cost_center || "",
        supplier: rcv.supplier || "",
        idr: rcv.idr?.toString() || "",
        total: rcv.total?.toString() || "",
        notes: rcv.notes || "",
      });
    } catch (err) {
      console.error(err);
      alert("Gagal mengambil data Receiving!");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...form,
        idr: form.idr ? parseFloat(form.idr) : 0,
        total: form.total ? parseFloat(form.total) : 0,
      };

      await updateReceiving(Number(id!), payload);
      alert("Receiving berhasil diupdate!");
      navigate("/receiving");
    } catch (err) {
      console.error(err);
      alert("Gagal mengupdate Receiving!");
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <Box textAlign="center" py={20}>
        <Spinner size="xl" />
        <Text mt={4}>Sedang memuat data Receiving...</Text>
      </Box>
    );
  }

  return (
    <Box flex="1" bg="gray.50" p={8} minH="100vh">
      <Box mb={8} textAlign="left">
        <Heading size="xl" color="gray.700" fontWeight="extrabold">
          Update Receiving
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
          Form Update Receiving
        </Heading>

        <VStack gap={4}>
          <Input
            placeholder={placeholders.number || "Number"}
            _placeholder={{ color: "gray.500" }}
            name="number"
            value={form.number}
            onChange={handleChange}
            bg="gray.100"
            color="gray.700"
          />
          <Input
            placeholder={placeholders.document || "Document"}
            _placeholder={{ color: "gray.500" }}
            name="document"
            value={form.document}
            onChange={handleChange}
            bg="gray.100"
            color="gray.700"
          />
          <Input
            placeholder={placeholders.status || "Status"}
            _placeholder={{ color: "gray.500" }}
            name="status"
            value={form.status}
            onChange={handleChange}
            bg="gray.100"
            color="gray.700"
          />
          <Input
            placeholder={placeholders.location || "Location"}
            _placeholder={{ color: "gray.500" }}
            name="location"
            value={form.location}
            onChange={handleChange}
            bg="gray.100"
            color="gray.700"
          />
          <Input
            placeholder={placeholders.cost_center || "Cost Center"}
            _placeholder={{ color: "gray.500" }}
            name="cost_center"
            value={form.cost_center}
            onChange={handleChange}
            bg="gray.100"
            color="gray.700"
          />
          <Input
            placeholder={placeholders.supplier || "Supplier"}
            _placeholder={{ color: "gray.500" }}
            name="supplier"
            value={form.supplier}
            onChange={handleChange}
            bg="gray.100"
            color="gray.700"
          />
          <Input
            placeholder={placeholders.idr || "IDR"}
            _placeholder={{ color: "gray.500" }}
            type="number"
            name="idr"
            value={form.idr}
            onChange={handleChange}
            bg="gray.100"
            color="gray.700"
          />
          <Input
            placeholder={placeholders.total || "Total"}
            _placeholder={{ color: "gray.500" }}
            type="number"
            name="total"
            value={form.total}
            onChange={handleChange}
            bg="gray.100"
            color="gray.700"
          />
          <Textarea
            placeholder={placeholders.notes || "Notes"}
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

export default UpdateReceiving;
