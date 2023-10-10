using AngularAPI.Models;
using Microsoft.EntityFrameworkCore;
using MovieTicketBookingApp.Models;

namespace AngularAPI.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<City> Cities { get; set; }

        public DbSet<Movie> Movies { get; set; }

        public DbSet<Theater> Theaters { get; set; }

        protected override void OnModelCreating(ModelBuilder modelbuilder)
        {
            modelbuilder.Entity<User>().ToTable("users");
            modelbuilder.Entity<City>().ToTable("Cities");
            modelbuilder.Entity<Movie>().ToTable("Movies");
            modelbuilder.Entity<Theater>().ToTable("Theaters");
        }


    }
}
