<?php

use App\Http\Controllers\ImagenesController;
use App\Http\Controllers\VisitController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\News;
use App\Models\Imagenes;

/**
 * ---------------------------------------------------------
 *  RUTAS PÚBLICAS (SIN LOGIN)
 * ---------------------------------------------------------
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


/**
 * ---------------------------------------------------------
 *  RUTAS PRIVADAS (LOGIN REQUERIDO)
 * ---------------------------------------------------------
 */
Route::middleware(['auth', 'verified'])->group(function () {

    // Dashboard
    Route::get('/dashboard', fn() => Inertia::render('dashboard'))
        ->name('dashboard');
});

/**
 * ---------------------------------------------------------
 *  RUTAS SOLO ADMIN (ABM DE IMÁGENES)
 * ---------------------------------------------------------
 */
Route::middleware(['auth','verified','role:admin'])->group(function () {

    Route::get('/imagenes', [ImagenesController::class, 'index'])->name('imagenes.index');
    Route::get('/imagenes/agregar', [ImagenesController::class, 'agregar'])->name('imagenes.agregar');
    Route::post('/imagenes/guardar', [ImagenesController::class, 'guardar'])->name('imagenes.guardar');

    Route::get('/imagenes/{imagen}/editar', [ImagenesController::class, 'editar'])->name('imagenes.editar');
    Route::put('/imagenes/{imagen}', [ImagenesController::class, 'actualizar'])->name('imagenes.actualizar');

    Route::delete('/imagenes/{id}', [ImagenesController::class, 'eliminar'])->name('imagenes.eliminar');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
