<?php

namespace App\Http\Controllers;

use App\Model\Order;
use App\User;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('public.public_master');
    }

    public function authUser(){
        return response()->json([
            'user' => \Auth::user()
        ], 200);
    }

    public function userList(){
        $user_list = User::paginate(10);
        return response()->json([
            'user_list' => $user_list
        ]);
    }

    public function orderList(Request $request, $number = 10) {
        if(!$request->ajax()){
            return abort(404);
        }
        $orders = Order::latest()->where('user_id', \Auth::user()->id)->paginate($number);
        return response()->json([
            'orders' => $orders
        ], 200);
    }
    public function orderDetail(Request $request, $id){
        if(!$request->ajax()){
            return abort(404);
        }
        $order = Order::find($id);
        return response()->json([
            'order' => $order
        ], 200);
    }
}
