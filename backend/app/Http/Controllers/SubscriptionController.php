<?php

namespace App\Http\Controllers;

use App\Models\Subscription;
use Illuminate\Http\Request;

class SubscriptionController extends Controller
{
    public function getSubscriptions(){
        $subscriptions = Subscription::count();
        return response()->json($subscriptions);
    }
}
