using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Sqlite;

namespace todolist.Server.Models
{
    public partial class nDbContext: DbContext
    {
        public nDbContext() { }
        public nDbContext(DbContextOptions options) : base(options)
        {
        }
        public virtual DbSet<TodoItem> TodoItems { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured) {
                optionsBuilder.UseSqlite("Data Source=ToDoList.db");

            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TodoItem>(entity => {
                entity.ToTable("TodoList");
                entity.Property(e => e.Id).ValueGeneratedOnAdd();
                entity.Property(e => e.Title).IsRequired();
            });
            base.OnModelCreating(modelBuilder);
        }
    }
}
