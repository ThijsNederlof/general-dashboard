import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Deployment } from '../../model/deployment.model';
import { DeploymentService } from '../../service/deployment.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'environment',
  styleUrls: ['environment.component.css'],
  templateUrl: 'environment.component.html',
})

export class EnvironmentComponent implements OnInit, OnDestroy {

  @Input()
  public id: number;

  @Input()
  public name: string;

  @Input()
  public external_url: string;

  public deployments: Deployment[];

  private deploymentReloader: any;

  constructor(private deploymentService: DeploymentService) {
  }

  public ngOnInit() {
    this.deploymentReloader = Observable.interval(20 * 60).subscribe((x) => {
      this.deploymentService.getDeployments().subscribe(
        (deployments) => {
          this.deployments = [];
          for (let deployment of deployments) {
            if (deployment.environment.name === this.name) {
              this.deployments.push(deployment);
            }
          }
        });
    });

    this.deploymentService.getDeployments().subscribe(
      (deployments) => {
        this.deployments = [];
        for (let deployment of deployments) {
          if (deployment.environment.name === this.name) {
            this.deployments.push(deployment);
          }
        }
      });
  }

  public ngOnDestroy() {
    this.deploymentReloader.unsubscribe();
  }
}
