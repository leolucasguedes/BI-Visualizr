<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;

class RegionPageController extends Controller
{
    public function index($bairro)
    {
        $users = User::where('bairro', $bairro)->get();
        return Inertia::render('RegionPage', ['usersRegion' => $users]);
    }
}
