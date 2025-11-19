<?php

namespace App\Http\Controllers;

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
}
