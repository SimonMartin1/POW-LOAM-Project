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
        $imagenes = Imagenes::all();
        return Inertia::render('imagenes/index', compact('imagenes'));
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

    public function eliminar($id)
    {
        $imagen = Imagenes::findOrFail($id);

        if ($imagen->url_imagen && Storage::disk('public')->exists($imagen->url_imagen)) {
            Storage::disk('public')->delete($imagen->url_imagen);
        }

        $imagen->delete();

        return back()->with('success', 'Imagen eliminada correctamente.');
    }

    public function actualizar(Request $request, Imagenes $imagen)
    {
        
        $data = $request->validate([
            'nombre'          => ['required','string','max:255'],
            'autor'           => ['nullable','string','max:255'],
            'descripcion'     => ['nullable','string'],
            'fecha_creacion'  => ['nullable','date'], // viene ISO desde el front
            'imagen'          => ['nullable','image','max:5120'], // 5MB
        ]);

        // Actualiza campos base
        $imagen->nombre         = $data['nombre'];
        $imagen->autor          = $data['autor'] ?? null;
        $imagen->descripcion    = $data['descripcion'] ?? null;
        $imagen->fecha_creacion = $data['fecha_creacion'] ?? null;

        // Si subieron nueva imagen, reemplazamos archivo
        if ($request->hasFile('imagen')) {
            // Borra anterior si existe
            if ($imagen->url_imagen && Storage::disk('public')->exists($imagen->url_imagen)) {
                Storage::disk('public')->delete($imagen->url_imagen);
            }

            $path = $request->file('imagen')->store('imagenes', 'public'); // -> storage/app/public/imagenes
            $imagen->url_imagen = $path; // guardamos solo la ruta relativa
        }

        $imagen->save();

        return Redirect::route('imagenes.index')->with('success', 'Imagen actualizada correctamente.');
    }

    public function editar($id)
    {
        $imagen = Imagenes::findOrFail($id);
        return Inertia::render('imagenes/editar', compact('imagen'));
    }
    public function galeria()
    {
        $imagenes = Imagenes::all();

        return Inertia::render('galeria/index', [
            'imagenes' => $imagenes
        ]);
    }
    public function detalle($id)
    {
        $imagen = Imagenes::findOrFail($id);

        return Inertia::render('galeria/detalle', [
            'imagen' => $imagen
        ]);
    }

    
}
