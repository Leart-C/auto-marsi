<h1>New inquiry received</h1>

<p><strong>Name:</strong> {{ $inquiry->name }}</p>
<p><strong>Phone:</strong> {{ $inquiry->phone }}</p>

@if ($inquiry->email)
    <p><strong>Email:</strong> {{ $inquiry->email }}</p>
@endif

@if ($inquiry->listing)
    <p><strong>Listing:</strong> {{ $inquiry->listing->title }}</p>
@endif

@if ($inquiry->message)
    <p><strong>Message:</strong></p>
    <p>{{ $inquiry->message }}</p>
@endif

@if ($inquiry->source)
    <p><strong>Source:</strong> {{ $inquiry->source }}</p>
@endif