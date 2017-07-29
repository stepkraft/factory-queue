import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'sortable-parts',
  styleUrls: ['./sortable-parts.scss'],
  templateUrl: './sortable-parts.html',
})

export class SortablePartsComponent implements OnChanges {

  @Input() public originQueue: any[];
  @Output() public reworkQuery = new EventEmitter<any[]>();

  public sortableList: any[];
  public sortableOptions: any;

  constructor() {
    this.sortableOptions = {
      onUpdate: (event: any) => {
        this.reworkQuery.emit(this.sortableList);
      }
    };
  }

  public ngOnChanges(changes) {
    if (changes.originQueue && changes.originQueue.currentValue) {
      this.reSortQueue();
    }
  }

  public remove = (item) => {
    this.sortableList = this.sortableList.filter((i) => (i !== item));
    this.reworkQuery.emit(this.sortableList);
  }

  private reSortQueue = () => {
    this.sortableList = this.originQueue.map(
      (item, idx) => ({
          id: item.id,
          name: `${item.name} (${item.items} items)`,
      })
    );
  }
}
