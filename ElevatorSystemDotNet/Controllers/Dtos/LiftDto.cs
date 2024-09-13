using System;

namespace ElevatorSystemDotNet.Controllers.Dtos;

public class LiftDto
{
    public string Id { get; set; }
    public string Name { get; set; }

    public string Status { get; set; }

    public int CurrentFloorNumber { get; set; }
    public string CurrentFloorId { get; set; }

    public List<int> FloorStops { get; set; } = [];

    public string BuildingId { get; set; }
}
