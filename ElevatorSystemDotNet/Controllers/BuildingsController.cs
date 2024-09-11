using System;
using ElevatorSystemDotNet.Data;
using ElevatorSystemDotNet.Data.Domain;
using Microsoft.AspNetCore.Mvc;

namespace ElevatorSystemDotNet.Controllers;

[ApiController]
[Route("api/buildings")]
public class BuildingsController(AppDbContext appDbContext)
{

    private readonly AppDbContext _dbContext = appDbContext;

    [HttpGet]
    public ActionResult<List<Building>> getBuildings()
    {
        return _dbContext.Buildings.ToList();
    }

}
