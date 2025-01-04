import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { share } from 'rxjs/operators';
import { GeneralResponse } from '../../shared/response';
class Observer {
  next!: Function;
  error!: Function;
  complete!: Function;
}

@Injectable({
  providedIn: 'root'
})
export class BaseAPIService {

  constructor(public http: HttpClient) {
  }

  getByModel<T>(url: string,options:object): Observable<T> {

      let response = this.http.get<GeneralResponse<T>>(url,options).pipe(share());
  
      return Observable.create((observer: Observer) => {
        response.subscribe((response:any) => {
   
            observer.next(response);
          
          observer.complete();
        }, (error:any) => {

          observer.error(new HttpErrorResponse( error));
                });
      });
     
    }
    getById<T>(url: string): Observable<T> {

      let response = this.http.get<GeneralResponse<T>>(url).pipe(share());
  
      return Observable.create((observer: Observer) => {
        response.subscribe((response:any) => {
    
            observer.next(response);
          
          observer.complete();
        }, ((error:any) => {
          observer.error(new HttpErrorResponse( error));
        }));
      });
  
    }
 
  post<T>(url: string, body: object): Observable<T> {
    
    let response = this.http
      .post<GeneralResponse<T>>(url, body).pipe(share());

    return Observable.create((observer: Observer) => {
      response.subscribe(res => {
          observer.next(res);
        observer.complete();
      }, error => {
        observer.error(new HttpErrorResponse( error));
      });
    });

  }
  put<T>(url: string, body: object): Observable<T> {
    
    let response = this.http
      .put<GeneralResponse<T>>(url, body).pipe(share());

    return Observable.create((observer: Observer) => {
      response.subscribe(res => {
      
        observer.next(res);
        observer.complete();
      }, error => {

        observer.error(
         new HttpErrorResponse( error)
           );

      });
    });

  }
  
deleteByModel<T>(url: string,options:object): Observable<T> {
    
    let response = this.http
      .delete<GeneralResponse<T>>(url,options).pipe(share());

    return Observable.create((observer: Observer) => {
      response.subscribe(res => {
      
          observer.next(res);
        observer.complete();
      }, error => {
        
        observer.error( new HttpErrorResponse( error) );
       });
    });

  }
}
