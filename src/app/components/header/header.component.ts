import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() changeTimeRange = new EventEmitter();
  public timeInterval = ['1d', '1w', '1M'];
  public currentSelectedInterval: number = 0;

  constructor() {
  }

  public toggleTimeRange(intervalValue: string, index: number) {
    this.changeTimeRange.emit(intervalValue);
    this.currentSelectedInterval = index;
  }
}
