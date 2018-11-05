import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'paid-marker',
  templateUrl: 'paid-marker.html'
})
export class PaidMarkerComponent {
  @Input('isPaid') isPaid = false;

  @Output('onTogglePaid') onTogglePaid = new EventEmitter<boolean>();


  constructor() {
  }

  onPaid(event: Event){
    event.stopPropagation();
    this.isPaid = !this.isPaid;
    this.onTogglePaid.emit(this.isPaid);
  }
}
