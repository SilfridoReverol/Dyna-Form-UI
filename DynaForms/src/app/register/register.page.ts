import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SecurityService } from '../security/security.service';
import { UserRegister } from '../security/app-user'

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  user: UserRegister = new UserRegister();

  //registerForm: FormGroup;
  constructor(private securityService: SecurityService, private nav: NavController) {}

  ngOnInit() {}

  register() {
    this.securityService.register(this.user)
  }

  logout(){
    this.securityService.logout()
  }

  testName(){
    this.securityService.testName();
  }
}
