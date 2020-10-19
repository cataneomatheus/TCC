using System;
using System.Collections.Generic;
using System.Text;

namespace TCC.Domain.resultados
{
    public class ExameResultado
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string ImgExame { get; set; }
        public bool Certa { get; set; }
        public bool Selecionada { get; set; }
        public int ResultadoId { get; set; }
        public virtual Resultado Resultado { get; }
    }
}
