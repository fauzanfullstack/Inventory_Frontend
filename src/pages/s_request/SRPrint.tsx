import { useEffect, useRef, useState } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { getSRequestById } from "../../utils/sRequest";
import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface SRequestItem {
  name: string;
  qty: number;
}

interface SRequestData {
  id: number;
  number: string;
  status: string;
  open_date: string;
  expected_date: string;
  cost_center: string;
  location: string;
  request_by: string;
  notes: string;
  items: SRequestItem[];
}

export default function SRequestPrint() {
  const { id } = useParams();
  const printRef = useRef<HTMLDivElement | null>(null);

  const [header, setHeader] = useState<SRequestData | null>(null);
  const [items, setItems] = useState<SRequestItem[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getSRequestById(Number(id));
        console.log("SRequest API Response:", res);

        // Handle jika response wrapped dalam data property atau langsung object
        const data = res.data ?? res;
        setHeader(data);

        // Parse items dari response
        let parsedItems: SRequestItem[] = [];

        if (data.items) {
          // Jika items sudah array
          if (Array.isArray(data.items)) {
            parsedItems = data.items;
          }
          // Jika items masih string JSON
          else if (typeof data.items === 'string') {
            try {
              parsedItems = JSON.parse(data.items);
            } catch (e) {
              console.error("Failed to parse items JSON:", e);
              parsedItems = [];
            }
          }
        }

        // Fallback jika items kosong
        if (parsedItems.length === 0) {
          parsedItems = [{
            name: "No items available",
            qty: 0
          }];
        }

        setItems(parsedItems);
      } catch (error) {
        console.error("Failed to fetch SRequest:", error);
        setHeader(null);
        setItems([]);
      }
    }
    fetchData();
  }, [id]);

  // Print
  const handlePrint = useReactToPrint({
    // @ts-ignore
    content: () => printRef.current ?? null,
    documentTitle: `Service Request ${header?.number ?? ""}`,
  });

  // Download PDF
  const handleDownloadPDF = async () => {
    if (!printRef.current) return;

    const element = printRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`SRequest-${header?.number ?? "document"}.pdf`);
  };

  // Format date
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Box p={5}>
      {/* BUTTONS (hide on print) */}
      <Flex mb={5} className="no-print" gap={3}>
        <Button colorScheme="blue" onClick={handlePrint}>
          Print Service Request
        </Button>
        <Button colorScheme="green" onClick={handleDownloadPDF}>
          Download PDF
        </Button>
      </Flex>

      {/* PRINT AREA */}
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
        {/* LOGO + TITLE */}
        <Flex justify="space-between" align="center" mb={8}>
          <Flex align="center" gap={4}>
            <img
              src="https://www.zhmhotels.com/wp-content/themes/grand-zuri/css/images/express.jpg"
              alt="Hotel Zuri Express"
              style={{ width: "90px" }}
            />
            <Box>
              <Text fontSize="2xl" fontWeight="bold">
                SERVICE REQUEST
              </Text>
              <Text fontSize="sm">Hotel Zuri Express Lippo Cikarang</Text>
            </Box>
          </Flex>

          <Box textAlign="right">
            <Text fontSize="sm" fontWeight="bold">
              SR Number:
            </Text>
            <Text>{header?.number ?? "-"}</Text>

            <Text fontSize="sm" fontWeight="bold" mt={2}>
              Open Date:
            </Text>
            <Text>{formatDate(header?.open_date ?? "")}</Text>
          </Box>
        </Flex>

        {/* REQUEST INFO */}
        <Box mb={8}>
          <Text fontWeight="bold" mb={2} fontSize="lg">
            Request Information
          </Text>

          <Box border="1px solid #ccc" borderRadius="6px">
            {[
              { label: "Requested By", value: header?.request_by },
              { label: "Cost Center", value: header?.cost_center },
              { label: "Location", value: header?.location },
              { label: "Expected Date", value: formatDate(header?.expected_date ?? "") },
              { label: "Status", value: header?.status },
            ].map((row, i) => (
              <Flex key={i} borderBottom={i !== 4 ? "1px solid #ccc" : ""}>
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

        {/* ITEMS TABLE */}
        <Box>
          <Text fontWeight="bold" mb={2} fontSize="lg">
            Items / Services Requested
          </Text>

          {/* TABLE HEADER */}
          <Flex
            bg="#f4f4f4"
            p={2}
            fontWeight="semibold"
            border="1px solid #ccc"
          >
            <Box flex="0.5">No</Box>
            <Box flex="3">Item Name</Box>
            <Box flex="1" textAlign="center">Quantity</Box>
          </Flex>

          {/* ITEMS */}
          {items.length > 0 ? (
            items.map((item, idx) => (
              <Flex
                key={idx}
                p={2}
                borderX="1px solid #ccc"
                borderBottom="1px solid #ccc"
                fontSize="sm"
              >
                <Box flex="0.5">{idx + 1}</Box>
                <Box flex="3">{item.name ?? "-"}</Box>
                <Box flex="1" textAlign="center">{item.qty ?? "-"}</Box>
              </Flex>
            ))
          ) : (
            <Text p={2} color="gray.500">
              No items found.
            </Text>
          )}
        </Box>

        {/* NOTES */}
        {header?.notes && (
          <Box mt={6}>
            <Text fontWeight="bold" mb={2}>Notes:</Text>
            <Box p={3} bg="gray.50" borderRadius="md" border="1px solid #e2e8f0">
              <Text fontSize="sm">{header.notes}</Text>
            </Box>
          </Box>
        )}

        {/* SIGNATURE */}
        <Box mt={20}>
          <Flex justify="space-between">
            {["Inventory", "Requested By", "Hotel Manager"].map((role) => (
              <Box key={role} textAlign="center">
                <Text fontWeight="bold">{role}</Text>
                <Box h="80px" />
                <Text fontSize="sm">( ____________________ )</Text>
              </Box>
            ))}
          </Flex>
        </Box>
      </Box>

      {/* PRINT STYLES */}
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