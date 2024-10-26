using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AppointmentBackend.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Test.Data;
using Test.Interfaces;
using Test.Mappers;
using Test.Modals;

namespace Test.Repository
{
    public class AppointmentRepository : IAppointment
    {
        private readonly ApplicationDBContext _context;
        public AppointmentRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        

        public async Task<Appointment> CreateAsync(CreateAppointmentDto createDto)
        {
            await _context.AddAsync(createDto.CreateDtoToAppointment());
            await _context.SaveChangesAsync();
            return createDto.CreateDtoToAppointment();
        }

        public async Task<Appointment?> DeleteAsync(int id)
        {
            var appointment = await _context.Appointments.FirstOrDefaultAsync(x=>x.AppointmentId == id);
            if(appointment == null)
            {
                return null;
            }
            _context.Remove(appointment);
            await _context.SaveChangesAsync();
            return appointment;

        }

        public async Task<List<Appointment>> GetAllAsync()
        {
            var appointments = await _context.Appointments.Include(x=>x.Patient).ToListAsync();
            return appointments;
        }

        public async Task<List<Appointment>?> GetByDateAndId(int id, DateTime date)
        {      
            var dateKindUtc = DateTime.SpecifyKind(date,DateTimeKind.Utc); // converting to utc 

            var appointments = await _context.Appointments.AsQueryable().Where(x=>x.AppointmentDate<=dateKindUtc && x.PatientId == id).ToListAsync();
            if(appointments == null)
            {
                return null;
            }
            return appointments;
        }

        public async Task<Appointment?> GetByIdAsync(int id)
        {
            var appointment = await _context.Appointments.FindAsync(id); // search using primary key

            if(appointment == null)
            {
                return null;
            }
            return appointment;
        }

        public async Task<List<Appointment>?> GetPatientAppointments(int id)
        {
            var appointments = await _context.Appointments.AsQueryable().Where(x=>x.PatientId == id).ToListAsync();
            if(appointments == null)
            {
                return null;
            }
            return appointments;
        }

        public Task<Appointment> Update()
        {
            throw new NotImplementedException();
        }

        public Task<Appointment> UpdateAsync()
        {
            throw new NotImplementedException();
        }
    }
}