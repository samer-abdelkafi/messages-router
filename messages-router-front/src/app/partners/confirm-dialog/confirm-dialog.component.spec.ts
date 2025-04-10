
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;
  let dialogMock: jasmine.SpyObj<MatDialogRef<ConfirmDialogComponent>>;

  const mockDialogData = { message: 'Are you sure you want to delete this item?' };

  beforeEach(async () => {
    dialogMock = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ConfirmDialogComponent, MatDialogModule, NoopAnimationsModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
        { provide: MatDialogRef, useValue: dialogMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the provided confirmation message', () => {
    const messageElement = fixture.debugElement.query(By.css('mat-dialog-content p')).nativeElement;
    expect(messageElement.textContent).toBe(mockDialogData.message);
  });

  it('should close the dialog with false when onCancel is called', () => {
    component.onCancel();
    expect(dialogMock.close).toHaveBeenCalledWith(false);
  });

  it('should close the dialog with true when onConfirm is called', () => {
    component.onConfirm();
    expect(dialogMock.close).toHaveBeenCalledWith(true);
  });

  it('should call onCancel when the Cancel button is clicked', () => {
    spyOn(component, 'onCancel');
    const cancelButton = fixture.debugElement.query(By.css('button')).nativeElement;

    cancelButton.click();
    expect(component.onCancel).toHaveBeenCalled();
  });

  it('should call onConfirm when the Delete button is clicked', () => {
    spyOn(component, 'onConfirm');
    const deleteButton = fixture.debugElement.query(By.css('button[color="warn"]')).nativeElement;

    deleteButton.click();
    expect(component.onConfirm).toHaveBeenCalled();
  });
});
