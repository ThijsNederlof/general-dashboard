import { Injectable } from '@angular/core';

@Injectable()
export class StateStore {

  public selectedProject: {selectedProjectId: number, selectedProjectName: string,
    selectedProjectGroup: string} = {
    selectedProjectId: 0,
    selectedProjectName: '',
    selectedProjectGroup: ''
  };

  public receivedBackendInformation: boolean = false;

  public gitlabInformation: {privateToken: string, gitBaseUrl: string, api: string, setupCompleted: boolean} = {
    privateToken: '',
    gitBaseUrl: '',
    api: '',
    setupCompleted: false,
  };

  public pipelineamount: number = 0;
}
