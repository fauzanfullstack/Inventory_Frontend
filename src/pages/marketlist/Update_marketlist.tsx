// src/pages/marketlist/UpdateMarketList.tsx
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
import { getMarketListById, updateMarketList } from "../../utils/marketlist";
import { useNavigate, useParams } from "react-router-dom";

const UpdateMarketList = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    no: "",
    status: "open",
    open_date: "",
    cd: "",
    cost_center: "",
    type_cost: "",
    total: "",
    notes: "",
  });

  const [placeholders, setPlaceholders] = useState({ ...form });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const fetchData = async () => {
    try {
      if (!id) return;
      const ml = await getMarketListById(Number(id));

      setForm({
        no: ml.no || "",
        status: ml.status || "open",
        open_date: ml.open_date ? ml.open_date.split("T")[0] : "",
        cd: ml.cd || "",
        cost_center: ml.cost_center || "",
        type_cost: ml.type_cost || "",
        total: ml.total?.toString() || "",
        notes: ml.notes || "",
      });

      setPlaceholders({
        no: ml.no || "",
        status: ml.status || "open",
        open_date: ml.open_date ? ml.open_date.split("T")[0] : "",
        cd: ml.cd || "",
        cost_center: ml.cost_center || "",
        type_cost: ml.type_cost || "",
        total: ml.total?.toString() || "",
        notes: ml.notes || "",
      });
    } catch (err) {
      console.error(err);
      alert("Gagal mengambil data Market List!");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...form,
        total: form.total ? parseFloat(form.total) : 0,
      };

      await updateMarketList(Number(id!), payload);

      alert("Market List berhasil diupdate!");
      navigate("/marketlist");
    } catch (err) {
      console.error(err);
      alert("Gagal mengupdate Market List!");
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <Box textAlign="center" py={20}>
        <Spinner size="xl" />
        <Text mt={4}>Sedang memuat data Market List...</Text>
      </Box>
    );
  }

  return (
    <Box flex="1" bg="gray.50" p={8} minH="100vh">
      <Box mb={8} textAlign="left">
        <Heading size="xl" color="gray.700" fontWeight="extrabold">
          Update Market List
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
          Form Update Market List
        </Heading>

        <VStack gap={4}>
          <Input
            placeholder={placeholders.no || "No"}
            _placeholder={{ color: "gray.500" }}
            name="no"
            value={form.no}
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
            placeholder={placeholders.open_date || "Open Date"}
            type="date"
            _placeholder={{ color: "gray.500" }}
            name="open_date"
            value={form.open_date}
            onChange={handleChange}
            bg="gray.100"
            color="gray.700"
          />

          <Input
            placeholder={placeholders.cd || "CD"}
            _placeholder={{ color: "gray.500" }}
            name="cd"
            value={form.cd}
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
            placeholder={placeholders.type_cost || "Type Cost"}
            _placeholder={{ color: "gray.500" }}
            name="type_cost"
            value={form.type_cost}
            onChange={handleChange}
            bg="gray.100"
            color="gray.700"
          />

          <Input
            placeholder={placeholders.total || "Total"}
            type="number"
            _placeholder={{ color: "gray.500" }}
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
            onClick={() => navigate("/marketlist")}
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

export default UpdateMarketList;
