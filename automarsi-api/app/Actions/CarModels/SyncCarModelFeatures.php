<?php

namespace App\Actions\CarModels;

use App\Models\CarModel;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

class SyncCarModelFeatures
{
    public function handle(
        CarModel $carModel,
        array $featureIds
    ): Collection {
        return DB::transaction(function () use ($carModel, $featureIds) {
            $carModel->suggestedFeatures()->syncWithPivotValues(
                $featureIds,
                ['source' => 'manual']
            );

            return $carModel->suggestedFeatures()
                ->orderBy('name')
                ->get();
        });
    }
}