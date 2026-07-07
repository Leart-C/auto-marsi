<?php

namespace Tests\Feature;

use App\Http\Middleware\EnsureIsAdmin;
use App\Http\Middleware\VerifyClerkToken;
use App\Models\SiteMedia;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class AdminSiteMediaControllerTest extends TestCase
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

    public function test_admin_can_delete_site_media_and_file(): void
    {
        Storage::disk('public')->put('site-media/home-hero.jpg', 'image-content');

        $media = SiteMedia::create([
            'key' => 'home_hero',
            'disk' => 'public',
            'path' => 'site-media/home-hero.jpg',
            'image_url' => null,
            'alt_text' => 'Home hero',
            'sort_order' => 0,
        ]);

        $response = $this->deleteJson("/api/admin/site-media/{$media->id}");

        $response->assertNoContent();

        $this->assertDatabaseMissing('site_media', [
            'id' => $media->id,
        ]);

        $this->assertFalse(
            Storage::disk('public')->exists('site-media/home-hero.jpg')
        );
    }

    public function test_deleting_site_media_does_not_delete_other_media_items(): void
    {
        Storage::disk('public')->put('site-media/first.jpg', 'first-image');
        Storage::disk('public')->put('site-media/second.jpg', 'second-image');

        $firstMedia = SiteMedia::create([
            'key' => 'about_showroom',
            'disk' => 'public',
            'path' => 'site-media/first.jpg',
            'image_url' => null,
            'alt_text' => 'First image',
            'sort_order' => 0,
        ]);

        $secondMedia = SiteMedia::create([
            'key' => 'about_showroom',
            'disk' => 'public',
            'path' => 'site-media/second.jpg',
            'image_url' => null,
            'alt_text' => 'Second image',
            'sort_order' => 1,
        ]);

        $response = $this->deleteJson("/api/admin/site-media/{$firstMedia->id}");

        $response->assertNoContent();

        $this->assertDatabaseMissing('site_media', [
            'id' => $firstMedia->id,
        ]);

        $this->assertDatabaseHas('site_media', [
            'id' => $secondMedia->id,
            'path' => 'site-media/second.jpg',
        ]);

        $this->assertFalse(
            Storage::disk('public')->exists('site-media/first.jpg')
        );

        $this->assertTrue(
            Storage::disk('public')->exists('site-media/second.jpg')
        );
    }
}
