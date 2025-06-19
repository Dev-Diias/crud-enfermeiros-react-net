using System.Collections.Generic;
using System.Threading.Tasks;
using APITRAB.Model; 

namespace APITRAB.Service
{
    public interface IHospitalService
    {
        Task<IEnumerable<Hospital>> FindAllAsync();
        Task<Hospital> FindByIdAsync(int id);
        Task<Hospital> CreateAsync(Hospital hospital);
        Task<Hospital> UpdateAsync(int id, Hospital hospital);
        Task<bool> DeleteAsync(int id);
    }
}