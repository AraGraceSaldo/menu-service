using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Menu_Service.backend.Models;

namespace Menu_Service.backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ItemVariantPricesController : ControllerBase
    {
        private static readonly List<ItemVariant_Price> _prices = new();
        private static int _nextId = 1;

        [HttpGet]
        public ActionResult<IEnumerable<ItemVariant_Price>> GetAll()
        {
            return Ok(_prices);
        }

        [HttpGet("{id}")]
        public ActionResult<ItemVariant_Price> GetById(int id)
        {
            var p = _prices.FirstOrDefault(x => x.Item_Variant_Id == id);
            if (p == null) return NotFound();
            return Ok(p);
        }

        [HttpPost]
        public ActionResult<ItemVariant_Price> Create(ItemVariant_Price model)
        {
            if (model.Price < 0) return BadRequest("Price must be non-negative");

            // prevent duplicate Menu_Item_Id + Variant_Type_Id
            if (_prices.Any(x => x.Menu_Item_Id == model.Menu_Item_Id && x.Variant_Type_Id == model.Variant_Type_Id))
                return Conflict("An item variant price with the same menu item and variant type already exists.");

            model.Item_Variant_Id = _nextId++;
            _prices.Add(model);
            return CreatedAtAction(nameof(GetById), new { id = model.Item_Variant_Id }, model);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, ItemVariant_Price model)
        {
            var existing = _prices.FirstOrDefault(x => x.Item_Variant_Id == id);
            if (existing == null) return NotFound();

            if (model.Price < 0) return BadRequest("Price must be non-negative");

            // prevent changing to a duplicate combination
            if (_prices.Any(x => x.Item_Variant_Id != id && x.Menu_Item_Id == model.Menu_Item_Id && x.Variant_Type_Id == model.Variant_Type_Id))
                return Conflict("Another item variant price with the same menu item and variant type already exists.");

            existing.Menu_Item_Id = model.Menu_Item_Id;
            existing.Variant_Type_Id = model.Variant_Type_Id;
            existing.Price = model.Price;

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var existing = _prices.FirstOrDefault(x => x.Item_Variant_Id == id);
            if (existing == null) return NotFound();

            _prices.Remove(existing);
            return NoContent();
        }
    }
}
