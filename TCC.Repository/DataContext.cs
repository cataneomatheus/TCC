using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TCC.Domain.consultas;
using TCC.Domain.Identity;
using TCC.Domain.resultados;

namespace TCC.Repository
{
    public class DataContext : IdentityDbContext<User, Role, int,
                                                IdentityUserClaim<int>,
                                                UserRole, IdentityUserLogin<int>,
                                                IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public DataContext(DbContextOptions<DataContext> options) : base (options) {}

        //consulta
        public DbSet<Consulta> Consultas {get; set;}
        public DbSet<PerguntaResposta> PerguntaRespostas {get; set;}
        public DbSet<Exame> Exames {get; set;}        
        public DbSet<Resultado> Resultados { get; set; }        

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<UserRole>(userRole =>
            {
                userRole.HasKey(ur => new {ur.UserId, ur.RoleId});

                userRole.HasOne(ur => ur.Role)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(ur => ur.RoleId)
                    .IsRequired();

                userRole.HasOne(ur => ur.User)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(ur => ur.UserId)
                    .IsRequired();
            });
        }
    }
}