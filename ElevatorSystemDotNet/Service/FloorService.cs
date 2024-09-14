using System;
using ElevatorSystemDotNet.Data.Domain;
using ElevatorSystemDotNet.Data.Repository;

namespace ElevatorSystemDotNet.Service;

public class FloorService(FloorRepository floorRepository)
{

    private FloorRepository Repository { get; } = floorRepository;

    public async Task<List<Floor>> GetAll()
    {
        return await Repository.GetAll();
    }

    public async Task<List<Floor>> GetAllByBuildingId(Guid buildingId)
    {
        return await Repository.GetFloorsByBuildingId(buildingId);
    }

}
