// CityController.cs

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AngularAPI.Context; // Update the namespace
using MovieTicketBookingApp.Models;
// Update the namespace for City model // Import your City model

namespace MovieTicketBookingApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        private readonly AppDbContext _authcontext; // Your DbContext instance

        public CityController(AppDbContext context)
        {
            _authcontext = context;
        }

        // GET: api/City
        [HttpGet]
        public IActionResult GetCities()
        {
            var cities = _authcontext.Cities;
            return Ok(cities);
        }

        // GET: api/City/{id}
        [HttpGet("{id}")]
        public IActionResult GetCity(int id)
        {
            var city = _authcontext.Cities.Find(id);

            if (city == null)
            {
                return NotFound();
            }

            return Ok(city);
        }

        // POST: api/City
        [HttpPost]
        public IActionResult CreateCity([FromBody] City city)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _authcontext.Cities.Add(city);
            _authcontext.SaveChanges(); // Save changes to the database

            return CreatedAtAction(nameof(GetCity), new { id = city.CityId }, city);
        }


        // PUT: api/City/{id}
        [HttpPut("{id}")]
        public IActionResult UpdateCity(int id, [FromBody] City city)
        {
            if (id != city.CityId)
            {
                return BadRequest();
            }

            _authcontext.Entry(city).State = EntityState.Modified;
            _authcontext.SaveChanges();

            return NoContent();
        }

        // DELETE: api/City/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteCity(int id)
        {
            var city = _authcontext.Cities.Find(id);

            if (city == null)
            {
                return NotFound();
            }

            _authcontext.Cities.Remove(city);
            _authcontext.SaveChanges();

            return NoContent();
        }
    }
}
