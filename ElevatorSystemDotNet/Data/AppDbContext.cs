using System;
using ElevatorSystemDotNet.Data.Domain;
using Microsoft.EntityFrameworkCore;

namespace ElevatorSystemDotNet.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{

    public DbSet<Building> Buildings { get; set; }
    public DbSet<Floor> Floors { get; set; }
    public DbSet<Lift> Lifts { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Building>(entity =>
        {
            entity.ToTable("building", "elevator");

            entity.HasIndex(b => b.Name)
                .IsUnique();
        });




        modelBuilder.Entity<Floor>(entity =>
        {
            entity.ToTable("floor", "elevator");

            entity
                .HasIndex(f => new { f.Number, f.BuildingId })
                .IsUnique();
        });



        modelBuilder.Entity<Lift>(entity =>
        {
            entity.ToTable("lift", "elevator");

            entity
               .HasIndex(l => new { l.Name, l.BuildingId })
               .IsUnique();

            entity
                .HasOne(l => l.CurrentFloor)
                .WithMany(f => f.Lifts)
                .HasForeignKey(l => l.CurrentFloorId);
        });

        // Configure the LiftToFloorStop join table
        modelBuilder.Entity<LiftToFloorStop>(entity =>
        {
            entity.ToTable("lift_to_floor_stops", "elevator");

            // Composite Primary Key
            entity.HasKey(lfs => new { lfs.LiftId, lfs.FloorId });

            // Foreign key to Lift
            entity.HasOne(lfs => lfs.Lift)
                  .WithMany(l => l.LiftStops)
                  .HasForeignKey(lfs => lfs.LiftId);

            // Foreign key to Floor
            entity.HasOne(lfs => lfs.Floor)
                  .WithMany(f => f.LiftStops)
                  .HasForeignKey(lfs => lfs.FloorId);

            // Indexes
            entity.HasIndex(lfs => lfs.LiftId).HasDatabaseName("idx_stops_lift");
            entity.HasIndex(lfs => lfs.FloorId).HasDatabaseName("idx_stops_floor");
        });

    }

}
