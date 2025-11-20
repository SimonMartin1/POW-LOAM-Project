<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

/*
|--------------------------------------------------------------------------
| API Routes - Museo
|--------------------------------------------------------------------------
*/

Route::post('/mobile/login', function (Request $request) {

    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);


    $user = User::where('email', $request->email)->first();

    if (! $user || ! Hash::check($request->password, $user->password)) {
        return response()->json(['message' => 'Datos incorrectos'], 401);
    }

    $user->tokens()->delete();
    $token = $user->createToken('mobile-app')->plainTextToken;

    return response()->json([
        'token' => $token,
        'user' => $user
    ]);
});

Route::post('/mobile/register', function (Request $request) {
    // 1. Validamos los datos
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users', // unique:users evita duplicados
        'password' => 'required|string|min:8',
    ]);

    // 2. Creamos el usuario
    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
    ]);

    // 3. ¡Auto-Login! Generamos el token de una vez
    $token = $user->createToken('mobile-app')->plainTextToken;

    return response()->json([
        'message' => 'Usuario registrado exitosamente',
        'user' => $user,
        'token' => $token
    ]);
});

// 1. Endpoint para NOTICIAS (Tabla 'news')
Route::get('/news', function () {
    // Ordenamos por fecha de publicación (published_at)
    return DB::table('news')
        ->select('id', 'title', 'excerpt', 'image_path', 'published_at')
        ->orderBy('published_at', 'desc')
        ->get();
});

// 2. Endpoint para GALERÍA (Tabla 'imagenes')
Route::get('/imagenes', function () {
    // Ordenamos por fecha de creación
    return DB::table('imagenes')
        ->select('id', 'nombre', 'descripcion', 'autor', 'url_imagen', 'fecha_creacion')
        ->orderBy('fecha_creacion', 'desc')
        ->get();
});