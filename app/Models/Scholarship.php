<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Scholarship extends BaseEntityModel
{
    protected $fillable = [
        'title', 'organizer', 'organizer_description', 'description','deadline', 'city_id', 'is_published' 
    ];
}