import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipientStatusComponent } from './recipient-status.component';

describe('RecipientStatusComponent', () => {
  let component: RecipientStatusComponent;
  let fixture: ComponentFixture<RecipientStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipientStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipientStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
