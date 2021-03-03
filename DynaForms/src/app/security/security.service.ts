import { Injectable } from '@angular/core';
import { AppUserAuth } from './app-user-auth';
import { BehaviorSubject, Observable, of} from 'rxjs';
import { AppUser, UserRegister} from './app-user';
import { NavController, Platform } from '@ionic/angular';
import { Storage} from '@ionic/storage';
import { LOGIN_MOCKS } from './login-mocks';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';




const TOKEN_KEY = 'auth-token',
  USER_KEY = 'user_storage';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  securityObject: AppUserAuth = new AppUserAuth();
  authenticationState = new BehaviorSubject (false);
  appUser: AppUser = new AppUser();



  constructor(private storage: Storage, private plt: Platform, private httpClient: HttpClient, private nav: NavController, private router: Router) { 
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


  testName(){
    return this.storage.get(TOKEN_KEY).then(res =>{
      if(res){
        
        console.log(res);

        const headers = { 'Authorization': 'Bearer ' + res  };
        const body = '';
        this.httpClient.post<any>('https://localhost:44359/API/Test/method2', body, { headers }).subscribe(data => {
        console.log(data);
      });

        //this.authenticationState.next(true);
      }
    })
  }

  register(entity: UserRegister) {
    //const body = "firstname=" + entity.firstName + "lastname=" + entity.lastName + "username=" + entity.userName + "email=" + entity.email + "sex=" + entity.sex + "age=" + entity.sex  + "password=" + entity.password;
    //const body =  JSON.stringify(entity);
    const body = entity;
    
    console.log(body);
    this.httpClient.post<any>('https://serpca.com.ve/S3WebService/api/test/register', body).subscribe(data => {
      if(data){
        console.log(data);
        this.nav.navigateRoot('/login')
         //this.storage.set(TOKEN_KEY, data.access_token).then(res=>{
          //this.authenticationState.next(true);
        //});
      }
      
    })

    

    console.log(body)

  }


  async getCurrentMyUser():Promise<AppUser>{
    var response;
    await this.storage.get(USER_KEY).then((result)=>{
      response =  result[0];
    })
    console.log(response.userName);
    return response;
  }


  getForm(formName){
    this.storage.get(TOKEN_KEY).then(res=>{
      const headers = { 'Authorization': 'Bearer ' + res  };
      const body = '';
       return this.httpClient.post<any>('https://serpca.com.ve/S3WebService/api/test/GetForm?formName='+formName, body, { headers })
   })
  } 


  async getCurrentUser():Promise<string>{
    var response;
    await this.storage.get(USER_KEY).then((result)=>{
      response =  result[0];
    })
    console.log(response.userName);
    return response.userName;
  }

  login(entity: AppUser){
    this.resetSecurityObject();
    
    const body = "username=" + entity.userName + "&password=" + entity.password + "&grant_type=password";

    console.log(JSON.stringify(body));

    
//this.httpClient.post<any>('https://localhost:44359/token', body).subscribe(data => {

    this.httpClient.post<any>('https://serpca.com.ve/S3WebService/token', body).subscribe(data => {
      if(data){
        console.log(data.access_token);
         this.storage.set(TOKEN_KEY, data.access_token).then(res=>{
          this.authenticationState.next(true);
          const headers = { 'Authorization': 'Bearer ' + data.access_token };
          this.httpClient.post<any>('https://serpca.com.ve/S3WebService/api/test/GetUser',entity, {headers}).subscribe(resp_user=>{
            if(resp_user){
              this.storage.set(USER_KEY,resp_user).then(()=>{
                this.appUser
                this.storage.get(USER_KEY).then((sto)=>console.log(sto));
                this.router.navigate(['/home'])
              });
            }
          });
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
    this.storage.remove(USER_KEY);
    this.storage.remove(TOKEN_KEY).then(()=>{
      this.authenticationState.next(false);
      //this.nav.navigateRoot('/login');
    });
    
  }
  
}
