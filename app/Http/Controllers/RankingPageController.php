<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class RankingPageController extends Controller
{
    public function index()
    {
        $usersAll = User::all();
        $rank = $usersAll->map(function ($user) {
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
                'idade' => $user->idade,
                'nascimento' => $user->nascimento,
                'sexo' => $user->sexo,
                'bairro' => $user->bairro,
                'cidade' => $user->cidade,
                'zona_eleitoral' => $user->zona_eleitoral,
                'user_id' => $user->user_id,
                'rede' => $networkSum,
                'created_at' => $user->created_at,
            ];
        });
        $groupedBairros = DB::table('users')
            ->select('bairro', DB::raw('COUNT(*) as count'))
            ->groupBy('bairro')
            ->orderBy('count', 'desc')
            ->get()
            ->map(function ($item) {
                return [
                    'name' => $item->bairro,
                    'count' => $item->count,
                ];
            });
        return Inertia::render('Ranking', ['rank' => $rank, 'groupedBairros' => $groupedBairros]);
    }
}
