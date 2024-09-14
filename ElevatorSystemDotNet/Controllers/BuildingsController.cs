using System;
using AutoMapper;
using ElevatorSystemDotNet.Controllers.Dtos;
using ElevatorSystemDotNet.Data.Domain;
using ElevatorSystemDotNet.Service;
using Microsoft.AspNetCore.Mvc;

namespace ElevatorSystemDotNet.Controllers;

[ApiController]
[Route("api/buildings")]
public class BuildingsController(BuildingService buildingService, IMapper mapper) : ControllerBase
{

    private BuildingService BuildingService { get; } = buildingService;
    private IMapper Mapper { get; } = mapper;

    [HttpGet]
    public async Task<ActionResult<ListDto<BuildingDto>>> GetBuildings()
    {
        List<Building> buildings = await BuildingService.GetAll();
        List<BuildingDto> buildingDtos = [];
        foreach (var b in buildings)
        {
            buildingDtos.Add(Mapper.Map<BuildingDto>(b));
        }
        return Ok(new ListDto<BuildingDto>(buildingDtos));
    }

}
