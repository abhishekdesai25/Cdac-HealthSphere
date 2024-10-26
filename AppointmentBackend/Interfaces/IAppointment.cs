using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AppointmentBackend.Dtos;
using Microsoft.AspNetCore.Mvc;
using Test.Modals;

namespace Test.Interfaces
{
    public interface IAppointment
    {
        Task<List<Appointment>> GetAllAsync();
        Task<Appointment?> GetByIdAsync(int id);
        Task<Appointment> CreateAsync(CreateAppointmentDto createAppointmentDto);
        Task<Appointment?> UpdateAsync();
        Task<Appointment?> Update();
        Task<List<Appointment>?> GetPatientAppointments(int id);
       Task<List<Appointment>?> GetByDateAndId(int id,DateTime date);
       Task<Appointment?> DeleteAsync(int id);
    }
}