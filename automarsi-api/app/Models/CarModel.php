<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CarModel extends Model
{
    use HasFactory;

    protected $fillable = [
        'make_id',
        'name',
        'slug',
    ];

    public function make()
    {
        return $this->belongsTo(Make::class);
    }

    public function listings()
    {
        return $this->hasMany(Listing::class);
    }
}
