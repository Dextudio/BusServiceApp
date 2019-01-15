<?php

use Illuminate\Database\Seeder;
use App\User;

class UsersTableSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        if (!User::where('email', 'user1@gmail.com')->first()) {
            DB::table('users')->insert([
                'name' => 'user1',
                'email' => 'user1@gmail.com',
                'password' => bcrypt('123'),
                'latitude' => 54.96995643, // широта
                'longitude' => 73.40087252  // долгота
            ]);
        }
    }

}
