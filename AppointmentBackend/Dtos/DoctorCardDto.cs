using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppointmentBackend.Dtos
{
    public class DoctorCardDto
    {
        public int patientid { get; set; }
        public string patient_name { get; set; } = string.Empty;
        public string patient_gender { get; set; } = string.Empty;
        public string patient_BGroup { get; set; } = string.Empty;
        public string patient_notes { get; set; } = string.Empty;

        public int appointment_id { get; set; }
    }
}