import { Component } from '@angular/core';
import { ProjectService } from '../service/project.service';

@Component({
  selector: 'analytics',
  styleUrls: ['analytics.component.css'],
  templateUrl: './analytics.component.html',
})

export class AnalyticsComponent {

  constructor(private projectService: ProjectService) {
  }

}
