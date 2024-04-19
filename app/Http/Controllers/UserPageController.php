<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;

class UserPageController extends Controller
{
    public function index($id)
    {
        $user = User::findOrFail($id);
        return Inertia::render('UserPage', ['userDT' => $user]);
    }
}
