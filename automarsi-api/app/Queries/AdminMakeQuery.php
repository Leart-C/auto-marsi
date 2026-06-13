<?php

namespace App\Queries;

use App\Models\Make;
use Illuminate\Database\Eloquent\Collection;

class AdminMakeQuery
{
    public function all(): Collection
    {
        return Make::query()
            ->withCount('carModels')
            ->orderBy('name')
            ->get();
    }
}
