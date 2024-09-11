using System;
using System.Text.Json.Serialization;

namespace ElevatorSystemDotNet.Controllers.Dtos;

public class BuildingDto
{

    [JsonPropertyName(name: "id")]
    public string? Id { get; set; }

    [JsonPropertyName(name: "name")]
    public string? Name { get; set; }
}
