<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VehicleFeature extends Model
{
    protected $guarded = [];

    public function listings()
    {
        return $this->belongsToMany(Listing::class, 'listing_feature');
    }
}
