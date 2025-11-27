// src/pages/prItem/CreatePrItem.tsx
import { useState } from "react";
import {
  Box,
  Button,
  Heading,
  Input,
  VStack,
  Flex,
} from "@chakra-ui/react";
import { createPrItem } from "../../utils/prItems";
import { useNavigate } from "react-router-dom";

const CreatePrItem = () => {
  const [purchaseRequestId, setPurchaseRequestId] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const payload = {
        purchase_request_id: Number(purchaseRequestId),
      };

      await createPrItem(payload);
      alert("PR Item berhasil dibuat!");
      navigate("/pritems");
    } catch (err) {
      console.error(err);
      alert("Gagal membuat PR Item!");
    }
  };

  return (
    <Box flex="1" bg="gray.50" p={8} minH="100vh">
      <Box mb={8} textAlign="left">
        <Heading size="xl" color="gray.700" fontWeight="extrabold">
          Tambah PR Item
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
          Form Input PR Item
        </Heading>

        <VStack gap={4}>
          <Input
            placeholder="Purchase Request ID"
            value={purchaseRequestId}
            onChange={(e) => setPurchaseRequestId(e.target.value)}
            bg="gray.100"
          />

          <Button colorScheme="green" width="full" onClick={handleSubmit}>
            Simpan
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

export default CreatePrItem;
