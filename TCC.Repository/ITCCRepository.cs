using System.Threading.Tasks;
using TCC.Domain.curso;

namespace TCC.Repository
{
    public interface ITCCRepository
    {
        //GERAL
         void Add<T>(T entity) where T : class;
         void Update<T>(T entity) where T : class;

         void Delete<T>(T entity) where T : class;

         void DeleteRange<T>(T[] entity) where T : class;

         Task<bool> SaveChangesAsync();

         //EVENTOS

         Task<Evento[]> GetAllEventoAsyncByTema(string Tema, bool includePalestrantes);

         Task<Evento[]> GetAllEventoAsync(bool includePalestrantes);

         Task<Evento> GetEventoAsyncById(int EventoId, bool includePalestrantes);

         //PALESTRANTE

         Task<Palestrante[]> GetAllPalestranteAsync(bool includeEventos);

         Task<Palestrante[]> GetAllPalestrantesAsyncByName(string name, bool includeEventos);

         Task<Palestrante> GetPalestrantesAsyncById(int PalestranteId, bool includeEventos);    
    }
}