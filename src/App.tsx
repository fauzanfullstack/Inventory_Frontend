// src/App.tsx

import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Flex, Box } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import ProtectedRoute from "./ProtectedRoute";

import Sidebar from "./pages/components/Sidebar";
import Dashboard from "./pages/Dashboard";
import TableUsers from "./TableUsers";

// ========================
// Import halaman lainnya
// ========================
import TableIssuingItems from "./pages/issuing_items/Table_issuing_items";
import CreateIssuingItems from "./pages/issuing_items/Create_issuing_items";
import UpdateIssuingItems from "./pages/issuing_items/Update_issuing_items";

import TableItems from "./pages/items/Table_items";
import CreateItems from "./pages/items/Create_items";
import UpdateItems from "./pages/items/Update_items";

import TablePurchaseRequest from "./pages/purchaseRequest/Table_purchaseRequest";
import CreatePurchaseRequest from "./pages/purchaseRequest/Create_purchaseRequest";
import UpdatePurchaseRequest from "./pages/purchaseRequest/Update_purchaseRequest";
import PRPrint from "./pages/purchaseRequest/PRPrint";

import TableMarketList from "./pages/marketlist/Table_marketlist";
import CreateMarketList from "./pages/marketlist/Create_marketlist";
import UpdateMarketList from "./pages/marketlist/Update_marketlist";

import CreateReceiving from "./pages/receivings/Create_receiving";
import UpdateReceiving from "./pages/receivings/Update_receiving";
import TableReceiving from "./pages/receivings/Table_receiving";

import TableSRequest from "./pages/s_request/Table_s_request";
import CreateSRequest from "./pages/s_request/Create_s_request";
import UpdateSRequest from "./pages/s_request/Update_s_request";
import SRequestPrint from "./pages/s_request/SRPrint";

import TableIssuing from "./pages/issuings/Table_issuings";
import CreateIssuing from "./pages/issuings/Create_issuings";
import UpdateIssuing from "./pages/issuings/Update_issuings";

import TablePrItem from "./pages/pr_items/Table_pr_items";
import CreatePrItem from "./pages/pr_items/Create_pr_items";
import UpdatePrItem from "./pages/pr_items/Update_pr_items";

import TableReceivingItems from "./pages/receiving_items/Table_receiving_items";
import CreateReceivingItem from "./pages/receiving_items/Create_receiving_items";
import UpdateReceivingItem from "./pages/receiving_items/Update_receiving_items";

import TableSritems from "./pages/sr_items/Table_sr_items";
import CreateSRItem from "./pages/sr_items/Create_sr_items";
import UpdateSRItem from "./pages/sr_items/Update_sr_items";

import Login from "./pages/Login";
import Register from "./pages/Register";
import StockBalance from "./stockbalance";

const queryClient = new QueryClient();

