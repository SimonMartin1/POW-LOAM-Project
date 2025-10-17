<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Imagenes extends Model
{
    public $timestamps = false;
    protected $fillable = ['nombre', 'descripcion', 'autor', 'fecha_creacion', 'url_imagen'];

    protected $casts = [
        'fecha_creacion' => 'date',
    ];
}
