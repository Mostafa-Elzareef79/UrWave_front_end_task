using Microsoft.EntityFrameworkCore;
using Products.Models;
using System;

namespace Products.Context
{
    public class ProductDB:DbContext
    {
        
    public DbSet<Product> Products { get; set; }

        public ProductDB(DbContextOptions<ProductDB> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>().HasKey(p => p.Id);
            modelBuilder.Entity<Product>().Property(p => p.Name).IsRequired().HasMaxLength(100);
            modelBuilder.Entity<Product>().Property(p => p.Description).IsRequired().HasMaxLength(500);
            modelBuilder.Entity<Product>().Property(p => p.Price).IsRequired();
        }
    }
}

