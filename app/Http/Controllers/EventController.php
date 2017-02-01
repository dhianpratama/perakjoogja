<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Ramsey\Uuid\Uuid;
use Input;
use DB;
use App\Models\PaginationModel;

class EventController extends Controller
{
    /**
     * Get event type list.
     *
     * @return JSON
     */
    public function getIndex()
    {
        $events = Event::all();

        $seq = 0;
        foreach ($events as $ev) {
            if($ev->is_published==true){
                $events[$seq]->published = 'Yes';
            }
            $seq++;
        }

        return response()->success($events);
    }

    public function getDetail($id)
    {
        $event = Event::find($id);

        $event->is_published = $event->is_published == 1 ? true : false;

        $event->event_type = $event->event_type;
        $event->categories = $event->categories()->get();

        return response()->success($event);
    }


    public function postIndex()
    {
        $id = Input::get('id');

        $event = Event::find($id);
        if (is_null($id) || empty($id)){
            $event = new Event;
            $event->id = Uuid::uuid4()->getHex();
        }
        $event->title = Input::get('title');
        $event->caption = Input::get('caption');
        $event->description = Input::get('description');
        $is_continous = Input::get('is_continuous');
        $event->is_continuous = (is_null($is_continous) || empty($is_continous)) == true ?  false : $is_continous;
        $event->start_date = Input::get('start_date');
        $event->end_date = $event->is_continuous == true ? Input::get('end_date') : null;
        $event->start_time = Input::get('start_time');
        $event->end_time = Input::get('end_time');
        $event->organizer_id = Input::get('organizer_id');
        $event->event_venue = Input::get('event_venue');
        $event->event_address = Input::get('event_address');
        $event->city = Input::get('city');    
        $event->province = Input::get('province');    
        $event->contact_person_name = Input::get('contact_person_name');  
        $event->contact_person_number = Input::get('contact_person_number');  
        $event->price = Input::get('price');  
        $event->is_published = Input::get('is_published');  
        $event->event_type_id = Input::get('event_type_id'); 
        $event->city_id = Input::get('city_id'); 
        $event->picture_url = Input::get('picture_url'); 

        $event->save();        

        $event->categories()->detach();

        $cat_ids = Input::get('category_ids');
        $event->categories()->attach($cat_ids);

        return response()->success($event);
    }

    public function deleteDetail($id)
    {
        $event = Event::find($id);
        $event->delete();

        return response()->success($event);
    }

    public function getPublicEventList(){
        $eventTypeId = Input::get('eventTypeId');
        $categoryId = Input::get('categoryId');
        $keyword = Input::get('keyword');
        $cityId = Input::get('cityId');
        $priceType = Input::get('priceType');

        $query = DB::table('events')
            ->leftJoin('event_types', 'events.event_type_id', '=', 'event_types.id')
            ->leftJoin('organizers', 'events.organizer_id', '=', 'organizers.id')
            ->where('events.is_published',1);

        if($keyword != null && $keyword!=''){
            $query = $query->where('events.title', 'like', '%'.$keyword.'%');
        }

        if($eventTypeId != null){
            $query = $query->where('event_types.id',$eventTypeId);
        }

        if($cityId != null&& $cityId!=0 && $cityId!='0'){
            $query = $query->where('events.city_id',$cityId);
        }

        if($categoryId != null && $categoryId!=0 && $categoryId!='0'){
            $eventIds = DB::table('events_categories')
                            ->where('events_categories.id',$categoryId)
                            ->select('events_categories.event_id')
                            ->get();
            
            $query = $query->whereIn('events.id',$eventIds);
        }

        if($priceType=='1'){
            $query = $query->where('events.price', '<=', 0);
        }

        $take = Input::get('dataPerPage');
        $page = Input::get('page');
        $skip = ($page - 1) * $take;
        
        $result = new PaginationModel;
        $result->total_data = $query->count();
        $result->total_page = ceil($result->total_data / $take);
        $result->data_per_page = $take;
        $result->current_page = $page;

        $query = $query->skip($skip)->take($take);       

        $events = $query
                ->select(   
                    'events.id as id',
                    'events.title as title', 
                    'events.caption as caption', 
                    'event_types.name as event_type_name', 
                    'organizers.name as organizer_name', 
                    'events.price as ticket_price',
                    'events.event_venue as venue',
                    'events.city as city',
                    'events.start_date as start_date',
                    'events.start_time as start_time',
                    'events.end_date as end_date',
                    'events.end_time as end_time',
                    'events.picture_url as picture_url',
                    'events.description as description'
                )
                ->get();

        $result->list = $events;

        return response()->success($result);
    }

    public function getPublicEvent($id)
    {
        $event = DB::table('events')
            ->leftJoin('event_types', 'events.event_type_id', '=', 'event_types.id')
            ->leftJoin('organizers', 'events.organizer_id', '=', 'organizers.id')
            ->where('events.id',$id)
            ->select(   
                    'events.title as title', 
                    'events.caption as caption', 
                    'event_types.name as event_type_name', 
                    'organizers.name as organizer_name', 
                    'events.price as ticket_price',
                    'events.event_venue as event_venue',
                    'events.event_address as event_address',
                    'events.city as city',
                    'events.start_date as start_date',
                    'events.start_time as start_time',
                    'events.end_date as end_date',
                    'events.end_time as end_time',
                    'events.picture_url as picture_url',
                    'events.description as description'
                )
                ->first();

        return response()->success($event);
    }

    public function getPublicUpcomingEvents(){
        $take = Input::get('take');

        $query = DB::table('events')
            ->leftJoin('event_types', 'events.event_type_id', '=', 'event_types.id')
            ->leftJoin('organizers', 'events.organizer_id', '=', 'organizers.id')
            ->where('events.is_published',1)
            ->where('events.start_date', '>=', time());

        if($take>0){
            $query = $query->take($take);
        }

        $events = $query->select(   
                'events.id as id',
                'events.title as title', 
                'events.caption as caption', 
                'event_types.name as event_type_name', 
                'organizers.name as organizer_name', 
                'events.price as ticket_price',
                'events.event_venue as venue',
                'events.city as city',
                'events.start_date as start_date',
                'events.start_time as start_time',
                'events.end_date as end_date',
                'events.end_time as end_time',
                'events.picture_url as picture_url',
                'events.description as description'
            )
        ->get();

        return response()->success($events);
    }
}