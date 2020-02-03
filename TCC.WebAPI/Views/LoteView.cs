namespace TCC.WebAPI.Views
{
    public class LoteView
    {
        public int Id { get; set; }
        public string Nome { get; set; }

        public decimal Preco { get; set; }
        public string DataInicio { get; set; }

        public string DataFim { get; set; }
        public int Quantidade { get; set; }
    }
}