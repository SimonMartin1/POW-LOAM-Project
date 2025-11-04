<?php

use App\Http\Controllers\ImagenesController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/**
 * Público (sin login)
 */
Route::get('/', fn () => Inertia::render('welcome'))->name('home');

Route::middleware(['auth','verified','role:visitor|admin'])->group(function () {
    Route::get('/dashboard', fn () => Inertia::render('dashboard'))->name('dashboard'); // o visitor.search
    Route::get('/imagenes', [ImagenesController::class, 'index'])->name('imagenes.index');
});

Route::middleware(['auth', 'role:admin'])->get('/__role_test', function () {
    return 'Spatie roles OK';
});

/**
 * Área solo Admin (gestión/ABM)
 */
Route::middleware(['auth','verified','role:admin'])->group(function () {
    Route::get('/imagenes/agregar', [ImagenesController::class, 'agregar'])->name('imagenes.agregar');
    Route::post('/imagenes/guardar', [ImagenesController::class, 'guardar'])->name('imagenes.guardar');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
