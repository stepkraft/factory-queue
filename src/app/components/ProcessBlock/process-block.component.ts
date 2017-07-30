import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs/Rx';

@Component({
  selector: 'process-block',
  styles: [`
    .detail-image {
      height: 150px;
    }
  `],
  templateUrl: './process-block.html',
})

export class ProcessBlockComponent implements OnInit, OnChanges {
  @Input() public currentFixpartsQueue: any[];
  @Input() public detailInWork: any;
  @Output() public addDetailToWork = new EventEmitter();
  @Output() public detailAcomplished = new EventEmitter();

  public conveyorStatus: boolean = false;
  public conveyorStatus$: Subject<boolean> = new Subject();

  private _conveyorStatus = new BehaviorSubject(this.conveyorStatus);
  private _currentFixpartsQueue = new BehaviorSubject(this.currentFixpartsQueue);
  private _detailInWork = new BehaviorSubject(this.detailInWork);

  private _detailProducingTimeSpent: number = 0;
  private _conveyorBusy: boolean = false;

  public ngOnInit() {
    this.conveyorStatus$.subscribe((v) => {
      this._conveyorStatus.next(v);

      if (this._conveyorBusy) {
        this.startProducing();
      }
    });

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
      this._detailProducingTimeSpent = 0;
      this.startProducing();
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

  public get progressPercentage() {
    if (this.detailInWork && this.detailInWork.timeToProduce) {
      return ((this._detailProducingTimeSpent * 100) /
      (this.detailInWork.timeToProduce * this.detailInWork.items ));
    }
    return 0;
  }

  private startProducing = () => {
    this._conveyorBusy = true;
    Observable.interval(50)
      .takeWhile(() => (
        this.conveyorStatus && this.detailInWork && this.detailInWork.timeToProduce &&
        this.detailInWork.items * this.detailInWork.timeToProduce >= this._detailProducingTimeSpent
      ))
      .subscribe(() => {
        this._detailProducingTimeSpent += 50;
        if (this.detailInWork && this._detailProducingTimeSpent >=
          this.detailInWork.items * this.detailInWork.timeToProduce
        ) {
          this.finishDetailProducing();
        }
      });
  }

  private getDetailFromQueueToWork = () => {
    if (this.currentFixpartsQueue.length && !this.detailInWork &&
      this.conveyorStatus && !this._conveyorBusy
    ) {
      this.addDetailToWork.emit();
    }
  }

  private finishDetailProducing = () => {
    setTimeout(() => {
      this.detailAcomplished.emit();
      this._conveyorBusy = false;
    }, 0);
  }
}
