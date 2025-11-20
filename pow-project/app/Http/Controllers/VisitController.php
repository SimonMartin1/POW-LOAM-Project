<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Visit;
use Illuminate\Http\Request;


class VisitController extends Controller
{
    public function store(Request $request)
    {
        // 1. Validamos los datos que vienen del formulario
        $validated = $request->validate([
            'institution' => 'required|string|max:255',
            'students_count' => 'required|integer|min:1',
            'visit_date' => 'required|date|after:today', // Que sea una fecha futura
            'responsible_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
        ]);

        // 2. Guardamos en la base de datos
        Visit::create($validated);

        // 3. Retornamos éxito (Inertia manejará esto sin recargar toda la página)
        return back()->with('success', '¡Solicitud enviada correctamente!');
    }

    public function index()
    {
        $visitas = \App\Models\Visit::latest()->get();

        return Inertia::render('visitas/index', [
            'visitas' => $visitas
        ]);
    }
    public function approve($id)
    {
        $visit = Visit::findOrFail($id);
        $visit->status = "approved";
        $visit->save();

        return back()->with('success', 'Visita aprobada correctamente.');
    }

    public function reject($id)
    {
        $visit = Visit::findOrFail($id);
        $visit->status = "rejected";
        $visit->save();

        return back()->with('success', 'Visita rechazada correctamente.');
    }
    
}
