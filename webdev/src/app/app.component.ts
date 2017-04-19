import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { StateStore } from './store/state.store';
import { ServerInformationService } from './service/serverinformation.service';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    'app.component.scss'
  ],
  template: `
<div id="menubar">
    <div id="logo">
    General Dashboard
    </div>
    <nav>
    <div id="projectsbutton">

      <a [routerLink]=" ['./projects'] " routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
         <i class="fa fa-microchip" aria-hidden="true"></i> PROJECTS
      </a>
     </div>

    <!--<div id="settingsbutton">-->
      <!--<a [routerLink]=" ['./about'] "-->
         <!--routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">-->
        <!--<i class="fa fa-cogs" aria-hidden="true"></i> SETTINGS-->
      <!--</a>-->
     <!--</div>-->
    </nav>
</div>
<projectbar></projectbar>

<div id="setup">
<setup *ngIf="stateStore.receivedBackendInformation && !stateStore.gitlabInformation.setupCompleted"></setup>
</div>

  <main>
    <router-outlet></router-outlet>
  </main>

  `
})

export class AppComponent implements OnInit {

  constructor(public stateStore: StateStore, private serverInformationService: ServerInformationService) { }

  public ngOnInit() {
    this.serverInformationService.getServerInformation().subscribe(
      (receivedInformation) => {
        this.stateStore.gitlabInformation = receivedInformation;
        this.stateStore.receivedBackendInformation = true;
      });
  }
}
