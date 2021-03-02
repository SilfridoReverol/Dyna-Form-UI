import { Injectable } from '@angular/core';
import { AppUserAuth } from './app-user-auth';
import { BehaviorSubject, Observable, of} from 'rxjs';
import { AppUser} from './app-user';
import { Platform } from '@ionic/angular';
import { Storage} from '@ionic/storage';
import { LOGIN_MOCKS } from './login-mocks';
import { HttpClient, HttpResponse } from '@angular/common/http';




const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  securityObject: AppUserAuth = new AppUserAuth();
  authenticationState = new BehaviorSubject (false);


  constructor(private storage: Storage, private plt: Platform, private httpClient: HttpClient) { 
    this.plt.ready().then(()=>{
      this.checkToken();
    })
  }
  


  resetSecurityObject(): void {
    this.securityObject.userName = "";
    this.securityObject.bearerToken = "";
    this.securityObject.isAuthenticated = false;
    this.securityObject.canAccessProducts = false;
    this.securityObject.canAddProduct = false;
    this.securityObject.canSaveProduct = false;
    this.securityObject.canAccessCategories = false;
    this.securityObject.canAddCategory = false;
    this.storage.remove(TOKEN_KEY);
  }

  // login(entity: AppUser ): Observable<AppUserAuth> {
  //   this.resetSecurityObject();
  //   Object.assign(this.securityObject, LOGIN_MOCKS.find(user => user.userName.toLowerCase() === entity.userName.toLowerCase() && user.password === entity.password ));
  //   if (this.securityObject.userName !== "") {
  //       this.storage.set("bearerToken", this.securityObject.bearerToken);
  //       this.authenticationState.next(true);
  //       console.log("usuario autenticado");
  //   }
  //   return of<AppUserAuth>(this.securityObject);
  // }

  login(entity: AppUser){
    this.resetSecurityObject();
    
    const body = "username=" + entity.userName + "&password=" + entity.password + "&grant_type=password";

    console.log(JSON.stringify(body));

  
    this.httpClient.post<any>('https://localhost:44359/token', body).subscribe(data => {
      if(data){
        console.log(data.access_token);
         this.storage.set(TOKEN_KEY, data.access_token).then(res=>{
          this.authenticationState.next(true);
        });
      }
      
    })
    

    // .subscribe(resp =>{
    //   if(resp.status==200){
    //     console.log(resp.status);
    //     // this.storage.set(TOKEN_KEY, ).then(res=>{
    //     //   this.authenticationState.next(true);
    //     //});
    //   }
    // });

    // Object.assign(this.securityObject, LOGIN_MOCKS.find(user => user.userName.toLowerCase() === entity.userName.toLowerCase() && user.password === entity.password ));
    // if (this.securityObject.userName !== "") {
    //     this.storage.set(TOKEN_KEY, this.securityObject.bearerToken).then(res=>{
    //       this.authenticationState.next(true);
    //     });
    // }
    // else
    // {
    //   this.authenticationState.next(false);
    //   console.log("usuario no autenticado");
    // }
  }

  checkToken(){
    return this.storage.get(TOKEN_KEY).then(res =>{
      if(res){
        this.authenticationState.next(true);
      }
    })
  }

  isAuthenticated(){
    return this.authenticationState.value;
  }


  logout(): void {
    this.resetSecurityObject();
    this.storage.remove(TOKEN_KEY).then(()=>{
      this.authenticationState.next(false);
    });
    
  }
  
}
