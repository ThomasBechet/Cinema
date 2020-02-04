import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CineteamComponent } from './cineteam.component';

describe('CineteamComponent', () => {
  let component: CineteamComponent;
  let fixture: ComponentFixture<CineteamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CineteamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CineteamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
