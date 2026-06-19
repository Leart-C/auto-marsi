<?php

namespace App\Actions\ListingImages;

use App\Models\ListingImage;
use App\Models\Listing;
use Illuminate\Support\Facades\DB;

class SetPrimaryListingImage
{
    public function handle(ListingImage $listingImage): ListingImage
    {
        return DB::transaction(function () use ($listingImage) {
            Listing::query()
                ->whereKey($listingImage->listing_id)
                ->lockForUpdate()
                ->firstOrFail();

            $listingImage->listing
                ->images()
                ->update(['is_primary' => false]);

            $listingImage->update(['is_primary' => true]);

            return $listingImage->refresh();
        });
    }
}
