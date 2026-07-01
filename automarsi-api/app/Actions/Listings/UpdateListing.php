<?php

namespace App\Actions\Listings;

use App\Models\Listing;
use App\Services\SlugService;
use Illuminate\Support\Facades\DB;

class UpdateListing
{
    public function __construct(private SlugService $slugService)
    {
    }

    public function handle(Listing $listing, array $data): Listing
    {
        return DB::transaction(function () use ($listing, $data) {
            $featureIds = $data['feature_ids'] ?? null;
            unset($data['feature_ids']);

            if (isset($data['title']) && $data['title'] !== $listing->title) {
                $data['slug'] = $this->slugService->unique(Listing::class, $data['title'], $listing->id);
            }

            if (($data['status'] ?? null) === 'sold' && ! array_key_exists('sold_at', $data)) {
                $data['sold_at'] = $listing->sold_at ?? now();
            }

            if (
                array_key_exists('status', $data) &&
                $data['status'] !== 'sold' &&
                ! array_key_exists('sold_at', $data)
            ) {
                $data['sold_at'] = null;
            }

            $listing->update($data);

            if ($featureIds !== null) {
                $listing->features()->sync($featureIds);
            }

            return $listing->fresh();
        });
    }
}
