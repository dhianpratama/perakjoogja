<?php

namespace App\Http\Controllers;

use App\Models\EventType;
use Illuminate\Http\Request;
use Ramsey\Uuid\Uuid;
use Input;
use DB;

class EventTypeController extends Controller
{
    /**
     * Get event type list.
     *
     * @return JSON
     */
    public function getIndex()
    {
        $event_types = EventType::all();

        return response()->success($event_types);
    }

    public function getDetail($id)
    {
        $event_type = EventType::find($id);

        return response()->success($event_type);
    }


    public function postIndex()
    {
         $id = Input::get('id');

        $event_type = EventType::find($id);
        if (is_null($id) || empty($id)){
            $event_type = new EventType;
            $event_type->id = Uuid::uuid4()->getHex();
        }
        $event_type->name = Input::get('name');
        $event_type->description = Input::get('description');

        $event_type->save();

        return response()->success($event_type);

        return response()->success($event_type);
    }

    public function deleteDetail($id)
    {
        $event_type = EventType::find($id);
        $event_type->delete();

        return response()->success($event_type);
    }

    public function getPublicEventTypeList(){
        $event_types = DB::table('event_types')
            ->select(   
                'event_types.id as id',
                'event_types.name as name'
                )
            ->get();

        return response()->success($event_types);
    }
}