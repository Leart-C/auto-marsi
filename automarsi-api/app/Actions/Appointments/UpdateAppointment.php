<?php

namespace App\Actions\Appointments;

use App\Models\Appointment;

class UpdateAppointment
{
    public function handle(Appointment $appointment, array $data): Appointment
    {
        $appointment->update([
            'status' => $data['status'],
        ]);

        return $appointment->fresh(['listing.make', 'listing.carModel']);
    }
}