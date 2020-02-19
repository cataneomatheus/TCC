using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TCC.Domain.consultas;

namespace TCC.Repository.consultas
{
    public class RepConsulta : IRepConsulta
    {
        private readonly DataContext _dataContext;

        public RepConsulta(DataContext dataContext)
        {
            _dataContext = dataContext;
            _dataContext.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;          
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

        public async Task<Consulta[]> GelAllConsultas()
        {
            IQueryable<Consulta> query = _dataContext.Consultas
            .Include( c => c.PerguntaRespostas)
            .Include(c => c.Exames);
            
            query = query.OrderBy(c => c.Id);

            return await query.ToArrayAsync();
        }

        public async Task<Consulta> GetConsultaAsyncById(int ConsultaId)
        {
            IQueryable<Consulta> query = _dataContext.Consultas
            .Include( c => c.PerguntaRespostas)
            .Include(c => c.Exames);
            
            query = query.AsNoTracking()
            .OrderBy(c => c.Id)
            .Where(c => c.Id == ConsultaId);

            return await query.FirstOrDefaultAsync();
        }

        public async Task<bool> SaveChangesAsync()
        {
            return (await _dataContext.SaveChangesAsync()) > 0;
        }

        public void Update<T>(T entity) where T : class
        {
            _dataContext.Update(entity);
        }
    }
}