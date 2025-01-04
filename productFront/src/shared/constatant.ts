export abstract class Constants {
    //base url
    static readonly BASE_URL: string = "https://localhost:44396/";
    //version Api
   static readonly API_URL: string = Constants.BASE_URL+'api/v1/' ;
    //groub
   static readonly Products_API_URL: string = Constants.API_URL + 'Products/';

   //Endpoints
   static readonly Products_Search_API_URL: string = Constants.Products_API_URL + 'GetAllProducts';
   static readonly Products_By_id_API_URL: string = Constants.Products_API_URL + 'GetProductById';
   static readonly Add_Product_API_URL: string = Constants.Products_API_URL + 'CreateProduct';
   static readonly Edit_Product_API_URL: string = Constants.Products_API_URL + 'UpdateProduct';
   static readonly Delete_Product_API_URL: string = Constants.Products_API_URL + 'DeleteProduct';
   
}   