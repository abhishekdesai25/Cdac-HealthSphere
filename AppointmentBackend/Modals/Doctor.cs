using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Test.Modals
{
    [Table("doctors")]
    public class Doctor
    {
        [Key]
        [Column("doctorid")]
        public int DoctorId { get; set; }

       
        [Column("username")]
        public string Username { get; set; } = string.Empty;
        
       
        [Column("password")]
        public string PasswordHash { get; set; } = string.Empty;

     
        [Column("firstname")]
        public string FirstName { get; set; } = string.Empty;
      
        [Column("lastname")]
        public string LastName { get; set; } = string.Empty;

        [Column("specialization")]
        public string Specialization { get; set; } = string.Empty;

        [Column("yearsofexperience")]
        public string YearsOfExperience { get; set; } = string.Empty;
        [Column("mobileno")]
        public string PhoneNumber {get;set;} = string.Empty;

        [Column("profilepic")]
        public byte[]? ProfilePicture { get; set; }

        [Column("bio")]
        public string Bio { get; set; } = string.Empty;
        
        [Column("starttime")]
        public TimeSpan StartTime;
         [Column("endtime")]
        public TimeSpan EndTime;
        public ICollection<Appointment?> Appointments { get; set; }
    }

}