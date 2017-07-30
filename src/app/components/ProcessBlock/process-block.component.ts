import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'process-block',
  styles: [],
  templateUrl: './process-block.html',
})

export class ProcessBlockComponent {
  public conveyorStatus: boolean = false;

  public get deteilInWork() {
    return 'detail#1';
  }

  public get RemainingTime() {
    return 230;
  }
}
