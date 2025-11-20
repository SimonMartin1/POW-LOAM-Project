<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ImageLike extends Model
{
    protected $fillable = [
        'imagen_id',
        'user_id',
    ];

    public function imagen()
    {
        return $this->belongsTo(\App\Models\Imagenes::class, 'imagen_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
