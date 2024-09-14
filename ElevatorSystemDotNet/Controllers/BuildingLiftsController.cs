using AutoMapper;
using ElevatorSystemDotNet.Controllers.Dtos;
using ElevatorSystemDotNet.Data.Domain;
using ElevatorSystemDotNet.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ElevatorSystemDotNet.Controllers;
[Route("api/buildings/{buildingId}/lifts")]
[ApiController]
public class BuildingLiftsController(LiftService liftService, IMapper mapper) : ControllerBase
{

    private LiftService LiftService { get; } = liftService;
    private IMapper Mapper { get; } = mapper;

    [HttpGet]
    public async Task<ActionResult<ListDto<LiftDto>>> GetLifts(Guid buildingId)
    {
        List<Lift> lifts = await LiftService.GetAllByBuildingId(buildingId);
        List<LiftDto> liftDtos = lifts
            .Select(Mapper.Map<LiftDto>)
            .ToList<LiftDto>();
        return Ok(new ListDto<LiftDto>(liftDtos));
    }
}
