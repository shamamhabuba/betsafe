import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FourOFourComponent } from './four-o-four/four-o-four.component';
import { MoviesModule } from './movies/movies.module';

@NgModule({
  declarations: [
    AppComponent,
    FourOFourComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MoviesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
