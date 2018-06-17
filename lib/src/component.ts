import {
  Component,
  forwardRef,
  OnChanges,
  OnDestroy,
  Input,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  SimpleChanges,
  NgZone,
  ElementRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { WangEditorConfig } from './config';

declare const window: any;

@Component({
  selector: 'wangEditor, [wangEditor]',
  template: ``,
  preserveWhitespaces: false,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WangEditorComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WangEditorComponent
  implements AfterViewInit, OnChanges, OnDestroy, ControlValueAccessor {
  private instance: any;
  private value: string;
  private inited = false;

  private onChange: (value: string) => void;
  private onTouched: () => void;

  @Input() toolbarSelector: string;
  @Input() textSelector: string;
  @Input() config: any;

  @Input()
  set disabled(value: boolean) {
    this._disabled = value;
    this.setDisabled();
  }
  private _disabled = false;

  get editor(): any {
    return this.instance;
  }

  constructor(
    private defConfig: WangEditorConfig,
    private el: ElementRef,
    private cd: ChangeDetectorRef,
    private zone: NgZone,
  ) {}

  private init() {
    if (!window.wangEditor)
      throw new Error(
        `请先在 angular.json 里配置 wangEditor.min.js 路径，并重启：ng serve`,
      );

    if (this.instance) return;

    const customConfig = Object.assign(
      {},
      this.defConfig && this.defConfig.config,
      this.config,
      {
        onchange: (html: string) => {
          this.value = html;
          this.zone.run(() => this.onChange(this.value));
        },
      },
    );

    if (!this.toolbarSelector) {
      this.toolbarSelector = `_wangEditor-${Math.random()
        .toString(36)
        .substring(2)}`;
      (this.el.nativeElement as HTMLElement).id = this.toolbarSelector;
      this.toolbarSelector = '#' + this.toolbarSelector;
    }
    this.instance = new window.wangEditor(
      this.toolbarSelector,
      this.textSelector,
    );
    this.instance.customConfig = customConfig;
    this.instance.create();
  }

  private destroy(): this {
    if (!this.instance) {
      return this;
    }
    this.instance._offAllEvent();
    this.instance = null;
    return this;
  }

  private setDisabled() {
    if (!this.instance) return;
    this.instance.$textElem.attr('contenteditable', !this._disabled);
  }

  ngAfterViewInit(): void {
    this.init();
    this.inited = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.inited && changes.config) {
      this.destroy().init();
    }
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  // reuse-tab: http://ng-alain.com/components/reuse-tab#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F
  _onReuseInit() {
    this.destroy().init();
  }

  writeValue(value: string): void {
    // value should be NOT NULL
    this.value = value || '';
    if (this.instance) {
      this.instance.txt.html(this.value);
    }
  }

  registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.setDisabled();
  }
}
