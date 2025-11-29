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
  const [documentation, setDocumentation] = useState<File | null>(null);

  const [form, setForm] = useState({
    number: "",
    document: "",
    item_name: "",
    unit_type: "",
    qty: "",
    status: "accepted",
    location: "",
    cost_center: "",
    supplier: "",
    idr: "",
    total: "",
    notes: "",
    updated_by: "Fauzan", // field wajib untuk update
    condition_status: "", // tambahkan field condition_status
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchData = async () => {
    try {
      if (!id) return;
      const rcv = await getReceivingById(Number(id));

      setForm({
        number: rcv.number || "",
        document: rcv.document || "",
        item_name: rcv.item_name || "",
        unit_type: rcv.unit_type || "",
        qty: rcv.qty?.toString() || "",
        status: rcv.status || "accepted",
        location: rcv.location || "",
        cost_center: rcv.cost_center || "",
        supplier: rcv.supplier || "",
        idr: rcv.idr?.toString() || "",
        total: rcv.total?.toString() || "",
        notes: rcv.notes || "",
        updated_by: "Fauzan",
        condition_status: rcv.condition_status || "", // set default dari data
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
      if (!form.item_name || form.item_name.trim() === "") {
        return alert("Field 'Item Name' wajib diisi!");
      }

      const fd = new FormData();
      Object.entries(form).forEach(([key, value]) => fd.append(key, value));
      if (documentation) fd.append("documentation", documentation);

      await updateReceiving(Number(id), fd);
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
        <Heading size="md" color="gray.700" fontWeight="bold" textAlign="center" mb={4}>
          Form Update Receiving
        </Heading>

        <VStack gap={4}>
          <Input placeholder="Number" name="number" value={form.number} onChange={handleChange} bg="gray.100" color="black" />
          <Input placeholder="Document" name="document" value={form.document} onChange={handleChange} bg="gray.100" color="black" />
          <Input placeholder="Item Name" name="item_name" value={form.item_name} onChange={handleChange} bg="gray.100" color="black" />
          <Input placeholder="Unit Type" name="unit_type" value={form.unit_type} onChange={handleChange} bg="gray.100" color="black" />
          <Input placeholder="Qty" type="number" name="qty" value={form.qty} onChange={handleChange} bg="gray.100" color="black" />
          <Input type="file" accept="image/*" onChange={e => { if (e.target.files && e.target.files[0]) setDocumentation(e.target.files[0]); }} bg="gray.100" />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #E2E8F0",
              background: "rgba(243, 244, 246, 0.9)",
              color: "black",
            }}
          >
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>

          {/* condition_status select */}
          <select
            name="condition_status"
            value={form.condition_status}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #E2E8F0",
              background: "rgba(243, 244, 246, 0.9)",
              color: "black",
            }}
          >
            <option value="">Pilih Kondisi Barang</option>
            <option value="good">Good</option>
            <option value="damaged">Damaged</option>
            <option value="expired">Expired</option>
          </select>

          <Input placeholder="Location" name="location" value={form.location} onChange={handleChange} bg="gray.100" color="black" />
          <Input placeholder="Cost Center" name="cost_center" value={form.cost_center} onChange={handleChange} bg="gray.100" color="black" />
          <Input placeholder="Supplier" name="supplier" value={form.supplier} onChange={handleChange} bg="gray.100" color="black" />
          <Input placeholder="IDR" type="number" name="idr" value={form.idr} onChange={handleChange} bg="gray.100" color="black" />
          <Input placeholder="Total" type="number" name="total" value={form.total} onChange={handleChange} bg="gray.100" color="black" />
          <Textarea placeholder="Notes" name="notes" value={form.notes} onChange={handleChange} bg="gray.100" color="black" />
          <Input placeholder="Updated By" name="updated_by" value={form.updated_by} onChange={handleChange} bg="gray.100" color="black" />

          <Button colorScheme="blue" width="full" onClick={handleSubmit}>Update</Button>
          <Button width="full" variant="outline" onClick={() => navigate("/receiving")}>Kembali</Button>
        </VStack>
      </Flex>

      <style>{`
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
      `}</style>
    </Box>
  );
};

export default UpdateReceiving;
