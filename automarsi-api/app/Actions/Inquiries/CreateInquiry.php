<?php

namespace App\Actions\Inquiries;

use App\Models\Inquiry;
use App\Models\Listing;
use Illuminate\Validation\ValidationException;

class CreateInquiry
{
    public function handle(array $data): Inquiry
    {
        if (! empty($data['listing_id'])) {
            $listing = Listing::find($data['listing_id']);

            if ($listing && $listing->status !== 'active') {
                throw ValidationException::withMessages([
                    'listing_id' => ['The selected listing is not active.'],
                ]);
            }

            if (! $listing) {
                throw ValidationException::withMessages([
                    'listing_id' => ['The selected listing is invalid.'],
                ]);
            }
        }

        return Inquiry::create([
            ...$data,
            'status' => 'new',
        ]);
    }
}
