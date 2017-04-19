import { Component, Input } from '@angular/core';
import { StateStore } from '../../../store/state.store';

@Component({
  selector: 'job',
  styleUrls: ['job.component.css'],
  templateUrl: 'job.component.html',

})
export class JobComponent {

  @Input()
  public id: number;

  @Input()
  public status: string;

  @Input()
  public stage: string;

  @Input()
  public name: string;

  @Input()
  public started_at: Date;

  @Input()
  public finished_at: Date;

  @Input()
  public created_at: Date;

  @Input()
  public runner: {
    id: number,
    description: string
  };

  @Input()
  public user: {
    name: string;
    avatar_url: string
  };

  @Input()
  public artifacts_file: {
    filename: string;
    size: number;
  };

  constructor(public stateStore: StateStore) {
  };

  public getJobStatusColor() {
    if (this.status === 'failed') {
      return '#fc6756';
    } else if (this.status === 'success') {
      return '#3cb648';
    } else if (this.status === 'skipped') {
      return '#8e9289';
    } else if (this.status === 'running') {
      return '#8fc3d6';
    } else if (this.status === 'pending') {
      return '#d69d27';
    } else if (this.status === 'created') {
      return '#d6be8d';
    } else if (this.status === 'canceled') {
      return '#464646';
    }
  }
}
