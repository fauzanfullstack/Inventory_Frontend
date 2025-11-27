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
import { createMarketList } from "../../utils/marketlist";
import { useNavigate } from "react-router-dom";

const CreateMarketList = () => {
  const [form, setForm] = useState({
    status: "open",
    open_date: "",
    cd: "",
    cost_center: "",
    type_cost: "",
    total: "",
    notes: "",
    item_id: "", // field item_id
  });

  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...form,
        total: form.total ? parseFloat(form.total) : 0,
        item_id: form.item_id ? parseInt(form.item_id) : null, // convert ke number
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
      {/* Title */}
      <Box mb={8} textAlign="left">
        <Heading size="xl" color="gray.700" fontWeight="extrabold">
          Tambah Market List
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
          Form Input Market List
        </Heading>

        <VStack gap={4}>
          <Input
            placeholder="Status"
            name="status"
            value={form.status}
            onChange={handleChange}
            bg="gray.100"
            color="black"
          />
          <Input
            placeholder="Open Date"
            type="date"
            name="open_date"
            value={form.open_date}
            onChange={handleChange}
            bg="gray.100"
            color="black"
          />
          <Input
            placeholder="CD"
            name="cd"
            value={form.cd}
            onChange={handleChange}
            bg="gray.100"
            color="black"
          />
          <Input
            placeholder="Cost Center"
            name="cost_center"
            value={form.cost_center}
            onChange={handleChange}
            bg="gray.100"
            color="black"
          />
          <Input
            placeholder="Type Cost"
            name="type_cost"
            value={form.type_cost}
            onChange={handleChange}
            bg="gray.100"
            color="black"
          />
          <Input
            placeholder="Total"
            type="number"
            name="total"
            value={form.total}
            onChange={handleChange}
            bg="gray.100"
            color="black"
          />
          {/* Input Item ID */}
          <Input
            placeholder="Item ID"
            type="number"
            name="item_id"
            value={form.item_id}
            onChange={handleChange}
            bg="gray.100"
            color="black"
          />
          <Textarea
            placeholder="Notes"
            name="notes"
            value={form.notes}
            onChange={handleChange}
            bg="gray.100"
            color="black"
          />

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

export default CreateMarketList;
