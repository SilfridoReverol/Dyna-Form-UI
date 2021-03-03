import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../security/security.service';
import { AppUser } from 'src/app/security/app-user';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  appUser: AppUser = new AppUser();
   
  constructor(private securityService: SecurityService, private menuCtrl: MenuController) {}

  ngOnInit() {
    this.securityService.getCurrentMyUser().then((res)=>{
      this.appUser = res;
    });
  }

  bringMenu() {
    this.menuCtrl.toggle();
  }

}
