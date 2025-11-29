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
    status: "pending",
    open_date: "",
    close_date: "",
    cd: "",
    cost_center: "",
    type_cost: "",
    total: "",
    notes: "",
    item_id: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const fetchData = async () => {
    try {
      if (!id) return;

      const ml = await getMarketListById(Number(id));

      setForm({
        status: ml.status || "pending",
        open_date: ml.open_date ? ml.open_date.split("T")[0] : "",
        close_date: ml.close_date ? ml.close_date.split("T")[0] : "",
        cd: ml.cd || "",
        cost_center: ml.cost_center || "",
        type_cost: ml.type_cost || "",
        total: ml.total?.toString() || "",
        notes: ml.notes || "",
        item_id: ml.item_id?.toString() || "",
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
        item_id: form.item_id ? parseInt(form.item_id) : null,
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

          {/* STATUS */}
          <Box width="100%">
            <Text fontSize="14px" fontWeight="600" mb={1}>
              Status
            </Text>
            <Box
              width="100%"
              bg="white"
              borderRadius="md"
              border="1px solid #ccc"
              p={1}
            >
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                style={{ width: "100%", padding: "6px", fontSize: "14px" }}
              >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="converted_to_pr">Converted to PR</option>
              </select>
            </Box>
          </Box>

          {/* OPEN DATE */}
          <Box width="100%">
            <Text fontSize="14px" fontWeight="600" mb={1}>
              Open Date
            </Text>
            <Input
              placeholder="Open Date"
              type="date"
              name="open_date"
              value={form.open_date}
              onChange={handleChange}
              bg="white"
              color="black"
            />
          </Box>

          {/* CLOSE DATE */}
          <Box width="100%">
            <Text fontSize="14px" fontWeight="600" mb={1}>
              Close Date
            </Text>
            <Input
              placeholder="Close Date"
              type="date"
              name="close_date"
              value={form.close_date}
              onChange={handleChange}
              bg="white"
              color="black"
            />
          </Box>

          {/* CD */}
          <Box width="100%">
            <Text fontSize="14px" fontWeight="600" mb={1}>
              CD
            </Text>
            <Input
              placeholder="CD"
              name="cd"
              value={form.cd}
              onChange={handleChange}
              bg="white"
              color="black"
            />
          </Box>

          {/* COST CENTER */}
          <Box width="100%">
            <Text fontSize="14px" fontWeight="600" mb={1}>
              Cost Center
            </Text>
            <Input
              placeholder="Cost Center"
              name="cost_center"
              value={form.cost_center}
              onChange={handleChange}
              bg="white"
              color="black"
            />
          </Box>

          {/* TYPE COST */}
          <Box width="100%">
            <Text fontSize="14px" fontWeight="600" mb={1}>
              Type Cost
            </Text>
            <Input
              placeholder="Type Cost"
              name="type_cost"
              value={form.type_cost}
              onChange={handleChange}
              bg="white"
              color="black"
            />
          </Box>

          {/* TOTAL */}
          <Box width="100%">
            <Text fontSize="14px" fontWeight="600" mb={1}>
              Total
            </Text>
            <Input
              placeholder="Total"
              type="number"
              name="total"
              value={form.total}
              onChange={handleChange}
              bg="white"
              color="black"
            />
          </Box>

          {/* ITEM ID */}
          <Box width="100%">
            <Text fontSize="14px" fontWeight="600" mb={1}>
              Item ID
            </Text>
            <Input
              placeholder="Item ID"
              type="number"
              name="item_id"
              value={form.item_id}
              onChange={handleChange}
              bg="white"
              color="black"
            />
          </Box>

          {/* NOTES */}
          <Box width="100%">
            <Text fontSize="14px" fontWeight="600" mb={1}>
              Notes
            </Text>
            <Textarea
              placeholder="Notes"
              name="notes"
              value={form.notes}
              onChange={handleChange}
              bg="white"
              color="black"
            />
          </Box>

          <Button colorScheme="blue" width="full" onClick={handleSubmit}>
            Update
          </Button>

          <Button width="full" variant="outline" onClick={() => navigate("/marketlist")}>
            Kembali
          </Button>
        </VStack>
      </Flex>

      {/* RGB BORDER */}
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
