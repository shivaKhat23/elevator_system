using System;

namespace ElevatorSystemDotNet.Controllers.Dtos;

public class ListDto<T>(List<T> content)
{
    public List<T> Content { get; } = content;
}
