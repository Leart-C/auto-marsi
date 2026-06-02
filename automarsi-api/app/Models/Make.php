<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Make extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'logo_url',
    ];

    public function carModels()
    {
        return $this->hasMany(CarModel::class);
    }

    public function listings()
    {
        return $this->hasMany(Listing::class);
    }
}
