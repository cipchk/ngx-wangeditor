import { Component } from '@angular/core';

@Component({
  selector: 'app-other',
  templateUrl: './other.component.html',
  styleUrls: ['./other.component.less'],
})
export class OtherComponent {
  html = `now: ${+new Date()}`;

  config: any = {};
}
