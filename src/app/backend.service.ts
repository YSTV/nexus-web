import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { TypedJSON } from 'typedjson-npm/src/typed-json';

import { environment } from '../environments/environment';

import 'rxjs/add/operator/toPromise';

import { Stream } from './stream';

@Injectable()
export class BackendService {

  constructor(private http: Http) {}

  private endpointURL(endpoint: string): string {
    return environment.apiURLBase + endpoint;
  }

  getStreams(): Promise<Stream[]> {
    return this.http.get(this.endpointURL('streams'))
                         .toPromise()
                         .then(response => {
                           let streams = response.json().map(stream => TypedJSON.parse(stream, Stream));
                           return streams as Stream[];
                         })
                         .catch(this.handleError);
  }

  createStream(s: Stream): Promise<Stream> {
    return this.http.post(this.endpointURL('streams'), JSON.stringify(s))
                          .toPromise()
                          .then(response => TypedJSON.parse(response.text(), Stream))
                          .catch(this.handleError);
  }

  deleteStream(s: Stream): Promise<boolean> {
    return this.http.delete(this.endpointURL('streams/' + s.id))
                            .toPromise()
                            .then(() => false)
                            .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
