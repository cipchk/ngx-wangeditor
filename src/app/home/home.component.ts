import { Component, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { WangEditorComponent } from 'ngx-wangeditor';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  html1 = ``;
  html2 = ``;
  html3 = ``;
  disabled = false;

  config: any = {};

  @ViewChild('e') e: WangEditorComponent;

  constructor(public sanitizer: DomSanitizer) {}

  set(key: string, value: any) {
    const obj: any = {};
    obj[key] = value;
    this.config = Object.assign({}, this.config, obj);
  }

  showJson() {
    alert(JSON.stringify(this.e.editor.txt.getJSON() || {}));
  }
}
