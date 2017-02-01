<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Ramsey\Uuid\Uuid;
use Input;
use DB;

class ProvinceController extends Controller
{
    /**
     * Get event type list.
     *
     * @return JSON
     */
    public function getIndex()
    {
        $cities = DB::table('provinces')           
            ->select(   
                'provinces.province_name as province_name',
                'provinces.province_id as province_id'
                )
            ->orderBy('province_name', 'asc')
            ->get();

        return response()->success($cities);
    }


}