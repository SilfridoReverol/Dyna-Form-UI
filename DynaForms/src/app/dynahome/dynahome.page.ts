import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonMenu } from '@ionic/angular';
import  FormJSon from '../simple_form.json';
import { SecurityService} from '../security/security.service';
import { HttpClient } from '@angular/common/http';
import { Input } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from "@ionic/storage";
import { ASTWithName } from '@angular/compiler';



export interface Options{
  label?: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
  children?: Array<FormControlObject>;
}

export interface FormControlObject{
  key: string;
  type: string;
  options: Options
}


@Component({
  selector: 'app-dynahome',
  templateUrl: './dynahome.page.html',
  styleUrls: ['./dynahome.page.scss'],
})
export class DynahomePage implements OnInit {


  myForm: FormGroup;
  //simpleForm = FormJSon;
  simpleForm: any;

  constructor(private fb: FormBuilder, private alertCtrl: AlertController, private securityService: SecurityService, private http: HttpClient, private router: Router, private sto: Storage) {
    this.myForm = this.fb.group({});
    //Make de API call here
    var forma: any;
    this.sto.get("forma").then((resp)=>{
      forma = resp;
      console.log("Forma",resp);

      this.http.get<any>('https://serpca.com.ve/S3WebService/api/test/GetForm?formName=' + forma).subscribe(data=>{
        //this.simpleForm = data;
        //console.log(JSON.parse(data));
        this.simpleForm = JSON.parse(data);
        this.createControls(this.simpleForm);    
      })

      

    })
    

    //this.createControls(this.simpleForm);    
   }

   ngOnInit(){
    }


   createControls(controls: Array<FormControlObject>){
    for(let control of controls){
      const newFormControl = new FormControl();
      if(control.options.required){
        newFormControl.setValidators(Validators.required)
      }

      this.myForm.addControl(control.key,newFormControl);
    }
    console.log('my Form: ',this.myForm);
   }

   async submitForm(){
     const alert = await this.alertCtrl.create({
       header: 'DynaForm',
       message: JSON.stringify(this.myForm.value),
       buttons: ['OK']
     });
     await alert.present();
   }

   goToHome() {
    this.router.navigate(['/home']);
   }



}
