using System.Collections.Generic;

namespace TCC.WebAPI.Views.Consulta
{
    public class ConsultaView
    {
        public int Id { get; set; }
        public string NomePaciente { get; set; }
        public string DataNascimento { get; set; }
        public string Sexo { get; set; }
        public string TipoAtendimento { get; set; }
        public string QueixaPrincipal { get; set; }
        public string InicioSintomas { get; set; }

        public List<ExameView> Exames {get; set;}
        public List<PerguntaRespostaView> PerguntaRespostas {get; set;}
    }
}