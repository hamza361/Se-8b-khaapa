import { Component, OnInit, OnDestroy } from '@angular/core';
import { Products_Display_Service } from 'src/app/service/products_display.module';
import { Product } from 'src/app/model/product.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit,OnDestroy {
  products:Product[]=[];
  NoProduct:boolean=false;
  Subscription:Subscription;
  constructor(private productService:Products_Display_Service,private router:Router) { }

  ngOnInit() {
      this.productService.get_products();
     this.Subscription =  this.productService.products_changes.subscribe((products:Product[])=>{
        this.products = products;
        if(this.products.length>=0){
          this.NoProduct=true;
          
        }
      })
    
   
   
  }

  addition_to_quantity(_id){
    this.productService.addition_to_quantity(_id).subscribe((products:Product[])=>{
      this.similar_code(products)
    })
  }

  subtraction_to_quantity(_id){
    this.productService.subtraction_to_quantity(_id).subscribe((products:Product[])=>{
      this.similar_code(products)
    })
  }

  delete_Product(_id:string){
    this.productService.deleteProduct(_id).subscribe((products:Product[])=>{
      this.similar_code(products)
    })
  }

  edit_product(_id:string){
    this.router.navigate(['/add-edit',_id]);
  }

  similar_code(products){
    if(!products){
      this.products = [];
    }
  }

ngOnDestroy(){
  this.Subscription.unsubscribe();
}

}
