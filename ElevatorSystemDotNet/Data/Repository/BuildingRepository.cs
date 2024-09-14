using System;
using ElevatorSystemDotNet.Data.Domain;
using Microsoft.EntityFrameworkCore;

namespace ElevatorSystemDotNet.Data.Repository;

public class BuildingRepository(AppDbContext context) : BaseRepository<Building>(context)
{

}
