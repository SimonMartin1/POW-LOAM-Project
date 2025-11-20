<?php

namespace App\Http\Controllers;

use App\Models\ImageLike;
use App\Models\Imagenes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ImageLikeController extends Controller
{
    public function toggle(Request $request)
    {
        $request->validate([
            'imagen_id' => 'required|integer|exists:imagenes,id',
        ]);

        $user = Auth::user();
        $imagenId = $request->imagen_id;

        // Si ya existe → quitar
        $existing = ImageLike::where('user_id', $user->id)
            ->where('imagen_id', $imagenId)
            ->first();

        if ($existing) {
            $existing->delete();
        } else {
            ImageLike::create([
                'user_id'   => $user->id,
                'imagen_id' => $imagenId,
            ]);
        }

        return back();
    }

    /**
     * Mostrar la lista de "Mis Me Gusta"
     */
    public function misLikes()
    {
        $user = Auth::user();

        $likes = $user->likes()
            ->with('imagen')
            ->latest()
            ->get();

        return Inertia::render('likes/index', [
            'likes' => $likes
        ]);
    }
}
