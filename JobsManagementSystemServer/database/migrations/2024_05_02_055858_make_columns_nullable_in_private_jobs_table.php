<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class MakeColumnsNullableInPrivateJobsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('private_jobs', function (Blueprint $table) {
            $table->string('measure')->nullable()->change();
            $table->string('data_match')->nullable()->change();
            $table->string('epc_rating')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('private_jobs', function (Blueprint $table) {
            $table->string('measure')->nullable(false)->change();
            $table->string('data_match')->nullable(false)->change();
            $table->string('epc_rating')->nullable(false)->change();
        });
    }
}
