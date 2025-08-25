<?php

namespace App\Http\Controllers;

use App\Models\VueTransaction;
use Illuminate\Http\Request;

class VueTransactionController extends Controller
{
    public function getEvolutionAnnuelle()
    {
        $data = VueTransaction::select('period')
            ->selectRaw('SUM(total_montant) as total_montant')
            ->groupBy('period')
            ->orderBy('period')
            ->get();

        return response()->json($data);
    }
}
