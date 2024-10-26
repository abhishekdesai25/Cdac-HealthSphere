using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Test.Data;

namespace AppointmentBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PatientController : Controller
    {
        private readonly ApplicationDBContext _context;
        public PatientController(ApplicationDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("appointments/{id:int}")]
        public async Task<IActionResult> GetAllAppointments([FromRoute] int id)
        {
            var appointments = await  _context.Appointments.AsQueryable().Where(x=>x.PatientId==id).ToListAsync();
            if(appointments == null)
            {
                return NotFound();
            }
            return Ok(appointments);
        }

    }
}