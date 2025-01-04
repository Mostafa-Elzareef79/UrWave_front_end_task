using System.ComponentModel;

namespace Products.Dtos.Products
{
    public class CmdProducts
    {
        [DefaultValue(0)]
        public int Id { get; set; }
        [DefaultValue("")]

        public string Name { get; set; }
        [DefaultValue("")]

        public string Description { get; set; }
        [DefaultValue(0)]

        public decimal Price { get; set; }
        [DefaultValue(null)]

        public DateTime CreatedDate { get; set; } 
    }
}

