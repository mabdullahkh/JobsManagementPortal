<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateEC04Table extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('EC04', function (Blueprint $table) {
            // Add columns
            $table->decimal('labour_cost', 10, 2)->nullable();
            $table->decimal('material_cost', 10, 2)->nullable();
            $table->decimal('other_expense', 10, 2)->nullable();
            $table->decimal('net_profit', 10, 2)->nullable();
            $table->decimal('abs_rate', 10, 2)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('EC04', function (Blueprint $table) {
            // Drop columns if needed
            $table->dropColumn('labour_cost');
            $table->dropColumn('material_cost');
            $table->dropColumn('other_expense');
            $table->dropColumn('net_profit');
            $table->dropColumn('abs_rate');
        });
    }
}
