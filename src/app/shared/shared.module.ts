

import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
  ],
  imports: [
    MatCardModule,
    MatCheckboxModule
  ],
  exports: [
    MatCardModule,
    MatCheckboxModule
  ],

})
export class SharedModule { }
