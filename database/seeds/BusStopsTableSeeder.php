<?php

use Illuminate\Database\Seeder;

class BusStopsTableSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('bus_stops')->insert([
            'name' => 'Zhukova',
            'latitude' => 54.97995643,
            'longitude' => 73.41087252
        ]);

        DB::table('bus_stops')->insert([
            'name' => 'Lermontova',
            'latitude' => 54.98307785,
            'longitude' => 73.41034681
        ]);

        DB::table('bus_stops')->insert([
            'name' => 'Decabristov',
            'latitude' => 54.98459537,
            'longitude' => 73.39187443
        ]);
    }

}
