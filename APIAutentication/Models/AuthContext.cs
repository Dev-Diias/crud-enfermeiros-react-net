using APIAutentication.Models; 
using Microsoft.EntityFrameworkCore;

namespace APIAutentication.Models 
{
    public class AuthContext : DbContext
    {
        public AuthContext(DbContextOptions<AuthContext> options) : base(options)
        {
        }

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Role> Roles { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            
            modelBuilder.Entity<Usuario>()
                .HasOne(u => u.Role)
                .WithMany(r => r.Usuarios)
                .HasForeignKey(u => u.RoleId);

            
            modelBuilder.Entity<Role>().HasData(
                new Role { Id = 1, Nome = "Admin" },
                new Role { Id = 2, Nome = "Enfermeiro" },
                new Role { Id = 3, Nome = "Padrao" } 
            );
        }
    }
}