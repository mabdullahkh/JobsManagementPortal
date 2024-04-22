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
        Schema::table('private_jobs', function (Blueprint $table) {
            $table->decimal('labour_cost', 10, 2)->after('job_type')->nullable();
            $table->decimal('material_cost', 10, 2)->after('labour_cost')->nullable();
            $table->decimal('other_expense', 10, 2)->after('material_cost')->nullable();
            $table->decimal('net_profit', 10, 2)->after('other_expense')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('private_jobs', function (Blueprint $table) {
            $table->dropColumn('labour_cost');
            $table->dropColumn('material_cost');
            $table->dropColumn('other_expense');
            $table->dropColumn('net_profit');
        });
    }
};
