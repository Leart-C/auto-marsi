<?php

namespace Tests\Feature;

use App\Http\Middleware\EnsureIsAdmin;
use App\Http\Middleware\VerifyClerkToken;
use App\Models\CarModel;
use App\Models\Make;
use App\Models\VehicleFeature;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CarModelFeatureSuggestionsControllerTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->withoutMiddleware([
            VerifyClerkToken::class,
            EnsureIsAdmin::class,
        ]);
    }

    public function test_admin_can_view_car_model_feature_suggestions(): void
    {
        $carModel = $this->createCarModel();

        $navigation = $this->createFeature('Navigation');
        $camera = $this->createFeature('Backup camera');

        $carModel->suggestedFeatures()->attach([
            $navigation->id => ['source' => 'manual'],
            $camera->id => ['source' => 'manual'],
        ]);

        $response = $this->getJson(
            "/api/admin/car-models/{$carModel->id}/feature-suggestions"
        );

        $response
            ->assertOk()
            ->assertJsonCount(2, 'data')
            ->assertJsonPath('data.0.name', 'Backup camera')
            ->assertJsonPath('data.1.name', 'Navigation');
    }

    public function test_admin_can_sync_car_model_feature_suggestions(): void
    {
        $carModel = $this->createCarModel();

        $navigation = $this->createFeature('Navigation');
        $camera = $this->createFeature('Backup camera');
        $heatedSeats = $this->createFeature('Heated seats');

        $carModel->suggestedFeatures()->attach(
            $navigation->id,
            ['source' => 'manual']
        );

        $response = $this->putJson(
            "/api/admin/car-models/{$carModel->id}/feature-suggestions",
            [
                'feature_ids' => [
                    $camera->id,
                    $heatedSeats->id,
                ],
            ]
        );

        $response
            ->assertOk()
            ->assertJsonCount(2, 'data');

        $this->assertDatabaseMissing('car_model_feature', [
            'car_model_id' => $carModel->id,
            'vehicle_feature_id' => $navigation->id,
        ]);

        $this->assertDatabaseHas('car_model_feature', [
            'car_model_id' => $carModel->id,
            'vehicle_feature_id' => $camera->id,
            'source' => 'manual',
        ]);

        $this->assertDatabaseHas('car_model_feature', [
            'car_model_id' => $carModel->id,
            'vehicle_feature_id' => $heatedSeats->id,
            'source' => 'manual',
        ]);
    }

    public function test_admin_can_clear_car_model_feature_suggestions(): void
    {
        $carModel = $this->createCarModel();
        $feature = $this->createFeature('Navigation');

        $carModel->suggestedFeatures()->attach(
            $feature->id,
            ['source' => 'manual']
        );

        $response = $this->putJson(
            "/api/admin/car-models/{$carModel->id}/feature-suggestions",
            [
                'feature_ids' => [],
            ]
        );

        $response
            ->assertOk()
            ->assertJsonCount(0, 'data');

        $this->assertDatabaseMissing('car_model_feature', [
            'car_model_id' => $carModel->id,
            'vehicle_feature_id' => $feature->id,
        ]);
    }

    public function test_admin_cannot_sync_unknown_features(): void
    {
        $carModel = $this->createCarModel();

        $response = $this->putJson(
            "/api/admin/car-models/{$carModel->id}/feature-suggestions",
            [
                'feature_ids' => [999999],
            ]
        );

        $response->assertUnprocessable();
    }

    private function createCarModel(): CarModel
    {
        $make = Make::create([
            'name' => 'Mercedes-Benz',
            'slug' => 'mercedes-benz',
        ]);

        return CarModel::create([
            'make_id' => $make->id,
            'name' => 'C-Class',
            'slug' => 'c-class',
        ]);
    }

    private function createFeature(string $name): VehicleFeature
    {
        return VehicleFeature::create([
            'name' => $name,
            'slug' => str($name)->slug()->toString(),
            'icon' => 'circle',
        ]);
    }
}