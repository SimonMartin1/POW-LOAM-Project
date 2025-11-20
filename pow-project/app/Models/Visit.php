<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Visit extends Model
{
    use HasFactory;

    protected $fillable = [
        'institution',
        'students_count',
        'visit_date',
        'responsible_name',
        'email',
        'status'
    ];

    // Casteamos la fecha para que Carbon la maneje bien
    protected $casts = [
        'visit_date' => 'date',
    ];
}
