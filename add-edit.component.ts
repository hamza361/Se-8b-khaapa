import { Component, OnInit, createPlatformFactory, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Products_Display_Service } from 'src/app/service/products_display.module';
import { Product } from 'src/app/model/product.model';
import { Router, ActivatedRoute,ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit,OnDestroy {

  ProductForm:FormGroup;
  edit_mode:boolean=false;
  _id:string;
  product:Product;
  Subscription:Subscription;
  constructor(private productService:Products_Display_Service,private route:ActivatedRoute,private router:Router) { }

  ngOnInit() {

    this.route.paramMap.subscribe((paramMap:ParamMap)=>{

      if(paramMap.has('_id')){
        this.edit_mode = true;
        this._id = paramMap.get('_id'); 
        this.productService.getProduct(this._id);
        this.Subscription = this.productService.product_get.subscribe((product:Product)=>{
          this.product = product;
          this.createForm();
        })
      }else{
        this.createForm();
      }

    })


  }
  createForm(){
    let name = null;
    let image = null;
    let price = null;
    let quantity = null;
    if(this.edit_mode){
       name = this.product.name;
       image = this.product.image;
       price = this.product.price;
       quantity = this.product.quantity;

    }
    this.ProductForm  = new FormGroup({
      name: new FormControl(name,Validators.required),
      image: new FormControl(image,Validators.required),
      price:new FormControl(price,[Validators.required,Validators.min(1)]),
      quantity: new FormControl(quantity,Validators.required)

    }) 
  
  }

  onSubmit(){
    if(this.edit_mode){
        this.productService.update_product({_id:this._id,name:this.ProductForm.value.name,image:this.ProductForm.value.image,price:this.ProductForm.value.price,quantity:this.ProductForm.value.quantity});
    }else{
      const product = new Product(new Date().getMilliseconds().toString(),this.ProductForm.value.name,this.ProductForm.value.image,this.ProductForm.value.price,this.ProductForm.value.quantity)
      this.productService.add_product(product);
    }
    this.edit_mode  =false
    
   
  }

  onCancel(){
    this.router.navigate(['/products']);
  }

  ngOnDestroy(){
    if(this.edit_mode){
      this.Subscription.unsubscribe();
    }
  }

}
