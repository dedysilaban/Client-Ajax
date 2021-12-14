using API.Repository.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace API.Base
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseController <Entity, Repository, Key>: ControllerBase
        where Entity : class
        where Repository : IRepository<Entity, Key>
    {
        private readonly Repository repository;
        public BaseController(Repository repository)
        {
            this.repository = repository;

        }
        [HttpPost]

        public ActionResult Post(Entity entity)
        {
            var result = repository.Insert(entity);
            if (result >= 1)
            {
                return Ok(result);
               /* return Ok(new { status = HttpStatusCode.OK, result, messageResult = "Data berhasil ditambahkan" });*/
            }
            return BadRequest(new { status = HttpStatusCode.BadRequest, result, messageResult = "Sepertinya terjadi kesalahan, periksa kembali!" });
           /* var result = repository.Insert(entity, key);
            return Ok(result);*/
        }

        [HttpGet]
        public IEnumerable<Entity> Get()
        {
            var result = repository.Get();
            /*return Ok(result);*/
            return result;
        }

        [HttpGet("{key}")]
        public ActionResult Get(Key key)
        {
            var result = repository.Get(key);

            if(result != null)
            {
                return Ok(result);
            }
            return NotFound(new { status = HttpStatusCode.NotFound, result, messege = $"Data dengan NIK: {key} tidak ditemukan"});
        }

        [HttpPut("{key}")]
        public ActionResult<Entity> Update(Entity entity, Key key)
        {
            try
            {
                var result = repository.Update(entity, key);
                return Ok(new { status = HttpStatusCode.OK, result, message = "Data berhasil diupdate" });
            }
            catch
            {
                return NotFound(new { status = HttpStatusCode.NotFound, message = $"Data dengan NIK: {key} tidak ditemukan" });
            }
        }

        [HttpDelete("{key}")]
        public ActionResult Delete(Key key)
        {
            var exist = repository.Get(key);
            try
            {
                var result = repository.Delete(key);
                return Ok(result);
            }
            catch
            {
                return NotFound(new { status = HttpStatusCode.NotFound, result = exist, message = $"Data dengan NIK: {key} tidak ditemukan" });
            }
        }

    }
}
