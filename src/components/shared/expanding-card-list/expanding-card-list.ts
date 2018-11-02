import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'expanding-card-list',
  templateUrl: 'expanding-card-list.html'
})
export class ExpandingCardListComponent {

  @Input('showCheckbox') showCheckbox = false;
  @Input('showLink') showLink = true;
  @Input('toggleBody') toggleBody = false;
  @Input('thead') thead:any;
  @Input('tbody') tbody:any;
  @Input('title') title:string;
  @Input('opt') opt:boolean;
  @Output('url') url = new EventEmitter<string>();
  @Output('onToggleCheckbox') onToggleCheckbox = new EventEmitter<{isPaid:boolean,index:number}>();

  constructor() {
  }

  ngOnChanges(){
    console.log("BODY:",this.tbody)
    console.log("BODY:",this.thead)

  }

  onToggle(row:any){
    row.toggle = !row.toggle;
  }

  onViewDetail(ev:Event,url:string){
    ev.stopPropagation();
    console.log("View More: ",url)
    this.url.emit(url);
  }

  onPaidChanged(ev,index:number){
    console.log("Paid Changed: ",ev.value);
    this.onToggleCheckbox.emit({
      isPaid:ev.value,
      index
    });
  }

}
