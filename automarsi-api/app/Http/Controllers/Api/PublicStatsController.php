<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\Inquiry;
use App\Models\Listing;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Carbon;

class PublicStatsController extends Controller
{
    public function __invoke(): JsonResponse
    {
        $inquiriesCount = Inquiry::query()->count();
        $followedUpCount = Appointment::query()
            ->whereNotNull('inquiry_id')
            ->distinct('inquiry_id')
            ->count('inquiry_id');

        return response()->json([
            'data' => [
                'vehicles_in_stock' => Listing::query()
                    ->where('status', 'active')
                    ->count(),
                'years_in_business' => $this->yearsInBusiness(),
                'customer_conversations' => $inquiriesCount,
                'follow_up_rate' => $inquiriesCount > 0
                    ? (int) round(($followedUpCount / $inquiriesCount) * 100)
                    : 0,
            ],
        ]);
    }

    private function yearsInBusiness(): int
    {
        $firstActivityAt = collect([
            Listing::query()->min('created_at'),
            Inquiry::query()->min('created_at'),
        ])
            ->filter()
            ->map(fn (string $date) => Carbon::parse($date))
            ->sort()
            ->first();

        if (! $firstActivityAt) {
            return 0;
        }

        return max(1, (int) floor($firstActivityAt->diffInYears(now())));
    }
}
