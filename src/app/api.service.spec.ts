import { TestBed, inject } from '@angular/core/testing';
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpEvent, HttpEventType } from "@angular/common/http"

import { ApiService } from './api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from 'src/environments/environment';

export const mockNewsItemExternal ={ id: 1, by: 'test User', time: 123, url: "http://fakelink.com", title: "Fake External News Title"};

export const mockNewsItemInternal = { id: 2, by: 'test User', time: 123, text: "fake story text", title: "Fake Internal News Title"};

export const mockNewsItemIncomplete = {};

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get News Items', 
    inject(
      [HttpTestingController, ApiService],
      (httpMock: HttpTestingController, apiService: ApiService) => {
        const mockNewsItems = [1,2,3,4];
        apiService.getNews().subscribe((event: HttpEvent<any>) =>{
          switch (event.type){
            case HttpEventType.Response:
              expect(event.body).toEqual(mockNewsItems);
          }
        });

        const req = httpMock.expectOne(apiService.newsUrl);

        expect(req.cancelled).toBeFalsy();
        expect(req.request.responseType).toEqual('json');
        req.flush(mockNewsItems);
        httpMock.verify();
      }
    )
  );

  it('should Get a specific NewsItem', 
    inject(
      [HttpTestingController, ApiService],
      (httpMock: HttpTestingController, apiService: ApiService) => {
        const id = 1
        apiService.getNewsItem(1).subscribe((event: HttpEvent<any>) =>{
          switch (event.type){
            case HttpEventType.Response:
              expect(event.body).toEqual(mockNewsItemExternal);
          }
        });

        const req = httpMock.expectOne(apiService.newsItemUrl(id));

        expect(req.cancelled).toBeFalsy();
        expect(req.request.responseType).toEqual('json');
        req.flush(mockNewsItemExternal);
        httpMock.verify();
      }
    )
  );
});
