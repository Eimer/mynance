import {ElementRef, Inject, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindowService {

  constructor(
  ) { }

  public resize(chart: any, container: any) {
    window.onresize = function() {
      chart.applyOptions({
        width: container.nativeElement.clientWidth,
        height: container.nativeElement.clientHeight
      });
    }
  }
}
