<?php

namespace Tests\Feature;

use App\Jobs\SendInquiryEmail;
use App\Mail\InquirySubmittedMail;
use App\Models\Inquiry;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class SendInquiryEmailTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_sends_inquiry_email_to_configured_recipient(): void
    {
        Mail::fake();

        config()->set('automarsi.leads_email', 'leads@automarsi.test');

        $inquiry = Inquiry::create([
            'name' => 'John Doe',
            'phone' => '+38344111222',
            'email' => 'john@example.com',
            'message' => 'Interested in this car.',
            'status' => 'new',
        ]);

        (new SendInquiryEmail($inquiry))->handle();

        Mail::assertSent(InquirySubmittedMail::class, function ($mail) {
            return $mail->hasTo('leads@automarsi.test');
        });
    }

    public function test_it_does_not_send_email_without_configured_recipient(): void
    {
        Mail::fake();

        config()->set('automarsi.leads_email', null);

        $inquiry = Inquiry::create([
            'name' => 'John Doe',
            'phone' => '+38344111222',
            'status' => 'new',
        ]);

        (new SendInquiryEmail($inquiry))->handle();

        Mail::assertNothingSent();
    }
}