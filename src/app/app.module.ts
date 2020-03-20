import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


/* Routes */
import { AppRoutingModule } from './app-routing.module';

/* Temporal */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



/* Components */
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';

import { PagesModule } from './pages/pages.module';

@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent,

    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
