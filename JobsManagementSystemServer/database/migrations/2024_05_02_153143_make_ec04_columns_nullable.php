<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('EC04', function (Blueprint $table) {
            $table->string('jobname')->nullable()->change();
            $table->string('joblead')->nullable()->change();
            $table->string('jobaddress')->nullable()->change();
            $table->string('measure')->nullable()->change();
            $table->date('job_starting_date')->nullable()->change();
            $table->string('epc_rating')->nullable()->change();
            $table->date('expected_ending_date')->nullable()->change();
            $table->unsignedBigInteger('assigned_engineer_id')->nullable()->change();
            $table->unsignedBigInteger('insulation_installer_id')->nullable()->change();
            $table->decimal('cost_of_job', 10, 2)->nullable()->change();
            $table->text('data_match')->nullable()->change();
            $table->text('abs_field')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
