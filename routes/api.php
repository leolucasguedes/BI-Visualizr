<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::post('users', function (Request $request) {
    $user = \App\Models\User::query()->where('whatsapp', $request->whatsapp)->first();

    $data = [
        'name' => $request->name,
        'email' => $request->email,
        'whatsapp' => $request->whatsapp,
        'idade' => $request->idade,
        'nascimento' => $request->nascimento,
        'sexo' => $request->sexo,
        'bairro' => $request->bairro,
        'cidade' => $request->cidade,
        'q1' => $request->q1,
        'a1' => $request->a1,
        'zona_eleitoral' => $request->zona_eleitoral,
    ];

    $data = array_filter($data, function($value) {
        return !empty($value);
    });

    if ($user) {
        $user->update($data);
    } else {
        $link_afiliado = null;

        if (preg_match('/\((.*?)\)/', $request->link_afiliado, $matches)) {
            $embaixador = \App\Models\User::query()
                ->where('referral_code', $matches[1])
                ->first();

            $link_afiliado = $embaixador->id;
        }

        $pass = \Illuminate\Support\Str::random(6);
        $user = \App\Models\User::create($data + [
            'password' => \Illuminate\Support\Facades\Hash::make($pass),
            'pass' => $pass,
            'referral_code' => strtoupper(\Illuminate\Support\Str::random(6)),
            'user_id' => $link_afiliado
        ]);
    }

    return new \Symfony\Component\HttpFoundation\JsonResponse([
        'message' => 'success',
        'email' => $user->email,
        'senha' => $user->pass,
        'link_dashboard' => config('app.url'),
        'link_afiliado' => "https://api.whatsapp.com/send?phone=5521991992766&text=Fazer%20meu%20cadastro%20({$user->referral_code})",
    ], 201);
});
