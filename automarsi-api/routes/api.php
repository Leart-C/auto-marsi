<?php

use App\Http\Controllers\Api\InquiryController;
use App\Http\Controllers\Api\ListingController;
use App\Http\Controllers\Api\MakeController;
use App\Http\Controllers\Api\PublicStatsController;
use App\Http\Controllers\Api\RecentlySoldListingController;
use App\Http\Controllers\Api\SiteMediaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('makes', [MakeController::class, 'index']);
Route::get('makes/{make}/models', [MakeController::class, 'models']);

Route::get('listings/recently-sold', [RecentlySoldListingController::class, 'index']);
Route::get('listings', [ListingController::class, 'index']);
Route::get('listings/{listing}', [ListingController::class, 'show']);

Route::post('inquiries', [InquiryController::class, 'store']);

Route::get('site-media/{key}', [SiteMediaController::class, 'show']);
Route::get('stats', PublicStatsController::class);

Route::middleware(['verify.clerk', 'ensure.admin'])
    ->prefix('admin')
    ->group(base_path('routes/admin.php'));
