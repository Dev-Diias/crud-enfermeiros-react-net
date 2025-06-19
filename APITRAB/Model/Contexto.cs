using Microsoft.EntityFrameworkCore;
using APITRAB.Model; 

namespace APITRAB.Model 
{
    public class Contexto : DbContext
    {
        public Contexto(DbContextOptions<Contexto> options) : base(options)
        {
        }

        public DbSet<Enfermeiro> Enfermeiros { get; set; }
        public DbSet<Hospital> Hospitais { get; set; } 

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Enfermeiro>()
                .HasOne(e => e.Hospital)          
                .WithMany(h => h.Enfermeiros)     
                .HasForeignKey(e => e.HospitalId); 
        }
    }
}