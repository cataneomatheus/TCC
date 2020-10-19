namespace TCC.Domain.consultas
{
    public class Exame
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string ImgExame { get; set; }
        public bool Certa { get; set; }
        public int ConsultaId { get; set; }
        public Consulta Consulta { get; }
    }
}