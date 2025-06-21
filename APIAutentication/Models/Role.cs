using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace APIAutentication.Models 
{
    public class Role
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string Nome { get; set; }

        public ICollection<Usuario> Usuarios { get; set; }
    }
}