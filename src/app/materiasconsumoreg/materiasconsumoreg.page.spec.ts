import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MateriasconsumoregPage } from './materiasconsumoreg.page';

describe('MateriasconsumoregPage', () => {
  let component: MateriasconsumoregPage;
  let fixture: ComponentFixture<MateriasconsumoregPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MateriasconsumoregPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MateriasconsumoregPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
