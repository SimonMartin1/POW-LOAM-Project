<?php

use App\Http\Controllers\ImagenesController;
use App\Http\Controllers\VisitController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ImageLikeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\News;
use App\Models\Imagenes;
use App\Models\User;
use App\Models\Visit;

/*
|--------------------------------------------------------------------------
| RUTAS PÚBLICAS
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    $imagenes = Imagenes::whereNotNull('url_imagen')
        ->where('url_imagen', '!=', '')
        ->inRandomOrder()
        ->take(2)
        ->get();

    return Inertia::render('welcome', [
        'imagenes' => $imagenes,
        'noticias' => News::latest('published_at')->take(4)->get()
    ]);
})->name('home');

// Galería pública
Route::get('/galeria', [ImagenesController::class, 'galeria'])->name('galeria.public');
Route::get('/galeria/{id}', [ImagenesController::class, 'detalle'])->name('galeria.public.detalle');

// Visitas 
Route::post('/visitas/solicitar', [VisitController::class, 'store'])->name('visits.store');

/*
|--------------------------------------------------------------------------
| RUTAS PRIVADAS (LOGIN)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/dashboard', function () {
    return Inertia::render('dashboard', [
        'stats' => [
            'total_obras' => Imagenes::count(),
            'total_usuarios' => User::count(),
            'total_visitas' => Visit::count(),
            ]
        ]);
    })->name('dashboard');

    // --- Comentarios ---
    Route::post('/comentarios', [CommentController::class, 'store'])->name('comentarios.store');

    Route::delete('/comentarios/{id}', [CommentController::class, 'destroy'])
        ->name('comentarios.destroy');

    Route::get('/mis-comentarios', [CommentController::class, 'misComentarios'])
        ->name('comentarios.miscomentarios');

    // --- Likes ---
    Route::post('/likes/toggle', [ImageLikeController::class, 'toggle'])->name('likes.toggle');
    Route::get('/mis-likes', [ImageLikeController::class, 'misLikes'])
        ->name('likes.mislikes');

});

/*
|--------------------------------------------------------------------------
| RUTAS SOLO ADMIN
|--------------------------------------------------------------------------
*/
Route::middleware(['auth','verified','role:admin'])->group(function () {

    Route::get('/imagenes', [ImagenesController::class, 'index'])->name('imagenes.index');
    Route::get('/imagenes/agregar', [ImagenesController::class, 'agregar'])->name('imagenes.agregar');
    Route::post('/imagenes/guardar', [ImagenesController::class, 'guardar'])->name('imagenes.guardar');

    Route::get('/imagenes/{imagen}/editar', [ImagenesController::class, 'editar'])->name('imagenes.editar');
    Route::put('/imagenes/{imagen}', [ImagenesController::class, 'actualizar'])->name('imagenes.actualizar');

    Route::delete('/imagenes/{id}', [ImagenesController::class, 'eliminar'])->name('imagenes.eliminar');
});

Route::middleware(['auth','verified','role:admin'])->group(function () {

    Route::get('/visitas', [VisitController::class, 'index'])->name('visitas.index');
    Route::post('/visitas/{id}/approve', [VisitController::class, 'approve'])->name('visitas.approve');
    Route::post('/visitas/{id}/reject', [VisitController::class, 'reject'])->name('visitas.reject');

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
