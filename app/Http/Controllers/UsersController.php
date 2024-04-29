<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;

class UsersController extends Controller
{
    public function index()
    {
        $usersAll = User::all();
        $filteredUsers = $usersAll->map(function ($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'whatsapp' => $user->whatsapp,
                'idade' => $user->idade,
                'nascimento' => $user->nascimento,
                'sexo' => $user->sexo,
                'bairro' => $user->bairro,
                'cidade' => $user->cidade,
                'zona_eleitoral' => $user->zona_eleitoral,
                'user_id' => $user->user_id,
                'a1' => $user->a1,
                'created_at' => $user->created_at,
            ];
        });
        return Inertia::render('Users', ['usersAll' => $filteredUsers]);
    }
}
