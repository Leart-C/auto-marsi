<?php

namespace Tests\Feature;

use App\Http\Middleware\EnsureIsAdmin;
use App\Http\Middleware\VerifyClerkToken;
use App\Models\CarModel;
use App\Models\Listing;
use App\Models\ListingImage;
use App\Models\Make;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class AdminListingImageControllerTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->withoutMiddleware([
            VerifyClerkToken::class,
            EnsureIsAdmin::class,
        ]);

        Storage::fake('public');
    }

    public function test_admin_can_list_listing_images(): void
    {
        $listing = $this->createListing();

        ListingImage::create([
            'listing_id' => $listing->id,
            'disk' => 'public',
            'path' => 'listings/1/front.webp',
            'image_url' => '/storage/listings/1/front.webp',
            'alt_text' => 'Front',
            'sort_order' => 1,
            'is_primary' => false,
        ]);

        ListingImage::create([
            'listing_id' => $listing->id,
            'disk' => 'public',
            'path' => 'listings/1/cover.webp',
            'image_url' => '/storage/listings/1/cover.webp',
            'alt_text' => 'Cover',
            'sort_order' => 0,
            'is_primary' => true,
        ]);

        $response = $this->getJson("/api/admin/listings/{$listing->id}/images");

        $response
            ->assertOk()
            ->assertJsonCount(2, 'data')
            ->assertJsonPath('data.0.alt_text', 'Cover')
            ->assertJsonPath('data.1.alt_text', 'Front');
    }

    public function test_admin_can_upload_listing_image(): void
    {
        $listing = $this->createListing();

        $response = $this->post("/api/admin/listings/{$listing->id}/images", [
            'image' => UploadedFile::fake()->image('front.png'),
            'alt_text' => 'BMW X5 front view',
            'sort_order' => 0,
            'is_primary' => true,
        ], [
            'Accept' => 'application/json',
        ]);

        $response
            ->assertCreated()
            ->assertJsonPath('data.alt_text', 'BMW X5 front view')
            ->assertJsonPath('data.sort_order', 0)
            ->assertJsonPath('data.is_primary', true);

        $image = ListingImage::firstOrFail();

        $this->assertDatabaseHas('listing_images', [
            'id' => $image->id,
            'listing_id' => $listing->id,
            'disk' => 'public',
            'alt_text' => 'BMW X5 front view',
            'sort_order' => 0,
            'is_primary' => true,
        ]);

        /** @var \Illuminate\Filesystem\FilesystemAdapter $storage */
        $storage = Storage::disk('public');
        $storage->assertExists($image->path);
    }

    public function test_first_uploaded_image_becomes_primary_automatically(): void
    {
        $listing = $this->createListing();

        $this->post("/api/admin/listings/{$listing->id}/images", [
            'image' => UploadedFile::fake()->image('front.png'),
        ], [
            'Accept' => 'application/json',
        ])->assertCreated();

        $this->assertDatabaseHas('listing_images', [
            'listing_id' => $listing->id,
            'is_primary' => true,
        ]);
    }

    public function test_setting_primary_image_unsets_other_primary_images(): void
    {
        $listing = $this->createListing();

        $firstImage = ListingImage::create([
            'listing_id' => $listing->id,
            'disk' => 'public',
            'path' => 'listings/1/first.webp',
            'image_url' => '/storage/listings/1/first.webp',
            'alt_text' => 'First',
            'sort_order' => 0,
            'is_primary' => true,
        ]);

        $secondImage = ListingImage::create([
            'listing_id' => $listing->id,
            'disk' => 'public',
            'path' => 'listings/1/second.webp',
            'image_url' => '/storage/listings/1/second.webp',
            'alt_text' => 'Second',
            'sort_order' => 1,
            'is_primary' => false,
        ]);

        $response = $this->postJson(
            "/api/admin/listing-images/{$secondImage->id}/primary"
        );

        $response
            ->assertOk()
            ->assertJsonPath('data.id', $secondImage->id)
            ->assertJsonPath('data.is_primary', true);

        $this->assertFalse($firstImage->fresh()->is_primary);
        $this->assertTrue($secondImage->fresh()->is_primary);
    }

    public function test_admin_can_update_listing_image_metadata(): void
    {
        $listing = $this->createListing();

        $image = ListingImage::create([
            'listing_id' => $listing->id,
            'disk' => 'public',
            'path' => 'listings/1/front.webp',
            'image_url' => '/storage/listings/1/front.webp',
            'alt_text' => 'Old alt',
            'sort_order' => 0,
            'is_primary' => true,
        ]);

        $response = $this->patchJson("/api/admin/listing-images/{$image->id}", [
            'alt_text' => 'New alt',
            'sort_order' => 3,
        ]);

        $response
            ->assertOk()
            ->assertJsonPath('data.alt_text', 'New alt')
            ->assertJsonPath('data.sort_order', 3);

        $this->assertDatabaseHas('listing_images', [
            'id' => $image->id,
            'alt_text' => 'New alt',
            'sort_order' => 3,
        ]);
    }

    public function test_admin_can_delete_listing_image_and_file(): void
    {
        $listing = $this->createListing();

        /** @var \Illuminate\Filesystem\FilesystemAdapter $storage */
        $storage = Storage::disk('public');
        $storage->put('listings/1/front.webp', 'fake-image');

        $image = ListingImage::create([
            'listing_id' => $listing->id,
            'disk' => 'public',
            'path' => 'listings/1/front.webp',
            'image_url' => '/storage/listings/1/front.webp',
            'alt_text' => 'Front',
            'sort_order' => 0,
            'is_primary' => true,
        ]);

        $response = $this->deleteJson("/api/admin/listing-images/{$image->id}");

        $response->assertNoContent();

        $this->assertDatabaseMissing('listing_images', [
            'id' => $image->id,
        ]);

        $storage->assertMissing('listings/1/front.webp');
    }

    private function createListing(): Listing
    {
        $make = Make::create([
            'name' => 'BMW',
            'slug' => 'bmw',
        ]);

        $carModel = CarModel::create([
            'make_id' => $make->id,
            'name' => 'X5',
            'slug' => 'x5',
        ]);

        return Listing::create([
            'make_id' => $make->id,
            'car_model_id' => $carModel->id,
            'title' => 'BMW X5',
            'slug' => 'bmw-x5',
            'year' => 2020,
            'price' => 35000,
            'kilometers' => 85000,
            'fuel_type' => 'diesel',
            'transmission' => 'automatic',
            'status' => 'active',
        ]);
    }
}
