using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ElevatorSystemDotNet.Data.Domain;

public class Floor
{
    [Key]
    [Column("id")]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; }

    [Column("number")]
    [Required]
    public int Number { get; set; }

    [Column("building_id")]
    [Required]
    public Guid BuildingId { get; set; }

    public Building Building { get; set; } = null!;

    public List<Lift> Lifts { get; set; } = [];

    public List<LiftToFloorStop> LiftStops { get; set; } = [];

}
