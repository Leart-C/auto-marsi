<?php

namespace App\Http\Requests\Admin\CatalogImport;

use Illuminate\Foundation\Http\FormRequest;

class SearchCatalogModelsRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'make' => ['required', 'string', 'max:255'],
        ];
    }
}