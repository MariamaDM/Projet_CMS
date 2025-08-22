<?php

namespace App\Http\Controllers;

use App\Models\Claim;
use Illuminate\Http\Request;

class ClaimController extends Controller
{
    public function getClaims(){
        $claims = Claim::count();
        return response()->json($claims);
    }
}
