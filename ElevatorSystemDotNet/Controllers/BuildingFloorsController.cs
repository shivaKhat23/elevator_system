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
    public async Task<ActionResult<ListDto<FloorDto>>> GetFloors(Guid buildingId)
    {
        List<Floor> floors = await FloorService.GetAllByBuildingId(buildingId);
        List<FloorDto> floorDtos = floors.Select(Mapper.Map<FloorDto>).ToList<FloorDto>();
        return Ok(new ListDto<FloorDto>(floorDtos));
    }
}
