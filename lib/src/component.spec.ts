import { Component, ViewChild, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { NgxWangEditorModule } from './module';
import { WangEditorComponent } from './component';

describe('Component: ngx-tinymce', () => {
  let fixture: ComponentFixture<any>;
  let context: TestComponent;
  let dl: DebugElement;

  function genModule(template?: string) {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [NgxWangEditorModule.forRoot(), FormsModule],
    });
    if (template)
      TestBed.overrideComponent(TestComponent, { set: { template } });
  }

  function create() {
    fixture = TestBed.createComponent(TestComponent);
    context = fixture.componentInstance;
    dl = fixture.debugElement;
    fixture.detectChanges();
  }

  describe('[default]', () => {
    beforeEach(() => {
      genModule();
      create();
    });

    it('fixture should not be null', () => {
      expect(fixture).not.toBeNull();
      expect(context.e.editor).not.toBeUndefined();
    });
  });

  it('should be throw error when not load wangEditor.js', () => {
    expect(() => {
      genModule();
      (window as any).wangEditor = null;
      create();
    }).toThrow();
  });
});

@Component({
  template: `<wangEditor #e [(ngModel)]="html" (ngModelChange)="change($event)" [config]="config"
  [disabled]="disabled"
  [toolbarSelector]="toolbarSelector"
  [textSelector]="textSelector"></wangEditor>`,
})
class TestComponent {
  @ViewChild('e') e: WangEditorComponent;
  html = 'aa';
  change(html: string) {}
  config: any;
  disabled = false;
  toolbarSelector: string;
  textSelector: string;
}
