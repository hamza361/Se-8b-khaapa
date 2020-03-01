import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as firebase from 'firebase';
import { Products_Display_Service } from 'src/app/service/products_display.module';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  SignInForm:FormGroup;
  constructor(private productService:Products_Display_Service){

  }
  ngOnInit() {
   
    this.createForm();
  }

  createForm(){
    this.SignInForm = new FormGroup({
      'email':new FormControl(null,[Validators.required]),
      'password': new FormControl(null,[Validators.required,Validators.min(6)])
    })
  }
  onSubmit(){
    this.productService.admin_signin(this.SignInForm.value.email,this.SignInForm.value.password);
   
  }

}
