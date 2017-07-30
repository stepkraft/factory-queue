import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs/Rx';

@Component({
  selector: 'process-block',
  styles: [],
  templateUrl: './process-block.html',
})

export class ProcessBlockComponent implements OnInit, OnChanges {
  @Input() public currentFixpartsQueue: any[];
  @Input() public detailInWork: any;
  @Output() public addDetailToWork = new EventEmitter();

  public conveyorStatus: boolean = false;
  public conveyorStatus$: Subject<boolean> = new Subject();

  private _conveyorStatus = new BehaviorSubject(this.conveyorStatus);
  private _currentFixpartsQueue = new BehaviorSubject(this.currentFixpartsQueue);
  private _detailInWork = new BehaviorSubject(this.detailInWork);

  public ngOnInit() {
    this.conveyorStatus$.subscribe((v) => this._conveyorStatus.next(v) );

    Observable.merge(
      this._conveyorStatus,
      this._currentFixpartsQueue,
      this._detailInWork,
    ).subscribe(() => {
      this.getDetailFromQueueToWork();
    });
  }

  public ngOnChanges(changes) {
    if (changes.currentFixpartsQueue && changes.currentFixpartsQueue.currentValue) {
      this._currentFixpartsQueue.next(this.currentFixpartsQueue);
    }

    if (changes.detailInWork && changes.detailInWork.currentValue) {
      this._detailInWork.next(this.detailInWork);
    }
  }

  public changeStatus = (status) => {
    this.conveyorStatus$.next(status);
  }

  public get detailName() {
    if (this.detailInWork && this.detailInWork.name) {
      return `${this.detailInWork.name} (${this.detailInWork.items} items)`;
    }
    return '-';
  }

  public get RemainingTime() {
    if (this.detailInWork && this.detailInWork.timeToProduce) {
      return this.detailInWork.timeToProduce;
    }
    return '-';
  }

  private getDetailFromQueueToWork = () => {
    if (this.currentFixpartsQueue.length && !this.detailInWork && this.conveyorStatus) {
      this.addDetailToWork.emit();
    }
  }
}
