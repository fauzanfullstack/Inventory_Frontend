// src/utils/stockBalance.ts
import { getItems } from "./items";
import { getReceivings } from "./receivings";
import { getReceivingItems } from "./receivingItems";
import { getPurchaseRequests } from "./purchaseRequest";
import { getMarketLists } from "./marketlist";
import { getSRequests } from "./sRequest";
import { getIssuings } from "./issuings";
import { getIssuingItems } from "./issuingsItem";

/**
 * Interface untuk summary statistics
 */
export interface StockBalanceStats {
  totalStock: number;
  totalReceived: number;
  totalIssued: number;
  totalValue: number;
  activeSuppliers: number;
  totalItems: number;
}

/**
 * Interface untuk chart data
 */
export interface ChartData {
  itemsChart: any[];
  receivingsChart: any[];
  statusChart: any[];
  supplierChart: any[];
}

/**
 * GET all data untuk Stock Balance Dashboard
 * Agregasi dari semua tabel
 */
export const getStockBalanceData = async () => {
  try {
    // Fetch semua data parallel
    const [
      items,
      receivings,
      receivingItems,
      purchaseRequests,
      marketlists,
      sRequests,
      issuings,
      issuingItems,
    ] = await Promise.all([
      getItems(),
      getReceivings(),
      getReceivingItems(),
      getPurchaseRequests(),
      getMarketLists(),
      getSRequests(),
      getIssuings(),
      getIssuingItems(),
    ]);

    // ===========================
    // CALCULATE STATISTICS
    // ===========================
    const totalStock = items.reduce(
      (sum: number, item: any) => sum + (item.qty || 0),
      0
    );

    const totalReceived = receivingItems.reduce(
      (sum: number, item: any) => sum + (item.qty || 0),
      0
    );

    const totalIssued = issuingItems.reduce(
      (sum: number, item: any) => sum + (item.qty || 0),
      0
    );

    const totalValue = receivings.reduce(
      (sum: number, rcv: any) => sum + parseFloat(rcv.total || 0),
      0
    );

    // Count unique suppliers
    const uniqueSuppliers = new Set(
      [...items, ...receivings]
        .map((item: any) => item.supplier)
        .filter(Boolean)
    );

    const stats: StockBalanceStats = {
      totalStock,
      totalReceived,
      totalIssued,
      totalValue,
      activeSuppliers: uniqueSuppliers.size,
      totalItems: items.length,
    };

    // ===========================
    // PREPARE CHART DATA
    // ===========================

    // 1. Items Chart - Stock per item
    const itemsChart = items.map((item: any) => ({
      name: item.name || "Unknown",
      qty: item.qty || 0,
      partNo: item.part_no || "-",
      supplier: item.supplier || "Unknown",
    }));

    // 2. Receivings Chart - Trend by date
    const receivingsByDate = receivings.reduce((acc: any, rcv: any) => {
      const date = new Date(rcv.created_at).toLocaleDateString("id-ID", {
        month: "short",
        day: "numeric",
      });
      if (!acc[date]) {
        acc[date] = { date, count: 0, total: 0 };
      }
      acc[date].count += 1;
      acc[date].total += parseFloat(rcv.total || 0);
      return acc;
    }, {});
    const receivingsChart = Object.values(receivingsByDate);

    // 3. Status Chart - Distribution dari PR, SR, Marketlist
    const statusCount: any = {};
    [...purchaseRequests, ...sRequests, ...marketlists].forEach(
      (item: any) => {
        const status = (item.status || "unknown").toLowerCase();
        statusCount[status] = (statusCount[status] || 0) + 1;
      }
    );
    const statusChart = Object.entries(statusCount).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value,
    }));

    // 4. Supplier Chart - Top 5 suppliers
    const supplierCount: any = {};
    [...items, ...receivings].forEach((item: any) => {
      const supplier = item.supplier || "Unknown";
      supplierCount[supplier] = (supplierCount[supplier] || 0) + 1;
    });
    const supplierChart = Object.entries(supplierCount)
      .map(([name, value]) => ({ name, value }))
      .sort((a: any, b: any) => b.value - a.value)
      .slice(0, 5);

    const chartData: ChartData = {
      itemsChart,
      receivingsChart,
      statusChart,
      supplierChart,
    };

    return {
      stats,
      chartData,
      rawData: {
        items,
        receivings,
        receivingItems,
        purchaseRequests,
        marketlists,
        sRequests,
        issuings,
        issuingItems,
      },
    };
  } catch (error) {
    console.error("Error fetching stock balance data:", error);
    throw error;
  }
};

/**
 * GET stock summary by supplier
 */
export const getStockBySupplier = async () => {
  const items = await getItems();
  
  const supplierData = items.reduce((acc: any, item: any) => {
    const supplier = item.supplier || "Unknown";
    if (!acc[supplier]) {
      acc[supplier] = {
        supplier,
        totalItems: 0,
        totalQty: 0,
      };
    }
    acc[supplier].totalItems += 1;
    acc[supplier].totalQty += item.qty || 0;
    return acc;
  }, {});

  return Object.values(supplierData);
};

/**
 * GET low stock items (qty < threshold)
 */
export const getLowStockItems = async (threshold: number = 10) => {
  const items = await getItems();
  return items.filter((item: any) => (item.qty || 0) < threshold);
};

/**
 * GET receiving trend (last N days)
 */
export const getReceivingTrend = async (days: number = 30) => {
  const receivings = await getReceivings();
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);

  const filtered = receivings.filter((rcv: any) => {
    const rcvDate = new Date(rcv.created_at);
    return rcvDate >= cutoffDate;
  });

  // Group by date
  const trendData = filtered.reduce((acc: any, rcv: any) => {
    const date = new Date(rcv.created_at).toLocaleDateString("id-ID");
    if (!acc[date]) {
      acc[date] = { date, count: 0, total: 0 };
    }
    acc[date].count += 1;
    acc[date].total += parseFloat(rcv.total || 0);
    return acc;
  }, {});

  return Object.values(trendData);
};

/**
 * GET issuing trend (last N days)
 */
export const getIssuingTrend = async (days: number = 30) => {
  const issuings = await getIssuings();
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);

  const filtered = issuings.filter((iss: any) => {
    const issDate = new Date(iss.created_at);
    return issDate >= cutoffDate;
  });

  return filtered;
};