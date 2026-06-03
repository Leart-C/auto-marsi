<?php

namespace App\Actions\ListingImages;

use App\Models\Listing;
use App\Models\ListingImage;
use App\Services\ListingImageStorageService;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;

class CreateListingImage
{
    public function __construct(private ListingImageStorageService $storage) {}

    public function handle(Listing $listing, UploadedFile $file, array $data): ListingImage
    {
        $storedFile = $this->storage->store($file, $listing->id);

        try {
            return DB::transaction(function () use ($listing, $data, $storedFile) {
                $maxSortOrder = $listing->images()
                    ->lockForUpdate()
                    ->max('sort_order');

                $nextSortOrder = ($maxSortOrder ?? -1) + 1;
                $isFirstImage = $maxSortOrder === null;
                $isPrimary = (bool) ($data['is_primary'] ?? false) || $isFirstImage;

                if ($isPrimary) {
                    $listing->images()->update(['is_primary' => false]);
                }

                return $listing->images()->create([
                    ...$storedFile,
                    'alt_text' => $data['alt_text'] ?? null,
                    'sort_order' => $data['sort_order'] ?? $nextSortOrder,
                    'is_primary' => $isPrimary,
                ]);
            });
        } catch (\Throwable $exception) {
            $this->storage->delete($storedFile['disk'] ?? null, $storedFile['path'] ?? null);

            throw $exception;
        }
    }
}
