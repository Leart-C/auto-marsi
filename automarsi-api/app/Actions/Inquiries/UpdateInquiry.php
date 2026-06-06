<?php

namespace App\Actions\Inquiries;

use App\Models\Inquiry;

class UpdateInquiry
{
    public function handle(Inquiry $inquiry, array $data): Inquiry
    {
        $inquiry->update([
            'status' => $data['status'],
        ]);

        return $inquiry->fresh(['listing.make', 'listing.carModel']);
    }
}
