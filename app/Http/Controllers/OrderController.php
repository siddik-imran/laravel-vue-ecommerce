<?php

namespace App\Http\Controllers;

use App\Model\Order;
use App\Model\OrderItem;
use Illuminate\Http\Request;
use Stripe\Token;

class OrderController extends Controller
{
    public function index(Request $request, $number = 10) {
        if(!$request->ajax()){
            return abort(404);
        }
        $orders = Order::latest()->paginate($number);
        return response()->json([
            'orders' => $orders
        ], 200);
    }

    public function checkout(Request $request) {

        $payment_type = $request->payment_type;
        if ($payment_type === 'cash_on_delivery') {
            $this->orderPreocess($request);
        }elseif($payment_type === 'card_payment'){
            \Stripe\Stripe::setApiKey('sk_test_51IMCrtH9vPQnf2BZHA3LjacKnQ4XozIkNPramQcQ1RIhbnXELBTFFnoXEcRo97KvxcTsaULw0J4dFI0tMwN61iBQ00nGBo22Hz');

            $card = $request->cardInfo;
            $token = Token::create([
                'card' => [
                  'number' => $card['cardNumber'],
                  'exp_month' => $card['expMonth'],
                  'exp_year' => $card['expYear'],
                  'cvc' => $card['CVC'],
                ],
            ]);
            $email  = \Auth::user()->email;

            $customer = \Stripe\Customer::create([
                'email' => $email,
                'source'  => $token,
            ]);

            $charge = \Stripe\Charge::create([
                'customer' => $customer->id,
                'amount'   => \Cart::getTotal()*100,
                'currency' => 'usd',
            ]);

            $this->orderPreocess($request);
        }


    }

    public function orderPreocess($request){
        $user = \Auth::user();
        $shipping_address = '';
        if($request->shipping_address){
            $shipping_address = $request->shipping;
        } else{
            $shipping_address = $user;
        }
        $payment_type = $request->payment_type;
        $total = \Cart::getTotal();
        // $sub_total = $total * (5/100);
        // $items = \Cart::getContent();
        $order = new Order();
        $order->user_id = $user->id;
        $order->shipping_address = json_encode($shipping_address);
        $order->payment_type = $payment_type;
        $order->total = $total;
        $order->sub_total = $total;
        $order->save();

        $items = \Cart::getContent();
        foreach ($items as $row) {
            $order_item = new OrderItem();
            $order_item->order_id = $order->id;
            $order_item->item_name = $row->name;
            $order_item->item_price = $row->price;
            $order_item->item_quantity = $row->quantity;
            $order_item->save();
        }
        \Cart::clear();
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
