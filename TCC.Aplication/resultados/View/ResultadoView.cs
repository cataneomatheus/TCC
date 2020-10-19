using System;
using System.Collections.Generic;
using System.Text;

namespace TCC.Aplication.resultados.View
{
    public class ResultadoView
    {
        public int Id { get; set; }
        public DateTime DataHora { get; set; }
        public int AlunoId { get; set; }
        public string NomeAluno { get; set; }
        public int ProfessorId { get; set; }
        public string NomeProfessor { get; set; }
        public decimal PercAcertPergunta { get; set; }
        public decimal PercAcertExame { get; set; }
        public bool Finalizado { get; set; }
        public string NomePaciente { get; set; }
        public DateTime DataNascimento { get; set; }
        public string Sexo { get; set; }
        public string TipoAtendimento { get; set; }
        public string QueixaPrincipal { get; set; }
        public string InicioSintomas { get; set; }
        public int? QtdMaxPergunta { get; set; }
        public int? QtdMaxExame { get; set; }
        public string HashLib { get; set; }

        public List<PerguntaRespostaResultadoView> PerguntaRespostasResultados { get; set; }
        public List<ExameResultadoView> ExameResultados { get; set; }
    }

    public class ExameResultadoView
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string ImgExame { get; set; }        
        public bool Selecionada { get; set; }
    }

    public class PerguntaRespostaResultadoView
    {
        public int Id { get; set; }
        public string Pergunta { get; set; }
        public bool Selecionada { get; set; }
    }
}
