using System;
using ElevatorSystemDotNet.Data.Domain;
using Microsoft.EntityFrameworkCore;

namespace ElevatorSystemDotNet.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{

    public DbSet<Building> Buildings { get; set; }
    public DbSet<Floor> Floors { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Building>()
            .ToTable("building", "elevator");

        modelBuilder.Entity<Building>()
            .HasIndex(b => b.Name)
            .IsUnique();

        modelBuilder.Entity<Floor>()
            .ToTable("floor", "elevator");

        modelBuilder.Entity<Floor>()
            .HasIndex(f => new { f.Number, f.BuildingId })
            .IsUnique();
    }

}
