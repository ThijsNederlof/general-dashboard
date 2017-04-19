import { Routes } from '@angular/router';
import { NoContentComponent } from './no-content';
import { ProjectsComponent } from './projects/projects.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { EnvironmentOverviewComponent } from './environment-overview/environment.overview.component';

export const ROUTES: Routes = [
  { path: '',      component: ProjectsComponent },
  { path: 'projects',  component: ProjectsComponent },
  { path: 'dashboard',    component: DashboardComponent },
  { path: 'environments',      component: EnvironmentOverviewComponent },
  { path: 'analytics',    component: AnalyticsComponent },
  { path: '**',    component: NoContentComponent },
];
