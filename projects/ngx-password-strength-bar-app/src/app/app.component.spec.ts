import {DebugElement} from '@angular/core';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {AppComponent} from './app.component';

describe('AppComponent', function () {
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let label: DebugElement;
  let strengthLabel: DebugElement;
  let bar0: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();

    label = fixture.debugElement.query(By.css('[data-spec="label"]'));
    strengthLabel = fixture.debugElement.query(By.css('[data-spec="strength-label"]'));
    bar0 = fixture.debugElement.query(By.css('[data-spec="bar0"]'));
  })

  it('Should create App', () => expect(comp).toBeDefined());

  it('App should have expected text', () => {
    expect(label.nativeElement.innerHTML).toMatch(/Password strength:/);

    const newLabel = 'Seguridad de la contraseña:';
    comp.barLabel = newLabel;
    fixture.detectChanges();
    expect(label.nativeElement.innerHTML).toMatch(newLabel);
  });

  it('should correctly set custom bar colors', () => {
    comp.account.password = 'testinput';
    fixture.detectChanges();
    expect(bar0.nativeElement.style.backgroundColor).toBe('rgb(255, 109, 0)');
    expect(strengthLabel.nativeElement.innerHTML).toMatch(/\(Weak\)/);
  });

  it('should correctly use default bar colors', () => {
    comp.account.password = 'testinputN';
    comp.myColors = null!;
    fixture.detectChanges();
    expect(bar0.nativeElement.style.backgroundColor).toBe('rgb(255, 255, 0)');
    expect(strengthLabel.nativeElement.innerHTML).toMatch(/\(Normal\)/);

    comp.account.password = 'testinput';
    comp.myColors = ['#DD2C00', '#FF6D00', '#FFD600', '#AEEA00']; // only 4 items
    fixture.detectChanges();
    expect(bar0.nativeElement.style.backgroundColor).toBe('rgb(255, 153, 0)');
    expect(strengthLabel.nativeElement.innerHTML).toMatch(/\(Weak\)/);
  });

  it('should correctly show custom base color', () => {
    fixture.detectChanges();
    expect(bar0.nativeElement.style.backgroundColor).toBe('rgb(255, 255, 255)'); // #FFF
    expect(strengthLabel.nativeElement.innerHTML).toMatch(/\(Useless\)/);
  });

  it('should correctly show default base color and strength label (Useless)', () => {
    comp.baseColor = null!;
    comp.strengthLabels = null!;
    fixture.detectChanges();
    expect(bar0.nativeElement.style.backgroundColor).toBe('rgb(221, 221, 221)'); // #DDD
    expect((strengthLabel.nativeElement as HTMLElement).attributes.getNamedItem('hidden')?.value).toBeTruthy();
  });
  it('should correctly show default base color on a bad base color', () => {
    comp.baseColor = 'EEE'; // invalid color
    fixture.detectChanges();
    expect(bar0.nativeElement.style.backgroundColor).toBe('rgb(221, 221, 221)'); // #DDD
  });

  it('should have the correct strength index on password change', () => {
    comp.account.password = 'testinput-123';
    fixture.detectChanges();
    expect(comp.strength).toEqual(3);

    comp.account.password = 'Testinput-123';
    fixture.detectChanges();
    expect(comp.strength).toEqual(4);

    comp.strength = 1;
    comp.account.password = '';  // Event should be emitted even on an empty string
    fixture.detectChanges();
    expect(comp.strength).toEqual(0);
  });
  it('should have correct threshold values', () => {
    // Custom values
    comp.account.password = 'testinput-t';
    comp.thresholds = [20, 75, 45, 25];
    fixture.detectChanges();
    expect(comp.strength).toEqual(4);
    // Default values
    comp.account.password = 'testinput-tt';
    comp.thresholds = null!;
    fixture.detectChanges();
    expect(comp.strength).toEqual(2);
  });
});
