using System;
using Microsoft.EntityFrameworkCore;

namespace ElevatorSystemDotNet.Data.Repository;

public class BaseRepository<T>(AppDbContext context) where T : class
{

    protected AppDbContext DbContext { get; } = context;

    public async Task<List<T>> GetAll()
    {
        return await DbContext.Set<T>().ToListAsync();
    }
}
