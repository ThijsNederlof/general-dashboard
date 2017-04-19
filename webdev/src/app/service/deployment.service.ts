import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Deployment } from '../model/deployment.model';
import { StateStore } from '../store/state.store';
import { Headers, RequestOptions, Response, Http } from '@angular/http';

@Injectable()
export class DeploymentService {

  constructor(private stateStore: StateStore, private http: Http) {}

  public getDeployments(): Observable<Deployment[]> {
    let headers: Headers = new Headers();
    headers.append('PRIVATE-TOKEN', this.stateStore.gitlabInformation.privateToken);
    let options = new RequestOptions({headers});
    return this.http.get(this.stateStore.gitlabInformation.gitBaseUrl + this.stateStore.gitlabInformation.api + '/'
      + this.stateStore.selectedProject.selectedProjectId + '/' + 'deployments', options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    // console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
