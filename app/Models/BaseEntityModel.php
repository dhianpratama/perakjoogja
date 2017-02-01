<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class BaseEntityModel extends Model
{
    public $incrementing = false;

    use SoftDeletes;

    protected $dates = ['deleted_at'];

    protected $hidden = [
        'created_by', 'created_at', 'updated_by', 'updated_at', 'deleted_at'
    ];

}
