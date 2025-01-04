export interface ProductsModel {

    products:Products[]

}
export interface deleteProductViewModel{
    Id:number
}
export interface Products{
    name:string;
    description:string;
    price:string;
    createdDate?:string;
    id:number;
}
export interface AddProductModel{
    Name:string;
    Description:string;
    Price:number;
    Id:number;
}