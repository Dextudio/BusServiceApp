<?php

use Illuminate\Database\Seeder;

class SchedulesTableSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // first bus

        DB::table('schedules')->insert([
            'bus_id' => 1,
            'bus_stop_id' => 1,
            'time' => '04:02'
        ]);
        DB::table('schedules')->insert([
            'bus_id' => 1,
            'bus_stop_id' => 2,
            'time' => '05:02'
        ]);
        DB::table('schedules')->insert([
            'bus_id' => 1,
            'bus_stop_id' => 3,
            'time' => '05:32'
        ]);

        // second bus

        DB::table('schedules')->insert([
            'bus_id' => 2,
            'bus_stop_id' => 1,
            'time' => '07:02'
        ]);
        DB::table('schedules')->insert([
            'bus_id' => 2,
            'bus_stop_id' => 2,
            'time' => '10:02'
        ]);
        DB::table('schedules')->insert([
            'bus_id' => 2,
            'bus_stop_id' => 3,
            'time' => '15:32'
        ]);
    }

}
