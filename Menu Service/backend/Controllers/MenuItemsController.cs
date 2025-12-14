using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Menu_Service.backend.Models;

namespace Menu_Service.backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MenuItemsController : ControllerBase
    {
        private static readonly List<MenuItem> _items = new();
        private static int _nextId = 1;

        [HttpGet]
        public ActionResult<IEnumerable<MenuItem>> GetAll()
        {
            return Ok(_items);
        }

        [HttpGet("{id}")]
        public ActionResult<MenuItem> GetById(int id)
        {
            var item = _items.FirstOrDefault(i => i.Id == id);
            if (item == null) return NotFound();
            return Ok(item);
        }

        [HttpPost]
        public ActionResult<MenuItem> Create(MenuItem model)
        {
            model.Id = _nextId++;
            _items.Add(model);
            return CreatedAtAction(nameof(GetById), new { id = model.Id }, model);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, MenuItem model)
        {
            var existing = _items.FirstOrDefault(i => i.Id == id);
            if (existing == null) return NotFound();

            existing.Name = model.Name;
            existing.IsAvailable = model.IsAvailable;

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var existing = _items.FirstOrDefault(i => i.Id == id);
            if (existing == null) return NotFound();

            _items.Remove(existing);
            return NoContent();
        }
    }
}
