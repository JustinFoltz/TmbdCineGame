import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JeuComponent } from './jeu.component';

describe('JeuComponent', () => {
  let component: JeuComponent;
  let fixture: ComponentFixture<JeuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JeuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JeuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
