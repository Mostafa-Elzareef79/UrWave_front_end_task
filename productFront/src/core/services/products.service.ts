import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseAPIService } from './BaseApiServices';
import { GeneralResponse } from '../../shared/response';
import { Constants } from '../../shared/constatant';
import { AddProductModel, deleteProductViewModel, Products, ProductsModel } from '../Models/Products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends BaseAPIService {

  constructor(http: HttpClient) {
    super(http);
  }
  getProducts(){
   
      let obj =Object;
      return this.getByModel<GeneralResponse<Products[]>>(
  
       Constants.Products_Search_API_URL,obj
     );
    }
    deleteProduct(body:deleteProductViewModel){
      
      return this.deleteByModel<GeneralResponse<number>>(
        `${Constants.Delete_Product_API_URL}`,{body});
    }
    addProducts(body: AddProductModel) {
      return this.post<GeneralResponse<number>>(
        `${Constants.Add_Product_API_URL}`, body);
    }
    editProducts(body: AddProductModel) {
      return this.put<GeneralResponse<number>>(
        `${Constants.Edit_Product_API_URL}`, body);
    }
  
}
