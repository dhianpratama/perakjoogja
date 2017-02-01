<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Event extends BaseEntityModel
{
    protected $fillable = [
        'title', 'caption', 'description', 'event_type_id', 'event_time', 'organizer_id', 'event_venue', 'event_address', 'picture_url', 'city_id', 'city', 'province', 'contact_person_name', 'contact_person_number', 'ticket_price', 'is_published' 
    ];

    public function organizer(){
        return $this->belongsTo('App\Models\Organizer');
    }

    public function event_type(){
        return $this->belongsTo('App\Models\EventType');
    }

    public function categories()
    {
        return $this->belongsToMany('App\Models\Category', 'events_categories', 'event_id', 'category_id');
    }
}