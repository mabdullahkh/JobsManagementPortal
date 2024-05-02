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
        Schema::table('EC04', function (Blueprint $table) {
            $table->string('job_type')->nullable(); // Change 'string' to the appropriate data type if needed
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('EC04', function (Blueprint $table) {
            $table->dropColumn('job_type');
        });
    }
};
