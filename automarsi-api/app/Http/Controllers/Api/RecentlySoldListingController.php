<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ListingResource;
use App\Queries\RecentlySoldListingQuery;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class RecentlySoldListingController extends Controller
{
    public function index(
        Request $request,
        RecentlySoldListingQuery $query
    ): AnonymousResourceCollection {
        $limit = (int) $request->integer('limit', 6);

        return ListingResource::collection(
            $query->get($limit)
        );
    }
}
