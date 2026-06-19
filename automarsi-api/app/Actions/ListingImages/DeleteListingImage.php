<?php

namespace App\Actions\ListingImages;

use App\Models\ListingImage;
use App\Services\ListingImageStorageService;
use Illuminate\Support\Facades\DB;

class DeleteListingImage
{
    public function __construct(private ListingImageStorageService $storage)
    {
    }

    public function handle(ListingImage $listingImage): void
    {
        DB::transaction(function () use ($listingImage) {
            $disk = $listingImage->disk;
            $path = $listingImage->path;
            $listingId = $listingImage->listing_id;
            $wasPrimary = $listingImage->is_primary;

            $listingImage->delete();

            if ($wasPrimary) {
                ListingImage::query()
                    ->where('listing_id', $listingId)
                    ->orderBy('sort_order')
                    ->orderBy('id')
                    ->first()
                    ?->update(['is_primary' => true]);
            }

            $this->storage->delete($disk, $path);
        });
    }
}
