import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FourOFourComponent } from './four-o-four/four-o-four.component';
import { AppComponent } from './app.component';


const routes: Routes = [

  {
    path: '',
    component: AppComponent
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
  {
    path: 'not-found',
    component: FourOFourComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
