import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PartnerEditDialogComponent } from './partner-edit-dialog.component';
import { By } from '@angular/platform-browser'; // To query DOM elements
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PartnerDirectionEnum, PartnerFlowTypeEnum, Partner } from '../model/partner.model';

describe('PartnerEditDialogComponent', () => {
  let component: PartnerEditDialogComponent;
  let fixture: ComponentFixture<PartnerEditDialogComponent>;

  const mockDialogData: Partner = {
    id: null,
    alias: 'TestPartner',
    type: 'TestType',
    direction: PartnerDirectionEnum.INBOUND,
    application: 'TestApplication',
    flowType: PartnerFlowTypeEnum.MESSAGE,
    description: 'Test description for the partner.',
  };

  const mockDialogRef = {
    close: jasmine.createSpy('close'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [], // Declare the component
      imports: [
        PartnerEditDialogComponent,
        MatDialogModule,
        ReactiveFormsModule,
        FormsModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatFormFieldModule,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
        { provide: MatDialogRef, useValue: mockDialogRef },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PartnerEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Initialize the template and component
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with injected data', () => {
    const formValues = component.partnerForm.value;

    expect(formValues.alias).toEqual(mockDialogData.alias);
    expect(formValues.type).toEqual(mockDialogData.type);
    expect(formValues.direction).toEqual(mockDialogData.direction);
    expect(formValues.application).toEqual(mockDialogData.application);
    expect(formValues.flowType).toEqual(mockDialogData.flowType);
    expect(formValues.description).toEqual(mockDialogData.description);
  });

  it('should validate alias field for required and minlength errors', () => {
    const aliasControl = component.partnerForm.get('alias');
    aliasControl?.setValue(''); // Empty value to trigger validation
    aliasControl?.markAsTouched(); // Mark it as touched to trigger error display
    fixture.detectChanges();

    const aliasErrors = fixture.debugElement.query(By.css('mat-error')).nativeElement.textContent.trim();
    expect(aliasErrors).toBe('Alias is required');
    // Less than minlength value
    aliasControl?.setValue('AB');
    fixture.detectChanges();

    const minlengthErrors = fixture.debugElement.query(By.css('mat-error')).nativeElement.textContent.trim();
    expect(minlengthErrors).toBe('Alias must be at least 3 characters long');
  });

  it('should display form controls for each field', () => {
    const aliasInput = fixture.debugElement.query(By.css('input[formControlName="alias"]')).nativeElement;
    const typeInput = fixture.debugElement.query(By.css('input[formControlName="type"]')).nativeElement;
    const directionSelect = fixture.debugElement.query(By.css('mat-select[formControlName="direction"]')).nativeElement;
    const flowTypeSelect = fixture.debugElement.query(By.css('mat-select[formControlName="flowType"]')).nativeElement;
    const descriptionTextarea = fixture.debugElement.query(By.css('textarea[formControlName="description"]')).nativeElement;

    expect(aliasInput).toBeTruthy();
    expect(typeInput).toBeTruthy();
    expect(directionSelect).toBeTruthy();
    expect(flowTypeSelect).toBeTruthy();
    expect(descriptionTextarea).toBeTruthy();
  });

  it('should call dialogRef.close with form value when save is clicked and form is valid', () => {
    spyOn(component, 'save').and.callThrough();
    component.partnerForm.setValue({
      alias: 'ValidAlias',
      type: 'Type',
      direction: PartnerDirectionEnum.OUTBOUND,
      application: 'NewTestApp',
      flowType: PartnerFlowTypeEnum.MESSAGE,
      description: 'Valid description for partner.',
    });
    fixture.detectChanges();

    // Ensure form is valid
    expect(component.partnerForm.valid).toBeTrue();

    const saveButton = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    saveButton.click(); // Simulate save button click
    fixture.detectChanges();

    expect(component.save).toHaveBeenCalledTimes(1);
    expect(mockDialogRef.close).toHaveBeenCalledWith(component.partnerForm.value);
  });

  it('should call dialogRef.close with null when cancel is clicked', () => {
    spyOn(component, 'close').and.callThrough();

    const cancelButton = fixture.debugElement.query(By.css('button[mat-button]')).nativeElement;
    cancelButton.click();
    fixture.detectChanges();

    expect(component.close).toHaveBeenCalledTimes(1);
    // Verify that dialog was closed with null
    expect(mockDialogRef.close).toHaveBeenCalledWith(null);
  });
});
