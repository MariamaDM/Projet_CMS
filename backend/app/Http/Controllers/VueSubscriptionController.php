<?php

namespace App\Http\Controllers;

use App\Models\VueSubscription;
use Illuminate\Http\Request;

class VueSubscriptionController extends Controller
{
    public function getEvolutionAnnuelle()
    {
        $data = VueSubscription::select('mois')
            ->selectRaw('SUM(nb_souscriptions) as total_souscriptions')
            ->groupBy('mois')
            ->orderBy('mois')
            ->get();

        return response()->json($data);
    }
}
