<?php

namespace App\Http\Controllers;

use App\Model\Brand;
use App\Model\Category;
use App\Model\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($number = 10)
    {
        $products = Product::latest()->paginate($number);
        return response()->json([
            'products' => $products
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->productValidation($request);
        $request['color'] = explode(',', $request->color);
        $request['size'] = explode(',', $request->size);
        $file = '';
        $upload_path = public_path('uploads');
        if($request->hasFile('image')){
            $file = $request->file('image');
            $name = time()."_".$file->getClientOriginalName();
            $file->move($upload_path, $name);
        }


        $product = new Product();
        $product->create(array_merge($request->all(),['image' => $name]));
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Model\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Model\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function edit(Product $product)
    {
        return response()->json([
            'product' => $product
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Model\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Product $product)
    {
        //
    }

    public function updateProduct(Request $request, $id){
        $product = Product::findOrFail($id);
        $this->productValidation($request, $id);
        $request['color'] = explode(',', $request->color);
        $request['size'] = explode(',', $request->size);
        $file = '';
        $upload_path = public_path('uploads');
        if($request->hasFile('image')){
            $file = $request->file('image');
            $name = time()."_".$file->getClientOriginalName();
            $file->move($upload_path, $name);

            $image = public_path("uploads/$product->image");
            if(file_exists($image)){
                unlink($image);
            }
        }else{
            $name = $product->image;
        }

        $product->update(array_merge($request->all(),['image' => $name]));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Model\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        $product->delete();
        return $this->index();
    }

    public function multipleDelete(Request $request){
        foreach($request->all() as $product){
            Product::find($product['id'])->delete();
        }
    }

    // product form validation
    public function productValidation($request, $id = null){
        if($id){
            $image = '';
        }else{
            $image = 'required | image';
        }
        $request->validate(
        [
            'name' => 'required',
            'category_id' => 'required',
            'brand_id' => 'required',
            'price' => 'required',
            'description' => 'required',
            'quantity' => 'required | integer',
            'image' => $image,
        ],
        [
            'category_id.required' => 'The category field is required',
            'brand_id.required' => 'The brand field is required',
        ]
    );
    }

    public function getAllProduct(){
        if(!\Request::ajax()){
            return abort(404);
        }
        return $this->index(12);
    }

    public function sidebarInfo(){

        $categories = Category::all();
        $brands = Brand::all();
        $min_price = Product::min('price');
        $max_price = Product::max('price');
        return response()->json([
            'categories' => $categories,
            'brands' => $brands,
            'price' => [
                'min' => $min_price,
                'max' => $max_price
            ]
        ], 200);
    }

    public function productFilter($data){
        $data = json_decode($data);
        $field = $data->field;
        $data = $data->data;

        if($field === 'price'){
            $products = $this->priceRangeFilter($data);
        }elseif($field === 'size' || $field === 'color'){
            $products = $this->sizeOrColorFilter($data, $field);
        }
        elseif($field === 'category_id' || $field === 'brand_id'){
            $products = Product::where($field, $data)->paginate(12);
        }else{
           $products = $this->index(12);
        }

        return response()->json([
            'products' => $products
        ]);
    }

    public function priceRangeFilter($data){
        $min = $data['0'];
        $max = $data['1'];
        $products = Product::whereBetween('price', [$min, $max])->paginate(12);

        return $products;
    }

    public function sizeOrColorFilter($data, $field){

        $products = Product::query()->where($field, 'like', "%{$data}%" )->paginate(12);
        return $products;
    }
}
