import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

@Component({
  selector: 'fixparts-manager',
  styleUrls: ['./fixparts-manager.scss'],
  templateUrl: './fixparts-manager.html',
})

export class FixpartsManagerComponent {
  @Input() public currentFixpartsQueue: any[] = [];
  @Input() public fixpartsAvailToProduce;
  @Output() public addToQueue = new EventEmitter<any[]>();
  @Output() public resetQueue = new EventEmitter<any[]>();

  public modalRef: BsModalRef;
  public composingList: any[];
  public sortableQueue: any[];

  constructor(private modalService: BsModalService) {}

  ngOnChanges(changes) {
    console.log('changes: %O', changes);
  }

  public compose = (template: TemplateRef<any>) => {
    this.composingList = [];
    this.modalRef = this.modalService.show(template);
  }

  public addNewRowToComposingList = () => {
    this.composingList.push({
      id: this.guidgen(),
      items: 1,
    });
  }

  public removeComposingItem = (part) => {
    this.composingList = this.composingList.filter((item) => ( item !== part ));
  }

  public setFixpartItem = (item) => {
    const part = this.fixpartsAvailToProduce.find((i) => (i.id === item.partid));
    [item.timeToProduce, item.name] = [part.timeToProduce, part.text];
  }

  public addToMainQueue = () => {
    const fixparts = this.composingList.filter((part) => (!!part.name && part.items > 0));
    if (!!fixparts.length) {
      this.addToQueue.emit(fixparts);
    }
    this.modalRef.hide();
  }

  public updateFixpartsQueue = (sortedQueue) => {
    const reworkedQueue = sortedQueue.map(({id}) => {
      const founded = this.currentFixpartsQueue.find((item) => (item.id === id));
      return founded ? founded : null;
    }).filter(Boolean);

    this.resetQueue.emit(reworkedQueue);
  }

  public get composingListItemsCount() {
    return this.composingList.reduce((prev, curr) => {
      return prev + (+curr.items || 0);
    }, 0);
  }

  public get composingListOveralTime() {
    return this.composingList.reduce((prev, curr) => {
      return prev + ((+curr.items * curr.timeToProduce ) || 0);
    }, 0);
  }

  private guidgen = () => {
    const id = () => {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    };
    return id() + id() + '-' + id() + '-' + id() + '-' + id() + '-' + id() + id() + id();
  }
}
