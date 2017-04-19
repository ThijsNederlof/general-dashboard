import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule, ApplicationRef } from '@angular/core';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';
import { NoContentComponent } from './no-content';
import { ButtonModule, DataTableModule, SharedModule } from 'primeng/primeng';
import '../styles/styles.scss';
import '../styles/headings.css';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectBarComponent } from './projectbar/projectbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { StateStore } from './store/state.store';
import { PipelineComponent } from './dashboard/pipeline/pipeline.component';
import { JobService } from './service/job.service';
import { JobComponent } from './dashboard/pipeline/job/job.component';
import { NgPipesModule } from 'ngx-pipes';
import { MomentModule } from 'angular2-moment';
import { OrderByPipe } from './pipe/orderby.pipe';
import { PaginatorModule } from 'primeng/components/paginator/paginator';
import { CoreModule } from './core/core.module';
import { EnvironmentOverviewComponent } from './environment-overview/environment.overview.component';
import { EnvironmentComponent } from './environment-overview/environment/environment.component';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { DialogModule } from 'primeng/components/dialog/dialog';
import { SetupComponent } from './setup/setup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';

const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    ProjectsComponent,
    NoContentComponent,
    ProjectBarComponent,
    DashboardComponent,
    AnalyticsComponent,
    PipelineComponent,
    JobComponent,
    SetupComponent,
    EnvironmentComponent,
    EnvironmentOverviewComponent,
    OrderByPipe
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    ButtonModule,
    TooltipModule,
    DataTableModule,
    SharedModule,
    NgPipesModule,
    MomentModule,
    PaginatorModule,
    CoreModule,
    DialogModule,
    InputTextModule,
    RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules })
  ],
  providers: [
    ENV_PROVIDERS,
    APP_PROVIDERS,
  ]
})

export class AppModule {

  constructor(
    public appRef: ApplicationRef,
    public appState: AppState, stateStore: StateStore, jobservice: JobService
  ) {}

  public hmrOnInit(store: StoreType) {
    if (!store || !store.state) {
      return;
    }
    console.log('HMR store', JSON.stringify(store, null, 2));
    // set state
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  public hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
    // save state
    const state = this.appState._state;
    store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues  = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  public hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}
