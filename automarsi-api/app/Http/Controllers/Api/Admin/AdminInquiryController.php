<?php

namespace App\Http\Controllers\Api\Admin;

use App\Actions\Inquiries\UpdateInquiry;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Inquiries\IndexInquiriesRequest;
use App\Http\Requests\Admin\Inquiries\UpdateInquiryRequest;
use App\Http\Resources\InquiryResource;
use App\Models\Inquiry;
use App\Queries\AdminInquiryQuery;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class AdminInquiryController extends Controller
{
    public function index(
        IndexInquiriesRequest $request,
        AdminInquiryQuery $query
    ): AnonymousResourceCollection {
        return InquiryResource::collection(
            $query->paginate($request->validated())
        );
    }

    public function show(Inquiry $inquiry): InquiryResource
    {
        return new InquiryResource(
            $inquiry
                ->load(['listing.make', 'listing.carModel'])
                ->loadExists('appointments')
        );
    }

    public function update(
        UpdateInquiryRequest $request,
        Inquiry $inquiry,
        UpdateInquiry $updateInquiry
    ): InquiryResource {
        return new InquiryResource(
            $updateInquiry->handle($inquiry, $request->validated())
        );
    }
}
