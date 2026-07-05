<?php

namespace App\Http\Requests\Admin\SiteMedia;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSiteMediaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'image' => ['required', 'image', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
            'alt_text' => ['nullable', 'string', 'max:255'],
        ];
    }
}
