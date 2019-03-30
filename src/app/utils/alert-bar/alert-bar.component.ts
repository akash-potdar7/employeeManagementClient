import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AlertBar } from '../../models/alert';
@Component({
  selector: 'alert-bar',
  templateUrl: './alert-bar.component.html',
  styleUrls: ['./alert-bar.component.scss']
})
export class AlertBarComponent implements OnChanges {

  @Input() alertObj: AlertBar;
  show: boolean;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['alertObj'] && changes['alertObj'].currentValue) {
      this.show = true;
      this.setTimer();
    } 
  }

  setTimer() {
    const timer = (this.alertObj.timer*1000);
    setTimeout(() => {
      this.show = false;
    }, timer);
  }

}
