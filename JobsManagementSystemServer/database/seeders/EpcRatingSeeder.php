<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EpcRatingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $ratings = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

        foreach ($ratings as $rating) {
            DB::table('epc_ratings')->insert([
                'name' => $rating,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
    public function down()
{
    // Deleting the seeded data from the data_match table
    DB::table('data_match')->whereIn('name', ['Matched Successfully', 'In Process', 'Rejected'])->delete();
}
}
