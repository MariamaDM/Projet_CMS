import React, { useState, useMemo } from "react";
import { transactionsData } from "../data/mockData"; // Utiliser transactionsData
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { CSVLink } from "react-csv";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

function Transactions() {
  // États
  const [selectedColumns, setSelectedColumns] = useState([
    "id", // Remplacer 'uuid' par 'id'
    "amount",
    "status",
  ]);

  const [filters, setFilters] = useState({
    year: "all",
    month: "all",
    status: "all",
  });

  // Fonctions filtres
  const uniqueValues = (key) =>
    [...new Set(transactionsData.map((tx) => {
      if (key === "year") return new Date(tx.date).getFullYear();
      if (key === "month") return new Date(tx.date).getMonth() + 1;
      return tx[key];
    }))];

  const filteredTransactions = useMemo(() => {
    return transactionsData.filter((tx) => {
      const date = new Date(tx.date); // Utiliser 'date' au lieu de 'created_at'
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      return (
        (filters.year === "all" || +filters.year === year) &&
        (filters.month === "all" || +filters.month === month) &&
        (filters.status === "all" || tx.status === filters.status)
      );
    });
  }, [filters]);

  const handleColumnToggle = (column) => {
    setSelectedColumns((prev) =>
      prev.includes(column) ? prev.filter((col) => col !== column) : [...prev, column]
    );
  };

  // Synthèse groupée
  const summaryData = useMemo(() => {
    const map = {};
    filteredTransactions.forEach((tx) => {
      const date = new Date(tx.date);
      const key = `${date.getFullYear()}-${date.getMonth() + 1}-${tx.status}`;
      if (!map[key]) {
        map[key] = {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          status: tx.status,
          count: 0,
          total_amount: 0,
        };
      }
      map[key].count += 1;
      map[key].total_amount += tx.amount ? parseFloat(tx.amount.replace(" €", "")) : 0;
    });
    return Object.values(map);
  }, [filteredTransactions]);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredTransactions.map((tx) =>
        Object.fromEntries(selectedColumns.map((col) => [col, tx[col]]))
      )
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");
    XLSX.writeFile(workbook, "transactions.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableColumn = selectedColumns;
    const tableRows = filteredTransactions.map((tx) =>
      selectedColumns.map((col) => tx[col])
    );
    doc.text("Rapport Transactions", 14, 10);
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });
    doc.save("transactions.pdf");
  };

  const csvData = filteredTransactions.map((tx) =>
    Object.fromEntries(selectedColumns.map((col) => [col, tx[col]]))
  );

  const allColumns = [
    { key: "id", label: "ID" }, // Remplacer 'uuid' par 'id'
    { key: "amount", label: "Montant" },
    { key: "status", label: "Statut" },
  ];

  return (
    <div className="grid gap-6 p-4">
      <h2 className="text-2xl font-bold text-cmsblue mb-4">Rapport Transactions</h2>

      {/* Filtres */}
      <div className="bg-white shadow rounded-xl p-4 flex flex-wrap gap-4">
        {["year", "month", "status"].map((key) => (
          <div key={key} className="flex flex-col text-sm">
            <label className="font-medium capitalize">{key === "status" ? "Statut" : key}</label>
            <select
              className="border p-1 rounded"
              value={filters[key]}
              onChange={(e) => setFilters({ ...filters, [key]: e.target.value })}
            >
              <option value="all">Tous</option>
              {uniqueValues(key)
                .filter((v, i, a) => a.indexOf(v) === i)
                .sort()
                .map((val) => (
                  <option key={val} value={val}>
                    {key === "month" ? `Mois ${val}` : val}
                  </option>
                ))}
            </select>
          </div>
        ))}
      </div>

      {/* Graphique */}
      <div className="bg-white shadow rounded-xl p-4">
        <h3 className="font-semibold mb-2 text-cmsblue">Évolution mensuelle</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={summaryData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value, name) => [name === "Montant Total" ? `${value} €` : value, name]} />
            <Legend />
            <Bar dataKey="total_amount" fill="#007ACC" name="Montant Total" />
            <Bar dataKey="count" fill="#FF9800" name="Nombre" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Export & colonnes */}
      <div className="bg-white shadow rounded-xl p-4">
        <h3 className="font-semibold text-cmsblue mb-2">Colonnes à afficher / Exporter</h3>
        <div className="flex flex-wrap gap-4 mb-4">
          {allColumns.map((col) => (
            <label key={col.key} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedColumns.includes(col.key)}
                onChange={() => handleColumnToggle(col.key)}
              />
              <span>{col.label}</span>
            </label>
          ))}
        </div>
        <div className="flex gap-4">
          <CSVLink
            data={csvData}
            filename={"transactions.csv"}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            Export CSV
          </CSVLink>
          <button
            onClick={exportToExcel}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
          >
            Export Excel
          </button>
          <button
            onClick={exportToPDF}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Export PDF
          </button>
        </div>
      </div>

      {/* Tableau des transactions */}
      <div className="bg-white shadow rounded-xl p-4 overflow-auto">
        <h3 className="font-semibold text-cmsblue mb-2">Liste des Transactions</h3>
        <table className="w-full text-left border border-gray-200">
          <thead className="bg-blue-600 text-white">
            <tr>
              {selectedColumns.map((col) => {
                const label = allColumns.find((c) => c.key === col)?.label;
                return <th key={col} className="p-2">{label}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((tx) => (
              <tr key={tx.id} className="border-b hover:bg-gray-100">
                {selectedColumns.map((col) => (
                  <td key={col} className="p-2">{tx[col]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tableau de synthèse */}
      <div className="bg-white shadow rounded-xl p-4 overflow-auto">
        <h3 className="font-semibold text-cmsblue mb-2">Tableau de Synthèse</h3>
        <table className="w-full text-left border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Année</th>
              <th className="p-2">Mois</th>
              <th className="p-2">Statut</th>
              <th className="p-2">Nb Transactions</th>
              <th className="p-2">Montant Total</th>
            </tr>
          </thead>
          <tbody>
            {summaryData.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="p-2">{item.year}</td>
                <td className="p-2">{item.month}</td>
                <td className="p-2">{item.status}</td>
                <td className="p-2">{item.count}</td>
                <td className="p-2">{item.total_amount.toLocaleString()} €</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Transactions;