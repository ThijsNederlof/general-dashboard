import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateStore } from '../store/state.store';
import { JobService } from '../service/job.service';
import { PipelineService } from '../service/pipeline.service';
import { ProjectService } from '../service/project.service';
import { DeploymentService } from '../service/deployment.service';
import { EnvironmentService } from '../service/environment.service';
import { ServerInformationService } from '../service/serverinformation.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [ // singleton services
    StateStore, JobService, PipelineService, ProjectService, DeploymentService, EnvironmentService, ServerInformationService, DeploymentService
  ]
})
export class CoreModule { }
