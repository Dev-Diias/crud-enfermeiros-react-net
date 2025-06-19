using APITRAB.Model;
using APITRAB.Repository; 
using System.Collections.Generic;
using System.Threading.Tasks;

namespace APITRAB.Service 
{
    public class EnfermeiroService : IEnfermeiroService
    {
        private readonly IEnfermeiroRepository _repository;

        public EnfermeiroService(IEnfermeiroRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Enfermeiro>> FindAllAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<Enfermeiro> FindByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task<Enfermeiro> CreateAsync(Enfermeiro enfermeiro)
        {
           
            await _repository.AddAsync(enfermeiro);
            return enfermeiro;
        }

        public async Task<Enfermeiro> UpdateAsync(int id, Enfermeiro enfermeiro)
        {
            if (id != enfermeiro.Id)
            {
                return null;
            }

            var existingEnfermeiro = await _repository.GetByIdAsync(id);
            if (existingEnfermeiro == null)
            {
                return null; 
            }

            existingEnfermeiro.Nome = enfermeiro.Nome;
            existingEnfermeiro.Email = enfermeiro.Email;
            existingEnfermeiro.Endereco = enfermeiro.Endereco; 
            existingEnfermeiro.Especialidade = enfermeiro.Especialidade;
            existingEnfermeiro.Idade = enfermeiro.Idade;
            existingEnfermeiro.HospitalId = enfermeiro.HospitalId; 

            await _repository.UpdateAsync(existingEnfermeiro);
            return existingEnfermeiro;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            return await _repository.DeleteAsync(id); 
        }
    }
}