import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DynahomePage } from './dynahome.page';

const routes: Routes = [
  {
    path: '',
    component: DynahomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DynahomePageRoutingModule {}
