
using FluentValidation;
namespace Products.Dtos.Products
{
    public class CmdProductsValidators : AbstractValidator<CmdProducts>
    {


        public CmdProductsValidators()
        {
            RuleFor(x => x.Name)
                        .NotEmpty().WithMessage("Name is required.")
                        .MaximumLength(100).WithMessage("Name cannot exceed 100 characters.");

            RuleFor(x => x.Description)
                .NotEmpty().WithMessage("Description is required.")
                .MaximumLength(500).WithMessage("Description cannot exceed 500 characters.");

            RuleFor(x => x.Price)
                .GreaterThan(0).WithMessage("Price must be a positive number.");
        }


         
        
    

}
}
