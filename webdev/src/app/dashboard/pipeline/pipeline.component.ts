import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Job } from '../../model/job.model';
import { JobService } from '../../service/job.service';
import { StateStore } from '../../store/state.store';
import { Observable } from 'rxjs';
import { PipelineService } from '../../service/pipeline.service';

@Component({
  selector: 'pipeline',
  styleUrls: ['pipeline.component.css'],
  templateUrl: 'pipeline.component.html',
})

export class PipelineComponent implements OnInit, OnDestroy {

  @Input()
  public id: number;

  @Input()
  public sha: string;

  @Input()
  public ref: string;

  @Input()
  public status: string;

  @Input()
  public user: string;

  public jobs: Job[];

  private jobReloader: any;

  constructor(private jobService: JobService, private stateStore: StateStore, private pipelineService: PipelineService) {
  }

  public trackJob(index, job) {
    return job ? job.id : undefined;
  }

  public cancelPipeline() {
    this.pipelineService.cancelPipeline(this.id).subscribe(
      (message) => {
        console.log(message);
      });
  }

  public retryPipeline() {
    this.pipelineService.retryPipeline(this.id).subscribe(
      (message) => {
        console.log(message);
      });
  }

  public getPipelineColor() {
    if (this.status === 'failed') {
      return '#FC9185';
    } else if (this.status === 'success') {
      return '#57d777';
    } else if (this.status === 'skipped') {
      return '#c2c5c1';
    } else if (this.status === 'running') {
      return '#b9e6fc';
    } else if (this.status === 'pending') {
      return '#ffcf2f';
    } else if (this.status === 'canceled') {
      return '#5e7476';
    }

  }

  public getPipelineDetailsColor() {
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
    } else if (this.status === 'canceled') {
      return '#464646';
    }
  }

  public ngOnInit() {
    if (this.stateStore.gitlabInformation.gitBaseUrl !== '') {
      this.jobReloader = Observable.interval(20 * 60).subscribe((x) => {
        this.jobService.getJobs(this.id).subscribe(
          (job) => this.jobs = job);
      });
    }

    if (this.stateStore.gitlabInformation.gitBaseUrl !== '') {
      this.jobService.getJobs(this.id).subscribe(
        (job) => this.jobs = job);
    }
  };

  public ngOnDestroy() {
    this.jobReloader.unsubscribe();
  }
}
