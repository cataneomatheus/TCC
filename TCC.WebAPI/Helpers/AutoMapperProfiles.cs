using System.Linq;
using AutoMapper;
using TCC.Domain.Identity;
using TCC.WebAPI.Dtos;
using TCC.WebAPI.Views;

namespace TCC.WebAPI.Helpers 
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {           
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<User, UserLoginDto>().ReverseMap();
        }
    }
}