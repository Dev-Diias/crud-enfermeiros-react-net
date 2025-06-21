using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema; 

namespace APITRAB.Model
{
    public class Enfermeiro
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(35)]
        public string Nome { get; set; }

        [Required]
        [StringLength(40)]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [StringLength(35)]
        public string Endereco { get; set; }

        [Required]
        [StringLength(35)] 
        public string Especialidade { get; set; }

        [Required]
        public int Idade { get; set; }

        public int? HospitalId { get; set; }

        [ForeignKey("HospitalId")] 
        public Hospital? Hospital { get; set; }

    }
}