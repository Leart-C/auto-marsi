<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\SiteMediaResource;
use App\Models\SiteMedia;

class SiteMediaController extends Controller
{
    public function show(string $key): SiteMediaResource
    {
        return new SiteMediaResource(
            SiteMedia::query()->firstOrNew(['key' => $key])
        );
    }
}
