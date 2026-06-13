<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class VehicleCatalogImportService
{
    public function modelsForMake(string $make): array
    {
        $response = Http::timeout(10)->get(
            'https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/' . urlencode($make),
            [
                'format' => 'json',
            ]
        );

        if (! $response->successful()) {
            throw new \RuntimeException('Failed to fetch models from vehicle catalog.');
        }

        return collect($response->json('Results', []))
            ->pluck('Model_Name')
            ->filter()
            ->map(fn (string $name) => trim($name))
            ->filter()
            ->unique(fn (string $name) => Str::lower($name))
            ->sort()
            ->values()
            ->map(fn (string $name) => [
                'name' => $name,
            ])
            ->all();
    }
}