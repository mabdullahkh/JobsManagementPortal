<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class JobStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Define the statuses
        $statuses = [
            ['name' => 'Incomplete'],
            ['name' => 'Pending'],
            ['name' => 'Completed'],
        ];

        // Insert statuses into the database using DB
        DB::table('job_status')->insert($statuses);
    }
}
