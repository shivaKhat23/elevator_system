using System;
using ElevatorSystemDotNet.Data.Domain;
using Microsoft.EntityFrameworkCore;

namespace ElevatorSystemDotNet.Data.Repository;

public class LiftRespository(AppDbContext appDbContext) : BaseRepository<Lift>(appDbContext)
{

    public async Task<List<Lift>> GetFloorsByBuildingId(Guid buildingId)
    {
        return await DbContext.Lifts
        .Include(l => l.CurrentFloor)
        .Include(l => l.LiftStops)
            .ThenInclude(ls => ls.Floor)
        .Where(l => l.BuildingId == buildingId)
        .ToListAsync();
    }

}
