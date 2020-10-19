using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using TCC.Aplication.resultados.dto;
using TCC.Aplication.resultados.Dto;
using TCC.Aplication.resultados.View;
using TCC.Domain.resultados;

namespace TCC.Aplication.resultados
{
    public interface IAplicResultado
    {
        Task<Resultado> GetResultado(int id, int idUsuario);
        Task<Resultado[]> GetResultados(int id);
        void Finalizar(int id);
        Task<Resultado> IniciaResultado(IniciaResultadoDto dto);
        Task<PerguntaRespostaResultView> SetaPerguntaFeita(SetaPerguntaFeitaDto dto);
        Task<ExameResultView> SetaExameVisto(SetaExameVistoDto dto);
    }
}
