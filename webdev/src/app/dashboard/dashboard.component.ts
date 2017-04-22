import { Component, OnInit, ViewChild, OnDestroy, DoCheck } from '@angular/core';
import { Pipeline } from '../model/pipeline.model';
import { PipelineService } from '../service/pipeline.service';
import { Observable } from 'rxjs';
import { Paginator } from 'primeng/components/paginator/paginator';
import { StateStore } from '../store/state.store';
import { Router } from '@angular/router';

@Component({
  selector: 'dashboard',
  styleUrls: ['dashboard.component.scss'],
  templateUrl: 'dashboard.component.html',
})

export class DashboardComponent implements OnInit, DoCheck, OnDestroy {

  @ViewChild(Paginator)
  public paginator: Paginator;

  public pipelines: Pipeline[];

  public paginatorSettings: {} = {
    first: 1,
    rows: 5,
    totalRecords: 0,
    rowsPerPageOptions: [5, 10, 15, 20]
  };

  private currentpage: number = 1;

  private pipelineReloader: any;

  constructor(private pipelineService: PipelineService, public stateStore: StateStore, private router: Router) {
  }

  public paginate(event) {
    this.currentpage = event.page + 1;
  }

  public trackPipeline(index, pipeline) {
    return pipeline ? pipeline.id : undefined;
  }

  public ngOnInit() {
    this.pipelineReloader = Observable.interval(50 * 60).subscribe((x) => {
      this.pipelineService.getPipelines(this.stateStore.selectedProject.selectedProjectId, this.currentpage, this.paginator.rows).subscribe(
        (pipeline) => {
          this.pipelines = pipeline;
        });
    });

    if (this.stateStore.gitlabInformation.gitBaseUrl !== '') {
      this.pipelineService.getPipelines(this.stateStore.selectedProject.selectedProjectId, this.currentpage, this.paginator.rows).subscribe(
        (pipeline) => {
          this.pipelines = pipeline;
        });
    }
  }

  public ngDoCheck() {
    if (this.stateStore.selectedProject.selectedProjectName === '') {
      this.router.navigate(['./projects']);
    }
  }

  public ngOnDestroy() {
    this.pipelineReloader.unsubscribe();
  }
}
