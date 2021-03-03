import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { LoginPage } from 'src/app/login/login.page';
import { AppUser } from 'src/app/security/app-user';
import { SecurityService } from 'src/app/security/security.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
})
export class SidemenuComponent implements OnInit {
  appUser: AppUser = new AppUser();
  constructor(private securityService: SecurityService, private nav: NavController, private router: Router) { }

  ngOnInit() {
    this.securityService.getCurrentMyUser().then((res)=>{
      this.appUser = res;
    });
  }

  
  logout(){
    this.securityService.logout()
    this.router.navigate(['/login'])
  }


}
