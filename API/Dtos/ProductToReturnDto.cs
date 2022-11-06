namespace API.Dtos
{
    public class ProductToReturnDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string PictureUrl { get; set; }
        //relation will created by watching type 
        public string ProductType { get; set; }
        public string ProductBrand { get; set; }
  
    }
}