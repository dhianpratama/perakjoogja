<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Ramsey\Uuid\Uuid;
use Input;
use DB;

class CityController extends Controller
{
    /**
     * Get event type list.
     *
     * @return JSON
     */
    public function getIndex()
    {
        $cities = DB::table('cities')            
            ->select(   
                'cities.city_id as city_id', 
                'cities.city_name_full as city_name',
                'cities.province_id as province_id'
                )
            ->orderBy('city_name', 'asc')
            ->get();

        return response()->success($cities);
    }


}