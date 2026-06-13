<?php

namespace App\Http\Requests\Admin\CatalogImport;

use Illuminate\Foundation\Http\FormRequest;

class ImportCatalogModelsRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'make_id' => ['required', 'integer', 'exists:makes,id'],
            'models' => ['required', 'array', 'min:1'],
            'models.*' => ['required', 'string', 'max:255'],
        ];
    }
}