using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Menu_Service.backend.Models;

namespace Menu_Service.backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VariantTypesController : ControllerBase
    {
        // Read-only seeded list based on VariantNames
        private static readonly List<VariantType> _variantTypes = VariantNames.All
            .Select((name, index) => new VariantType { Variant_Type_Id = index + 1, Name = name })
            .ToList();

        [HttpGet]
        public ActionResult<IEnumerable<VariantType>> GetAll()
        {
            return Ok(_variantTypes);
        }

        [HttpGet("{id}")]
        public ActionResult<VariantType> GetById(int id)
        {
            var vt = _variantTypes.FirstOrDefault(v => v.Variant_Type_Id == id);
            if (vt == null) return NotFound();
            return Ok(vt);
        }

        [HttpGet("byname/{name}")]
        public ActionResult<VariantType> GetByName(string name)
        {
            var vt = _variantTypes.FirstOrDefault(v => string.Equals(v.Name, name, System.StringComparison.OrdinalIgnoreCase));
            if (vt == null) return NotFound();
            return Ok(vt);
        }
    }
}
