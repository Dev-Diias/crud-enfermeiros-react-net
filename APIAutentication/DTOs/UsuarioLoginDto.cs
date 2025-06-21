using System.ComponentModel.DataAnnotations;

namespace APIAutentication.DTOs 
{
    public class UsuarioLoginDto
    {
        [Required]
        public string NomeUsuario { get; set; }

        [Required]
        public string Senha { get; set; }
    }
}