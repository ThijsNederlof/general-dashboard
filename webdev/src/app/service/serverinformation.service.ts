import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StateStore } from '../store/state.store';
import { Headers, RequestOptions, Response, Http } from '@angular/http';
import { ServerInformation } from '../model/serverinformation.model';

@Injectable()
export class ServerInformationService {

  constructor(private stateStore: StateStore, private http: Http) {}

  public getServerInformation(): Observable<ServerInformation> {
    return this.http.get('http://' + window.location.hostname + ':8080' + '/serverinformation')
      .map(this.extractData)
      .catch(this.handleError);
  }

  public testSetupSettings(setupGitlabUrl: string, setupGitlabPrivateToken: string): Observable<any> {
    let headers: Headers = new Headers();
    headers.append('PRIVATE-TOKEN', setupGitlabPrivateToken);
    let options = new RequestOptions({headers});
    return this.http.get(setupGitlabUrl + '/api/v4/' + 'users', options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public saveSetupSettings(gitlabSetupUrl: string, gitlabSetupPrivateToken: string, api: string, setupCompleted: boolean) {
    let data: {gitlabSetupUrl, gitlabSetupPrivateToken, api, setupCompleted} = {
      gitlabSetupUrl,
      gitlabSetupPrivateToken,
      api,
      setupCompleted
    };

    return this.http.post('http://' + window.location.hostname + ':8080' + '/setup', JSON.stringify(data))
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private handleError (error: Response | any) {
    let errMsg: string = error;
    return Observable.throw(errMsg);
  }
}
