using AutoMapper;
using ElevatorSystemDotNet.Controllers.Dtos;
using ElevatorSystemDotNet.Data.Domain;
using ElevatorSystemDotNet.Service;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace ElevatorSystemDotNet.Controllers;
[Route("api/buildings/{buildingId}/floors")]
[ApiController]
public class BuildingFloorsController(FloorService floorService, IMapper mapper) : ControllerBase
{

    private FloorService FloorService { get; } = floorService;
    private IMapper Mapper { get; } = mapper;

    [HttpGet]
    public async Task<ActionResult<ListDto<FloorDto>>> getFloors(Guid buildingId)
    {
        Console.Write(buildingId);
        List<Floor> floors = await FloorService.GetAllByBuildingId(buildingId);
        List<FloorDto> floorDtos = floors.Select(f => Mapper.Map<FloorDto>(f)).ToList<FloorDto>();
        return Ok(new ListDto<FloorDto>(floorDtos));
    }
}
