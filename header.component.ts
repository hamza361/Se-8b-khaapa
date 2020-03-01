import { Component, OnInit } from '@angular/core';
import { Products_Display_Service } from 'src/app/service/products_display.module';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  auth:string;
  constructor(private productService:Products_Display_Service) { }

  ngOnInit() {
    const token = this.productService.getToken();
    if(token){
      this.auth = token;
    }
    this.productService.update_gui.subscribe((token:string)=>{
      this.auth = token;
    })
  }

  reset_quantity(){
    this.productService.reset_quantity();
  }

  total_collection(){
    this.productService.total_collection();
  }

  logout(){
    this.productService.logout();
  }

}
