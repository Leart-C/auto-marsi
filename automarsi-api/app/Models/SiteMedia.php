<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SiteMedia extends Model
{
    protected $fillable = [
        'key',
        'disk',
        'path',
        'image_url',
        'alt_text',
        'sort_order',
    ];
}
