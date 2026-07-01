<?php

namespace App\Queries;

use App\Models\Listing;
use Illuminate\Database\Eloquent\Collection;

class RecentlySoldListingQuery
{
    public function get(int $limit = 6): Collection
    {
        return Listing::query()
            ->with(['make', 'carModel', 'primaryImage', 'images'])
            ->where('status', 'sold')
            ->orderByDesc('sold_at')
            ->orderByDesc('updated_at')
            ->limit(min($limit, 8))
            ->get();
    }
}
