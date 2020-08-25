import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutosCheckinComponent } from './produtos-checkin.component';

describe('ProdutosCheckinComponent', () => {
  let component: ProdutosCheckinComponent;
  let fixture: ComponentFixture<ProdutosCheckinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdutosCheckinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutosCheckinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
