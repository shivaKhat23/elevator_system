using System;
using ElevatorSystemDotNet.Data.Domain;
using Microsoft.EntityFrameworkCore;

namespace ElevatorSystemDotNet.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{

    public DbSet<Building> Buildings { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Building>()
            .ToTable("building", "elevator");

        modelBuilder.Entity<Building>()
            .HasIndex(b => b.Name)
            .IsUnique();
    }

}
