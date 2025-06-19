using APITRAB.Model; 
using APITRAB.Repository; 
using System.Collections.Generic;
using System.Threading.Tasks;

namespace APITRAB.Service
{
    public class HospitalService : IHospitalService
    {
        private readonly IHospitalRepository _repository;

        public HospitalService(IHospitalRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Hospital>> FindAllAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<Hospital> FindByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task<Hospital> CreateAsync(Hospital hospital)
        {
            
            await _repository.AddAsync(hospital);
            return hospital;
        }

        public async Task<Hospital> UpdateAsync(int id, Hospital hospital)
        {
            if (id != hospital.Id)
            {
                return null; 
            }

            var existingHospital = await _repository.GetByIdAsync(id);
            if (existingHospital == null)
            {
                return null; 
            }

            existingHospital.Nome = hospital.Nome;
            existingHospital.Endereco = hospital.Endereco;
            existingHospital.Telefone = hospital.Telefone;

            await _repository.UpdateAsync(existingHospital);
            return existingHospital;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            return await _repository.DeleteAsync(id);
        }
    }
}