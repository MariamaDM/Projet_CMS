import React from "react";
import { Outlet, Link } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-cmsblue text-white p-4 flex items-center justify-between">
  <div className="flex items-center space-x-3">
    <img src="logo.jpg" alt="CMS Logo" className="h-10" />
    <h1 className="text-xl font-bold">Dashboard Crédit Mutuel du Sénégal</h1>
  </div>
  <nav className="space-x-4">
    <Link to="/" className="hover:underline">Accueil</Link>
    <Link to="/transactions" className="hover:underline">Transactions</Link>
    <Link to="/subscriptions" className="hover:underline">Souscriptions</Link>
    <Link to="/claims" className="hover:underline">Réclamations</Link>
  </nav>
</header>

      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default App;