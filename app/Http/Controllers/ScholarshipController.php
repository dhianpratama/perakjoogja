<?php

namespace App\Http\Controllers;

use App\Models\Scholarship;
use Illuminate\Http\Request;
use Ramsey\Uuid\Uuid;
use Input;
use DB;
use App\Models\PaginationModel;

class ScholarshipController extends Controller
{
    /**
     * Get scholarship type list.
     *
     * @return JSON
     */
    public function getIndex()
    {
        $vacancies = Scholarship::all();
        return response()->success($vacancies);
    }

    public function getDetail($id)
    {
        $scholarship = Scholarship::find($id);

        $scholarship->is_published = $scholarship->is_published == 1 ? true : false;

        return response()->success($scholarship);
    }


    public function postIndex()
    {
        $id = Input::get('id');

        $scholarship = Scholarship::find($id);
        if (is_null($id) || empty($id)){
            $scholarship = new Scholarship;
            $scholarship->id = Uuid::uuid4()->getHex();
        }

        $scholarship->title = Input::get('title');
        $scholarship->description = Input::get('description');
        $scholarship->deadline = Input::get('deadline');
        $scholarship->is_published = Input::get('is_published');
        $scholarship->organizer = Input::get('organizer');
        $scholarship->organizer_description = Input::get('organizer_description');
        $scholarship->city_id = Input::get('city_id');

        $scholarship->save();
        
        return response()->success($scholarship);
    }

    public function deleteDetail($id)
    {
        $scholarship = Scholarship::find($id);
        $scholarship->delete();

        return response()->success($scholarship);
    }

    public function getPublic()
    {
        $vacancies = Scholarship::where('is_published',1)->get();

        return response()->success($vacancies); 
    }

    public function getPublicScholarshipList(){
        $query = DB::table('scholarships')
            ->where('scholarships.is_published',1);
        
        $vacancies = $query
                ->select(   
                    'scholarships.id as id',
                    'scholarships.title as title', 
                    'scholarships.description as description', 
                    'scholarships.organizer as organizer', 
                    'scholarships.deadline as deadline'
                )
                ->get();

        $result = new PaginationModel;
        $result->list = $vacancies;
        
        return response()->success($result); 
    }

     public function getPublicUpcomingScholarships(){
        $take = Input::get('take');

        $query = DB::table('scholarships')
            ->where('scholarships.is_published',1)
            ->where('scholarships.deadline', '>=', time());    
        
        if($take>0){
            $query = $query->take($take);
        }

        $scholarships = $query
                ->select(   
                    'scholarships.id as id',
                    'scholarships.title as title', 
                    'scholarships.description as description', 
                    'scholarships.organizer as organizer', 
                    'scholarships.deadline as deadline'
                )
                ->get();

        return response()->success($scholarships);
    }
}