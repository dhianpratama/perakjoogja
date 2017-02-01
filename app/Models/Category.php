<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends BaseEntityModel
{
    protected $fillable = [
        'name', 'description'
    ];

    public function events()
    {
        return $this->belongsToMany('App\Models\Event', 'events_categories', 'category_id', 'event_id');
    }
}