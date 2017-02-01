<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class VacancyType extends BaseEntityModel
{
    protected $fillable = [
        'name', 'description'
    ];
}