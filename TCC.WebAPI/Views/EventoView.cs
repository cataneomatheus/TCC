using System.Collections.Generic;

namespace TCC.WebAPI.Views
{
    public class EventoView
    {
        public int Id { get; set; }
        public string Local { get; set; }
        public string DataEvento { get; set; }
        public string Tema { get; set; }
        public int QtdPessoas { get; set; }
        public string ImagemURL { get; set; }
        public string Telefone { get; set; }
        public string Email { get; set; }

        public List<LoteView> Lotes { get; set; }
        public List<RedeSocialView> RedesSociais { get; set; }
        public List<PalestranteView> Palestrantes { get; set; }

    }
}