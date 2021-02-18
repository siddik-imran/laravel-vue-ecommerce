<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;


Route::get('/login', 'Admin\LoginController@showLoginForm')->name('admin.login');
Route::post('/login', 'Admin\LoginController@login')->name('admin.login.post');


Route::group(['middleware' => ['auth:admin']], function () {
    Route:: get('/', function(){
        return view('admin.admin_master');
    })->name('admin.dashboard');

    Route::get('user', function(){
        return response()->json([
            'admin' => \Auth::guard('admin')->user(),
        ], 200);
    });

    // Category Route > categoryList > categoryDelete
    Route::resource('category', 'CategoryController');

    //Multiple category Delete
    Route::post('/multiple-category-delete', 'CategoryController@multipleDelete')->name('admin.category.multipledelete');

    // Brand Route > categoryList > categoryDelete
    Route::resource('brand', 'BrandController');

    //Multiple brand Delete
    Route::post('/multiple-brand-delete', 'BrandController@multipleDelete')->name('admin.brand.multipledelete');

    //  GetUserList
    Route::get('user-list', 'HomeController@userList')->name('admin.user.list');

    // product route
    Route::resource('product', 'ProductController');
     //Multiple products Delete
     Route::post('/multiple-product-delete', 'ProductController@multipleDelete')->name('admin.product.multipledelete');
    //get all category for add new  product
    Route::get('all-category', 'CategoryController@getAllCategory')->name('admin.allCategory');
     //get all brnad for add new  product
    Route::get('all-brand', 'BrandController@getAllBrand')->name('admin.allBrand');
    // update product
    Route::post('product-update/{id}','ProductController@updateProduct')->name('admin.product.update');

    // order routes
    Route::resource('order', 'OrderController');
    Route::get('order-detail/{id}', 'OrderController@orderDetail')->name('orderDetail');


    // logout route
    Route::get('/logout', 'Admin\LoginController@logout')->name('admin.logout');
});

// Dynamic Route/path
Route::get('/{path}', function () {
    return view('admin.admin_master');
});

Route::get('/{path}/{id}', function () {
    return view('admin.admin_master');
});

