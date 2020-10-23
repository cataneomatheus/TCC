using System;
using System.Collections.Generic;

namespace TCC.WebAPI.Views.Consulta
{
    public class ConsultaView
    {
        public int Id { get; set; }
        public string NomePaciente { get; set; }
        public DateTime DataNascimento { get; set; }
        public string Sexo { get; set; }
        public string TipoAtendimento { get; set; }
        public string QueixaPrincipal { get; set; }
        public string InicioSintomas { get; set; }
        public int QtdMaxPergunta { get; set; }
        public int QtdMaxExame { get; set; }
        public string HashLib { get; set; }

        public List<ExameView> Exames {get; set;}
        public List<PerguntaRespostaView> PerguntaRespostas {get; set;}
    }
}