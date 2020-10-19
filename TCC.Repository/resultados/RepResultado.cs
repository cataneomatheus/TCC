using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TCC.Domain.resultados;

namespace TCC.Repository.resultados
{
    public class RepResultado : IRepResultado
    {
        private readonly DataContext _dataContext;

        public RepResultado(DataContext dataContext)
        {
            _dataContext = dataContext;
            _dataContext.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }

        public async Task<Resultado> GetResultadoProfessorPorId(int resultadoId, int professorId)
        {
            IQueryable<Resultado> query = _dataContext.Resultados
             .Include(c => c.PerguntaRespostasResultados)
             .Include(c => c.ExameResultados);

            query = query.Where(c => c.Id == resultadoId && c.ProfessorId == professorId);

            return await query.FirstOrDefaultAsync();
        }

        public async Task<Resultado> GetResultadoAlunoPorId(int resultadoId, int alunoId)
        {
            IQueryable<Resultado> query = _dataContext.Resultados
             .Include(c => c.PerguntaRespostasResultados)
             .Include(c => c.ExameResultados);

            query = query.Where(c => c.Id == resultadoId && c.AlunoId == alunoId);

            return await query.FirstOrDefaultAsync();
        }

        public async Task<Resultado[]> GetResultPorProfessor(int userId)
        {
            IQueryable<Resultado> query = _dataContext.Resultados
            .Include(c => c.PerguntaRespostasResultados)
            .Include(c => c.ExameResultados);

            query = query.Where(c => c.ProfessorId == userId).OrderBy(c => c.Id);

            return await query.ToArrayAsync();
        }

        public async Task<Resultado[]> GetResultPorAluno(int userId)
        {
            IQueryable<Resultado> query = _dataContext.Resultados
            .Include(c => c.PerguntaRespostasResultados)
            .Include(c => c.ExameResultados);

            query = query.Where(c => c.AlunoId == userId).OrderBy(c => c.Id);

            return await query.ToArrayAsync();
        }

        public async Task<Resultado> RecuperarPorId(int id)
        {
            IQueryable<Resultado> query = _dataContext.Resultados
            .Include(p => p.PerguntaRespostasResultados)
            .Include(p => p.ExameResultados);

            query = query.AsNoTracking()
                         .Where(p => p.Id == id && !p.Finalizado);

            return await query.FirstOrDefaultAsync();
        }

        public async Task<Resultado> GetResultadoIniciado(int codigoAluno, string hashSimulacao)
        {
            IQueryable<Resultado> query = _dataContext.Resultados
            .Include(p => p.PerguntaRespostasResultados)
            .Include(p => p.ExameResultados);

            query = query.AsNoTracking()
                         .Where(p => p.AlunoId == codigoAluno && p.HashLib == hashSimulacao && !p.Finalizado);

            return await query.FirstOrDefaultAsync();
        }

        public async Task<Resultado> GetResultado(int codigoAluno, string hashSimulacao)
        {
            IQueryable<Resultado> query = _dataContext.Resultados
            .Include(p => p.PerguntaRespostasResultados)
            .Include(p => p.ExameResultados);

            query = query.AsNoTracking()
                         .Where(p => p.AlunoId == codigoAluno && p.HashLib == hashSimulacao);

            return await query.FirstOrDefaultAsync();
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

        public void Update<T>(T entity) where T : class
        {
            _dataContext.Update(entity);
        }
        public async Task<bool> SaveChangesAsync()
        {
            return (await _dataContext.SaveChangesAsync()) > 0;
        }
    }
}
