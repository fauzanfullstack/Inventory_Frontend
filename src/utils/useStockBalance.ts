// src/pages/stock_balance/hooks/useStockBalance.ts
import { useState, useEffect } from "react";
import axios from "axios";

export interface Summary {
  totalItems: number;
  totalStock: number;
  lowStock: number;
  outOfStock: number;
}

export interface StockItem {
  item_id: number;
  part_no: string;
  name: string;
  balance: number;
}

export default function useStockBalance() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [pieChartData, setPieChartData] = useState<StockItem[]>([]);
  const [barChartData, setBarChartData] = useState<StockItem[]>([]);
  const [trendChartData, setTrendChartData] = useState<any[]>([]);
  const [criticalStock, setCriticalStock] = useState<StockItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStockBalance() {
      try {
        setLoading(true);
        const summaryRes = await axios.get("/stock-balance/summary");
        setSummary(summaryRes.data);

        const chartRes = await axios.get("/stock-balance/chart");
        setPieChartData(chartRes.data.pie);
        setBarChartData(chartRes.data.bar);
        setTrendChartData(chartRes.data.trend);

        const criticalRes = await axios.get("/stock-balance/critical");
        setCriticalStock(criticalRes.data);
      } catch (err) {
        console.error("Gagal fetch stock balance:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchStockBalance();
  }, []);

  return { summary, pieChartData, barChartData, trendChartData, criticalStock, loading };
}
