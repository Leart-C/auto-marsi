<?php

namespace App\Http\Controllers\Api\Admin;

use App\Actions\CarModels\ImportCarModels;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CatalogImport\ImportCatalogModelsRequest;
use App\Http\Requests\Admin\CatalogImport\SearchCatalogModelsRequest;
use App\Http\Resources\CarModelResource;
use App\Models\Make;
use App\Services\VehicleCatalogImportService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class AdminVehicleCatalogImportController extends Controller
{
    public function models(
        SearchCatalogModelsRequest $request,
        VehicleCatalogImportService $vehicleCatalogImportService
    ): JsonResponse {
        return response()->json([
            'data' => $vehicleCatalogImportService->modelsForMake(
                $request->validated('make')
            ),
        ]);
    }

    public function importModels(
        ImportCatalogModelsRequest $request,
        ImportCarModels $importCarModels
    ): AnonymousResourceCollection {
        $data = $request->validated();

        $make = Make::findOrFail($data['make_id']);

        return CarModelResource::collection(
            $importCarModels->handle($make, $data['models'])
        );
    }
}