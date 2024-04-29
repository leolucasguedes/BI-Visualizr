<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Carbon;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::post('users', function (Request $request) {
    $user = \App\Models\User::query()->where('whatsapp', $request->whatsapp)->first();

    try {
        $nascimento = \Carbon\Carbon::createFromFormat('dmY', $request->nascimento);

        if ($nascimento === false) {
            throw new Exception('Invalid date value.');
        }
    } catch (\Exception $e) {
        $nascimento = null;
    }

    function normalizarNome($nome) {
        $nome = trim($nome);
        $mapeamento = array(
            "rj" => "Rio de Janeiro",
            "rio de janeiro"=> "Rio de Janeiro",
            "rio"=> "Rio de Janeiro",
            "campo grande"=> "Campo Grande",
            "cg"=> "Campo Grande",
            "campo-grande"=> "Campo Grande",
            "campo grande rj"=> "Campo Grande",
            "cosmos"=> "Cosmos",
            "barra da tijuca"=> "Barra da Tijuca",
            "barra"=> "Barra da Tijuca",
            "freguesia, jacarepaguá"=> "Freguesia",
            "freguesia - jacarepaguá"=> "Freguesia",
            "recreio dos bandeirantes"=> "Recreio",
            "são joão de meriti"=> "São João de Meriti",
            "nova iguaçu"=> "Nova Iguaçu",
            "nilopolis"=> "Nilópolis",
            "inhauma"=> "Inhaúma",
            "ilha do governador"=> "Ilha do Governador",
            "barra de guaratiba"=> "Barra de Guaratiba",

        );

        $nomeNormalizado = isset($mapeamento[strtolower($nome)]) ? $mapeamento[strtolower($nome)] : $nome;

        return $nomeNormalizado;
    }

    $bairroNormalizado = normalizarNome($request->bairro);
    $cidadeNormalizada = normalizarNome($request->cidade);

    $data = [
        'name' => $request->name,
        'email' => $request->email,
        'whatsapp' => $request->whatsapp,
        'nascimento' => $nascimento?->format('Y-m-d'),
        'idade' => $nascimento?->diffInYears(Carbon::now()),
        'sexo' => $request->sexo,
        'bairro' => $bairroNormalizado,
        'cidade' => $cidadeNormalizada,
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
