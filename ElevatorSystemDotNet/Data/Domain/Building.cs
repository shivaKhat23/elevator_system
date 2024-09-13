using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ElevatorSystemDotNet.Data.Domain;

public class Building
{

    [Column("id")]
    public Guid Id { get; set; }

    [Column("name")]
    [Required]
    public string? Name { get; set; }

    public List<Floor> Floors { get; } = [];

}
