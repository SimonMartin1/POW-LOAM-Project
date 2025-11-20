<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('image_likes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('imagen_id');
            $table->unsignedBigInteger('user_id');
            $table->timestamps();

            $table->foreign('imagen_id')
                ->references('id')->on('imagenes')
                ->onDelete('cascade');

            $table->foreign('user_id')
                ->references('id')->on('users')
                ->onDelete('cascade');

            $table->unique(['imagen_id', 'user_id']); // Una vez por usuario
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('image_likes');
    }
};
