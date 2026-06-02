<?php

namespace App\Http\Controllers\Api;

use App\Actions\Inquiries\CreateInquiry;
use App\Http\Controllers\Controller;
use App\Http\Requests\Public\Inquiries\StoreInquiryRequest;
use Illuminate\Http\JsonResponse;

class InquiryController extends Controller
{
    public function store(StoreInquiryRequest $request, CreateInquiry $createInquiry): JsonResponse
    {
        $inquiry = $createInquiry->handle($request->validated());

        return response()->json([
            'data' => $inquiry,
            'message' => 'Inquiry submitted successfully.',
        ], 201);
    }
}