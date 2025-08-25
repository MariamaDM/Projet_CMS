import React from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

export default function Charts({
                                   transactions = [],
                                   subscriptions = [],
                                   claims = [],
                                   claimsByStatus = [],
                               }) {
    // 📊 Transactions mensuelles
    const transactionsChart = {
        labels: transactions.map((d) => d.period || ""),
        datasets: [
            {
                label: "Montant Transactions",
                data: transactions.map((d) => d.total_montant || 0),
                borderColor: "#007ACC",
                backgroundColor: "#007ACC33",
                tension: 0.4,
            },
        ],
    };

    // 📊 Souscriptions mensuelles
    const subscriptionsChart = {
        labels: subscriptions.map((d) => d.mois || ""),
        datasets: [
            {
                label: "Nombre de Souscriptions",
                data: subscriptions.map((d) => d.total_souscriptions || 0),
                backgroundColor: "#34D399",
            },
        ],
    };

    // 📊 Réclamations mensuelles
    const claimsChartMonthly = {
        labels: claims.map((d) => d.mois || ""),
        datasets: [
            {
                label: "Nombre de Réclamations",
                data: claims.map((d) => d.total_reclamations || 0),
                backgroundColor: "#F87171",
            },
        ],
    };

    // 🥧 Répartition des réclamations par status
    const formattedClaimsByStatus = Array.isArray(claimsByStatus)
        ? claimsByStatus
        : [];

    const claimsChartStatus = {
        labels: formattedClaimsByStatus.map((d) => d.status || "Inconnu"),
        datasets: [
            {
                label: "Répartition Réclamations",
                data: formattedClaimsByStatus.map((d) => Number(d.total_reclamations) || 0),
                backgroundColor: [
                    "#F87171", "#FBBF24", "#60A5FA", "#34D399", "#A78BFA",
                    "#F472B6", "#FCD34D", "#3B82F6", "#10B981", "#EF4444"
                ],
            },
        ],
    };



    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {/* Transactions */}
            <div className="bg-white shadow rounded-xl p-4">
                <h3 className="text-cmsblue font-semibold mb-2">Transactions Mensuelles</h3>
                <Line data={transactionsChart} />
            </div>

            {/* Souscriptions */}
            <div className="bg-white shadow rounded-xl p-4">
                <h3 className="text-cmsblue font-semibold mb-2">Souscriptions Mensuelles</h3>
                <Bar data={subscriptionsChart} />
            </div>

            {/* Réclamations mensuelles */}
            <div className="bg-white shadow rounded-xl p-4">
                <h3 className="text-cmsblue font-semibold mb-2">Réclamations Mensuelles</h3>
                <Bar data={claimsChartMonthly} />
            </div>

            {/* Réclamations par status */}
            <div className="bg-white shadow rounded-xl p-4 flex justify-center items-center">
                <div style={{ height: "400px", width: "70%" }}>
                    <Pie data={claimsChartStatus} />
                </div>
            </div>
        </div>
    );
}
