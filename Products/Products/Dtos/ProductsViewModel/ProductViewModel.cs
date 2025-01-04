namespace Products.Dtos.ProductsViewModel
{
    public class ProductViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public DateTime CreatedDate { get; set; }

        public ProductViewModel(int id, string name, string description, decimal price, DateTime createdDate)
        {
            Id = id;
            Name = name;
            Description = description;
            Price = price;
            CreatedDate = createdDate;
        }
        public ProductViewModel()
        {}
    }
}
