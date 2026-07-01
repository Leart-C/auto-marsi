<?php

namespace Tests\Feature;

use App\Models\CarModel;
use App\Models\Listing;
use App\Models\Make;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ListingControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_public_listing_index_only_returns_active_listings(): void
    {
        $make = Make::create(['name' => 'Audi', 'slug' => 'audi']);
        $carModel = CarModel::create([
            'make_id' => $make->id,
            'name' => 'A6',
            'slug' => 'a6',
        ]);

        Listing::create([
            'make_id' => $make->id,
            'car_model_id' => $carModel->id,
            'title' => 'Published Audi A6',
            'slug' => 'published-audi-a6',
            'year' => 2021,
            'price' => 25000,
            'kilometers' => 90000,
            'fuel_type' => 'diesel',
            'transmission' => 'automatic',
            'status' => 'active',
            'published_at' => now(),
        ]);

        Listing::create([
            'make_id' => $make->id,
            'car_model_id' => $carModel->id,
            'title' => 'Draft Audi A6',
            'slug' => 'draft-audi-a6',
            'year' => 2022,
            'price' => 30000,
            'kilometers' => 50000,
            'fuel_type' => 'diesel',
            'transmission' => 'automatic',
            'status' => 'draft',
        ]);

        $response = $this->getJson('/api/listings');

        $response
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.title', 'Published Audi A6');
    }

    public function test_public_listing_show_hides_non_active_listing(): void
    {
        $make = Make::create(['name' => 'Audi', 'slug' => 'audi']);
        $carModel = CarModel::create([
            'make_id' => $make->id,
            'name' => 'A6',
            'slug' => 'a6',
        ]);
        $listing = Listing::create([
            'make_id' => $make->id,
            'car_model_id' => $carModel->id,
            'title' => 'Draft Audi A6',
            'slug' => 'draft-audi-a6',
            'year' => 2022,
            'price' => 30000,
            'kilometers' => 50000,
            'fuel_type' => 'diesel',
            'transmission' => 'automatic',
            'status' => 'draft',
        ]);

        $this->getJson("/api/listings/{$listing->id}")
            ->assertNotFound();
    }
    public function test_recently_sold_endpoint_only_returns_sold_listings(): void
{
    $make = Make::create(['name' => 'Audi', 'slug' => 'audi']);
    $carModel = CarModel::create([
        'make_id' => $make->id,
        'name' => 'A6',
        'slug' => 'a6',
    ]);

    Listing::create([
        'make_id' => $make->id,
        'car_model_id' => $carModel->id,
        'title' => 'Sold Audi A6',
        'slug' => 'sold-audi-a6',
        'year' => 2021,
        'price' => 25000,
        'kilometers' => 90000,
        'fuel_type' => 'diesel',
        'transmission' => 'automatic',
        'status' => 'sold',
        'sold_at' => now(),
    ]);

    Listing::create([
        'make_id' => $make->id,
        'car_model_id' => $carModel->id,
        'title' => 'Active Audi A6',
        'slug' => 'active-audi-a6',
        'year' => 2022,
        'price' => 30000,
        'kilometers' => 50000,
        'fuel_type' => 'diesel',
        'transmission' => 'automatic',
        'status' => 'active',
        'published_at' => now(),
    ]);

    $response = $this->getJson('/api/listings/recently-sold');

    $response
        ->assertOk()
        ->assertJsonCount(1, 'data')
        ->assertJsonPath('data.0.title', 'Sold Audi A6')
        ->assertJsonPath('data.0.status', 'sold');
}

public function test_recently_sold_endpoint_orders_by_sold_date(): void
{
    $make = Make::create(['name' => 'BMW', 'slug' => 'bmw']);
    $carModel = CarModel::create([
        'make_id' => $make->id,
        'name' => 'X5',
        'slug' => 'x5',
    ]);

    Listing::create([
        'make_id' => $make->id,
        'car_model_id' => $carModel->id,
        'title' => 'Older Sold BMW X5',
        'slug' => 'older-sold-bmw-x5',
        'year' => 2020,
        'price' => 35000,
        'kilometers' => 80000,
        'fuel_type' => 'diesel',
        'transmission' => 'automatic',
        'status' => 'sold',
        'sold_at' => now()->subDays(10),
    ]);

    Listing::create([
        'make_id' => $make->id,
        'car_model_id' => $carModel->id,
        'title' => 'Newest Sold BMW X5',
        'slug' => 'newest-sold-bmw-x5',
        'year' => 2021,
        'price' => 42000,
        'kilometers' => 60000,
        'fuel_type' => 'diesel',
        'transmission' => 'automatic',
        'status' => 'sold',
        'sold_at' => now()->subDay(),
    ]);

    $response = $this->getJson('/api/listings/recently-sold');

    $response
        ->assertOk()
        ->assertJsonPath('data.0.title', 'Newest Sold BMW X5')
        ->assertJsonPath('data.1.title', 'Older Sold BMW X5');
}
}
