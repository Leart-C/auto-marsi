<?php

namespace Tests\Feature;

use App\Http\Middleware\EnsureIsAdmin;
use App\Http\Middleware\VerifyClerkToken;
use App\Models\CarModel;
use App\Models\Inquiry;
use App\Models\Listing;
use App\Models\Make;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;


class AdminInquiryControllerTest extends TestCase
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

    public function test_admin_can_list_inquiries(): void
    {
        Inquiry::create([
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'phone' => '+38344111222',
            'message' => 'Interested',
            'status' => 'new',
        ]);

        $response = $this->getJson('/api/admin/inquiries');

        $response
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.name', 'John Doe');
    }

    public function test_admin_can_filter_inquiries_by_status(): void
    {
        Inquiry::create([
            'name' => 'New Lead',
            'phone' => '+38344111111',
            'status' => 'new',
        ]);

        Inquiry::create([
            'name' => 'Closed Lead',
            'phone' => '+38344222222',
            'status' => 'closed',
        ]);

        $response = $this->getJson('/api/admin/inquiries?status=closed');

        $response
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.name', 'Closed Lead');
    }

    public function test_admin_can_update_inquiry_status(): void
    {
        $inquiry = Inquiry::create([
            'name' => 'John Doe',
            'phone' => '+38344111222',
            'status' => 'new',
        ]);

        $response = $this->patchJson("/api/admin/inquiries/{$inquiry->id}", [
            'status' => 'read',
        ]);

        $response
            ->assertOk()
            ->assertJsonPath('data.status', 'read');

        $this->assertDatabaseHas('inquiries', [
            'id' => $inquiry->id,
            'status' => 'read',
        ]);
    }

    public function test_admin_cannot_update_inquiry_to_invalid_status(): void
    {
        $inquiry = Inquiry::create([
            'name' => 'John Doe',
            'phone' => '+38344111222',
            'status' => 'new',
        ]);

        $response = $this->patchJson("/api/admin/inquiries/{$inquiry->id}", [
            'status' => 'invalid',
        ]);

        $response->assertUnprocessable();
    }
        public function test_admin_can_filter_inquiries_by_listing_id(): void
    {
        $firstListing = $this->createListing('audi-a6');
        $secondListing = $this->createListing('bmw-x5');

        Inquiry::create([
            'listing_id' => $firstListing->id,
            'name' => 'Audi Lead',
            'phone' => '+38344111111',
            'status' => 'new',
        ]);

        Inquiry::create([
            'listing_id' => $secondListing->id,
            'name' => 'BMW Lead',
            'phone' => '+38344222222',
            'status' => 'new',
        ]);

        $response = $this->getJson("/api/admin/inquiries?listing_id={$secondListing->id}");

        $response
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.name', 'BMW Lead');
    }
    public function test_admin_can_search_inquiries(): void
    {
        Inquiry::create([
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'phone' => '+38344111111',
            'message' => 'Interested in Audi',
            'status' => 'new',
        ]);

        Inquiry::create([
            'name' => 'Jane Smith',
            'email' => 'jane@example.com',
            'phone' => '+38344222222',
            'message' => 'Interested in BMW',
            'status' => 'new',
        ]);

        $response = $this->getJson('/api/admin/inquiries?search=BMW');

        $response
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.name', 'Jane Smith');
    }
    public function test_admin_can_view_single_inquiry(): void
    {
        $listing = $this->createListing('audi-a6');

        $inquiry = Inquiry::create([
            'listing_id' => $listing->id,
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'phone' => '+38344111111',
            'message' => 'Interested in this car',
            'status' => 'new',
        ]);

        $response = $this->getJson("/api/admin/inquiries/{$inquiry->id}");

        $response
            ->assertOk()
            ->assertJsonPath('data.id', $inquiry->id)
            ->assertJsonPath('data.name', 'John Doe')
            ->assertJsonPath('data.listing.id', $listing->id);
    }
    private function createListing(string $slug): Listing
    {
        $make = Make::create([
            'name' => "Make {$slug}",
            'slug' => "make-{$slug}",
        ]);

        $carModel = CarModel::create([
            'make_id' => $make->id,
            'name' => "Model {$slug}",
            'slug' => "model-{$slug}",
        ]);

        return Listing::create([
            'make_id' => $make->id,
            'car_model_id' => $carModel->id,
            'title' => "Listing {$slug}",
            'slug' => $slug,
            'year' => 2021,
            'price' => 25000,
            'kilometers' => 90000,
            'fuel_type' => 'diesel',
            'transmission' => 'automatic',
            'status' => 'active',
        ]);
    }
}
