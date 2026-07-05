<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\SiteMedia\UpdateSiteMediaRequest;
use App\Http\Resources\SiteMediaResource;
use App\Models\SiteMedia;
use Illuminate\Support\Facades\Storage;

class AdminSiteMediaController extends Controller
{
    public function show(string $key): SiteMediaResource
    {
        return new SiteMediaResource(
            SiteMedia::query()->firstOrNew(['key' => $key])
        );
    }

    public function update(
        UpdateSiteMediaRequest $request,
        string $key
    ): SiteMediaResource {
        $media = SiteMedia::query()->firstOrNew(['key' => $key]);

        if ($media->path) {
            Storage::disk($media->disk)->delete($media->path);
        }

        $path = $request->file('image')->store('site-media', 'public');

        $media->fill([
            'key' => $key,
            'disk' => 'public',
            'path' => $path,
            'image_url' => null,
            'alt_text' => $request->validated('alt_text'),
        ])->save();

        return new SiteMediaResource($media);
    }
}
