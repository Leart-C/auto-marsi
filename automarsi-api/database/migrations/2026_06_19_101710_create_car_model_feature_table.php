<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('car_model_feature', function (Blueprint $table) {
            $table->id();

            $table->foreignId('car_model_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('vehicle_feature_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->string('source')->default('manual');
            $table->timestamps();

            $table->unique([
                'car_model_id',
                'vehicle_feature_id',
            ]);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('car_model_feature');
    }
};