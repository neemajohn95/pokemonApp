import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewComponent } from './view.component';
import { CardModule, } from 'primeng/card';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { TableModule } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { PokeServiceService } from '../services/poke-service.service';

describe('ViewComponent', () => {
  let component: ViewComponent;
  let fixture: ComponentFixture<ViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        CardModule,
        ButtonModule,
        PaginatorModule,
        InputTextModule,
        DropdownModule,
        FieldsetModule,
        TableModule,
        ProgressSpinnerModule,
      ],
      declarations: [ViewComponent],
      providers: [PokeServiceService],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should render title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Pokemon');
  });
  it('should', async(() => {
    spyOn(component, 'onSearch');

    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();

    fixture.whenStable().then(() => {
      expect(component.onSearch).toHaveBeenCalled();
    });
  }));
  it('should', async(() => {
    spyOn(component, 'oncardClick');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.oncardClick).toHaveBeenCalled();
    });
  }));
  it('should', async(() => {
    spyOn(component, 'onSort');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.onSort).toHaveBeenCalled();
    });
  }));
  it('should', async(() => {
    spyOn(component, 'paginate');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.paginate).toHaveBeenCalled();
    });
  }));
});
