using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TCC.Aplication.resultados.dto;
using TCC.Aplication.resultados.Dto;
using TCC.Aplication.resultados.View;
using TCC.Domain.consultas;
using TCC.Domain.resultados;
using TCC.Repository.consultas;
using TCC.Repository.resultados;
using TCC.Repository.user;

namespace TCC.Aplication.resultados
{
    public class AplicResultado : IAplicResultado
    {
        private readonly IRepResultado _repResultado;
        private readonly IRepUser _repUser;
        private readonly IRepConsulta _repConsulta;

        public AplicResultado(IRepResultado repResultado,
                            IRepUser repUser, 
                            IRepConsulta repConsulta)
        {
            _repResultado = repResultado;
            _repUser = repUser;
            _repConsulta = repConsulta;
        }

        public async Task<Resultado[]> GetResultados(int id)
        {
            var userAdm = _repUser.GetUserById(id).Result.Adm;

            if(userAdm)
                return await _repResultado.GetResultPorProfessor(id);
            

            return await _repResultado.GetResultPorAluno(id);
        }

        public async Task<Resultado> GetResultado(int id, int idUsuario)
        {
            var userAdm = _repUser.GetUserById(idUsuario).Result.Adm;

            if (userAdm)
                return await _repResultado.GetResultadoProfessorPorId(id, idUsuario);


            return await _repResultado.GetResultadoAlunoPorId(id, idUsuario);
        }

        public async void Finalizar(int id)
        {
            var resultado = await _repResultado.RecuperarPorId(id);

            if (resultado == null)
                throw new Exception("Simulação do aluno não encontrada código: " + id);

            resultado.Finalizado = true;

            if(resultado.PerguntaRespostasResultados.Any())
            {
                var perguntasCertas = resultado.PerguntaRespostasResultados.Where(p => p.Certa).ToList().Count();
                var perguntasAcertadas = resultado.PerguntaRespostasResultados.Where(p => p.Selecionada && p.Certa).ToList().Count();
                resultado.PercAcertPergunta = Convert.ToDecimal(perguntasAcertadas) / Convert.ToDecimal(perguntasCertas) * 100;
            }            

            if(resultado.ExameResultados.Any())
            {
                var examesCertos = resultado.ExameResultados.Where(p => p.Certa).ToList().Count();
                var examesAcertados = resultado.ExameResultados.Where(p => p.Selecionada && p.Certa).ToList().Count();
                resultado.PercAcertExame = Convert.ToDecimal(examesAcertados) / Convert.ToDecimal(examesCertos) * 100;
            }            


            _repResultado.Update(resultado);

            await _repResultado.SaveChangesAsync();
        }

        public async Task<Resultado> IniciaResultado(IniciaResultadoDto dto)
        {
            var resultadoExistente = await _repResultado.GetResultado(dto.AlunoId, dto.hashSimulacao);

            if (resultadoExistente != null)
            {
                if (resultadoExistente.Finalizado)
                    throw new Exception("Essa simulação já foi feita pelo aluno logado.");
                
                return resultadoExistente;
            }

            var resultado = new Resultado();

            Mapear(resultado, dto);

            _repResultado.Add(resultado);

            await _repResultado.SaveChangesAsync();         
            
            return resultado;
        }

        public async Task<ExameResultView> SetaExameVisto(SetaExameVistoDto dto)
        {
            var resultExistente = await _repResultado.GetResultadoIniciado(dto.AlunoId, dto.hashSimulacao);

            if (resultExistente == null)
                throw new Exception("Consulta não encontrada com código: " + dto.hashSimulacao);

            var exame = resultExistente.ExameResultados.Where(p => p.Id == dto.ExameId).FirstOrDefault();

            if (exame == null)
                throw new Exception("Exame não encontrado com código: " + dto.ExameId);

            exame.Selecionada = true;

            _repResultado.Update(resultExistente);

            await _repResultado.SaveChangesAsync();

            var ret = new ExameResultView
            {
                Id = exame.Id,
                ImgExame = exame.ImgExame,
                Nome = exame.Nome,
                Selecionada = exame.Selecionada
            };

            return ret;
        }

        public async Task<PerguntaRespostaResultView> SetaPerguntaFeita(SetaPerguntaFeitaDto dto)
        {
            var resultExistente = await _repResultado.GetResultadoIniciado(dto.AlunoId, dto.hashSimulacao);

            if (resultExistente == null)
                throw new Exception("Consulta não encontrada com código: " + dto.hashSimulacao);

            var pergunta = resultExistente.PerguntaRespostasResultados.Where(p => p.Id == dto.PerguntaId).FirstOrDefault();

            if(pergunta == null)
                throw new Exception("Pergunta não encontrada com código: " + dto.PerguntaId);

            pergunta.Selecionada = true;

            _repResultado.Update(resultExistente);

            await _repResultado.SaveChangesAsync();

            var ret = new PerguntaRespostaResultView
            {
                Id = pergunta.Id,
                Resposta = pergunta.Resposta,
                Selecionada = pergunta.Selecionada
            };

            return ret;
        }

        private async void Mapear(Resultado reg, IniciaResultadoDto dto)
        {
            var consulta = await _repConsulta.GetConsultaAlunoAsyncById(dto.hashSimulacao);

            if (consulta == null)
                throw new Exception("Erro ao carregar consulta código :"+dto.hashSimulacao );

            reg.DataHora = DateTime.Now;
            reg.AlunoId = dto.AlunoId;
            reg.NomeAluno = _repUser.GetUserById(dto.AlunoId).Result.FullName;
            reg.ProfessorId = consulta.UserId;
            reg.NomeProfessor = _repUser.GetUserById(reg.ProfessorId).Result.FullName;
            reg.HashLib = dto.hashSimulacao;
            reg.PercAcertPergunta = 0;
            reg.PercAcertExame = 0;
            reg.Finalizado = false;
            reg.NomePaciente = consulta.NomePaciente;
            reg.DataNascimento = consulta.DataNascimento.ToString();
            reg.Sexo = consulta.Sexo;
            reg.TipoAtendimento = consulta.TipoAtendimento;
            reg.QueixaPrincipal = consulta.QueixaPrincipal;
            reg.InicioSintomas = consulta.InicioSintomas;
            reg.QtdMaxExame = consulta.QtdMaxExame;
            reg.QtdMaxPergunta = consulta.QtdMaxPergunta;

            reg.PerguntaRespostasResultados = new List<PerguntaRespostaResultado>();
            reg.ExameResultados = new List<ExameResultado>();

            if (consulta.PerguntaRespostas.Any())
            {
                consulta.PerguntaRespostas.ForEach(pergResp =>
                {                   
                    reg.PerguntaRespostasResultados.Add(new PerguntaRespostaResultado
                    {
                        Pergunta = pergResp.Pergunta,
                        Resposta = pergResp.Resposta,
                        Certa = pergResp.Certa,
                        Selecionada = false
                    });

                });
            }

            if (consulta.Exames.Any())
            {
                consulta.Exames.ForEach(exame =>
                {
                    var exameResult = new ExameResultado
                    {
                        Nome = exame.Nome,
                        ImgExame = exame.ImgExame,
                        Certa = exame.Certa,
                        Selecionada = false
                    };

                    reg.ExameResultados.Add(exameResult);
                });
            }
            
        }
    }
}
