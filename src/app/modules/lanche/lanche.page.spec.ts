import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LanchePage } from './lanche.page';

describe('LanchePage', () => {
  let component: LanchePage;
  let fixture: ComponentFixture<LanchePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanchePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LanchePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
