using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace APITRAB.Model
{
    public class Hospital
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Nome { get; set; }

        [Required]
        [StringLength(200)]
        public string Endereco { get; set; }

        [StringLength(20)] 
        public string Telefone { get; set; }

        public ICollection<Enfermeiro> Enfermeiros { get; set; } = new List<Enfermeiro>();
    }
}