import { Component, OnInit } from '@angular/core';
import { AppUser} from "../security/app-user";
import { AppUserAuth} from  "../security/app-user-auth";
import { SecurityService } from '../security/security.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: AppUser = new AppUser();
  securityObject: AppUserAuth = null;

  constructor(private securityService: SecurityService) { }


  ngOnInit() {
  }



  login(){
    this.securityService.login(this.user);
    // this.securityService.login(this.user).subscribe(resp => {
    //   this.securityObject = resp
    // })
  }


}
