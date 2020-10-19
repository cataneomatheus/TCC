using System;
using System.Collections.Generic;
using System.Text;
using TCC.Domain.Identity;

namespace TCC.Domain.resultados
{
    public class Resultado
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
        public string DataNascimento { get; set; }
        public string Sexo { get; set; }
        public string TipoAtendimento { get; set; }
        public string QueixaPrincipal { get; set; }
        public string InicioSintomas { get; set; }
        public int? QtdMaxPergunta { get; set; }
        public int? QtdMaxExame { get; set; }
        public string HashLib { get; set; }

        public List<PerguntaRespostaResultado> PerguntaRespostasResultados { get; set; }
        public List<ExameResultado> ExameResultados { get; set; }
    }
}
