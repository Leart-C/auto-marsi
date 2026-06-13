<?php

namespace App\Actions\VehicleFeatures;

use App\Models\VehicleFeature;
use App\Services\SlugService;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

class InstallDefaultVehicleFeatures
{
    public function __construct(
        private readonly SlugService $slugService
    ) {
    }

    public function handle(): Collection
    {
        $defaults = [
            ['name' => 'Leather seats', 'icon' => 'armchair'],
            ['name' => 'Heated seats', 'icon' => 'flame'],
            ['name' => 'Ventilated seats', 'icon' => 'fan'],
            ['name' => 'Navigation', 'icon' => 'navigation'],
            ['name' => 'Apple CarPlay', 'icon' => 'smartphone'],
            ['name' => 'Android Auto', 'icon' => 'smartphone'],
            ['name' => 'Backup camera', 'icon' => 'camera'],
            ['name' => '360 camera', 'icon' => 'scan'],
            ['name' => 'Parking sensors', 'icon' => 'radar'],
            ['name' => 'Blind spot monitor', 'icon' => 'eye'],
            ['name' => 'Adaptive cruise control', 'icon' => 'gauge'],
            ['name' => 'Panoramic roof', 'icon' => 'sun'],
            ['name' => 'Keyless entry', 'icon' => 'key-round'],
            ['name' => 'Keyless start', 'icon' => 'power'],
            ['name' => 'Bluetooth', 'icon' => 'bluetooth'],
            ['name' => 'LED headlights', 'icon' => 'lightbulb'],
            ['name' => 'Alloy wheels', 'icon' => 'circle'],
            ['name' => 'Winter tires', 'icon' => 'snowflake'],
        ];

        return DB::transaction(function () use ($defaults) {
            foreach ($defaults as $feature) {
                $existingFeature = VehicleFeature::query()
                    ->whereRaw('LOWER(name) = ?', [strtolower($feature['name'])])
                    ->first();

                if ($existingFeature) {
                    if (! $existingFeature->icon) {
                        $existingFeature->update([
                            'icon' => $feature['icon'],
                        ]);
                    }

                    continue;
                }

                VehicleFeature::create([
                    'name' => $feature['name'],
                    'slug' => $this->slugService->unique(
                        VehicleFeature::class,
                        $feature['name']
                    ),
                    'icon' => $feature['icon'],
                ]);
            }

            return VehicleFeature::query()
                ->orderBy('name')
                ->get();
        });
    }
}