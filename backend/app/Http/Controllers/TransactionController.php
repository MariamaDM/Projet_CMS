<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    public function getTotalTransactions(){
        $totalTransactions = Transaction::count();
        return response()->json($totalTransactions);
    }

    public function getTotalAmount(){
        $totalAmount = Transaction::sum('amount');
        return response()->json($totalAmount);
    }
}
