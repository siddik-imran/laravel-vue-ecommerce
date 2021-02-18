<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes();


// Route::get('/home', 'HomeController@index')->name('home');
Route::get('user-login',  'HomeController@index')->name('login');

// Separate route file for admin
Route::prefix('admin')->group(base_path('routes/admin.php'));

// Separate route file for user
Route::prefix('user')->group(base_path('routes/user.php'));


// Public/Front-end route
Route::get('/', function () {
    return view('public.public_master');
});

// product list
Route::get('product-list', 'ProductController@getAllProduct');
// product sidebar info
Route::get('product-sidebar-info', 'ProductController@sidebarInfo');
// produc filter
Route::get('product-filter/{data}', 'ProductController@productFilter');

// add to cart
Route::group(['prefix' => 'cart'], function(){
    Route::post('add-to-cart', 'CartController@addToCart');
    Route::get('cart-product-list', 'CartController@productList');
    Route::get('remove-product/{id}', 'CartController@removeProduct');
    Route::post('update-cart', 'CartController@updateCart')->name('updateCart');
});

// checkout
Route::post('checkout', 'OrderController@checkout')->name('checkout');


// Dynamic Route
Route::get('/{path}', function () {
    return view('public.public_master');
});
Route::get('/{path}/{id}', function () {
    return view('public.public_master');
});
