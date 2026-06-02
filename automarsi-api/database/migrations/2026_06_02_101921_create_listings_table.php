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
        Schema::create('listings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('make_id')->constrained()->restrictOnDelete();
            $table->foreignId('car_model_id')->constrained('car_models')->restrictOnDelete();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();

            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description')->nullable();

            $table->unsignedSmallInteger('year');
            $table->decimal('price', 12, 2);
            $table->string('currency', 3)->default('EUR');

            $table->unsignedInteger('kilometers')->nullable();
            $table->string('fuel_type', 50);
            $table->string('transmission', 50);
            $table->string('body_type', 50)->nullable();
            $table->string('color', 50)->nullable();

            $table->decimal('engine_size', 4, 1)->nullable();
            $table->unsignedSmallInteger('horsepower')->nullable();
            $table->string('vin')->nullable()->unique();
            $table->date('registration_until')->nullable();

            $table->string('condition', 30)->default('used');
            $table->string('status', 30)->default('draft');
            $table->boolean('is_featured')->default(false);

            $table->string('location')->nullable();

            $table->timestamp('published_at')->nullable();
            $table->timestamp('sold_at')->nullable();

            $table->timestamps();
            $table->softDeletes();

            $table->index('status');
            $table->index('condition');
            $table->index('price');
            $table->index('year');
            $table->index('is_featured');
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('listings');
    }
};
