using Microsoft.EntityFrameworkCore;
using TCC.WebAPI.Model.Logins;

namespace TCC.WebAPI.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base (options) {}

        public DbSet<Login> Logins { get; set; }
    }
}