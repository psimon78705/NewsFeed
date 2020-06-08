import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NewsItemComponent } from './news-item.component';

import { ApiService } from '../api.service';
import { mockNewsItemExternal, mockNewsItemInternal, mockNewsItemIncomplete } from "../api.service.spec";
import { Observable, of } from 'rxjs';

describe('NewsItemComponent', () => {
  let component: NewsItemComponent;
  let fixture: ComponentFixture<NewsItemComponent>;
  let apiService: ApiService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ NewsItemComponent ],
      providers: [ApiService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsItemComponent);
    component = fixture.componentInstance;
    apiService = TestBed.get(ApiService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('should render External story', 
  async(() => {
    spyOn(apiService, "getNewsItem").and.returnValue(of(mockNewsItemExternal));
    fixture.detectChanges();
    expect(apiService.getNewsItem).toHaveBeenCalled();
    expect(component.newsObj).toBeDefined();
    expect(component.newsObj.External).toEqual(true);
  }));

  
  it('should render Internal story', 
  async(() => {
    spyOn(apiService, "getNewsItem").and.returnValue(of(mockNewsItemInternal));
    fixture.detectChanges();
    expect(apiService.getNewsItem).toHaveBeenCalled();
    expect(component.newsObj).toBeDefined();
    expect(component.newsObj.External).toEqual(false);
  }));

  
  it('should not render Incomplete story', 
  async(() => {
    spyOn(apiService, "getNewsItem").and.returnValue(of(mockNewsItemIncomplete));
    fixture.detectChanges();
    expect(apiService.getNewsItem).toHaveBeenCalled();
    expect(component.newsObj).toBeDefined();
    expect(component.newsObj.Loaded).toEqual(false);
  }));
});
