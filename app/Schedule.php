<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{

    public $timestamps = false;
    protected $fillable = ['bus_id', 'bus_stop_id', 'time'];

    public function bus()
    {
        return $this->belongsTo('App\Bus');
    }

}
