import { Component, Input } from '@angular/core';

@Component({
  selector: 'fixparts-manager',
  styles: [],
  templateUrl: './fixparts-manager.html',
})

export class FixpartsManagerComponent {
  @Input() public qurrentFixpartsQueue: any[] = [];
}
