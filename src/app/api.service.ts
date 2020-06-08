import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpErrorResponse } from "@angular/common/http"
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public newsUrl: string =`https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty`;  
  public newsItemUrl = (id: Number) => `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`;

  constructor(private httpClient: HttpClient) { }

  public getNews(){
    return this.httpClient.get(this.newsUrl).pipe(retry(2), catchError(this.logError));
  }

  public getNewsItem(id: Number){    
    return this.httpClient.get(this.newsItemUrl(id)).pipe(retry(2), catchError(this.logError));
  }

  public logError(error: HttpErrorResponse){    
    return throwError(error);
  }
}
