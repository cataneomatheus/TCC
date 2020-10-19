namespace TCC.Domain.consultas
{
    public class PerguntaResposta
    {
        public int Id { get; set; }
        public string Pergunta { get; set; }
        public string Resposta { get; set; }
        public bool Certa { get; set; }
        public int ConsultaId { get; set; }
        public Consulta Consulta { get; }
    }
}