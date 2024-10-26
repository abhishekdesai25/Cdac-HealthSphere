using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Test.Modals
{
    [Table("patients")]
    public class Patient
    {
        [Key]
        [Column("patientid")]
        public int PatientId { get; set; }

        [Column("username")]
        [Required]
        public string Username { get; set;} = string.Empty;

        [Column("password")]
        public string PasswordHash { get; set; } = string.Empty;
        
        [Column("gender")]
        public string gender {get;set;} = string.Empty;

        [Column("bloodgroup")]
        public string bloodgroup {get;set;} = string.Empty;

        [Column("name")]
        public string Name { get; set; } = string.Empty;

        [Column("email")]
        public string Email {get;set;} = string.Empty;

        [Column("dateofbirth")]
        public DateTime DateOfBirth { get; set; }

        [Column("mobileno")]
        public string PhoneNumber { get; set; } = string.Empty;

        [Column("address")]
        public string Address { get; set; } = string.Empty;

        [Column("emergencycontact")]
        public string EmergencyContact { get; set; } = string.Empty;

        public ICollection<Appointment?> Appointments { get; set; }
    }

}