<?php

namespace App\Http\Controllers;

class AngularController extends Controller
{
    /**
     * Serve the angular application.
     *
     * @return JSON
     */
    public function serveAdminPage()
    {
        return view('index');
    }

    public function servePublicPage()
    {
        return view('yct_public/index_public');
    }

    public function eventListPage(){
        return view('yct_public/event-grid');
    }


    public function contactUsPage(){
        return view('yct_public/contact-us');
    }

    public function eventPage(){
        return view('yct_public/event-single');
    }

    public function vacancyListPage(){
        return view('yct_public/vacancy-list');
    }

    public function vacancyDetailPage(){
        return view('yct_public/vacancy-detail');
    }

    public function scholarshipPage(){
        return view('yct_public/scholarship-list');
    }

    public function aboutUsPage(){
        return view('yct_public/about-us');
    }

    public function scholarSinglePage(){
        return view('yct_public/scholar-single');
    }

//    public function playGround(){
//        return view('yct_public/playground');
//    }


    /**
     * Page for unsupported browsers.
     *
     * @return JSON
     */
    public function unsupported()
    {
        return view('unsupported_browser');
    }
}
