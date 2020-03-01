import { Product } from '../model/product.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as firebase from "firebase";
import { Router } from '@angular/router';
@Injectable()
export class Products_Display_Service{
    products:Product[]=[];
    products_changes = new Subject();
    product_get = new Subject();
    product_url = 'https://hamza-8eabe.firebaseio.com/products.json?auth=';
    update_gui = new Subject();
    token:string=null;
    constructor(private http:HttpClient,private router:Router){

    }

   
   get_products(){
     this.http.get(this.product_url+this.token).subscribe((products:Product[])=>{
         if(!products){
             this.products = [];
         }else{
            this.products = products;
         }
           
           this.products_changes.next(this.products.slice());
       })
    
   }
   getProduct(_id:string){
        this.http.get(this.product_url+this.token).subscribe((products:Product[])=>{
           let product =  products.find((p)=>{
                return p._id == _id;
            })
            this.product_get.next(product)
        })
   }

   add_product(product:Product){
        this.products.push(product);
        this.http.put(this.product_url+this.token,this.products).subscribe((response:Response)=>{
            alert('Successfully Added')
            this.products.push(product);
            this.products_changes.next(this.products.slice());
            this.router.navigate(['/products']);
          })
   }
   update_product(product:Product){
        const index = this.products.findIndex((p)=>{
            return p._id == product._id
        })
        this.products[index] = product;
        this.http.put(this.product_url+this.token,this.products).subscribe((products:Product[])=>{
            this.products = products;
            this.products_changes.next(this.products.slice());
            this.router.navigate(['/products']);
        })
   }
    deleteProduct(_id:string){
        this.products = this.products.filter((p)=>{
            return p._id != _id;
        })
        this.products_changes.next(this.products.slice())
        return this.http.put(this.product_url+this.token,this.products);
   }

   addition_to_quantity(_id){
    
       const index = this.products.findIndex((p)=>{
           return p._id == _id;
       })
       this.products[index].quantity+=1;
       this.products_changes.next(this.products.slice());

       return this.http.put(this.product_url+this.token,this.products);


   }

   subtraction_to_quantity(_id){
   
    const index = this.products.findIndex((p)=>{
        return p._id == _id;
    })
    if(this.products[index].quantity>0){
        this.products[index].quantity-=1;
    }
    this.products_changes.next(this.products.slice());
    return this.http.put(this.product_url+this.token,this.products);
}

reset_quantity(){
    if(this.products.length>0){
        this.products.forEach((p)=>{
            p.quantity = 0;
        })
        this.http.put(this.product_url+this.token,this.products).subscribe((products:Product[])=>{
            this.products = products;
            this.products_changes.next(this.products);
        })
    }else{
        alert('No Product');
    }
}

total_collection(){
    let totalPrice = 0;
    this.products.forEach((p)=>{
        totalPrice+=p.price*p.quantity;
    })
    alert("Rs."+totalPrice);
}

admin_signin(email:string,password:string){
    firebase.auth().signInWithEmailAndPassword(email,password).then((res)=>{
        firebase.auth().currentUser.getIdToken().then((token)=>{
            this.token = token;
            this.update_gui.next(this.token);
            localStorage.setItem('token',this.token);
            setTimeout(()=>{
                this.logout();
            },3600000);
            // this.cookieService.set('token',this.token);
            this.router.navigate(['/products']);

        })
    }).catch((error)=>{
        alert('Something went wrong. Kindly try again.');
    })
}

refresh(){
    this.token = localStorage.getItem('token');
    this.update_gui.next(this.token);
}

getToken(){
    return this.token;
}

logout(){
    this.token = null;
    this.update_gui.next(this.token);
    localStorage.removeItem('token');
    this.router.navigate(['/']);
}


}