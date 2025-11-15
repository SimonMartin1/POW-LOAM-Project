<?php

use App\Http\Controllers\ImagenesController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/**
 * Público (sin login)
 */
Route::get('/', fn () => Inertia::render('welcome'))->name('home');

Route::middleware(['auth','verified'])->group(function () {
    Route::get('/dashboard', fn () => Inertia::render('dashboard'))->name('dashboard'); // o visitor.search
});

Route::middleware(['auth', 'role:admin'])->get('/__role_test', function () {
    return 'Spatie roles OK';
});

/**
 * Área solo Admin (gestión/ABM)
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
