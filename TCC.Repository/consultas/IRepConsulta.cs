using System.Threading.Tasks;
using TCC.Domain.consultas;

namespace TCC.Repository.consultas
{
    public interface IRepConsulta
    {
         void Add<T>(T entity) where T : class;
         void Update<T>(T entity) where T : class;

         void Delete<T>(T entity) where T : class;

         void DeleteRange<T>(T[] entity) where T : class;

         Task<bool> SaveChangesAsync();

         Task<Consulta[]> GelAllConsultas();
        Task<Consulta> GetEventoAsyncById(int ConsultaId);
    }
}