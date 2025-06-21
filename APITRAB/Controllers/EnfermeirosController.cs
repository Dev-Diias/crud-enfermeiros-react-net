using APITRAB.Model;
using APITRAB.Service;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization; 

namespace APITRAB.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize] 
    public class EnfermeirosController : ControllerBase
    {
        private readonly IEnfermeiroService _enfermeiroService;

        public EnfermeirosController(IEnfermeiroService enfermeiroService)
        {
            _enfermeiroService = enfermeiroService;
        }

        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Enfermeiro>>> GetEnfermeiros()
        {
            var enfermeiros = await _enfermeiroService.FindAllAsync();
            return Ok(enfermeiros);
        }

        
        [HttpGet("{id}")]
        public async Task<ActionResult<Enfermeiro>> GetEnfermeiro(int id)
        {
            var enfermeiro = await _enfermeiroService.FindByIdAsync(id);

            if (enfermeiro == null)
            {
                return NotFound();
            }

            return Ok(enfermeiro);
        }

        
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEnfermeiro(int id, Enfermeiro enfermeiro)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var updatedEnfermeiro = await _enfermeiroService.UpdateAsync(id, enfermeiro);
            if (updatedEnfermeiro == null)
            {
                return NotFound();
            }

            return NoContent();
        }

        
        [HttpPost]
        public async Task<ActionResult<Enfermeiro>> PostEnfermeiro(Enfermeiro enfermeiro)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var createdEnfermeiro = await _enfermeiroService.CreateAsync(enfermeiro);
            return CreatedAtAction(nameof(GetEnfermeiro), new { id = createdEnfermeiro.Id }, createdEnfermeiro);
        }

        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEnfermeiro(int id)
        {
            var result = await _enfermeiroService.DeleteAsync(id);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}