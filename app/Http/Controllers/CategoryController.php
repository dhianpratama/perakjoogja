<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Ramsey\Uuid\Uuid;
use Input;
use DB;

class CategoryController extends Controller
{
    /**
     * Get event type list.
     *
     * @return JSON
     */
    public function getIndex()
    {
        $categories = Category::all();

        return response()->success($categories);
    }

    public function getDetail($id)
    {
        $category = Category::find($id);

        return response()->success($category);
    }


    public function postIndex()
    {
        $id = Input::get('id');

        $category = Category::find($id);
        if (is_null($id) || empty($id)){
            $category = new Category;
            $category->id = Uuid::uuid4()->getHex();
        }
        $category->name = Input::get('name');
        $category->description = Input::get('description');

        $category->save();

        return response()->success($category);
    }

    public function deleteDetail($id)
    {
        $category = Category::find($id);
        $category->delete();

        return response()->success($category);
    }

    public function getPublicCategoryList(){
        $categories = DB::table('categories')
            ->select(   
                'categories.id as id',
                'categories.name as name'
                )
            ->get();

        return response()->success($categories);
    }
}