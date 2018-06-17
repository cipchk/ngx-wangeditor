import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WangEditorConfig } from './config';
import { WangEditorComponent } from './component';

@NgModule({
  imports: [CommonModule],
  declarations: [WangEditorComponent],
  exports: [WangEditorComponent],
})
export class NgxWangEditorModule {
  static forRoot(options?: WangEditorConfig): ModuleWithProviders {
    return {
      ngModule: NgxWangEditorModule,
      providers: [{ provide: WangEditorConfig, useValue: options }],
    };
  }
}
