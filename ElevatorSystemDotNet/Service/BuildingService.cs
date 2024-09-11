using System;
using ElevatorSystemDotNet.Data.Domain;
using ElevatorSystemDotNet.Data.Repository;

namespace ElevatorSystemDotNet.Service;

public class BuildingService(BuildingRepository buildingRepository)
{

    private BuildingRepository Repository { get; } = buildingRepository;

    public async Task<List<Building>> GetAll()
    {
        return await Repository.GetAll();
    }
}
