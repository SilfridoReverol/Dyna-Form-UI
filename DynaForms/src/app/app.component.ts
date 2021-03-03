import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AppUserAuth } from './security/app-user-auth';
import { SecurityService } from './security/security.service';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private securityService: SecurityService,
    private platformL: Platform,
    private router: Router) {
      this.InitializeApp();
    }

    InitializeApp(){
      this.platformL.ready().then(()=>{
        this.securityService.authenticationState.subscribe(state=>{
          if(state){
            //this.router.navigate(['home']);
            return true;
          }
          else{
            //this.router.navigate(['login']);
          }
        });
      });

    }
}
