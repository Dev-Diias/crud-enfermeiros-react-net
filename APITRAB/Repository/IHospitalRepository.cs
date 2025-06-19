using System.Collections.Generic;
using System.Threading.Tasks;
using APITRAB.Model; 

namespace APITRAB.Repository
{
    public interface IHospitalRepository
    {
        Task<IEnumerable<Hospital>> GetAllAsync();
        Task<Hospital> GetByIdAsync(int id);
        Task AddAsync(Hospital hospital);
        Task UpdateAsync(Hospital hospital);
        Task<bool> DeleteAsync(int id);
        Task<bool> ExistsAsync(int id);
    }
}