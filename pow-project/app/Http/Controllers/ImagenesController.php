<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Inertia\Inertia;

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
    
}
