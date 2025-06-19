using System.Collections.Generic;
using System.Threading.Tasks;
using APITRAB.Model; 
namespace APITRAB.Repository 
{
    public interface IEnfermeiroRepository
    {
        Task<IEnumerable<Enfermeiro>> GetAllAsync();
        Task<Enfermeiro> GetByIdAsync(int id);
        Task AddAsync(Enfermeiro enfermeiro);
        Task UpdateAsync(Enfermeiro enfermeiro);
        Task<bool> DeleteAsync(int id); 
        Task<bool> ExistsAsync(int id);
    }
}