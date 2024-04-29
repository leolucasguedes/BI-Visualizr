<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;

class UserPageController extends Controller
{
    public function index($id)
    {
        $usersAll = User::all();
        $filteredUsers = $usersAll->map(function ($user) {
            $indicatedUsers = User::where('user_id', $user->id)->get();

            $sumIndicated = $indicatedUsers->sum(function ($indicatedUser) {
                return User::where('user_id', $indicatedUser->id)->count();
            });

            $networkSum = $indicatedUsers->count() + $sumIndicated;

            return [
                "id"=> $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'whatsapp' => $user->whatsapp,
                'sexo' => $user->sexo,
                'bairro' => $user->bairro,
                'cidade' => $user->cidade,
                'user_id' => $user->user_id,
                'indicacoes' => $indicatedUsers->count(),
                'rede' => $networkSum,
                'a1' => $user->a1,
            ];
        });
        $user = User::findOrFail($id);
        $indicatedUsersMain = User::where('user_id', $user->id)->get();
        $sumIndicatedMain = $indicatedUsersMain->sum(function ($indicatedUser) {
            return User::where('user_id', $indicatedUser->id)->count();
        });
        $networkSumMain = $indicatedUsersMain->count() + $sumIndicatedMain;

        return Inertia::render('UserPage', ['userDT' => $user, 'usersAll' => $filteredUsers, 'rede' => $networkSumMain]);
    }
}
