import { Component, OnDestroy, OnInit, DoCheck } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../model/environment.model';
import { EnvironmentService } from '../service/environment.service';
import { Router } from '@angular/router';
import { StateStore } from '../store/state.store';

@Component({
  selector: 'environment-overview',
  styleUrls: ['environment.overview.component.css'],
  templateUrl: 'environment.overview.component.html',
})

export class EnvironmentOverviewComponent implements OnInit, OnDestroy, DoCheck {

  public environments: Environment[];
  private environmentReloader: any;

  constructor(private environmentService: EnvironmentService, private router: Router, private stateStore: StateStore) {

  }

  public ngDoCheck() {
    if (this.stateStore.selectedProject.selectedProjectName === '') {
      this.environmentService.getEnvironments().subscribe(
        (environment) => {
          this.environments = environment;
        }).unsubscribe();

      this.router.navigate(['./projects']);
    }
  }

  public ngOnInit() {
    this.environmentReloader = Observable.interval(20 * 60).subscribe((x) => {
      this.environmentService.getEnvironments().subscribe(
        (environment) => {
          this.environments = environment;
        });
    });

    this.environmentService.getEnvironments().subscribe(
      (environment) => {
        this.environments = environment;
      });
  }

  public ngOnDestroy() {
    this.environmentReloader.unsubscribe();
  }

  private trackEnvironment(index, environment) {
    return environment ? environment.id : undefined;
  }
}
