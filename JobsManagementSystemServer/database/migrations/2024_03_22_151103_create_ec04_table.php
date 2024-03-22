<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEC04Table extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $this->down();
        Schema::create('EC04', function (Blueprint $table) {
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
            $table->timestamp('timestamp')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('EC04');
    }
}
