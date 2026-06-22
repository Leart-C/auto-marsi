<?php

namespace App\Queries;

use App\Models\Inquiry;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class AdminInquiryQuery
{
    public function paginate(array $filters): LengthAwarePaginator
    {
        return Inquiry::query()
            ->with(['listing.make', 'listing.carModel'])
            ->withExists('appointments')
            ->when($filters['status'] ?? null, fn ($query, string $status) =>
                $query->where('status', $status)
            )
            ->when($filters['listing_id'] ?? null, fn ($query, int $listingId) =>
                $query->where('listing_id', $listingId)
            )
            ->when($filters['search'] ?? null, function ($query, string $searchTerm) {
                $escapedSearchTerm = $this->escapeLikeSearch($searchTerm);

                $query->where(function ($query) use ($escapedSearchTerm) {
                    $query->whereRaw("name like ? escape '\\'", ["%{$escapedSearchTerm}%"])
                        ->orWhereRaw("email like ? escape '\\'", ["%{$escapedSearchTerm}%"])
                        ->orWhereRaw("phone like ? escape '\\'", ["%{$escapedSearchTerm}%"])
                        ->orWhereRaw("message like ? escape '\\'", ["%{$escapedSearchTerm}%"]);
                });
            })
            ->latest()
            ->paginate($filters['per_page'] ?? 15);
    }

    private function escapeLikeSearch(string $searchTerm): string
    {
        return str_replace(['\\', '%', '_'], ['\\\\', '\\%', '\\_'], $searchTerm);
    }
}
