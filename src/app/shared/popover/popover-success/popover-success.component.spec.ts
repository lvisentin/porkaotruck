import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PopoverSuccessComponent } from './popover-success.component';

describe('PopoverSuccessComponent', () => {
  let component: PopoverSuccessComponent;
  let fixture: ComponentFixture<PopoverSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PopoverSuccessComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PopoverSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
