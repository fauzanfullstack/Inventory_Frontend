// src/pages/prItem/UpdatePrItem.tsx
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Heading,
  Input,
  VStack,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import { getPrItemById, updatePrItem } from "../../utils/prItems";
import { useNavigate, useParams } from "react-router-dom";

const UpdatePrItem = () => {
  const { id } = useParams<{ id: string }>();
  const [form, setForm] = useState({
    purchase_request_id: "",
    item_id: "",
    part_no: "",
    description: "",
    unit_type: "",
    qty: "",
    cost: "",
    subtotal: "",
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrItem = async () => {
      try {
        const data = await getPrItemById(id!);
        setForm({
          purchase_request_id: data.purchase_request_id || "",
          item_id: data.item_id || "",
          part_no: data.part_no || "",
          description: data.description || "",
          unit_type: data.unit_type || "",
          qty: data.qty ? String(data.qty) : "",
          cost: data.cost ? String(data.cost) : "",
          subtotal: data.subtotal ? String(data.subtotal) : "",
        });
        setLoading(false);
      } catch (err) {
        console.error(err);
        alert("Gagal mengambil data PR Item!");
      }
    };

    fetchPrItem();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        purchase_request_id: form.purchase_request_id || null,
        item_id: form.item_id || null,
        part_no: form.part_no,
        description: form.description,
        unit_type: form.unit_type,
        qty: form.qty ? Number(form.qty) : null,
        cost: form.cost ? Number(form.cost) : null,
        subtotal: form.subtotal ? Number(form.subtotal) : null,
      };

      await updatePrItem(id!, payload);
      alert("PR Item berhasil diperbarui!");
      navigate("/pritems");
    } catch (err) {
      console.error(err);
      alert("Gagal memperbarui PR Item!");
    }
  };

  if (loading) {
    return (
      <Flex justify="center" align="center" minH="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Box flex="1" bg="gray.50" p={8} minH="100vh">
      {/* Title */}
      <Box mb={8} textAlign="left">
        <Heading size="xl" color="gray.700" fontWeight="extrabold">
          Update PR Item
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
          Form Update PR Item
        </Heading>

        <VStack gap={4}>
          <Input
            placeholder="Purchase Request ID (opsional)"
            name="purchase_request_id"
            value={form.purchase_request_id}
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
            placeholder="Description"
            name="description"
            value={form.description}
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
            placeholder="Quantity (opsional)"
            name="qty"
            type="number"
            value={form.qty}
            onChange={handleChange}
            bg="gray.100"
          />

          <Input
            placeholder="Cost"
            name="cost"
            type="number"
            value={form.cost}
            onChange={handleChange}
            bg="gray.100"
          />

          <Input
            placeholder="Subtotal (opsional)"
            name="subtotal"
            type="number"
            value={form.subtotal}
            onChange={handleChange}
            bg="gray.100"
          />

          <Button colorScheme="green" width="full" onClick={handleSubmit}>
            Update
          </Button>

          <Button
            width="full"
            variant="outline"
            onClick={() => navigate("/pritems")}
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

export default UpdatePrItem;
