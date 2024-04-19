<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;

class FilterPageController extends Controller
{
    public function index()
    {
        $usersAll = User::all();
        $filteredUsers = $usersAll->map(function ($user) {
            return [
                'name' => $user->name,
                'email' => $user->email,
                'whatsapp' => $user->whatsapp,
                'idade' => $user->idade,
                'nascimento' => $user->nascimento,
                'sexo' => $user->sexo,
                'bairro' => $user->bairro,
                'cidade' => $user->cidade,
                'created_at' => $user->created_at,
            ];
        });
        return Inertia::render('Filter', ['usersAll' => $filteredUsers]);
    }
}
