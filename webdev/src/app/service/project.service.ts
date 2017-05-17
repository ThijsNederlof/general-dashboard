import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Project } from '../model/project.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { StateStore } from '../store/state.store';

@Injectable()
export class ProjectService {

  constructor(private http: Http, private stateStore: StateStore) {
  }

  public getProjects(): Observable<Project[]> {

    let headers: Headers = new Headers();
    headers.append('PRIVATE-TOKEN', this.stateStore.gitlabInformation.privateToken);
    let options = new RequestOptions({headers});

    return this.http.get(this.stateStore.gitlabInformation.gitBaseUrl + this.stateStore.gitlabInformation.api + '?per_page=12000', options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getProjectById(id: number): Observable<Project> {

    let headers: Headers = new Headers();
    headers.append('PRIVATE-TOKEN', this.stateStore.gitlabInformation.privateToken);
    let options = new RequestOptions({headers});

    return this.http.get(this.stateStore.gitlabInformation.gitBaseUrl + this.stateStore.gitlabInformation.api + '/' + id, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: Response | any) {
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
