<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Organizer extends BaseEntityModel
{
    protected $fillable = [
        'name', 'description', 'address', 'city', 'province', 'telp_1', 'telp_2', 'website', 'fb', 'twitter', 'line'
    ];
}