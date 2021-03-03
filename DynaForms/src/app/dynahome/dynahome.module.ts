import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DynahomePageRoutingModule } from './dynahome-routing.module';

import { DynahomePage } from './dynahome.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DynahomePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [DynahomePage]
})
export class DynahomePageModule {}
