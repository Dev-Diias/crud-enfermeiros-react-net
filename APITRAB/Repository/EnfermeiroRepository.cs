using APITRAB.Model; 
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace APITRAB.Repository 
{
    public class EnfermeiroRepository : IEnfermeiroRepository
    {
        private readonly Contexto _context; 

        public EnfermeiroRepository(Contexto context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Enfermeiro>> GetAllAsync()
        {
            
            return await _context.Enfermeiros
                                 .Include(e => e.Hospital) 
                                 .ToListAsync();
            
        }

        public async Task<Enfermeiro> GetByIdAsync(int id)
        {
            return await _context.Enfermeiros
                                 .Include(e => e.Hospital) 
                                 .FirstOrDefaultAsync(e => e.Id == id);
           
        }

        public async Task AddAsync(Enfermeiro enfermeiro)
        {
            await _context.Enfermeiros.AddAsync(enfermeiro);
            await _context.SaveChangesAsync();
        }

        
        public async Task UpdateAsync(Enfermeiro enfermeiro)
        {
            var existingEnfermeiro = await _context.Enfermeiros.FirstOrDefaultAsync(e => e.Id == enfermeiro.Id);

            if (existingEnfermeiro == null)
            {
                return;
            }

            _context.Entry(existingEnfermeiro).CurrentValues.SetValues(enfermeiro);


            await _context.SaveChangesAsync();
        }
       

        public async Task<bool> DeleteAsync(int id) 
        {
            var enfermeiro = await GetByIdAsync(id);
            if (enfermeiro != null)
            {
                _context.Enfermeiros.Remove(enfermeiro);
                await _context.SaveChangesAsync();
                return true;
            }
            return false; 
        }

        public async Task<bool> ExistsAsync(int id)
        {
            return await _context.Enfermeiros.AnyAsync(e => e.Id == id);
        }
    }
}