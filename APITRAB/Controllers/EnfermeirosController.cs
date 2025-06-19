using APITRAB.Model;
using APITRAB.Service; 
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace APITRAB.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EnfermeirosController : ControllerBase
    {
        
        private readonly IEnfermeiroService _enfermeiroService;

        public EnfermeirosController(IEnfermeiroService enfermeiroService)
        {
            _enfermeiroService = enfermeiroService;
        }
       


        // GET: api/Enfermeiros
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Enfermeiro>>> GetEnfermeiros()
        {
            var enfermeiros = await _enfermeiroService.FindAllAsync(); 
            return Ok(enfermeiros);
        }

        // GET: api/Enfermeiros/5
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

        // PUT: api/Enfermeiros/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
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

        // POST: api/Enfermeiros
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
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

        // DELETE: api/Enfermeiros/5
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