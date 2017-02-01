<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Vacancy extends BaseEntityModel
{
    protected $fillable = [
        'title', 'caption', 'description', 'organizer_id','vacancy_id', 'due_date', 'is_published' 
    ];

    public function vacancy_type(){
        return $this->belongsTo('App\Models\VacancyType');
    }

    public function organizer(){
        return $this->belongsTo('App\Models\Vacancy');
    }
}