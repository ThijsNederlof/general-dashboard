import { Component, OnInit, OnDestroy, DoCheck } from '@angular/core';
import { Project } from '../model/project.model';
import { ProjectService } from '../service/project.service';
import { StateStore } from '../store/state.store';
import { Observable } from 'rxjs';

@Component({
  selector: 'projects',
  styleUrls: ['./projects.component.css'],
  templateUrl: './projects.component.html',
})

export class ProjectsComponent implements OnInit, OnDestroy, DoCheck {

  public projects: Project[];

  public selectedproject: Project;

  private projectLoaderEnabled: boolean = false;

  private projectReloader: any;

  constructor(private projectService: ProjectService, public stateStore: StateStore) {
  }

  public onSelectProject(event) {
    this.stateStore.selectedProject = {
      selectedProjectId: event.data.id,
      selectedProjectName: event.data.name,
      selectedProjectGroup: event.data.namespace.kind
    };
  }

  public ngOnInit() {
    if (this.stateStore.receivedBackendInformation && this.stateStore.gitlabInformation.setupCompleted) {
      this.startProjectReloader();
    }
  }

  public ngDoCheck() {
    if (this.stateStore.receivedBackendInformation && this.stateStore.gitlabInformation.setupCompleted && !this.projectLoaderEnabled) {
      this.startProjectReloader();
      this.projectLoaderEnabled = true;
    }
  }

  public ngOnDestroy() {
    if (this.projectReloader.closed) {
      this.projectReloader.unsubscribe();
    }
  }

  private startProjectReloader() {
    this.projectService.getProjects().subscribe(
      (projects) => this.projects = projects);

    this.projectReloader = Observable.interval(20 * 60).subscribe((x) => {
      this.projectService.getProjects().subscribe(
        (projects) => this.projects = projects);
    });
  }
}
