import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgxPasswordStrengthBarComponent} from 'ngx-password-strength-bar';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [NgxPasswordStrengthBarComponent, FormsModule],
})
export class AppComponent {
  public account = {
    password: null as unknown as string,
  };
  public baseColor = '#FFF';
  public barLabel = 'Password strength:';
  public strengthLabels = ['(Useless)', '(Weak)', '(Normal)', '(Strong)', '(Great!)'];
  public myColors = ['#DD2C00', '#FF6D00', '#FFD600', '#AEEA00', '#00C853'];
  public thresholds = [90, 75, 45, 25];
  public strength = 0;

  strengthChanged(strength: number) {
    this.strength = strength;
  }
}
