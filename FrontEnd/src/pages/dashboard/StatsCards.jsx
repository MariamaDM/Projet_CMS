import React from "react";
import { FaMoneyCheckAlt, FaUserPlus, FaExclamationCircle } from "react-icons/fa";

export default function StatsCards({ totalTransactions, totalAmount, totalSubscriptions, totalClaims }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white shadow rounded-xl p-4 flex items-center space-x-4">
                <FaMoneyCheckAlt className="text-3xl text-cyan-700" />
                <div>
                    <h3 className="text-lg font-semibold">Transactions</h3>
                    <p className="text-2xl font-bold">{totalTransactions}</p>
                    <p className="text-sm text-gray-500">{totalAmount.toLocaleString()} FCF</p>
                </div>
            </div>

            <div className="bg-white shadow rounded-xl p-4 flex items-center space-x-4">
                <FaUserPlus className="text-3xl text-green-600" />
                <div>
                    <h3 className="text-lg font-semibold">Souscriptions</h3>
                    <p className="text-2xl font-bold">{totalSubscriptions}</p>
                </div>
            </div>

            <div className="bg-white shadow rounded-xl p-4 flex items-center space-x-4">
                <FaExclamationCircle className="text-3xl text-red-500" />
                <div>
                    <h3 className="text-lg font-semibold">Réclamations</h3>
                    <p className="text-2xl font-bold">{totalClaims}</p>
                </div>
            </div>

            <div className="bg-white shadow rounded-xl p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-700 mb-1">Activité Globale</h3>
                <p className="text-3xl font-bold text-cmsblue">
                    {(totalTransactions + totalSubscriptions + totalClaims).toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">Enregistrements</p>
            </div>
        </div>
    );
}
