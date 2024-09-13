using System;
using System.Text.Json.Serialization;

namespace ElevatorSystemDotNet.Controllers.Dtos;

public class BuildingDto
{

    [JsonPropertyName("id")]
    public string? Id { get; set; }

    [JsonPropertyName("name")]
    public string? Name { get; set; }
}
