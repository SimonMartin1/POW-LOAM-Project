<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\Comment;
use App\Models\ImageLike;

class Imagenes extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'nombre',
        'descripcion',
        'autor',
        'fecha_creacion',
        'url_imagen',
    ];

    protected $casts = [
        'fecha_creacion' => 'date',
    ];

    // Comentarios asociados a la imagen
    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class, 'imagen_id');
    }

    // Likes asociados a la imagen
    public function likes(): HasMany
    {
        return $this->hasMany(ImageLike::class, 'imagen_id');
    }
}
