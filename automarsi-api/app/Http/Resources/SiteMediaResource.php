<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SiteMediaResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'key' => $this->key,
            'image_url' => $this->disk === 'public' && $this->path
                ? $request->getSchemeAndHttpHost().'/storage/'.ltrim($this->path, '/')
                : $this->image_url,
            'alt_text' => $this->alt_text,
            'updated_at' => $this->updated_at?->toISOString(),
        ];
    }
}
