<?php

namespace App\Http\Controllers;

use App\Models\VacancyType;
use Illuminate\Http\Request;
use Ramsey\Uuid\Uuid;
use Input;

class VacancyTypeController extends Controller
{
    /**
     * Get event type list.
     *
     * @return JSON
     */
    public function getIndex()
    {
        $vacancy_types = VacancyType::all();

        return response()->success($vacancy_types);
    }

    public function getDetail($id)
    {
        $vacancy_type = VacancyType::find($id);

        return response()->success($vacancy_type);
    }


    public function postIndex()
    {
        $id = Input::get('id');

        $vacancy_type = VacancyType::find($id);
        if (is_null($id) || empty($id)){
            $vacancy_type = new VacancyType;
            $vacancy_type->id = Uuid::uuid4()->getHex();
        }
        $vacancy_type->name = Input::get('name');
        $vacancy_type->description = Input::get('description');

        $vacancy_type->save();

        return response()->success($vacancy_type);
    }

    public function deleteDetail($id)
    {
        $vacancy_type = VacancyType::find($id);
        $vacancy_type->delete();

        return response()->success($vacancy_type);
    }
}