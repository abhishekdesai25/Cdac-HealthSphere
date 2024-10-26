using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Test.Data;
using Test.Interfaces;

namespace Test.Repository
{
    public class DoctorRepository : IDoctor
    {
        private readonly ApplicationDBContext _context;
        public DoctorRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public Task<IActionResult> AppointmentsToday(int id)
        {
            throw new NotImplementedException();
        }
        
      
    }
}