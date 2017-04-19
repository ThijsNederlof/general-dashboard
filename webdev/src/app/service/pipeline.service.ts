import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { StateStore } from '../store/state.store';
import { Pipeline } from '../model/pipeline.model';

@Injectable()
export class PipelineService {

  constructor(private http: Http, private stateStore: StateStore) {
  }

  public getPipelines(id: number, page: number, perPage: number): Observable<Pipeline[]> {
    let headers: Headers = new Headers();
    headers.append('PRIVATE-TOKEN', this.stateStore.gitlabInformation.privateToken);
    let options = new RequestOptions({headers});

    return this.http.get(this.stateStore.gitlabInformation.gitBaseUrl + this.stateStore.gitlabInformation.api + '/'
      + this.stateStore.selectedProject.selectedProjectId + '/' + 'pipelines?page=' + page + '&per_page=' + perPage, options)
      .map((data) => {
        let body = data.json();
        this.stateStore.pipelineamount = +data.headers.get('x-total');
        return body || {};
      })
      .catch(this.handleError);
  }

  public cancelPipeline(pipelineId: number) {
    console.log('hello1!');
    let headers: Headers = new Headers();
    headers.append('PRIVATE-TOKEN', this.stateStore.gitlabInformation.privateToken);
    let options = new RequestOptions({headers});

    return this.http.post(this.stateStore.gitlabInformation.gitBaseUrl + this.stateStore.gitlabInformation.api + '/' +
      this.stateStore.selectedProject.selectedProjectId + '/pipelines/' + pipelineId + '/cancel', '', options)
      .catch(this.handleError);
  }

  public retryPipeline(pipelineId: number) {
    console.log('hello1!');
    let headers: Headers = new Headers();
    headers.append('PRIVATE-TOKEN', this.stateStore.gitlabInformation.privateToken);
    let options = new RequestOptions({headers});

    return this.http.post(this.stateStore.gitlabInformation.gitBaseUrl + this.stateStore.gitlabInformation.api + '/' +
      this.stateStore.selectedProject.selectedProjectId + '/pipelines/' + pipelineId + '/retry', '', options)
      .catch(this.handleError);
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
