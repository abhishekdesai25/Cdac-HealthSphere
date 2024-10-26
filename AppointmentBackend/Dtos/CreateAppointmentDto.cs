using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppointmentBackend.Dtos
{
    public class CreateAppointmentDto
    {
        public int PatientId {get;set;}
        public int DoctorId {get;set;}
        public string Notes {get;set;} = string.Empty;
        public DateTime Date {get;set;}
        public TimeSpan Time {get;set;}
        public string Status {get;set;} = string.Empty;
    }
}