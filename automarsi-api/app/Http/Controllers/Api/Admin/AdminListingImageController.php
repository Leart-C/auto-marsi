<?php

namespace App\Http\Controllers\Api\Admin;

use App\Actions\ListingImages\CreateListingImage;
use App\Actions\ListingImages\DeleteListingImage;
use App\Actions\ListingImages\SetPrimaryListingImage;
use App\Actions\ListingImages\UpdateListingImage;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ListingImages\StoreListingImageRequest;
use App\Http\Requests\Admin\ListingImages\UpdateListingImageRequest;
use App\Http\Resources\ListingImageResource;
use App\Models\Listing;
use App\Models\ListingImage;
use App\Queries\AdminListingImageQuery;
use Illuminate\Http\Response;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class AdminListingImageController extends Controller
{
    public function index(
        Listing $listing,
        AdminListingImageQuery $query
    ): AnonymousResourceCollection {
        return ListingImageResource::collection(
            $query->allForListing($listing)
        );
    }

    public function store(
        StoreListingImageRequest $request,
        Listing $listing,
        CreateListingImage $createListingImage
    ): ListingImageResource {
        $listingImage = $createListingImage->handle(
            $listing,
            $request->file('image'),
            $request->validated()
        );

        return new ListingImageResource($listingImage);
    }

    public function update(
        UpdateListingImageRequest $request,
        Listing $listing,
        ListingImage $image,
        UpdateListingImage $updateListingImage
    ): ListingImageResource {
        return new ListingImageResource(
            $updateListingImage->handle($image, $request->validated())
        );
    }

    public function destroy(
        Listing $listing,
        ListingImage $image,
        DeleteListingImage $deleteListingImage
    ): Response {
        $deleteListingImage->handle($image);

        return response()->noContent();
    }

    public function primary(
        Listing $listing,
        ListingImage $image,
        SetPrimaryListingImage $setPrimaryListingImage
    ): ListingImageResource {
        return new ListingImageResource(
            $setPrimaryListingImage->handle($image)
        );
    }
}
