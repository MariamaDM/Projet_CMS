<?php

use App\Http\Controllers\ClaimController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\VueReclamationController;
use App\Http\Controllers\VueSubscriptionController;
use App\Http\Controllers\VueTransactionController;
use App\Models\Subscription;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/total-transactions', [TransactionController::class, 'getTotalTransactions']);
Route::get('/total-amount', [TransactionController::class, 'getTotalAmount']);
Route::get('/subscriptions', [SubscriptionController::class, 'getSubscriptions']);
Route::get('/claims', [ClaimController::class, 'getClaims']);

Route::get('/transactions/evolution', [VueTransactionController::class, 'getEvolutionAnnuelle']);
Route::get('/souscriptions/evolution', [VueSubscriptionController::class, 'getEvolutionAnnuelle']);
Route::get('/reclamations/evolution', [VueReclamationController::class, 'getEvolutionAnnuelle']);
Route::get('/reclamations/status', [VueReclamationController::class, 'getByStatus']);
