<?php

namespace App\Actions\Appointments;

use App\Models\Appointment;

class UpdateAppointment
{
    public function handle(Appointment $appointment, array $data): Appointment
    {
        $appointment->update($data);

        return $appointment->fresh([
            'listing.make',
            'listing.carModel',
            'inquiry',
        ]);
    }
}
