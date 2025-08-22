// src/data/mockData.js
// Évolution du nombre d’utilisateurs par mois
export const userData = [
  { month: "Jan", users: 400 },
  { month: "Fév", users: 600 },
  { month: "Mar", users: 800 },
  { month: "Avr", users: 700 },
  { month: "Mai", users: 900 },
  { month: "Juin", users: 1200 },
];

// Transactions simulées
export const transactionsData = [
  { id: 1, date: "2025-01-10", amount: "120 €", status: "Payée" },
  { id: 2, date: "2025-01-12", amount: "85 €", status: "En attente" },
  { id: 3, date: "2025-01-14", amount: "230 €", status: "Payée" },
  { id: 4, date: "2025-01-15", amount: "75 €", status: "Échouée" },
  { id: 5, date: "2025-01-16", amount: "410 €", status: "Payée" },
];

// Souscriptions simulées
export const subscriptionsData = [
  { id: 1, name: "Alice Martin", date: "2025-01-05", type: "Premium", amount: "50 €" },
  { id: 2, name: "Jean Dupont", date: "2025-01-08", type: "Standard", amount: "30 €" },
  { id: 3, name: "Sophie Leroy", date: "2025-01-12", type: "Premium", amount: "50 €" },
  { id: 4, name: "Lucas Bernard", date: "2025-01-15", type: "Essai", amount: "0 €" },
];

// Réclamations simulées
export const claimsData = [
  { id: 1, name: "Alice Martin", date: "2025-01-07", subject: "Problème de connexion" },
  { id: 2, name: "Jean Dupont", date: "2025-01-11", subject: "Paiement non reçu" },
  { id: 3, name: "Sophie Leroy", date: "2025-01-14", subject: "Erreur de facturation" },
  { id: 4, name: "Lucas Bernard", date: "2025-01-18", subject: "Support lent" },
];