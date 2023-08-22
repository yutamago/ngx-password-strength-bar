import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h3>Angular Password Strength Bar</h3>
    <div>
      <form name="myForm" novalidate>
        <input type="password" class="form-control" id="password" name="password" placeholder="Enter password"
               [(ngModel)]="account.password" #password="ngModel"
               minlength="5" maxlength="50" required>
        <ngx-password-strength-bar [passwordToCheck]="account.password" [barColors]="myColors"
                                   [barLabel]="barLabel"
                                   [baseColor]="baseColor"
                                   [customThresholds]="thresholds"
                                   [strengthLabels]="strengthLabels"
                                   (onStrengthChanged)="strengthChanged($event)">
        </ngx-password-strength-bar>
      </form>
    </div>
  `,
})
export class AppComponent {
  public account = {
    password: null as unknown as string
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
