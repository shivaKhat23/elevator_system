using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace ElevatorSystemDotNet.Data.Domain;

public class LiftToFloorStop
{
    [Column("lift_id")]
    public Guid LiftId { get; set; }
    public Lift Lift { get; set; } = null!;

    [Column("floor_id")]
    public Guid FloorId { get; set; }
    public Floor Floor { get; set; } = null!;
}
