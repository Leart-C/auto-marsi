<?php

namespace App\Actions\Inquiries;

use App\Jobs\SendInquiryEmail;
use App\Models\Inquiry;
use App\Models\Listing;
use Illuminate\Validation\ValidationException;

class CreateInquiry
{
    public function handle(array $data): Inquiry
    {
        if (! empty($data['listing_id'])) {
            $listingIsActive = Listing::query()
                ->whereKey($data['listing_id'])
                ->where('status', 'active')
                ->exists();

            if (! $listingIsActive) {
                throw ValidationException::withMessages([
                    'listing_id' => ['The selected listing is not available for inquiries.'],
                ]);
            }
        }

        $inquiry = Inquiry::create([
            ...$data,
            'status' => 'new',
        ]);

        SendInquiryEmail::dispatch($inquiry);

        return $inquiry;
    }
}