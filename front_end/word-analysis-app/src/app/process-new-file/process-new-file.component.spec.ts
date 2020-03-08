import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessNewFileComponent } from './process-new-file.component';

describe('ProcessNewFileComponent', () => {
  let component: ProcessNewFileComponent;
  let fixture: ComponentFixture<ProcessNewFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessNewFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessNewFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
