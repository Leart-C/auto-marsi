<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Listing extends Model
{
    use HasFactory;

    protected $fillable = [
        'make_id',
        'car_model_id',
        'title',
        'description',
        'price',
        'year',
        'kilometers',
        'fuel_type',
        'transmission',
        'location',
    ];

    public function make()
    {
        return $this->belongsTo(Make::class);
    }

    public function carModel()
    {
        return $this->belongsTo(CarModel::class);
    }

    public function images()
    {
        return $this->hasMany(ListingImage::class);
    }

    public function inquiries()
    {
        return $this->hasMany(Inquiry::class);
    }
}
