import { Component } from '@angular/core';
import { ServerInformationService } from '../service/serverinformation.service';

@Component({
  selector: 'setup',
  styleUrls: ['setup.component.css'],
  templateUrl: 'setup.component.html',
})

export class SetupComponent {

  public fieldsInvalid: boolean = true;

  public gitlabUrlError: boolean = false;
  public gitlabPrivateTokenError: boolean = false;

  public gitlabSetupUrl: string = 'http://';
  public gitlabSetupPrivateToken: string = '';

  constructor(private serverInformationService: ServerInformationService) {
  }

  public saveSettings() {
    this.serverInformationService.saveSetupSettings(this.gitlabSetupUrl, this.gitlabSetupPrivateToken, '/api/v4/projects', false).subscribe(
      (response) => {
        if (response._body === 'OK') {
          location.reload();
        }
      });
  }

  public testGitlabSetupUrl() {
    this.serverInformationService.testSetupSettings(this.gitlabSetupUrl, this.gitlabSetupPrivateToken).subscribe(
      (response) => {
        if (response[0].name !== '') {
          this.gitlabUrlError = false;
          this.gitlabPrivateTokenError = false;
          this.fieldsInvalid = false;
        }
      },
      (error) => {
        if (error.statusText === '') {
          this.gitlabUrlError = true;
          this.gitlabPrivateTokenError = false;
        } else if (error.statusText === 'Unauthorized') {
          this.gitlabUrlError = false;
          this.gitlabPrivateTokenError = true;
        }
      }
    );
  }
}
