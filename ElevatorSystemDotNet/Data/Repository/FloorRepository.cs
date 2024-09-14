using System;
using ElevatorSystemDotNet.Data.Domain;
using Microsoft.EntityFrameworkCore;

namespace ElevatorSystemDotNet.Data.Repository;

public class FloorRepository(AppDbContext appDbContext) : BaseRepository<Floor>(appDbContext)
{

    public async Task<List<Floor>> GetFloorsByBuildingId(Guid buildingId)
    {
        return await DbContext.Floors.Where(f => f.BuildingId == buildingId).ToListAsync();
    }

}
