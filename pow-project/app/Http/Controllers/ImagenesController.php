<?php

namespace App\Http\Controllers;

use App\Models\Imagenes;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;

class ImagenesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('imagenes/index',[]);
    }

    public function agregar()
    {
        return Inertia::render('imagenes/agregar',[]);
    }

    public function guardar(Request $request)
    {
        $validatedData = $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'required|string',
            'autor' => 'required|string|max:255',
            'fecha_creacion' => 'required|date',
            'imagen' => 'required|image|max:2048', // max:2048 = 2MB
        ]);

        $path = $request->file('imagen')->store('imagenes', 'public');

        Imagenes::create([
            'nombre' => $validatedData['nombre'],
            'descripcion' => $validatedData['descripcion'],
            'autor' => $validatedData['autor'],
            'fecha_creacion' => $validatedData['fecha_creacion'],
            'url_imagen' => $path, // <-- ¡Guardamos la RUTA, no el archivo!
        ]);

        return redirect()->route('imagenes.index')->with('success', 'Imagen guardada correctamente.');
    }
    
}
