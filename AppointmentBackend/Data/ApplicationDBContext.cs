using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Test.Modals;


namespace Test.Data
{
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<Appointment> Appointments { get; set; }
        public DbSet<Patient> Patients { get; set; }
        public DbSet<Doctor> Doctors { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Appointment>()
                .HasOne(a => a.Patient)
                .WithMany(p => p.Appointments)
                .HasForeignKey(a => a.PatientId);

            modelBuilder.Entity<Appointment>()
                .HasOne(a => a.Doctor)
                .WithMany(d => d.Appointments)
                .HasForeignKey(a => a.DoctorId);


            //Patient Mapping
        //     modelBuilder.Entity<Patient>()
        //    .Property(p => p.Username)
        //    .IsRequired()
        //    .HasMaxLength(100);

        //     modelBuilder.Entity<Patient>()
        //         .Property(p => p.PasswordHash)
        //         .IsRequired();

        //     modelBuilder.Entity<Patient>()
        //         .Property(p => p.Name)
        //         .IsRequired()
        //         .HasMaxLength(100);

    

            // modelBuilder.Entity<Patient>()
            //     .Property(p => p.PhoneNumber)
            //     .IsRequired()
            //     .HasMaxLength(15);

            // Configuring Doctor entity
            modelBuilder.Entity<Doctor>()
                .HasKey(d => d.DoctorId);

            // modelBuilder.Entity<Doctor>()
            //     .Property(d => d.Username)
            //     .IsRequired()
            //     .HasMaxLength(100);

            // modelBuilder.Entity<Doctor>()
            //     .Property(d => d.PasswordHash)
            //     .IsRequired();

            // modelBuilder.Entity<Doctor>()
            //     .Property(d => d.FirstName)
            //     .IsRequired()
            //     .HasMaxLength(100);

            // modelBuilder.Entity<Doctor>()
            //     .Property(d => d.LastName)
            //     .IsRequired()
            //     .HasMaxLength(100);

            // modelBuilder.Entity<Doctor>()
            //     .Property(d => d.Specialization)
            //     .IsRequired()
            //     .HasMaxLength(100);

            // modelBuilder.Entity<Doctor>()
            //     .Property(d => d.YearsOfExperience)
            //     .IsRequired();

            // modelBuilder.Entity<Doctor>()
            //     .Property(d => d.Bio)
            //     .HasMaxLength(1000);

        }
    }
}


