import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavigationItem } from '../../../models/interfaces';

@Component({
  selector: 'date-navigator',
  templateUrl: 'date-navigator.html'
})
export class DateNavigatorComponent {

  @Input('title') title: string;
  @Input('previous') previous: NavigationItem;
  @Input('next') next: NavigationItem;
  @Output('prevNext') prevNext = new EventEmitter<string>();

  constructor() {
  }

  onPrevious(){
    const url = this.previous.url.replace('/app.php','');
    this.prevNext.emit(url);
  }
  onNext(){
    const url = this.next.url.replace('/app.php','');
    this.prevNext.emit(url);
  }

}
