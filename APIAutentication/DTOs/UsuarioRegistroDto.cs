using System.ComponentModel.DataAnnotations;

namespace APIAutentication.DTOs 
{
    public class UsuarioRegistroDto
    {
        [Required]
        [StringLength(100, MinimumLength = 3)]
        public string NomeUsuario { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 6)]
        public string Senha { get; set; }

        [Required]
        public int RoleId { get; set; }
    }
}