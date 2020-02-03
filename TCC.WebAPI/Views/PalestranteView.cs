using System.Collections.Generic;

namespace TCC.WebAPI.Views
{
    public class PalestranteView
    {
        public int Id { get; set; }
        public string Nome { get; set; }

        public string MiniCurriculo { get; set; }

        public string ImagemURL { get; set; }

        public string Telefone { get; set; }

        public string Email { get; set; }

        public List<RedeSocialView> RedesSociais { get; set; }

        public List<EventoView> Eventos { get; set; }
    }
}