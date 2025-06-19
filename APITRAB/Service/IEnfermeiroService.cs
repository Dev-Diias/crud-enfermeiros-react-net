using System.Collections.Generic;
using System.Threading.Tasks;
using APITRAB.Model; 
namespace APITRAB.Service 
{
    public interface IEnfermeiroService
    {
        Task<IEnumerable<Enfermeiro>> FindAllAsync();
        Task<Enfermeiro> FindByIdAsync(int id);
        Task<Enfermeiro> CreateAsync(Enfermeiro enfermeiro);
        Task<Enfermeiro> UpdateAsync(int id, Enfermeiro enfermeiro);
        Task<bool> DeleteAsync(int id);
    }
}