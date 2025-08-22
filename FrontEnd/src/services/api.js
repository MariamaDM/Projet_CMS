import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";

// Totaux simples
export const getTotalTransactions = async () => {
    try {
        const res = await axios.get(`${API_BASE_URL}/total-transactions`);
        return res.data || 0;
    } catch (error) {
        console.error("Erreur getTotalTransactions:", error);
        return 0;
    }
};

export const getTotalAmount = async () => {
    try {
        const res = await axios.get(`${API_BASE_URL}/total-amount`);
        return res.data || 0;
    } catch (error) {
        console.error("Erreur getTotalAmount:", error);
        return 0;
    }
};

export const getSubscriptions = async () => {
    try {
        const res = await axios.get(`${API_BASE_URL}/subscriptions`);
        return res.data || 0; // retourne un nombre
    } catch (error) {
        console.error("Erreur getSubscriptions:", error);
        return 0;
    }
};

export const getClaims = async () => {
    try {
        const res = await axios.get(`${API_BASE_URL}/claims`);
        return res.data || 0; // retourne un nombre
    } catch (error) {
        console.error("Erreur getClaims:", error);
        return 0;
    }
};

// Évolutions pour les graphiques
export const getTransactionsEvolution = async () => {
    try {
        const res = await axios.get(`${API_BASE_URL}/transactions/evolution`);
        return Array.isArray(res.data) ? res.data : [];
    } catch (error) {
        console.error("Erreur getTransactionsEvolution:", error);
        return [];
    }
};

export const getSouscriptionsEvolution = async () => {
    try {
        const res = await axios.get(`${API_BASE_URL}/souscriptions/evolution`);
        return Array.isArray(res.data) ? res.data : [];
    } catch (error) {
        console.error("Erreur getSouscriptionsEvolution:", error);
        return [];
    }
};

export const getReclamationsEvolution = async () => {
    try {
        const res = await axios.get(`${API_BASE_URL}/reclamations/evolution`);
        return Array.isArray(res.data) ? res.data : [];
    } catch (error) {
        console.error("Erreur getReclamationsEvolution:", error);
        return [];
    }
};

// Répartition des réclamations par status
export const getReclamationsByStatus = async () => {
    try {
        const res = await axios.get(`${API_BASE_URL}/reclamations/status`);
        return Array.isArray(res.data) ? res.data : [];
    } catch (error) {
        console.error("Erreur getReclamationsByStatus:", error);
        return [];
    }
};
