<?php

namespace App\Actions\Reports;

use App\Models\Listing;
use Carbon\Carbon;
use Illuminate\Support\Collection;

class BuildSalesReport
{
    /**
     * @return array{
     *     range: string,
     *     title: string,
     *     starts_at: string,
     *     ends_at: string,
     *     summary: array{
     *         revenue: float,
     *         purchase_total: float,
     *         expenses: float,
     *         profit: float,
     *         sold_count: int,
     *         margin_percent: float|null
     *     },
     *     trend: array<int, array{
     *         key: string,
     *         label: string,
     *         revenue: float,
     *         profit: float,
     *         sold_count: int
     *     }>,
     *     rows: array<int, array{
     *         id: int,
     *         title: string,
     *         sold_at: string,
     *         sale_price: float,
     *         purchase_price: float,
     *         expenses: float,
     *         profit: float,
     *         margin_percent: float|null
     *     }>
     * }
     */
    public function handle(string $range): array
    {
        $range = $this->normalizeRange($range);
        [$start, $end] = $this->period($range);

        $buckets = collect($this->buckets($range, $start, $end))
            ->keyBy('key')
            ->map(fn (array $bucket) => [
                ...$bucket,
                'revenue' => 0.0,
                'profit' => 0.0,
                'sold_count' => 0,
            ]);

        $rows = [];

        foreach ($this->soldListings() as $listing) {
            $soldDate = $listing->sold_at ?? $listing->updated_at;

            if ($soldDate->lt($start) || $soldDate->gt($end)) {
                continue;
            }

            $salePrice = (float) ($listing->sale_price ?? $listing->price ?? 0);
            $purchasePrice = (float) ($listing->purchase_price ?? 0);
            $expenses = (float) ($listing->sales_expenses ?? 0);
            $profit = $listing->sale_price === null
                ? 0.0
                : $salePrice - $purchasePrice - $expenses;

            $rows[] = [
                'id' => $listing->id,
                'title' => $listing->title,
                'sold_at' => $soldDate->toDateString(),
                'sale_price' => round($salePrice, 2),
                'purchase_price' => round($purchasePrice, 2),
                'expenses' => round($expenses, 2),
                'profit' => round($profit, 2),
                'margin_percent' => $salePrice > 0
                    ? round(($profit / $salePrice) * 100, 2)
                    : null,
            ];

            $key = $this->bucketKey($soldDate, $range);

            if (! $buckets->has($key)) {
                continue;
            }

            $bucket = $buckets->get($key);
            $bucket['revenue'] += $salePrice;
            $bucket['profit'] += $profit;
            $bucket['sold_count']++;

            $buckets->put($key, $bucket);
        }

        $trend = $buckets->values()
            ->map(fn (array $bucket) => [
                ...$bucket,
                'revenue' => round($bucket['revenue'], 2),
                'profit' => round($bucket['profit'], 2),
            ])
            ->all();

        $revenue = array_sum(array_column($rows, 'sale_price'));
        $purchaseTotal = array_sum(array_column($rows, 'purchase_price'));
        $expenses = array_sum(array_column($rows, 'expenses'));
        $profit = array_sum(array_column($rows, 'profit'));

        return [
            'range' => $range,
            'title' => $this->title($range),
            'starts_at' => $start->toDateString(),
            'ends_at' => $end->toDateString(),
            'summary' => [
                'revenue' => round($revenue, 2),
                'purchase_total' => round($purchaseTotal, 2),
                'expenses' => round($expenses, 2),
                'profit' => round($profit, 2),
                'sold_count' => count($rows),
                'margin_percent' => $revenue > 0
                    ? round(($profit / $revenue) * 100, 2)
                    : null,
            ],
            'trend' => $trend,
            'rows' => $rows,
        ];
    }

    private function normalizeRange(string $range): string
    {
        return match ($range) {
            'day', 'today' => 'today',
            'week', 'month', 'year' => $range,
            default => 'month',
        };
    }

    /**
     * @return array{Carbon, Carbon}
     */
    private function period(string $range): array
    {
        $now = now();

        return match ($range) {
            'today' => [$now->copy()->startOfDay(), $now->copy()->endOfDay()],
            'week' => [$now->copy()->startOfWeek(), $now->copy()->endOfWeek()],
            'year' => [$now->copy()->startOfYear(), $now->copy()->endOfYear()],
            default => [$now->copy()->startOfMonth(), $now->copy()->endOfMonth()],
        };
    }

    /**
     * @return array<int, array{key: string, label: string}>
     */
    private function buckets(string $range, Carbon $start, Carbon $end): array
    {
        return match ($range) {
            'today' => collect(range(0, 5))
                ->map(fn (int $index) => $start->copy()->addHours($index * 4))
                ->map(fn (Carbon $date) => [
                    'key' => $date->format('Y-m-d H'),
                    'label' => $date->format('H:00'),
                ])
                ->all(),
            'week' => collect(range(0, 6))
                ->map(fn (int $index) => $start->copy()->addDays($index))
                ->map(fn (Carbon $date) => [
                    'key' => $date->format('Y-m-d'),
                    'label' => $date->format('D'),
                ])
                ->all(),
            'year' => collect(range(0, 11))
                ->map(fn (int $index) => $start->copy()->addMonths($index))
                ->map(fn (Carbon $date) => [
                    'key' => $date->format('Y-m'),
                    'label' => $date->format('M'),
                ])
                ->all(),
            default => collect(range(0, $start->diffInDays($end)))
                ->map(fn (int $index) => $start->copy()->addDays($index))
                ->map(fn (Carbon $date) => [
                    'key' => $date->format('Y-m-d'),
                    'label' => $date->format('d M'),
                ])
                ->all(),
        };
    }

    private function bucketKey(Carbon $date, string $range): string
    {
        return match ($range) {
            'today' => $date->copy()
                ->minute(0)
                ->second(0)
                ->hour((int) floor($date->hour / 4) * 4)
                ->format('Y-m-d H'),
            'week', 'month' => $date->format('Y-m-d'),
            'year' => $date->format('Y-m'),
        };
    }

    private function title(string $range): string
    {
        return match ($range) {
            'today' => 'Today',
            'week' => 'This week',
            'year' => 'This year',
            default => 'This month',
        };
    }

    /**
     * @return Collection<int, Listing>
     */
    private function soldListings(): Collection
    {
        return Listing::query()
            ->where('status', 'sold')
            ->orderByDesc('sold_at')
            ->orderByDesc('updated_at')
            ->get([
                'id',
                'title',
                'price',
                'purchase_price',
                'sale_price',
                'sales_expenses',
                'sold_at',
                'updated_at',
            ]);
    }
}
