import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { LoginPage } from 'src/app/login/login.page';
import { AppUser } from 'src/app/security/app-user';
import { SecurityService } from 'src/app/security/security.service';
import { Storage} from '@ionic/storage';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
})
export class SidemenuComponent implements OnInit {
  appUser: AppUser = new AppUser();
  allForms: any;

  constructor(private securityService: SecurityService, private nav: NavController, private router: Router, private http: HttpClient, private sto: Storage) {
    
   }

  ngOnInit() {
    
    this.securityService.getCurrentMyUser().then((res)=>{
      this.appUser = res;
    });

    this.http.get<any>('https://serpca.com.ve/S3WebService/api/test/GetForms').subscribe(data=>{
      this.allForms = data;
    })


  }

  
  logout(){
    this.securityService.logout()
    this.router.navigate(['/login'])
  }

  gotoForm(formName){
    this.sto.set("forma",formName).then(()=>{
      this.router.navigate(['/dynahome']);
    })
    console.log(formName);
  }

}
