<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Imagenes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'imagen_id' => ['required', 'exists:imagenes,id'],
            'body'      => ['required', 'string', 'max:1000'],
        ]);

        $imagen = Imagenes::findOrFail($data['imagen_id']);

        Comment::create([
            'imagen_id' => $imagen->id,
            'user_id'   => Auth::id(),
            'body'      => $data['body'],
        ]);

        return back()->with('success', 'Comentario agregado correctamente.');
    }

    public function destroy(Comment $comment)
    {
        $user = Auth::user();

        if (! $user) {
            abort(403);
        }

        // El autor del comentario o un admin puede borrar
        if ($comment->user_id !== $user->id && ! $user->hasRole('admin')) {
            abort(403);
        }

        $comment->delete();

        return back()->with('success', 'Comentario eliminado.');
    }

    public function misComentarios()
    {
        $user = auth()->user();

        $comentarios = $user->comments()
            ->with('imagen') // carga la obra comentada
            ->latest()
            ->get();

        return \Inertia\Inertia::render('comentarios/index', [
            'comentarios' => $comentarios
        ]);
    }

}
