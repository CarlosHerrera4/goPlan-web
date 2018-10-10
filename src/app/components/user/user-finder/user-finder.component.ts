import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-finder',
  templateUrl: './user-finder.component.html'
})
export class UserFinderComponent  {
  @Output() changePattern: EventEmitter<string> = new EventEmitter();
  
  constructor() { }

  onChangePattern(pattern: string) {
    console.log('b');
    this.changePattern.emit(pattern);
  }

}
