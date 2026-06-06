<?php

namespace App\Jobs;

use App\Mail\InquirySubmittedMail;
use App\Models\Inquiry;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Mail;

class SendInquiryEmail implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(public Inquiry $inquiry)
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $recipient = config('automarsi.leads_email');

        if(! $recipient){
            return;
        }

        $this->inquiry->loadMissing(['listing']);

        Mail::to($recipient)->send(
            new InquirySubmittedMail($this->inquiry)
        );
    }
}
