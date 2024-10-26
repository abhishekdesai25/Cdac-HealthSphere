using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AppointmentBackend.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Test.Data;
using Test.Mappers;
using Test.Modals;

namespace Test.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class DoctorController : ControllerBase
    {
        private readonly ApplicationDBContext _context;

        public DoctorController(ApplicationDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAsync()
        {
            var doctors = _context.Doctors.ToList();
            return Ok(doctors);
        }

        [HttpGet]
        [Route("appointments/{id}")]
        public async Task<IActionResult> AppointmentsAtDate([FromRoute] int id,[FromQuery] DateTime date)
        {
            var doctor = await _context.Doctors.Include(x=>x.Appointments).ThenInclude(x=>x.Patient).FirstOrDefaultAsync(d=>d.DoctorId==id);

            if(doctor==null)
            {
                return NotFound();
            }
            var doctorCards =  doctor.Appointments.Where(x=>x.AppointmentDate == date).Select(x=>x.ToDoctorCardDto()).ToList();
            return Ok(doctorCards);
            // return Ok(new DoctorAppointments
            // {
                    
            // });
            
        }
            
            
        }
        
}
       
    
