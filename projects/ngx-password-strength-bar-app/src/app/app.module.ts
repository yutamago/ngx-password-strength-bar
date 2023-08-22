import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPasswordStrengthBarModule } from 'ngx-password-strength-bar';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxPasswordStrengthBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
