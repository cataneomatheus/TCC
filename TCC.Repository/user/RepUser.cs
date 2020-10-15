using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TCC.Domain.Identity;

namespace TCC.Repository.user
{
    public class RepUser : IRepUser
    {
        private readonly DataContext _dataContext;

        public RepUser(DataContext dataContext)
        {
            _dataContext = dataContext;
            _dataContext.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }       

        public async Task<User> GetUserById(int UserId)
        {
            IQueryable<User> query = _dataContext.Users;

            query = query.AsNoTracking()
            .OrderBy(u => u.Id)
            .Where(u => u.Id == UserId);

            return await query.FirstOrDefaultAsync();
        }
    }
}