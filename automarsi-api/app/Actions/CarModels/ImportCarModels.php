<?php

namespace App\Actions\CarModels;

use App\Models\CarModel;
use App\Models\Make;
use App\Services\SlugService;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;

class ImportCarModels
{
    public function __construct(private SlugService $slugService)
    {
    }

    public function handle(Make $make, array $modelNames): Collection
    {
        return collect($modelNames)
            ->map(fn (string $name) => trim($name))
            ->filter()
            ->unique(fn (string $name) => Str::lower($name))
            ->map(function (string $name) use ($make) {
                $existingModel = CarModel::query()
                    ->where('make_id', $make->id)
                    ->whereRaw('lower(name) = ?', [Str::lower($name)])
                    ->first();

                if ($existingModel) {
                    return $existingModel;
                }

                return CarModel::create([
                    'make_id' => $make->id,
                    'name' => $name,
                    'slug' => $this->slugService->unique(CarModel::class, $name),
                ]);
            })
            ->values();
    }
}