<?php

namespace App\Http\Requests\Admin\CarModels;

use Illuminate\Foundation\Http\FormRequest;

class SyncCarModelFeaturesRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'feature_ids' => [
                'present',
                'array',
            ],
            'feature_ids.*' => [
                'integer',
                'distinct',
                'exists:vehicle_features,id',
            ],
        ];
    }
}