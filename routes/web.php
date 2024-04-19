<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardPageController;
use App\Http\Controllers\RankingPageController;
use App\Http\Controllers\ContactPageController;
use App\Http\Controllers\FilterPageController;
use App\Http\Controllers\UserPageController;
use App\Http\Controllers\RegionPageController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect('/login');
});

Route::get('/dashboard',  [DashboardPageController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/ranking',  [RankingPageController::class, 'index'])->middleware(['auth', 'verified'])->name('ranking');

Route::get('/contato',  [ContactPageController::class, 'index'])->middleware(['auth', 'verified'])->name('contact');

Route::get('/filtro',  [FilterPageController::class, 'index'])->middleware(['auth', 'verified'])->name('filter');

Route::get('/usuario/{id}', [UserPageController::class, 'index'])->middleware(['auth', 'verified'])->name('usuario');

Route::get('/bairro/{name}', [RegionPageController::class, 'index'])->middleware(['auth', 'verified'])->name('bairro');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
