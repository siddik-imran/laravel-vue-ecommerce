<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
     /**
     * The attributes that aren't mass assignable.
     *
     * @var array
     */
    protected $guarded = [];

    protected $casts = [
        'size' => 'json',
        'color' => 'json'
    ];

    // get category table data
    protected $with = ['category', 'brand'];
    
    // relation with category table
    public function category(){
        return $this->belongsTo(Category::class);
    }

    // relation with brand table
    public function brand(){
        return $this->belongsTo(Brand::class);
    }
}
