<?php

namespace App\Http\Controllers;

use App\Models\Organizer;
use Illuminate\Http\Request;
use Ramsey\Uuid\Uuid;
use Input;

class OrganizerController extends Controller
{
    /**
     * Get event type list.
     *
     * @return JSON
     */
    public function getIndex()
    {
        $organizers = Organizer::all();

        return response()->success($organizers);
    }

    public function getDetail($id)
    {
        $organizer = Organizer::find($id);

        return response()->success($organizer);
    }


    public function postIndex()
    {
        $id = Input::get('id');

        $organizer = Organizer::find($id);
        if (is_null($id) || empty($id)){
            $organizer = new Organizer;
            $organizer->id = Uuid::uuid4()->getHex();
        }
        $organizer->name = Input::get('name');
        $organizer->description = Input::get('description');
        $organizer->address = Input::get('address');
        $organizer->city = Input::get('city');    
        $organizer->province = Input::get('province'); 
        $organizer->telp_1 = Input::get('telp_1');  
        $organizer->telp_2 = Input::get('telp_2');  
        $organizer->website = Input::get('website');  
        $organizer->fb = Input::get('fb');  
        $organizer->twitter = Input::get('twitter'); 
        $organizer->line = Input::get('line'); 

        $organizer->save();        

        return response()->success($organizer);
    }

    public function deleteDetail($id)
    {
        $organizer = Organizer::find($id);
        $organizer->delete();

        return response()->success($organizer);
    }
}