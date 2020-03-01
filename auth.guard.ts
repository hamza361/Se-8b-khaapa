import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Products_Display_Service } from './products_display.module';


@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private productService:Products_Display_Service,private router:Router){}
    isAuth:boolean = true;
    canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):
    boolean | Observable<boolean>| Promise<boolean>{
       const isAuth = this.productService.getToken();
       
       if(!isAuth){
            this.isAuth =false;
           this.router.navigate(['/login']);
       }
       return this.isAuth;
    }
    
}