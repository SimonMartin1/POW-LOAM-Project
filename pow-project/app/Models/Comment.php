<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Comment extends Model
{
    protected $fillable = [
        'imagen_id',
        'user_id',
        'body',
    ];

    public function imagen(): BelongsTo
    {
        return $this->belongsTo(Imagenes::class, 'imagen_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
