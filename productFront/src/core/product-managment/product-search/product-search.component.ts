import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ProductsService } from '../../services/products.service';
import { AddProductModel, deleteProductViewModel, Products, ProductsModel } from '../../Models/Products';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../../shared/dialog/dialog.component';
import { DialogData } from '../../../shared/Dialog';
import { Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

import { PaginatorModule } from 'primeng/paginator';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AllowonlynumbersDirective } from '../../../shared/Directives/allowonlynumbers.directive';
@Component({
  selector: 'app-product-search',
  standalone: true,
  imports: [ TableModule,CommonModule ,PaginatorModule,ReactiveFormsModule ,FormsModule,AllowonlynumbersDirective  ], 
  templateUrl: './product-search.component.html',
  styleUrl: './product-search.component.css',
  providers: [DatePipe] 
})
export class ProductSearchComponent implements OnInit {
  products !:Products[]
  searchProducts !:Products[]
  pageSize:number=5;
  searchForm!:FormGroup
  formProduct!:FormGroup
  loading:boolean=false;
 private subs:Subscription= new Subscription()
  constructor(
    private productServices:ProductsService,
     private dialog: MatDialog,
     private router:Router,
     private dataPipe:DatePipe,
     private toastr:ToastrService,
     private formBuilder:FormBuilder
  ){
this.searchForm=formBuilder.group({
  searchText: [''],

})
this.formProduct = formBuilder.group({
  id: [''],
  name: ['', [Validators.required,Validators.maxLength(100)]],
  description: ['', [Validators.required,Validators.maxLength(500)]],
  price: ['', [Validators.required]]
});
  }
  ngOnInit(): void {
this.getAllProducts()
  }
  getAllProducts(){
    this.loading = true;
    this.subs.add(
      this.productServices.getProducts().subscribe(
        (res) => {
          if (res?.succeeded) {
            this.loading = false;        
            this.products=res?.data
            this.searchProducts=this.searchForm.get('searchText')?.value!=""?this.products.filter(i=>i.name.includes(this.searchForm.get('searchText')?.value)):this.products

            this.products.forEach(o => {
              if (o.createdDate) {
                o.createdDate = this.dataPipe.transform(new Date(o.createdDate), 'yyyy-MM-dd hh-mm-SS') || '';
              }
            });

          }
        },(err)=>{
          this.loading = false; 
          this.toastr.error("Error During Fetch Products","Error")
        }
      )
    );
  }
  openDeleteDialog(productId:number){

    const activeDialogData: DialogData = {
      title: 'Confirm Message',
      message: 'Do You Confirm Delete This Product?',
      confrimButton: 'Confirm',
      cancelButton: 'Cancel',
      showConfrimButton:true,
      showCancelButton:true
    };
    if (this.dialog.openDialogs.length == 0) {
      let dialogRef = this.dialog.open(DialogComponent, {
        data: activeDialogData,
        direction: "ltr",
        hasBackdrop: true
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result == 'ok') {
          this.loading = true;
let deletedItem:deleteProductViewModel={
  Id:productId
}
          this.subs.add( this.productServices
            .deleteProduct(deletedItem)
            .subscribe((res) => {

              if (res.succeeded) {
                this.getAllProducts()
                this.loading = false; 
                this.toastr.success("employees deleted succussfully","Success")
              }
            }, err => {
              this.getAllProducts()
              this.loading = false; 
              this.toastr.error("Error During Delete Product","Error")
            }
            ));
        }
      })
      this.router.events.subscribe(() => {
        dialogRef.close();
      });
    }

}
searchEmployees(){
  this.searchProducts=this.searchForm.get('searchText')?.value!=""?this.products.filter(i=>i.name.includes(this.searchForm.get('searchText')?.value)):this.products
}
//initillaization
get name(){
  return this.formProduct.get('name')
}
get description(){
  return this.formProduct.get('description')
}
get price(){
  return this.formProduct.get('price')
}


openAddProductForm(): void {

 
  this.formProduct.patchValue({
    id: '',
    name: '',
    description: '',
    price:''
  
  });

  const popupForm = document.getElementById('popupForm') as HTMLElement;
  popupForm.style.display = 'block';
}
openEditProductForm(product:Products): void {

  this.formProduct.patchValue({
    id: product.id,
    name: product.name,
    description: product.description,
    price:product.price
  
  });
  const popupForm = document.getElementById('popupForm') as HTMLElement;
  popupForm.style.display = 'block';
}
closeForm(): void {
  const popupForm = document.getElementById('popupForm') as HTMLElement;
  popupForm.style.display = 'none';
}
addProduct(): void {

    if (this.formProduct?.invalid) {
  this.formProduct.markAllAsTouched()
  this.toastr.warning("Please Inter Valid Data")
      return;
    }
   
    const prod :AddProductModel={
      Id:0,
      Name:this.formProduct.get('name')?.value,
      Price:Number(this.formProduct.get('price')?.value),
      Description:this.formProduct.get('description')?.value
    }
    this.loading = true;
    this.subs.add(this.productServices.addProducts(prod).subscribe((data) => { 
    
     
    if(data.succeeded){
      this.toastr.success('Product added successfully', 'Success');
      this.getAllProducts()
      this.loading = false; 
    }
    
      },(error)=>{
     
        this.toastr.error('Something unexpected went wrong','Error');
        this.loading = false; 
 
   
 
    }))
    this.formProduct.reset()
    this.closeForm();
  }
  editProduct(): void {

    if (this.formProduct?.invalid) {
  this.formProduct.markAllAsTouched()
  this.toastr.warning("Please Inter Valid Data")
      return;
    }
   
    const prod :AddProductModel={
      Id:this.formProduct.get('id')?.value,
      Name:this.formProduct.get('name')?.value,
      Price:Number(this.formProduct.get('price')?.value),
      Description:this.formProduct.get('description')?.value
    }
    this.loading = true;
    this.subs.add(  this.productServices.editProducts(prod).subscribe((data) => {


      if(data.succeeded){
        this.toastr.success('Product Edit successfully', 'Success');
        this.getAllProducts()
        this.loading = false; 
      }
      
    
      },(error)=>{
     
        this.toastr.error('Something unexpected went wrong','Error');
        this.loading = false; 
 

 
    })
     );
    this.formProduct.reset()
  
    this.closeForm();
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
