import { Component, OnInit } from '@angular/core';
import { StateStore } from '../store/state.store';

@Component({
  selector: 'projectbar',
  styleUrls: ['projectbar.component.scss'],
  templateUrl: './projectbar.component.html',

})

export class ProjectBarComponent {

  constructor(public stateStore: StateStore) {
  }

  public deselectProject() {
    this.stateStore.selectedProject = {
      selectedProjectId: 0,
      selectedProjectName: '',
      selectedProjectGroup: ''
    };
  }
}
