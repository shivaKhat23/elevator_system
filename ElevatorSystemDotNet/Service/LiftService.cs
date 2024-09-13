using System;
using ElevatorSystemDotNet.Data.Domain;
using ElevatorSystemDotNet.Data.Repository;

namespace ElevatorSystemDotNet.Service;

public class LiftService(LiftRespository liftRespository)
{

    private LiftRespository LiftRespository { get; } = liftRespository;

    public async Task<List<Lift>> GetAllByBuildingId(Guid buildingId)
    {
        return await LiftRespository.GetFloorsByBuildingId(buildingId);
    }

}
