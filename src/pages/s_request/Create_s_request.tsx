// src/pages/sRequest/CreateSRequest.tsx
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
import { createSRequest } from "../../utils/sRequest";
import { useNavigate } from "react-router-dom";

const CreateSRequest = () => {
  const [form, setForm] = useState({
    number: "",
    status: "open",
    open_date: "",
    expected_date: "",
    cost_center: "",
    location: "",
    request_by: "",
    notes: "",
  });

  // State untuk items
  const [items, setItems] = useState([
    { id: Date.now(), name: "", qty: 1 }
  ]);

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle perubahan item
  const handleItemChange = (id: number, field: string, value: string | number) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  // Tambah item baru
  const addItem = () => {
    setItems(prev => [...prev, { id: Date.now(), name: "", qty: 1 }]);
  };

  // Hapus item
  const removeItem = (id: number) => {
    if (items.length > 1) {
      setItems(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleSubmit = async () => {
    try {
      // Debug: tampilkan semua nilai form
      console.log("Form values:", form);
      console.log("Items:", items);

      // Validasi field required
      if (!form.number?.trim()) {
        alert("Number harus diisi!");
        return;
      }
      if (!form.open_date) {
        alert("Open Date harus diisi!");
        return;
      }
      if (!form.expected_date) {
        alert("Expected Date harus diisi!");
        return;
      }
      if (!form.cost_center?.trim()) {
        alert("Cost Center harus diisi!");
        return;
      }
      if (!form.location?.trim()) {
        alert("Location harus diisi!");
        return;
      }
      if (!form.request_by?.trim()) {
        alert("Request By harus diisi!");
        return;
      }

      // Filter item yang name-nya tidak kosong
      const validItems = items.filter(item => item.name.trim() !== "");

      if (validItems.length === 0) {
        alert("Minimal harus ada 1 item yang diisi!");
        return;
      }

      const payload = {
        number: form.number.trim(),
        status: form.status,
        open_date: form.open_date,
        expected_date: form.expected_date,
        cost_center: form.cost_center.trim(),
        location: form.location.trim(),
        request_by: form.request_by.trim(),
        notes: form.notes || "",
        items: validItems.map(({ name, qty }) => ({ 
          name: name.trim(), 
          qty: parseInt(String(qty)) || 1 
        })),
        created_by: "Current User",
        updated_by: "Current User",
      };

      console.log("Payload yang dikirim:", JSON.stringify(payload, null, 2));
      
      await createSRequest(payload);
      alert("Store Request berhasil dibuat!");
      navigate("/srequest");
    } catch (err: any) {
      console.error("Error detail:", err);
      console.error("Error response data:", err.response?.data);
      console.error("Error response status:", err.response?.status);
      console.error("Error response headers:", err.response?.headers);
      
      const errorMessage = err.response?.data?.message || err.message || "Unknown error";
      alert(`Gagal membuat Store Request!\n\nError: ${errorMessage}`);
    }
  };

  return (
    <Box flex="1" bg="gray.50" p={8} minH="100vh">
      <Box mb={8}>
        <Heading size="xl" color="gray.700" fontWeight="extrabold">
          Tambah Store Request
        </Heading>
      </Box>

      <Flex
        maxW="4xl"
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
          Form Input Store Request
        </Heading>

        <VStack gap={4}>
          <Input
            placeholder="Number (SR-001)"
            name="number"
            value={form.number}
            onChange={handleChange}
            bg="white"
            color="gray.800"
            borderColor="gray.300"
            _placeholder={{ color: "gray.400" }}
            _hover={{ borderColor: "gray.400" }}
            _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px #3182ce" }}
            required
          />

          {/* SELECT STATUS */}
          <Box width="100%" bg="white" borderRadius="md" border="1px solid" borderColor="gray.300">
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "8px 12px",
                fontSize: "16px",
                borderRadius: "6px",
                outline: "none",
                border: "none",
                backgroundColor: "white",
                color: "#2D3748",
              }}
            >
              <option value="open">Open</option>
              <option value="waiting">Waiting</option>
              <option value="approved">Approved</option>
              <option value="purchase">Purchase</option>
            </select>
          </Box>

          <Input
            type="date"
            placeholder="Open Date"
            name="open_date"
            value={form.open_date}
            onChange={handleChange}
            bg="white"
            color="gray.800"
            borderColor="gray.300"
            _hover={{ borderColor: "gray.400" }}
            _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px #3182ce" }}
            required
          />

          <Input
            type="date"
            placeholder="Expected Date"
            name="expected_date"
            value={form.expected_date}
            onChange={handleChange}
            bg="white"
            color="gray.800"
            borderColor="gray.300"
            _hover={{ borderColor: "gray.400" }}
            _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px #3182ce" }}
            required
          />

          <Input
            placeholder="Cost Center"
            name="cost_center"
            value={form.cost_center}
            onChange={handleChange}
            bg="white"
            color="gray.800"
            borderColor="gray.300"
            _placeholder={{ color: "gray.400" }}
            _hover={{ borderColor: "gray.400" }}
            _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px #3182ce" }}
            required
          />

          <Input
            placeholder="Location"
            name="location"
            value={form.location}
            onChange={handleChange}
            bg="white"
            color="gray.800"
            borderColor="gray.300"
            _placeholder={{ color: "gray.400" }}
            _hover={{ borderColor: "gray.400" }}
            _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px #3182ce" }}
            required
          />

          <Input
            placeholder="Request By"
            name="request_by"
            value={form.request_by}
            onChange={handleChange}
            bg="white"
            color="gray.800"
            borderColor="gray.300"
            _placeholder={{ color: "gray.400" }}
            _hover={{ borderColor: "gray.400" }}
            _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px #3182ce" }}
            required
          />

          {/* ITEMS SECTION */}
          <Box width="100%" mt={4}>
            <Flex justify="space-between" align="center" mb={2}>
              <Heading size="sm" color="gray.700">Items</Heading>
              <Button
                size="sm"
                colorScheme="green"
                onClick={addItem}
              >
                + Tambah Item
              </Button>
            </Flex>

            <Box overflowX="auto" border="1px solid #e2e8f0" borderRadius="md">
              <Box as="table" width="100%" style={{ borderCollapse: "collapse" }}>
                <Box as="thead" bg="gray.100">
                  <Box as="tr">
                    <Box as="th" p={2} textAlign="left" borderBottom="1px solid #e2e8f0">No</Box>
                    <Box as="th" p={2} textAlign="left" borderBottom="1px solid #e2e8f0">Item Name</Box>
                    <Box as="th" p={2} textAlign="left" borderBottom="1px solid #e2e8f0" width="120px">Qty</Box>
                    <Box as="th" p={2} textAlign="center" borderBottom="1px solid #e2e8f0" width="80px">Aksi</Box>
                  </Box>
                </Box>
                <Box as="tbody">
                  {items.map((item, index) => (
                    <Box as="tr" key={item.id}>
                      <Box as="td" p={2} borderBottom="1px solid #e2e8f0">{index + 1}</Box>
                      <Box as="td" p={2} borderBottom="1px solid #e2e8f0">
                        <Input
                          placeholder="Nama item"
                          value={item.name}
                          onChange={(e) =>
                            handleItemChange(item.id, "name", e.target.value)
                          }
                          size="sm"
                          bg="white"
                          color="gray.800"
                          borderColor="gray.300"
                          _placeholder={{ color: "gray.400" }}
                          _hover={{ borderColor: "gray.400" }}
                          _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px #3182ce" }}
                          required
                        />
                      </Box>
                      <Box as="td" p={2} borderBottom="1px solid #e2e8f0">
                        <Input
                          type="number"
                          value={item.qty}
                          onChange={(e) =>
                            handleItemChange(item.id, "qty", e.target.value)
                          }
                          size="sm"
                          min={1}
                          bg="white"
                          color="gray.800"
                          borderColor="gray.300"
                          _hover={{ borderColor: "gray.400" }}
                          _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px #3182ce" }}
                        />
                      </Box>
                      <Box as="td" p={2} borderBottom="1px solid #e2e8f0" textAlign="center">
                        {items.length > 1 && (
                          <Button
                            size="sm"
                            colorScheme="red"
                            onClick={() => removeItem(item.id)}
                          >
                            ✕
                          </Button>
                        )}
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>

          <Textarea
            placeholder="Notes (opsional)"
            name="notes"
            value={form.notes}
            onChange={handleChange}
            bg="white"
            color="gray.800"
            borderColor="gray.300"
            _placeholder={{ color: "gray.400" }}
            _hover={{ borderColor: "gray.400" }}
            _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px #3182ce" }}
          />

          <Button colorScheme="green" width="full" onClick={handleSubmit}>
            Simpan
          </Button>

          <Button width="full" variant="outline" onClick={() => navigate("/srequest")}>
            Kembali
          </Button>
        </VStack>
      </Flex>

      {/* RGB BORDER STYLE */}
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
            background: linear-gradient(
              270deg,
              red,
              orange,
              yellow,
              lime,
              cyan,
              blue,
              violet,
              red
            );
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

export default CreateSRequest;