// src/pages/purchase_request/UpdatePurchaseRequest.tsx
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
  Textarea,
} from "@chakra-ui/react";
import { getPurchaseRequestById, updatePurchaseRequest } from "../../utils/purchaseRequest";
import { useNavigate, useParams } from "react-router-dom";

const UpdatePurchaseRequest = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    pr_number: "",
    item_id: "",
    part_no: "",
    description: "",
    unit_type: "",
    qty_f: "",
    currency: "IDR",
    cost: "",
    total_cost: "",
    team: "",
    due_date: "",
    number: "",
    request_by: "",
    department: "",
    status: "open",
  });

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const data = await getPurchaseRequestById(Number(id));
        setForm({
          pr_number: data.pr_number ?? "",
          item_id: data.item_id ? String(data.item_id) : "",
          part_no: data.part_no ?? "",
          description: data.description ?? "",
          unit_type: data.unit_type ?? "",
          qty_f: data.qty_f ? String(data.qty_f) : "",
          currency: data.currency ?? "IDR",
          cost: data.cost ?? "",
          total_cost: data.total_cost ?? "",
          team: data.team ?? "",
          due_date: data.due_date ? data.due_date.split("T")[0] : "",
          number: data.number ?? "",
          request_by: data.request_by ?? "",
          department: data.department ?? "",
          status: data.status ?? "open",
        });
      } catch (err) {
        console.error(err);
        alert("Gagal mengambil data Purchase Request!");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...form,
        item_id: form.item_id ? Number(form.item_id) : null,
        qty_f: form.qty_f ? Number(form.qty_f) : 0,
        cost: form.cost ? parseFloat(form.cost) : 0,
        total_cost: form.total_cost ? parseFloat(form.total_cost) : 0,
      };

      await updatePurchaseRequest(Number(id), payload);

      alert("Purchase Request berhasil diupdate!");
      navigate("/purchase-request");
    } catch (err) {
      console.error(err);
      alert("Gagal update Purchase Request!");
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
          Edit Purchase Request
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
          Form Update Purchase Request
        </Heading>

        <VStack gap={4}>
          <Input placeholder="PR Number" name="pr_number" value={form.pr_number} onChange={handleChange} bg="white" color="black" />
          <Input placeholder="Item ID" name="item_id" value={form.item_id} onChange={handleChange} bg="white" color="black" />
          <Input placeholder="Part Number" name="part_no" value={form.part_no} onChange={handleChange} bg="white" color="black" />
          <Textarea placeholder="Description" name="description" value={form.description} onChange={handleChange} bg="white" color="black" />
          <Input placeholder="Unit Type" name="unit_type" value={form.unit_type} onChange={handleChange} bg="white" color="black" />
          <Input placeholder="Quantity" type="number" name="qty_f" value={form.qty_f} onChange={handleChange} bg="white" color="black" />
          <Input placeholder="Currency" name="currency" value={form.currency} onChange={handleChange} bg="white" color="black" />
          <Input placeholder="Cost" type="number" name="cost" value={form.cost} onChange={handleChange} bg="white" color="black" />
          <Input placeholder="Total Cost" type="number" name="total_cost" value={form.total_cost} onChange={handleChange} bg="white" color="black" />
          <Input placeholder="Team" name="team" value={form.team} onChange={handleChange} bg="white" color="black" />
          <Input placeholder="Due Date" type="date" name="due_date" value={form.due_date} onChange={handleChange} bg="white" color="black" />
          <Input placeholder="Number" name="number" value={form.number} onChange={handleChange} bg="white" color="black" />
          <Input placeholder="Request By" name="request_by" value={form.request_by} onChange={handleChange} bg="white" color="black" />
          <Input placeholder="Department" name="department" value={form.department} onChange={handleChange} bg="white" color="black" />

          {/* Status select HTML */}
          <Box width="100%" bg="white" borderRadius="md" border="1px solid #ccc" p={1}>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              style={{ width: "100%", padding: "6px", fontSize: "14px" }}
            >
              <option value="open">Open</option>
              <option value="process">Process</option>
              <option value="completed">Completed</option>
            </select>
          </Box>

          <Button colorScheme="blue" width="full" onClick={handleSubmit}>
            Update
          </Button>

          <Button width="full" variant="outline" onClick={() => navigate("/purchase-request")}>
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

export default UpdatePurchaseRequest;
