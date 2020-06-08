import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ng9PasswordStrengthBarComponent } from './ng9-password-strength-bar.component';

describe('Ng9PasswordStrengthBarComponent', () => {
  let component: Ng9PasswordStrengthBarComponent;
  let fixture: ComponentFixture<Ng9PasswordStrengthBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ng9PasswordStrengthBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ng9PasswordStrengthBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
