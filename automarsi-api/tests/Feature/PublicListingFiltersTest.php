<?php

namespace Tests\Feature;

use App\Models\CarModel;
use App\Models\Listing;
use App\Models\Make;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PublicListingFiltersTest extends TestCase
{
    use RefreshDatabase;

    public function test_filters_match_existing_mixed_case_values_and_keep_drafts_private(): void
    {
        $make = Make::create(['name' => 'Volkswagen', 'slug' => 'volkswagen']);
        $model = CarModel::create(['make_id' => $make->id, 'name' => 'Golf', 'slug' => 'golf']);
        $attributes = [
            'make_id' => $make->id,
            'car_model_id' => $model->id,
            'year' => 2023,
            'price' => 25000,
            'fuel_type' => 'Diesel',
            'transmission' => 'Automatic',
            'body_type' => 'Hatchback',
            'status' => 'active',
            'published_at' => now(),
        ];

        $listing = Listing::create(array_merge($attributes, [
            'title' => 'Published Golf', 'slug' => 'published-golf',
        ]));
        Listing::create(array_merge($attributes, [
            'title' => 'Draft Golf', 'slug' => 'draft-golf', 'status' => 'draft',
        ]));
        Listing::create(array_merge($attributes, [
            'title' => 'Other vehicle', 'slug' => 'other-vehicle',
            'fuel_type' => 'petrol', 'transmission' => 'manual', 'body_type' => 'sedan',
        ]));

        foreach ([
            ['body_type' => 'hatchback'],
            ['fuel_type' => 'diesel'],
            ['transmission' => 'automatic'],
            ['body_type' => 'HATCHBACK', 'fuel_type' => 'DIESEL', 'transmission' => 'AUTOMATIC'],
        ] as $filters) {
            $this->getJson('/api/listings?' . http_build_query($filters))
                ->assertOk()
                ->assertJsonCount(1, 'data')
                ->assertJsonPath('data.0.id', $listing->id);
        }

        $this->getJson('/api/listings?body_type=suv')
            ->assertOk()
            ->assertJsonCount(0, 'data');
    }
}
