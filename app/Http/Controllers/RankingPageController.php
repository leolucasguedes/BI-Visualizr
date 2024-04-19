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
                'user_id' => $user->user_id,
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
