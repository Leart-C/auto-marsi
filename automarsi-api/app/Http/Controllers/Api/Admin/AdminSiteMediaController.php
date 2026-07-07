<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\SiteMedia\UpdateSiteMediaRequest;
use App\Http\Resources\SiteMediaResource;
use App\Models\SiteMedia;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Storage;

class AdminSiteMediaController extends Controller
{
    public function show(string $key): AnonymousResourceCollection
    {
        return SiteMediaResource::collection(
            SiteMedia::query()
                ->where('key', $key)
                ->orderBy('sort_order')
                ->orderBy('id')
                ->get()
        );
    }

    public function update(
        UpdateSiteMediaRequest $request,
        string $key
    ): SiteMediaResource {
        $path = $request->file('image')->store('site-media', 'public');
        $sortOrder = SiteMedia::query()->where('key', $key)->max('sort_order');

        $media = SiteMedia::query()->create([
            'key' => $key,
            'disk' => 'public',
            'path' => $path,
            'image_url' => null,
            'alt_text' => $request->validated('alt_text'),
            'sort_order' => $sortOrder === null ? 0 : $sortOrder + 1,
        ]);

        return new SiteMediaResource($media);
    }

    public function destroy(SiteMedia $siteMedia): JsonResponse
    {
        if ($siteMedia->disk && $siteMedia->path) {
            Storage::disk($siteMedia->disk)->delete($siteMedia->path);
        }

        $siteMedia->delete();

        return response()->json(null, 204);
    }
}
