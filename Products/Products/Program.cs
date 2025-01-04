
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Products.Context;
using Products.Dtos.Products;
using Products.EndPoints;
using System;

namespace Products
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddAuthorization();

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddDbContext<ProductDB>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
            builder.Services.AddValidatorsFromAssemblyContaining<CmdProductsValidators>();
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAllOrigins", policy =>
                {
                    policy.AllowAnyOrigin()   
                          .AllowAnyMethod()  
                          .AllowAnyHeader();   
                });
            });


            var app = builder.Build();

            app.UseCors("AllowAllOrigins");
            var products = app.MapGroup("api/v1/Products");
            products.MapProductEndpoints();
            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            app.UseExceptionHandler("/error");
            app.Map("/error", (HttpContext context) =>
            {
                return Results.Problem("Internal Server Eror Please Try Again In Another Time.");
            });

            app.UseHttpsRedirection();

            app.UseAuthorization();



            app.Run();
        }
    }
}
