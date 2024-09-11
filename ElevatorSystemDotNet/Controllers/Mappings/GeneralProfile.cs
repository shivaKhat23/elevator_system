using System;
using AutoMapper;
using ElevatorSystemDotNet.Controllers.Dtos;
using ElevatorSystemDotNet.Data.Domain;

namespace ElevatorSystemDotNet.Controllers.Mappings;

public class GeneralProfile : Profile
{

    public GeneralProfile()
    {
        CreateMap<Building, BuildingDto>();
    }

}
