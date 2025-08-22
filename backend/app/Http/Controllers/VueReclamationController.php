<?php

namespace App\Http\Controllers;

use App\Models\VueReclamation;
use Illuminate\Http\Request;

class VueReclamationController extends Controller
{
    // Répartition des réclamations par statut (pour PieChart)
    public function getByStatus()
    {
        $data = VueReclamation::select('status')
            ->selectRaw('SUM(nb_reclamations) as total_reclamations')
            ->groupBy('status')
            ->get();

        return response()->json($data);
    }

    // Évolution annuelle (par mois) -> tu gardes ton ancien code si tu veux afficher une courbe
    public function getEvolutionAnnuelle()
    {
        $data = VueReclamation::select('mois')
            ->selectRaw('SUM(nb_reclamations) as total_reclamations')
            ->groupBy('mois')
            ->orderBy('mois')
            ->get();

        return response()->json($data);
    }
}
