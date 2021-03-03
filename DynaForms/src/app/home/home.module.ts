import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';

import { BarrasuperiorComponent  } from "../components/barrasuperior/barrasuperior.component";
import { SidemenuComponent } from '../components/sidemenu/sidemenu.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, BarrasuperiorComponent, SidemenuComponent]
})
export class HomePageModule {}