// Layout component
function Layout() {
  const location = useLocation();
  const hideSidebar = location.pathname === "/login" || location.pathname === "/register";

  return (
    <Flex minH="100vh">
      {!hideSidebar && <Sidebar />}
      <Box flex="1" p={6} bg="gray.100">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tableusers"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <TableUsers />
              </ProtectedRoute>
            }
          />

          <Route
            path="/stockbalance"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <StockBalance />
              </ProtectedRoute>
            }
          />

          {/* ITEMS */}
          <Route path="/tableitem" element={<ProtectedRoute allowedRoles={["admin"]}><TableItems /></ProtectedRoute>} />
          <Route path="/createitem" element={<ProtectedRoute allowedRoles={["admin"]}><CreateItems /></ProtectedRoute>} />
          <Route path="/updateitem/:id" element={<ProtectedRoute allowedRoles={["admin"]}><UpdateItems /></ProtectedRoute>} />

          {/* PURCHASE REQUEST */}
          <Route path="/tablepurchaserequests" element={<ProtectedRoute><TablePurchaseRequest /></ProtectedRoute>} />
          <Route path="/createpurchaserequests" element={<ProtectedRoute><CreatePurchaseRequest /></ProtectedRoute>} />
          <Route path="/updatepurchaserequests/:id" element={<ProtectedRoute allowedRoles={["admin"]}><UpdatePurchaseRequest /></ProtectedRoute>} />
          <Route path="/printpurchaserequests/:id" element={<ProtectedRoute><PRPrint /></ProtectedRoute>} />

          {/* MARKET LIST */}
          <Route path="/tablemarketlist" element={<ProtectedRoute allowedRoles={["admin"]}><TableMarketList /></ProtectedRoute>} />
          <Route path="/createmarketlist" element={<ProtectedRoute allowedRoles={["admin"]}><CreateMarketList /></ProtectedRoute>} />
          <Route path="/updatemarketlist/:id" element={<ProtectedRoute allowedRoles={["admin"]}><UpdateMarketList /></ProtectedRoute>} />

          {/* ISSUING ITEMS */}
          <Route path="/tableissuingitem" element={<ProtectedRoute allowedRoles={["admin"]}><TableIssuingItems /></ProtectedRoute>} />
          <Route path="/createissuingitem" element={<ProtectedRoute allowedRoles={["admin"]}><CreateIssuingItems /></ProtectedRoute>} />
          <Route path="/updateissuingitem/:id" element={<ProtectedRoute allowedRoles={["admin"]}><UpdateIssuingItems /></ProtectedRoute>} />

          {/* SERVICE REQUEST */}
          <Route path="/tablesrequests" element={<ProtectedRoute allowedRoles={["admin"]}><TableSRequest /></ProtectedRoute>} />
          <Route path="/createsrequest" element={<ProtectedRoute allowedRoles={["admin"]}><CreateSRequest /></ProtectedRoute>} />
          <Route path="/updatesrequest/:id" element={<ProtectedRoute allowedRoles={["admin"]}><UpdateSRequest /></ProtectedRoute>} />
          <Route path="/printsrequest/:id" element={<ProtectedRoute allowedRoles={["admin"]}><SRequestPrint /></ProtectedRoute>} />

          {/* RECEIVING */}
          <Route path="/tablereceiving" element={<ProtectedRoute allowedRoles={["admin"]}><TableReceiving /></ProtectedRoute>} />
          <Route path="/createreceiving" element={<ProtectedRoute allowedRoles={["admin"]}><CreateReceiving /></ProtectedRoute>} />
          <Route path="/updatereceiving/:id" element={<ProtectedRoute allowedRoles={["admin"]}><UpdateReceiving /></ProtectedRoute>} />

          {/* ISSUINGS */}
          <Route path="/tableissuings" element={<ProtectedRoute allowedRoles={["admin"]}><TableIssuing /></ProtectedRoute>} />
          <Route path="/createissuings" element={<ProtectedRoute allowedRoles={["admin"]}><CreateIssuing /></ProtectedRoute>} />
          <Route path="/updateissuings/:id" element={<ProtectedRoute allowedRoles={["admin"]}><UpdateIssuing /></ProtectedRoute>} />

          {/* PR ITEMS */}
          <Route path="/pritems" element={<ProtectedRoute allowedRoles={["admin"]}><TablePrItem /></ProtectedRoute>} />
          <Route path="/createpritems" element={<ProtectedRoute allowedRoles={["admin"]}><CreatePrItem /></ProtectedRoute>} />
          <Route path="/updatepritems/:id" element={<ProtectedRoute allowedRoles={["admin"]}><UpdatePrItem /></ProtectedRoute>} />

          {/* RECEIVING ITEMS */}
          <Route path="/tablereceivingitems" element={<ProtectedRoute allowedRoles={["admin"]}><TableReceivingItems /></ProtectedRoute>} />
          <Route path="/createreceivingitems" element={<ProtectedRoute allowedRoles={["admin"]}><CreateReceivingItem /></ProtectedRoute>} />
          <Route path="/updatereceivingitems/:id" element={<ProtectedRoute allowedRoles={["admin"]}><UpdateReceivingItem /></ProtectedRoute>} />

          {/* SR ITEMS */}
          <Route path="/tablesritems" element={<ProtectedRoute allowedRoles={["admin"]}><TableSritems /></ProtectedRoute>} />
          <Route path="/createsritems" element={<ProtectedRoute allowedRoles={["admin"]}><CreateSRItem /></ProtectedRoute>} />
          <Route path="/updatesritems/:id" element={<ProtectedRoute allowedRoles={["admin"]}><UpdateSRItem /></ProtectedRoute>} />

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Box>
    </Flex>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
