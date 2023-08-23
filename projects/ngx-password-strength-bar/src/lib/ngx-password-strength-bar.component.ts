import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'ngx-password-strength-bar',
  templateUrl: 'ngx-password-strength-bar.component.html',
  styleUrls: ['ngx-password-strength-bar.component.scss'],
  standalone: true,
  host: {
    'attr.data-password-strength-instance': String(NgxPasswordStrengthBarComponent.INSTANCE_NUMBER++),
  },
})
export class NgxPasswordStrengthBarComponent implements OnChanges {
  public static INSTANCE_NUMBER = 0;

  @Input() passwordToCheck?: string;
  @Input() barLabel?: string;
  @Input() barColors?: Array<string>;
  @Input() baseColor?: string;
  @Input() strengthLabels?: Array<string>;
  @Input() customThresholds?: Array<number>;
  @Output() onStrengthChanged: EventEmitter<number> = new EventEmitter<number>();

  bar0?: string;
  bar1?: string;
  bar2?: string;
  bar3?: string;
  bar4?: string;

  strengthLabel?: string;

  private colors: Array<string>;
  private thresholds: Array<number>;
  strengths?: Array<string> | null;
  private readonly defaultColors = ['#F00', '#F90', '#FF0', '#9F0', '#0F0'];
  private readonly defaultThresholds = [90, 70, 40, 20];
  private readonly defaultBaseColor = '#DDD';

  private static measureStrength(pass: string) {
    let score = 0;
    // award every unique letter until 5 repetitions
    const letters = {};
    for (const element of pass) {
      (letters as any)[element] = ((letters as any)[element] || 0) + 1;
      score += 5.0 / (letters as any)[element];
    }
    // bonus points for mixing it up
    const variations = {
      digits: /\d/.test(pass),
      lower: /[a-z]/.test(pass),
      upper: /[A-Z]/.test(pass),
      nonWords: /\W/.test(pass),
    };

    let variationCount = 0;
    for (let check in variations) {
      variationCount += ((variations as any)[check]) ? 1 : 0;
    }
    score += (variationCount - 1) * 10;
    return Math.trunc(score);
  }

  constructor() {
    this.colors = this.defaultColors;
    this.thresholds = this.defaultThresholds;
  }

  private checkBarColors(): void {
    // Accept custom colors if input is valid, otherwise the default colors will be used
    if (this.barColors && this.barColors.length === 5) {
      this.colors = this.barColors.slice();
    } else {
      this.colors = this.defaultColors;
    }

    this.strengths = (this.strengthLabels?.length === 5 ? this.strengthLabels.slice() : null);
    this.setStrengthLabel(0);

    if (!this.baseColor || !/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(this.baseColor)) {
      this.baseColor = this.defaultBaseColor;
    }
  }

  private checkThresholds(): void {
    if (this.customThresholds && this.customThresholds.length === 4) {
      this.thresholds = this.customThresholds.slice();
    } else {
      this.thresholds = this.defaultThresholds;
    }
  }

  private getColor(score: number) {
    let idx = 0;
    if (score > this.thresholds[0]) {
      idx = 4;
    } else if (score > this.thresholds[1]) {
      idx = 3;
    } else if (score >= this.thresholds[2]) {
      idx = 2;
    } else if (score >= this.thresholds[3]) {
      idx = 1;
    }
    return {
      idx: idx + 1,
      col: this.colors[idx],
    };
  }

  getStrengthIndexAndColor(password: string) {
    return this.getColor(NgxPasswordStrengthBarComponent.measureStrength(password));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      !changes['passwordToCheck' as keyof NgxPasswordStrengthBarComponent]
      && !changes['barLabel' as keyof NgxPasswordStrengthBarComponent]
      && !changes['barColors' as keyof NgxPasswordStrengthBarComponent]
      && !changes['baseColor' as keyof NgxPasswordStrengthBarComponent]
      && !changes['strengthLabels' as keyof NgxPasswordStrengthBarComponent]
      && !changes['customThresholds' as keyof NgxPasswordStrengthBarComponent]
    ) return;

    const password = this.passwordToCheck;
    this.checkBarColors();
    this.checkThresholds();
    this.setBarColors(5, this.baseColor ?? this.defaultBaseColor);
    let strength = 0;
    if (password) {
      const c = this.getStrengthIndexAndColor(password);
      strength = c.idx - 1;
      this.setStrengthLabel(strength);
      this.setBarColors(c.idx, c.col);
    }
    this.onStrengthChanged.emit(strength);
  }

  private setBarColors(count: number, col: string) {
    for (let _n = 0; _n < count; _n++) {
      (this as any)['bar' + _n] = col;
    }
  }

  private setStrengthLabel(index: number) {
    if (this.strengths) {
      this.strengthLabel = this.strengths[index];
    } else {
      this.strengthLabel = '';
    }
  }
}
