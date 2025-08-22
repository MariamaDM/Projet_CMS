import React, { useEffect, useState } from "react";
import StatsCards from "./StatsCards";
import Charts from "./Charts";
import {
    getTotalTransactions,
    getTotalAmount,
    getSubscriptions,
    getClaims,
    getTransactionsEvolution,
    getSouscriptionsEvolution,
    getReclamationsEvolution,
    getReclamationsByStatus
} from "../../services/api";

export default function Dashboard() {
    // 📌 Totaux simples
    const [totalTransactions, setTotalTransactions] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalSubscriptions, setTotalSubscriptions] = useState(0);
    const [totalClaims, setTotalClaims] = useState(0);

    // 📊 Évolutions graphiques
    const [transactionsEvolution, setTransactionsEvolution] = useState([]);
    const [subscriptionsEvolution, setSubscriptionsEvolution] = useState([]);
    const [claimsEvolution, setClaimsEvolution] = useState([]);

    // 🥧 Répartition des réclamations par status
    const [claimsByStatus, setClaimsByStatus] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Totaux
                setTotalTransactions(await getTotalTransactions());
                setTotalAmount(await getTotalAmount());
                setTotalSubscriptions(await getSubscriptions()); // plus de .length
                setTotalClaims(await getClaims()); // plus de .length

                // Évolutions graphiques
                setTransactionsEvolution(await getTransactionsEvolution());
                setSubscriptionsEvolution(await getSouscriptionsEvolution());
                setClaimsEvolution(await getReclamationsEvolution());

                // Répartition par status
                setClaimsByStatus(await getReclamationsByStatus());
            } catch (error) {
                console.error("Erreur lors du chargement des données du Dashboard:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="p-4">
            {/* 📌 Cartes de stats */}
            <StatsCards
                totalTransactions={totalTransactions}
                totalAmount={totalAmount}
                totalSubscriptions={totalSubscriptions}
                totalClaims={totalClaims}
            />

            {/* 📊 Graphiques */}
            <Charts
                transactions={transactionsEvolution}
                subscriptions={subscriptionsEvolution}
                claims={claimsEvolution}
                claimsByStatus={claimsByStatus}
            />
        </div>
    );
}
