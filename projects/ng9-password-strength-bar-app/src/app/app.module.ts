import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Ng9PasswordStrengthBarModule } from 'ng9-password-strength-bar';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    Ng9PasswordStrengthBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
