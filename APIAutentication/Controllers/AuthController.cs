using APIAutentication.DTOs; 
using APIAutentication.Models; 
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BCrypt.Net; 
using Microsoft.Extensions.Configuration; 
namespace APIAutentication.Controllers 
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AuthContext _context; 
        private readonly IConfiguration _configuration; 

        public AuthController(AuthContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost("register")]
        public async Task<ActionResult<Usuario>> Register(UsuarioRegistroDto request)
        {
            if (await _context.Usuarios.AnyAsync(u => u.NomeUsuario == request.NomeUsuario))
            {
                return BadRequest("Nome de usuário já existe.");
            }
            if (await _context.Usuarios.AnyAsync(u => u.Email == request.Email))
            {
                return BadRequest("E-mail já registrado.");
            }

            
            string passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Senha);

            var role = await _context.Roles.FindAsync(request.RoleId);
            if (role == null)
            {
                return BadRequest("Role ID inválido. As roles válidas são 1 (Admin), 2 (Enfermeiro), 3 (Padrão).");
            }

            var usuario = new Usuario
            {
                NomeUsuario = request.NomeUsuario,
                Email = request.Email,
                SenhaHash = passwordHash,
                RoleId = request.RoleId,
                
            };

            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();

            return Ok("Usuário registrado com sucesso!");
        }

        [HttpPost("login")]
        public async Task<ActionResult<TokenDto>> Login(UsuarioLoginDto request)
        {
            var usuario = await _context.Usuarios
                                        .Include(u => u.Role) 
                                        .FirstOrDefaultAsync(u => u.NomeUsuario == request.NomeUsuario);

            if (usuario == null)
            {
                return Unauthorized("Nome de usuário ou senha incorretos.");
            }

            if (!BCrypt.Net.BCrypt.Verify(request.Senha, usuario.SenhaHash))
            {
                return Unauthorized("Nome de usuário ou senha incorretos.");
            }

            var token = CreateToken(usuario);

            return Ok(new TokenDto
            {
                Token = token,
                NomeUsuario = usuario.NomeUsuario,
                Role = usuario.Role.Nome 
            });
        }

        private string CreateToken(Usuario usuario)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, usuario.NomeUsuario), 
                new Claim(ClaimTypes.Email, usuario.Email),     
                new Claim(ClaimTypes.NameIdentifier, usuario.Id.ToString()), 
                new Claim(ClaimTypes.Role, usuario.Role.Nome) 
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"])); 
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature); 

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],      
                audience: _configuration["Jwt:Audience"],   
                claims: claims,                             
                expires: DateTime.Now.AddDays(7),           
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token); 
        }
    }
}