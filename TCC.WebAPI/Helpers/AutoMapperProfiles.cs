using System.Linq;
using AutoMapper;
using TCC.Domain.curso;
using TCC.WebAPI.Views;

namespace TCC.WebAPI.Helpers 
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Evento, EventoView>()
            .ForMember(dest => dest.Palestrantes, opt => {
                opt.MapFrom(src => src.PalestranteEventos.Select(
                    x=> x.Palestrante
                ).ToList());
            });
            CreateMap<Palestrante, PalestranteView>()
            .ForMember(dest => dest.Eventos, opt => {
                opt.MapFrom(src => src.PalestranteEventos.Select(
                    x => x.Evento
                ).ToList());
            });
            CreateMap<Lote, LoteView>();
            CreateMap<RedeSocial, RedeSocialView>();
        }
    }
}