// src/pages/purchase_request/PRPrint.tsx
import { useEffect, useRef, useState } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { getPurchaseRequestById } from "../../utils/purchaseRequest";
import type { PRItem, PurchaseRequest } from "../../types";
import { useReactToPrint } from "react-to-print";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function PRPrint() {
  const { id } = useParams();
  const printRef = useRef<HTMLDivElement | null>(null);

  const [header, setHeader] = useState<PurchaseRequest | null>(null);
  const [items, setItems] = useState<PRItem[]>([]);

  // FETCH DATA
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getPurchaseRequestById(Number(id));
        const data = res.data ?? res;

        setHeader(data);

        const mappedItems: PRItem[] = data.items
          ? data.items
          : [
              {
                id: data.id,
                purchase_request_id: data.id,
                item_id: data.item_id ?? null,
                part_no: data.item_part_no ?? data.part_no ?? "-", // ✅ Ambil dari JOIN
                description: data.item_name ?? data.description ?? "-", // ✅ Prioritaskan item_name dari JOIN
                unit_type: data.item_unit_type ?? data.unit_type ?? "-", // ✅ Ambil dari JOIN
                qty: data.qty_f ?? 0,
                cost: Number(data.cost ?? 0),
                subtotal: Number(data.cost ?? 0) * (data.qty_f ?? 0),
              },
            ];

        setItems(mappedItems);
      } catch (error) {
        console.error("Failed to fetch PR:", error);
        setHeader(null);
        setItems([]);
      }
    }

    fetchData();
  }, [id]);

  // FIX useReactToPrint
  const handlePrint = useReactToPrint({
    documentTitle: `Purchase Request ${header?.pr_number ?? ""}`,
    onAfterPrint: () => {
      console.log("Printed successfully");
    },
    print: async () => printRef.current,
  });

  // PDF DOWNLOAD
  const handleDownloadPDF = async () => {
    if (!printRef.current) return;

    const canvas = await html2canvas(printRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`PR-${header?.pr_number ?? "document"}.pdf`);
  };

  return (
    <Box p={5}>
      <Flex mb={5} className="no-print" gap={3}>
        <Button colorScheme="blue" onClick={() => handlePrint()}>
          Print Purchase Request
        </Button>

        <Button colorScheme="green" onClick={handleDownloadPDF}>
          Download PDF
        </Button>
      </Flex>

      <Box
        ref={printRef}
        p={10}
        bg="white"
        maxW="900px"
        mx="auto"
        border="1px solid #cfcfcf"
        fontFamily="Arial, sans-serif"
        color="gray.800"
      >
        {/* HEADER */}
        <Flex justify="space-between" align="center" mb={8}>
          <Flex align="center" gap={4}>
            <img src="/zuri.jpg" alt="Hotel Zuri" style={{ width: "90px" }} />
            <Box>
              <Text fontSize="2xl" fontWeight="bold">PURCHASE REQUEST</Text>
              <Text fontSize="sm">Hotel Zuri Express Lippo Cikarang</Text>
            </Box>
          </Flex>

          <Box textAlign="right">
            <Text fontWeight="bold" fontSize="sm">PR Number:</Text>
            <Text>{header?.pr_number ?? "-"}</Text>

            <Text fontWeight="bold" fontSize="sm" mt={2}>Due Date:</Text>
            <Text>{header?.due_date ?? "-"}</Text>
          </Box>
        </Flex>

        {/* REQUEST INFO */}
        <Box mb={8}>
          <Text fontWeight="bold" mb={2} fontSize="lg">Request Information</Text>

          <Box border="1px solid #ccc" borderRadius="6px">
            {[
              { label: "Requested By", value: header?.request_by },
              { label: "Department", value: header?.department },
            ].map((row, i) => (
              <Flex key={i} borderBottom={i !== 1 ? "1px solid #ccc" : ""}>
                <Box
                  w="200px"
                  bg="#f4f4f4"
                  p={2}
                  fontWeight="semibold"
                  borderRight="1px solid #ccc"
                >
                  {row.label}
                </Box>
                <Box p={2}>{row.value ?? "-"}</Box>
              </Flex>
            ))}
          </Box>
        </Box>

        {/* ITEMS LIST */}
        <Box>
          <Text fontWeight="bold" mb={2} fontSize="lg">Items Requested</Text>

          <Flex bg="#f4f4f4" p={2} fontWeight="semibold" border="1px solid #ccc">
            <Box flex="1">Part No</Box>
            <Box flex="2">Item Name</Box>
            <Box flex="1" textAlign="right">Qty</Box>
            <Box flex="1">Unit</Box>
            <Box flex="1" textAlign="right">Cost</Box>
            <Box flex="1" textAlign="right">Subtotal</Box>
          </Flex>

          {items.length > 0 ? (
            items.map((item) => (
              <Flex
                key={item.id}
                p={2}
                borderX="1px solid #ccc"
                borderBottom="1px solid #ccc"
                fontSize="sm"
              >
                <Box flex="1">{item.part_no ?? "-"}</Box>
                <Box flex="2">{item.description ?? "-"}</Box>
                <Box flex="1" textAlign="right">{item.qty ?? "-"}</Box>
                <Box flex="1">{item.unit_type ?? "-"}</Box>
                <Box flex="1" textAlign="right">{item.cost?.toLocaleString() ?? "-"}</Box>
                <Box flex="1" textAlign="right">{item.subtotal?.toLocaleString() ?? "-"}</Box>
              </Flex>
            ))
          ) : (
            <Text p={3} color="gray.500">No items found.</Text>
          )}
        </Box>

        {/* TOTAL */}
        <Flex justify="flex-end" mt={5}>
          <Box textAlign="right">
            <Text fontWeight="bold" fontSize="lg">Total Cost:</Text>
            <Text fontSize="xl">
              {header?.total_cost?.toLocaleString() ?? "0"}
            </Text>
          </Box>
        </Flex>

        {/* SIGNATURE */}
        <Box mt={20}>
          <Flex justify="space-between">
            {["Purchasing", "HOD Accounting", "Hotel Manager"].map((role) => (
              <Box key={role} textAlign="center">
                <Text fontWeight="bold">{role}</Text>
                <Box h="80px" />
                <Text fontSize="sm">( ____________________ )</Text>
              </Box>
            ))}
          </Flex>
        </Box>
      </Box>

      {/* PRINT STYLE */}
      <style>
        {`
          @media print {
            .no-print { display: none !important; }
            body { background: white !important; }
            @page { size: A4; margin: 15mm; }
          }
        `}
      </style>
    </Box>
  );
}