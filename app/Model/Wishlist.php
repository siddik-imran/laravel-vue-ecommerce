<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Wishlist extends Model
{
    /**
     * The attributes that aren't mass assignable.
     *
     * @var array
     */
    protected $guarded = [];

    // get product data
    protected $with = ['product'];
    // relation with product
    public function product(){
        return $this->belongsTo(Product::class);
    }
}
