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

  public id: number;

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

  public findProject() {
    this.projectService.getProjectById(this.id).subscribe(
      (project) => {
        console.log(project);
        this.stateStore.selectedProject = {
          selectedProjectId: project.id,
          selectedProjectName: project.name_with_namespace,
          selectedProjectGroup: ""
        };
      });
  }

  private startProjectReloader() {
    this.projectService.getProjects().subscribe(
      (projects) => this.projects = projects);

    this.projectReloader = Observable.interval(80 * 60).subscribe((x) => {
      this.projectService.getProjects().subscribe(
        (projects) => this.projects = projects);
    });
  }
}
