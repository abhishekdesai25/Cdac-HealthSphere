using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Test.Modals
{
    [Table("appointments")]
    public class Appointment
    {
        [Key]
        [Column("appointment_id")]
        public int AppointmentId { get; set; }

        [Column("patientid")]
        public int PatientId { get; set; }

        [Column("doctorid")]
        public int DoctorId { get; set; }

        [Column("appointment_date")]
        public DateTime AppointmentDate { get; set; }

        [Column("appointment_time")]
        public TimeSpan AppointmentTime { get; set; }

        [Column("status")]
        public string Status { get; set; } = string.Empty;

        [Column("notes")]
        public string Notes { get; set; } = string.Empty;

        // Navigation properties
        public Patient? Patient { get; set; }  // = new Patient(); by making this nullable remove error doctors_username_key duplication error4110
        public Doctor? Doctor { get; set; }
    }

}