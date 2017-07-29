import { Component, Input, Output, EventEmitter, TemplateRef  } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

@Component({
  selector: 'fixparts-manager',
  styleUrls: ['./fixparts-manager.scss'],
  templateUrl: './fixparts-manager.html',
})

export class FixpartsManagerComponent {
  @Input() public qurrentFixpartsQueue: any[] = [];
  @Input() public fixpartsAvailToProduce;
  @Output() public addToQueue = new EventEmitter<any>();

  public modalRef: BsModalRef;
  public composingList: any[];

  constructor(private modalService: BsModalService) {}

  public compose = (template: TemplateRef<any>) => {
    this.composingList = [];
    this.modalRef = this.modalService.show(template);
  }

  public addNewRowToComposingList = () => {
    this.composingList.push({
      items: 1,
    });
  }

  public removeComposingItem = (part) => {
    this.composingList = this.composingList.filter((item) => ( item !== part ));
  }

  public setFixpartItem = (item) => {
    item.timeToProduce = this.fixpartsAvailToProduce
      .find((i) => (i.id === item.name)).timeToProduce;
  }

  public addToMainQueue = () => {
    const fixparts = this.composingList.filter((part) => (!!part.name && part.items > 0));
    if (!!fixparts.length) {
      this.addToQueue.emit(fixparts);
    }
    this.modalRef.hide();
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

}
