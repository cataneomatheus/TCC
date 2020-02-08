using System.Linq;
using AutoMapper;
using TCC.Domain.curso;
using TCC.Domain.Identity;
using TCC.WebAPI.Dtos;
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
            }).ReverseMap();
            CreateMap<Palestrante, PalestranteView>()
            .ForMember(dest => dest.Eventos, opt => {
                opt.MapFrom(src => src.PalestranteEventos.Select(
                    x => x.Evento
                ).ToList());
            }).ReverseMap();
            CreateMap<Lote, LoteView>().ReverseMap();
            CreateMap<RedeSocial, RedeSocialView>().ReverseMap();

            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<User, UserLoginDto>().ReverseMap();
        }
    }
}