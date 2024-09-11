using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ElevatorSystemDotNet.Data.Domain;

public class Building
{

    [Column(name: "id")]
    public Guid Id { get; set; }

    [Column(name: "name")]
    [Required]
    public string? Name { get; set; }

}
