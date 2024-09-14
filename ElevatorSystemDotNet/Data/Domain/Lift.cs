using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ElevatorSystemDotNet.Data.Domain;

public class Lift
{

    [Key]
    [Column("id")]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; }

    [Column("name")]
    [Required]
    public string Name { get; set; } = null!;

    [Column("status")]
    [Required]
    public string Status { get; set; } = null!;

    [Column("floor_id")]
    [Required]
    public Guid CurrentFloorId { get; set; }

    [Column("building_id")]
    [Required]
    public Guid BuildingId { get; set; }

    [ForeignKey("CurrentFloorId")]
    public Floor CurrentFloor { get; set; } = null!;

    [ForeignKey("BuildingId")]
    public Building? Building { get; set; }


    public List<LiftToFloorStop> LiftStops { get; set; } = [];

}
