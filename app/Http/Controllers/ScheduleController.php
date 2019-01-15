<?php

namespace App\Http\Controllers;

use App\Bus;
use App\BusStop;
use App\Schedule;
use Illuminate\Http\Request;
use Validator;

class ScheduleController extends Controller
{

    /**
     * Get all bus stops.
     *
     * @return \Illuminate\Http\Response
     */
    public function getBusStops()
    {
        return response()->json(BusStop::all());
    }

    /**
     * Get buses in stops.
     * 
     * @var int $id id of bus stop
     * @return \Illuminate\Http\Response
     */
    public function getBusStopSchedule($id)
    {
        $shedule = Schedule::where('bus_stop_id', $id)->orderBy('time')->get();
        $result = [];
        foreach ($shedule as $record) {
            if (!isset($result[$record->bus->name])) {
                $result[$record->bus->name] = [];
            }
            $timeParts = explode(":", $record->time);
            $result[$record->bus->name][] = $timeParts[0] * 60 + $timeParts[1];
        }
        return response()->json($result);
    }

    /**
     * Get bus stops.
     * 
     * @var Request $request
     * @return \Illuminate\Http\Response
     */
    public function addBusToStop(Request $request)
    {
        $validator = Validator::make($request->all(), [
                    'busName' => 'required|string',
                    'busStopId' => 'required|integer',
                    'time' => 'required|date_format:H:i'
        ]);
        if ($validator->fails()) {
            return response()->json(["state" => "fail", "errors" => $validator->errors()->all()]);
        }

        $bus = Bus::where(['name' => $request->busName])->first();
        if ($bus == null) {
            $bus = new Bus();
            $bus->name = $request->busName;
            $bus->save();
        }

        $conditions = [
            'bus_stop_id' => $request->busStopId,
            'bus_id' => $bus->id,
            'time' => $request->time,
        ];
        if (Schedule::where($conditions)->first()) {
            return response()->json(["state" => "fail", "errors" => ["this bus is already assigned to this time"]]);
        }
        Schedule::create(['bus_id' => $bus->id, 'bus_stop_id' => $request->busStopId, 'time' => $request->time]);

        return response()->json(["state" => "success"]);
    }

}
