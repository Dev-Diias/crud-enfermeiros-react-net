using APITRAB.Model;
using APITRAB.Service;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace APITRAB.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HospitaisController : ControllerBase
    {
        private readonly IHospitalService _hospitalService;

        public HospitaisController(IHospitalService hospitalService)
        {
            _hospitalService = hospitalService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Hospital>>> GetHospitais()
        {
            var hospitais = await _hospitalService.FindAllAsync();
            return Ok(hospitais);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Hospital>> GetHospital(int id)
        {
            var hospital = await _hospitalService.FindByIdAsync(id);
            if (hospital == null)
            {
                return NotFound();
            }
            return Ok(hospital);
        }

        [HttpPost]
        public async Task<ActionResult<Hospital>> PostHospital(Hospital hospital)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var createdHospital = await _hospitalService.CreateAsync(hospital);
            return CreatedAtAction(nameof(GetHospital), new { id = createdHospital.Id }, createdHospital);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutHospital(int id, Hospital hospital)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var updatedHospital = await _hospitalService.UpdateAsync(id, hospital);
            if (updatedHospital == null)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHospital(int id)
        {
            var result = await _hospitalService.DeleteAsync(id);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}