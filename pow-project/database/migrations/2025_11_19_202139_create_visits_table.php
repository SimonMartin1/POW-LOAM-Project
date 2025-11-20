<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
    Schema::create('visits', function (Blueprint $table) {
        $table->id();
        $table->string('institution'); // Escuela
        $table->integer('students_count'); // Cantidad de alumnos
        $table->date('visit_date')->nullable(); // Fecha estimada
        $table->string('responsible_name'); // Nombre del profe
        $table->string('email'); // Contacto
        
        // Agregamos un estado para que luego puedas administrarlo en un panel
        $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
        
        $table->timestamps();
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('visits');
    }
};
