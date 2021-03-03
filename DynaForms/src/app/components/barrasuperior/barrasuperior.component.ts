import { Component, OnInit } from '@angular/core';
import { App } from '@capacitor/core';
import { AppUser } from 'src/app/security/app-user';
import { SecurityService  } from "../../security/security.service";

var usuario;

@Component({
  selector: 'app-barrasuperior',
  templateUrl: './barrasuperior.component.html',
  styleUrls: ['./barrasuperior.component.scss'],
})
export class BarrasuperiorComponent implements OnInit {
  appUser: AppUser = new AppUser();

  constructor(private securityService: SecurityService)  { 

  }

  ngOnInit() {
    // console.log(JSON.stringify(this.securityService.getCurrentUser()));
    console.log(this.securityService.getCurrentUser());
    // this.securityService.getCurrentUser().then((res)=>{
    //   this.appUser.userName = res;
    // });
    this.securityService.getCurrentMyUser().then((res)=>{
      this.appUser = res;
    });

        
  }

}
