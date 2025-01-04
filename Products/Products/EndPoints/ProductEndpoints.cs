using FluentValidation;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Products.Context;
using Products.Dtos.Products;
using Products.Dtos.ProductsViewModel;
using Products.Helper.Shared;
using Products.Models;
using System;

namespace Products.EndPoints
{
    public static class ProductEndpoints
    {
        public static RouteGroupBuilder MapProductEndpoints(this RouteGroupBuilder group)
        {

            group.MapGet("/GetAllProducts", async (ProductDB db) =>
            {
                try {
                    var res = await db.Products.Select(p => new ProductViewModel(
                                  p.Id, p.Name, p.Description, p.Price, p.CreatedDate)).ToListAsync();
                    var response= new Response<List<ProductViewModel>>(res, Helper.Enums.HttpStatuses.Status200OK);
                    return Results.Ok(response);
                } catch
                {
                    var response = new Response<List<ProductViewModel>>(Helper.Enums.HttpStatuses.Status400BadRequest, "Error Happend Please Try Again At Another Time");
          
                    return Results.BadRequest(response);
                }
       
            });
            group.MapPost("/CreateProduct", async (ProductDB db, CmdProducts request, IValidator<CmdProducts> validator) =>
            {
                var response = new Response<int>(Helper.Enums.HttpStatuses.Status400BadRequest, "Error Happend Please Try Again At Another Time");
                try {


                    var validation = await validator.ValidateAsync(request);
                    if (!validation.IsValid)
                    {
                         response = new Response<int>(Helper.Enums.HttpStatuses.Status400BadRequest, validation.ToString());
                        return Results.BadRequest(response);

                    }
                      

                    var product = new Product
                    {
                        Name = request.Name,
                        Description = request.Description,
                        Price = request.Price
                    };

                    db.Products.Add(product);
                    await db.SaveChangesAsync();
                    response = new Response<int>(1, Helper.Enums.HttpStatuses.Status201Created);
                    return Results.Ok(response);



                } catch {
                    response = new Response<int>(Helper.Enums.HttpStatuses.Status400BadRequest, "Error Happend Please Try Again At Another Time");
                    return Results.BadRequest(response);
                }
              
            });


            group.MapPut("/UpdateProduct", async ( ProductDB db, CmdProducts request, IValidator<CmdProducts> validator) =>
            {
                var response = new Response<int>(0, Helper.Enums.HttpStatuses.Status200OK);
                try
                {
                    var validation = await validator.ValidateAsync(request);
                    if (!validation.IsValid)
                    {
                        response = new Response<int>(Helper.Enums.HttpStatuses.Status400BadRequest, validation.ToString());
                        return Results.BadRequest(response);

                    }

                    var product = await db.Products.FindAsync(request.Id);
                    if (product is null)
                    {
                        response = new Response<int>(Helper.Enums.HttpStatuses.Status400BadRequest, "Not Found Product with This Number");
                        return Results.BadRequest(response);
                    }
                        

                    product.Name = request.Name;
                    product.Description = request.Description;
                    product.Price = request.Price;

                    await db.SaveChangesAsync();

                    response = new Response<int>(1, Helper.Enums.HttpStatuses.Status201Created);
                    return Results.Ok(response);
                } catch
                {
                    response = new Response<int>(Helper.Enums.HttpStatuses.Status400BadRequest, "Error Happend Please Try Again At Another Time");
                    return Results.BadRequest(response);
                }
              
            });


            group.MapDelete("/DeleteProduct", async (HttpContext context, ProductDB db) =>
            {
                var response = new Response<int>(0, Helper.Enums.HttpStatuses.Status200OK);
                try
                {
                    var requestBody = await context.Request.ReadFromJsonAsync<DeleteRequest>();
                   
                    if (requestBody is null || requestBody.Id <= 0)
                    {
                        response = new Response<int>(Helper.Enums.HttpStatuses.Status400BadRequest, "Product Id Is Required");
                        return Results.BadRequest(response);
                    }


                    var product = await db.Products.FindAsync(requestBody.Id);
                    if (product is null)
                    {
                        response = new Response<int>(Helper.Enums.HttpStatuses.Status400BadRequest, "NO Product Found With This Id");
                        return Results.BadRequest(response);
                    }


                    db.Products.Remove(product);
                    await db.SaveChangesAsync();
                    response = new Response<int>(1, Helper.Enums.HttpStatuses.Status400BadRequest, "Product deleted successfully");
                    return Results.Ok(response);
                }
                 catch {
                     response = new Response<int>( Helper.Enums.HttpStatuses.Status400BadRequest, "Error Happend Please Try Again At Another Time");
                    return Results.BadRequest(response);
                }

            });




            return group;
        }
    }
    public class DeleteRequest
    {
        public int Id { get; set; }
    }
}
