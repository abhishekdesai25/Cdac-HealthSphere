using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Test.Dtos
{
    public class AppointmentDateTimeDto
    {
        public DateTime AppointmentDate { get; set; }

        public TimeSpan AppointmentTime { get; set; }
    }
}