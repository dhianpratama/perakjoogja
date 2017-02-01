<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Ramsey\Uuid\Uuid;
use Input;
use DB;

class ProductController extends Controller
{
    /**
     *
     * @return JSON
     */
    public function getIndex()
    {
        $products = Product::all();

        return response()->success($products);
    }

    public function getDetail($id)
    {
        $product = Product::find($id);

        return response()->success($product);
    }


    public function postIndex()
    {
        $id = Input::get('id');

        $product = Product::find($id);
        if (is_null($id) || empty($id)){
            $product = new Product;
            $product->id = Uuid::uuid4()->getHex();
        }
        $product->code = Input::get('code');
        $product->description = Input::get('description');
        $product->type = Input::get('type');

        $product->save();

        return response()->success($product);
    }

    public function deleteDetail($id)
    {
        $product = Product::find($id);
        $product->delete();

        return response()->success($product);
    }
}