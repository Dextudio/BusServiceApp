<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSchedulesTable extends Migration
{

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('schedules', function (Blueprint $table) {
            $table->integer('bus_id')->unsigned();
            $table->foreign('bus_id')->references('id')->on('buses')->onDelete('cascade');
            $table->integer('bus_stop_id')->unsigned();
            $table->foreign('bus_stop_id')->references('id')->on('bus_stops')->onDelete('cascade');
            $table->time('time');
            $table->primary(array('bus_id', 'bus_stop_id', 'time'));
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('schedules');
    }

}
