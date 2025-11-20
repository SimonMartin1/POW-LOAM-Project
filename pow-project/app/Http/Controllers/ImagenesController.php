<?php

namespace App\Http\Controllers;

use App\Models\Imagenes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;

class ImagenesController extends Controller
{
    public function index()
    {
        $imagenes = Imagenes::all();
        return Inertia::render('imagenes/index', compact('imagenes'));
    }

    public function agregar()
    {
        return Inertia::render('imagenes/agregar');
    }

    public function guardar(Request $request)
    {
        $validatedData = $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'required|string',
            'autor' => 'required|string|max:255',
            'fecha_creacion' => 'required|date',
            'imagen' => 'required|image|max:20480',
        ]);

        $path = $request->file('imagen')->store('imagenes', 'public');

        Imagenes::create([
            'nombre' => $validatedData['nombre'],
            'descripcion' => $validatedData['descripcion'],
            'autor' => $validatedData['autor'],
            'fecha_creacion' => $validatedData['fecha_creacion'],
            'url_imagen' => $path,
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
            'fecha_creacion'  => ['nullable','date'],
            'imagen'          => ['nullable','image','max:5120'],
        ]);

        $imagen->nombre         = $data['nombre'];
        $imagen->autor          = $data['autor'] ?? null;
        $imagen->descripcion    = $data['descripcion'] ?? null;
        $imagen->fecha_creacion = $data['fecha_creacion'] ?? null;

        if ($request->hasFile('imagen')) {
            if ($imagen->url_imagen && Storage::disk('public')->exists($imagen->url_imagen)) {
                Storage::disk('public')->delete($imagen->url_imagen);
            }

            $path = $request->file('imagen')->store('imagenes', 'public');
            $imagen->url_imagen = $path;
        }

        $imagen->save();

        return Redirect::route('imagenes.index')->with('success', 'Imagen actualizada correctamente.');
    }

    public function editar($id)
    {
        $imagen = Imagenes::findOrFail($id);
        return Inertia::render('imagenes/editar', compact('imagen'));
    }

    /* ----------------------------
       GALERÍA PÚBLICA
    -----------------------------*/
    public function galeria()
    {
        $imagenes = Imagenes::withCount(['comments', 'likes'])
            ->orderBy('fecha_creacion', 'desc')
            ->get();

        return Inertia::render('galeria/index', [
            'imagenes' => $imagenes
        ]);
    }

    /* ----------------------------
       DETALLE PÚBLICO
    -----------------------------*/
    public function detalle($id)
    {
        $imagen = Imagenes::with([
            'comments.user',
            'likes'
        ])->findOrFail($id);

        $user = Auth::user();

        $comments = $imagen->comments()
            ->latest()
            ->get()
            ->map(function ($c) use ($user) {
                return [
                    'id'         => $c->id,
                    'body'       => $c->body,
                    'user_name'  => $c->user->name,
                    'created_at' => $c->created_at->diffForHumans(),
                    'is_owner'   => $user ? $user->id === $c->user_id : false,
                ];
            });

        return Inertia::render('galeria/detalle', [
            'imagen'     => $imagen,
            'comments'   => $comments,
            'likesCount' => $imagen->likes()->count(),
            'userLiked'  => $user ? $imagen->likes()->where('user_id', $user->id)->exists() : false,
        ]);
    }
}
