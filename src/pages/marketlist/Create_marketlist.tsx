import { useState } from "react";
import {
  Box,
  Button,
  Heading,
  Input,
  VStack,
  Textarea,
  Flex,
  Text,
} from "@chakra-ui/react";
import { createMarketList } from "../../utils/marketlist";
import { useNavigate } from "react-router-dom";

const CreateMarketList = () => {
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

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...form,
        total: form.total ? parseFloat(form.total) : 0,
        item_id: form.item_id ? parseInt(form.item_id) : null,
      };

      await createMarketList(payload);
      alert("Market List berhasil dibuat!");
      navigate("/marketlist");
    } catch (err) {
      console.error(err);
      alert("Gagal membuat Market List!");
    }
  };

  return (
    <Box flex="1" bg="gray.50" p={8} minH="100vh">
      <Box mb={8} textAlign="left">
        <Heading size="xl" color="gray.700" fontWeight="extrabold">
          Tambah Market List
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
          Form Input Market List
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

          <Button colorScheme="green" width="full" onClick={handleSubmit}>
            Simpan
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

export default CreateMarketList;
