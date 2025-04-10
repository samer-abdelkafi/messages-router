import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import {RouterOutlet} from '@angular/router';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [AppComponent, RouterTestingModule, MatToolbarModule, MatButtonModule], // Required modules
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger Angular's change detection
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the toolbar with an SVG logo', () => {
    const toolbar = fixture.debugElement.query(By.css('mat-toolbar'));
    expect(toolbar).toBeTruthy();

    const logo = fixture.debugElement.query(By.css('.app-logo'));
    expect(logo).toBeTruthy();
  });

  it('should display the correct title', () => {
    const titleElement = fixture.debugElement.query(By.css('mat-toolbar span'));
    expect(titleElement.nativeElement.textContent.trim()).toBe('Message Router');
  });

  it('should have a Messages navigation button', () => {
    const messagesButton = fixture.debugElement.query(
      By.css('button[routerLink="/messages"]')
    );
    expect(messagesButton).toBeTruthy();
    expect(messagesButton.nativeElement.textContent.trim()).toBe('Messages');
  });

  it('should have a Partners navigation button', () => {
    const partnersButton = fixture.debugElement.query(
      By.css('button[routerLink="/partners"]')
    );
    expect(partnersButton).toBeTruthy();
    expect(partnersButton.nativeElement.textContent.trim()).toBe('Partners');
  });

  it('should have a GitHub link with the correct URL', () => {
    const githubLink = fixture.debugElement.query(By.css('a[mat-button]'));
    expect(githubLink).toBeTruthy();
    expect(githubLink.nativeElement.getAttribute('href')).toBe(
      'https://github.com/samer-abdelkafi/messages-router'
    );
  });

  it('should contain a router outlet', () => {
    const routerOutlet = fixture.debugElement.query(By.directive(RouterOutlet));
    expect(routerOutlet).toBeTruthy();
  });
});
