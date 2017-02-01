<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class EventType extends BaseEntityModel
{
    protected $fillable = [
        'name', 'description'
    ];

    public function events()
    {
        return $this->hasMany('App\Models\Event');
    }
}
