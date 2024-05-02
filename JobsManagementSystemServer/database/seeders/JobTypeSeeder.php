<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class JobTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $jobsTypes = ['Heat Pump Job', 'Boiler Job'];

        foreach ($jobsTypes as $jobType) {
            DB::table('job_types')->insert([
                'name' => $jobType,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
