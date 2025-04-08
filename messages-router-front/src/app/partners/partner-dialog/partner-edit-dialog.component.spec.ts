import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerEditDialogComponent } from './partner-edit-dialog.component';

describe('PartnerDialogComponent', () => {
  let component: PartnerEditDialogComponent;
  let fixture: ComponentFixture<PartnerEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartnerEditDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartnerEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
