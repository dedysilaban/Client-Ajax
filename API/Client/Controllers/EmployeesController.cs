
using API.Models;
using Client.Base.Controllers;
using Client.Repository.Data;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Client.Controllers
{
    public class EmployeesController : BaseController<Employee, EmployeeRepository, string>
    {
        private readonly EmployeeRepository repository;
        public EmployeesController(EmployeeRepository repository) : base(repository)
        {
            this.repository = repository;
        }
        [HttpGet]
        public async Task<JsonResult> GetById(string id)
        {
            var result = await repository.GetById(id);
            return Json(result);
        }

        [HttpGet]
        public async Task<JsonResult> GetRegister()
        {
            var result = await repository.GetRegister();
            return Json(result);
        }

        public IActionResult Index()
        {
            return View();
        }
    }
}
