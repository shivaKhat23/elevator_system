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
        CreateMap<Floor, FloorDto>();
        CreateMap<Lift, LiftDto>()
        .ForMember(
            dest => dest.CurrentFloorNumber,
            opt => opt.MapFrom(src => src.CurrentFloor.Number)
        )
        .ForMember(
            dest => dest.CurrentFloorId,
            opt => opt.MapFrom(src => src.CurrentFloor.Id)
        )
        .ForMember(
            dest => dest.FloorStops,
            opt => opt.MapFrom(src => src.LiftStops.Select(lfs => lfs.Floor.Number).ToList())
        );
    }

}
