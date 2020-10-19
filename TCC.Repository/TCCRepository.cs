using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace TCC.Repository
{
    public class TCCRepository : ITCCRepository
    {
        private readonly DataContext _dataContext;

        //GERAIS
        public TCCRepository(DataContext dataContext)
        {            
            _dataContext = dataContext;
            _dataContext.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }
        public async Task<bool> SaveChangesAsync()
        {
            return (await _dataContext.SaveChangesAsync()) > 0;
        }

        public void Update<T>(T entity) where T : class
        {
            _dataContext.Update(entity);
        }

        public void Add<T>(T entity) where T : class
        {
            _dataContext.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _dataContext.Remove(entity);
        }        

        public void DeleteRange<T>(T[] entityArray) where T : class
        {
            _dataContext.RemoveRange(entityArray);
        }
        
    }
}