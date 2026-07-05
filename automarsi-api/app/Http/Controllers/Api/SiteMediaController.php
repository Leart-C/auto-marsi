<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\SiteMediaResource;
use App\Models\SiteMedia;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class SiteMediaController extends Controller
{
    public function show(string $key): AnonymousResourceCollection
    {
        return SiteMediaResource::collection(
            SiteMedia::query()
                ->where('key', $key)
                ->orderBy('sort_order')
                ->orderBy('id')
                ->get()
        );
    }
}
