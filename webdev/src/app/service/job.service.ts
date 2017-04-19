import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { StateStore } from '../store/state.store';
import { Job } from '../model/job.model';

@Injectable()
export class JobService {

  constructor(private http: Http, private stateStore: StateStore) { }

  public getJobs(pipelineId: number): Observable<Job[]> {
    let headers: Headers = new Headers();
    headers.append('PRIVATE-TOKEN', this.stateStore.gitlabInformation.privateToken);
    let options = new RequestOptions({headers});
    return this.http.get(this.stateStore.gitlabInformation.gitBaseUrl + this.stateStore.gitlabInformation.api + '/' +
      this.stateStore.selectedProject.selectedProjectId + '/' + 'pipelines' + '/' + pipelineId + '/' + 'jobs', options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }
}
