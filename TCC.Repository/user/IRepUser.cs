using System.Threading.Tasks;
using TCC.Domain.Identity;

namespace TCC.Repository.user
{
    public interface IRepUser
    {
        Task<User> GetUserById(int UserId);
    }
}