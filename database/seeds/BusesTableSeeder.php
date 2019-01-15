<?php

use Illuminate\Database\Seeder;

class BusesTableSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //

        DB::table('buses')->insert([
            'name' => 'The 55 bus'
        ]);

        DB::table('buses')->insert([
            'name' => 'The 58 bus'
        ]);

        DB::table('buses')->insert([
            'name' => 'The 33 bus'
        ]);
    }

}
