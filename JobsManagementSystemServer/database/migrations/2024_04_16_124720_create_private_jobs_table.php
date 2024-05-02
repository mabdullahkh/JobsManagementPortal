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
        
        Schema::create('private_jobs', function (Blueprint $table) {
            $table->id();
            $table->string('jobname');
            $table->string('joblead');
            $table->string('jobaddress');
            $table->string('measure');
            $table->date('job_starting_date');
            $table->string('epc_rating');
            $table->date('expected_ending_date');
            $table->unsignedBigInteger('assigned_engineer_id');
            $table->foreign('assigned_engineer_id')->references('id')->on('engineer');
            $table->unsignedBigInteger('insulation_installer_id');
            $table->foreign('insulation_installer_id')->references('id')->on('installer');
            $table->decimal('cost_of_job', 10, 2);
            $table->text('data_match');
            $table->text('abs_field');
            $table->text('other_related_note')->nullable();
            $table->string('job_evidence_url')->nullable();
            $table->string('status')->default(1);
            $table->string('job_type')->nullable();
            $table->timestamp('timestamp')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('private_jobs');
    }
};
