import React from "react";
import { claimsData } from "../data/mockData"; // Utiliser claimsData au lieu de claims
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// === UTILS ===
function groupClaimsByPeriod(data) {
  const map = {};

  data.forEach((item) => {
    const date = new Date(item.date); // Utiliser 'date' au lieu de 'created_at'
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const key = `${year}-${month}`; // Simplifié : grouper par mois uniquement

    if (!map[key]) {
      map[key] = {
        year,
        month,
        count: 0,
      };
    }
    map[key].count++;
  });

  return Object.values(map);
}

const monthlyEvolution = claimsData.reduce((acc, claim) => {
  const date = new Date(claim.date); // Utiliser 'date' au lieu de 'created_at'
  const key = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}`;

  if (!acc[key]) acc[key] = 0;
  acc[key]++;
  return acc;
}, {});

const evolutionData = Object.entries(monthlyEvolution).map(([month, count]) => ({
  month,
  count,
}));

// === COMPONENT ===
function Claims() {
  const summaryData = groupClaimsByPeriod(claimsData);

  return (
    <div className="grid gap-6 p-4">
      <h2 className="text-2xl font-bold text-cmsblue mb-4">Rapport Réclamations</h2>

      {/* Graphique évolution mensuelle */}
      <div className="bg-white shadow rounded-xl p-4">
        <h3 className="font-semibold text-cmsblue mb-2">Évolution Mensuelle</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={evolutionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="count"
              name="Réclamations"
              stroke="#003366"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Tableau synthèse */}
      <div className="bg-white shadow rounded-xl p-4 overflow-auto">
        <h3 className="font-semibold text-cmsblue mb-2">Synthèse par Mois</h3>
        <table className="w-full text-left border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Année</th>
              <th className="p-2">Mois</th>
              <th className="p-2">Nb Réclamations</th>
            </tr>
          </thead>
          <tbody>
            {summaryData.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="p-2">{item.year}</td>
                <td className="p-2">{item.month}</td>
                <td className="p-2">{item.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Liste détaillée */}
      <div className="bg-white shadow rounded-xl p-4">
        <h3 className="font-semibold text-cmsblue mb-2">Liste des Réclamations</h3>
        <table className="w-full text-left border border-gray-200">
          <thead className="bg-gray-50">
            <tr className="border-b">
              <th className="p-2">Date</th>
              <th className="p-2">Sujet</th>
              <th className="p-2">Nom</th>
            </tr>
          </thead>
          <tbody>
            {claimsData.map((c) => (
              <tr key={c.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{c.date}</td>
                <td className="p-2">{c.subject}</td>
                <td className="p-2">{c.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Claims;