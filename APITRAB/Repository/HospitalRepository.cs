using APITRAB.Model; 
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace APITRAB.Repository
{
    public class HospitalRepository : IHospitalRepository
    {
        private readonly Contexto _context;

        public HospitalRepository(Contexto context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Hospital>> GetAllAsync()
        {
            return await _context.Hospitais.ToListAsync();
        }

        public async Task<Hospital> GetByIdAsync(int id)
        {
            return await _context.Hospitais.FirstOrDefaultAsync(h => h.Id == id);
        }

        public async Task AddAsync(Hospital hospital)
        {
            await _context.Hospitais.AddAsync(hospital);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Hospital hospital)
        {
            _context.Entry(hospital).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var hospital = await GetByIdAsync(id);
            if (hospital != null)
            {
                _context.Hospitais.Remove(hospital);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public async Task<bool> ExistsAsync(int id)
        {
            return await _context.Hospitais.AnyAsync(h => h.Id == id);
        }
    }
}