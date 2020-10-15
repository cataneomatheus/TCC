using System;
using System.Collections.Generic;
using TCC.Domain.Identity;

namespace TCC.Domain.consultas
{
    public class Consulta
    {
        public int Id { get; set; }
        public string NomePaciente { get; set; }
        public DateTime DataNascimento { get; set; }
        public string Sexo { get; set; }
        public string TipoAtendimento { get; set; }
        public string QueixaPrincipal { get; set; }
        public string InicioSintomas { get; set; }
        public int UserId { get; set; }
        public int? QtdMaxPergunta { get; set; }
        public int? QtdMaxExame { get; set; }
        public string HashLib { get; set; }

        public List<Exame> Exames {get; set;}
        public List<PerguntaResposta> PerguntaRespostas {get; set;}

    }
}