<?php

namespace App\Http\Controllers;

use App\Models\Vacancy;
use Illuminate\Http\Request;
use Ramsey\Uuid\Uuid;
use Input;
use DB;
use App\Models\PaginationModel;

class VacancyController extends Controller
{
    /**
     * Get vacancy type list.
     *
     * @return JSON
     */
    public function getIndex()
    {
        $vacancies = Vacancy::all();
        return response()->success($vacancies);
    }

    public function getDetail($id)
    {
        $vacancy = Vacancy::find($id);

        $vacancy->is_published = $vacancy->is_published == 1 ? true : false;

        $vacancy->organizer = $vacancy->organizer;

        return response()->success($vacancy);
    }


    public function postIndex()
    {
        $id = Input::get('id');

        $vacancy = Vacancy::find($id);
        if (is_null($id) || empty($id)){
            $vacancy = new Vacancy;
            $vacancy->id = Uuid::uuid4()->getHex();
        }

        $vacancy->title = Input::get('title');
        $vacancy->caption = Input::get('caption');
        $vacancy->description = Input::get('description');
        $vacancy->due_date = Input::get('due_date');
        $vacancy->is_published = Input::get('is_published');
        $vacancy->vacancy_type_id = Input::get('vacancy_type_id');  
        $vacancy->organizer_id = Input::get('organizer_id');
        $vacancy->job_description = Input::get('job_description');
        $vacancy->company_name = Input::get('company_name');
        $vacancy->company_description = Input::get('company_description');
        $vacancy->salary_from = Input::get('salary_from');
        $vacancy->salary_to = Input::get('salary_to');
        $vacancy->city_id = Input::get('city_id');

        $vacancy->save();
        
        return response()->success($vacancy);
    }

    public function deleteDetail($id)
    {
        $vacancy = Vacancy::find($id);
        $vacancy->delete();

        return response()->success($vacancy);
    }

    public function getPublic()
    {
        $vacancies = Vacancy::where('is_published',1)->get();

        return response()->success($vacancies); 
    }

    public function getPublicVacancyList(){
        $query = DB::table('vacancies')
            ->leftJoin('vacancy_types', 'vacancies.vacancy_type_id', '=', 'vacancy_types.id')
            ->leftJoin('organizers', 'vacancies.organizer_id', '=', 'organizers.id')
            ->where('vacancies.is_published',1)
            ->where('vacancy_types.name','Scholarship');
        
        $vacancies = $query
                ->select(   
                    'vacancies.id as id',
                    'vacancies.title as title', 
                    'vacancies.caption as caption', 
                    'vacancy_types.name as event_type_name', 
                    'organizers.name as organizer_name', 
                    'vacancies.description as description',
                    'vacancies.due_date as due_date'
                )
                ->get();

        $result = new PaginationModel;
        $result->list = $vacancies;
        
        return response()->success($result); 
    }

    public function getPublicUpcomingVacancies(){
        $take = Input::get('take');

        $query = DB::table('vacancies')
            ->leftJoin('vacancy_types', 'vacancies.vacancy_type_id', '=', 'vacancy_types.id')
            ->leftJoin('organizers', 'vacancies.organizer_id', '=', 'organizers.id')
            ->where('vacancies.is_published',1)
            ->where('vacancies.due_date', '>', time());    
        
        if($take>0){
            $query = $query->take($take);
        }

        $vacancies = $query
                ->select(   
                    'vacancies.id as id',
                    'vacancies.title as title', 
                    'vacancies.job_description as job_description', 
                    'vacancy_types.name as vacancy_type_name', 
                    'vacancies.company_name as company_name', 
                    'vacancies.description as description',
                    'vacancies.due_date as due_date'
                )
                ->get();

        return response()->success($vacancies);
    }
}