import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxPasswordStrengthBarComponent } from './ngx-password-strength-bar.component';

describe('NgxPasswordStrengthBarComponent', () => {
  let component: NgxPasswordStrengthBarComponent;
  let fixture: ComponentFixture<NgxPasswordStrengthBarComponent>;

  beforeEach((async () => {
    await TestBed.configureTestingModule({
      imports: [ NgxPasswordStrengthBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxPasswordStrengthBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
