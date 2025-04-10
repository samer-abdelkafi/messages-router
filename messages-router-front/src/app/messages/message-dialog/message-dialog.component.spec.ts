import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MessageDialogComponent } from './message-dialog.component';
import { By } from '@angular/platform-browser';

describe('MessageDialogComponent', () => {
  let component: MessageDialogComponent;
  let fixture: ComponentFixture<MessageDialogComponent>;
  // Mock data for the dialog
  const mockDialogData = { content: 'This is a test message' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [MessageDialogComponent, MatDialogModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MessageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger Angular's change detection
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the dialog title', () => {
    const titleElement = fixture.debugElement.query(By.css('h3[mat-dialog-title]')).nativeElement;
    expect(titleElement.textContent.trim()).toBe('Message content');
  });

  it('should display the dialog content', () => {
    const contentElement = fixture.debugElement.query(By.css('mat-dialog-content p')).nativeElement;
    expect(contentElement.textContent.trim()).toBe(mockDialogData.content);
  });

  it('should render a Cancel button with mat-dialog-close', () => {
    const cancelButton = fixture.debugElement.query(By.css('button[mat-dialog-close]')).nativeElement;
    expect(cancelButton).toBeTruthy();
    expect(cancelButton.textContent.trim()).toBe('Cancel');
  });
});
