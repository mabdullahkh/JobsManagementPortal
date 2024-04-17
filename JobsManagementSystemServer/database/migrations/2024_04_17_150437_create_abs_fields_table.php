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
        $this->down();
        Schema::create('abs_fields', function (Blueprint $table) {
            $table->id();
            $table->string('floor_area_segment');
            $table->string('starting_band');
            $table->string('finishing_band');
            $table->decimal('cost_savings', 10, 2); // Adjust precision and scale as needed
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('abs_fields');
    }
};
