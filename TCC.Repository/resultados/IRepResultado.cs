using System.Threading.Tasks;
using TCC.Domain.resultados;

namespace TCC.Repository.resultados
{
    public interface IRepResultado
    {
        Task<Resultado[]> GetResultPorProfessor(int userId);
        Task<Resultado[]> GetResultPorAluno(int userId);
        Task<Resultado> GetResultadoProfessorPorId(int resultadoId, int professorId);
        Task<Resultado> GetResultadoAlunoPorId(int resultadoId, int alunoId);
        Task<Resultado> GetResultadoIniciado(int codigoAluno, string hashSimulacao);
        Task<Resultado> GetResultado(int codigoAluno, string hashSimulacao);
        Task<Resultado> RecuperarPorId(int id);
        void Add<T>(T entity) where T : class;
        void Update<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        void DeleteRange<T>(T[] entity) where T : class;
        Task<bool> SaveChangesAsync();
    }
}
