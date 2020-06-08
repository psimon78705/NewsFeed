import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { NewsObject } from 'shared/news-object';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.css']
})
export class NewsItemComponent implements OnInit {
 newsObj: NewsObject;
 expanded: Boolean = false;

 @Input() id: Number;
  constructor(private apiService: ApiService) { 
    this.newsObj = new NewsObject();
  }

  ngOnInit(): void {
    this.apiService.getNewsItem(this.id).subscribe((data : {})=>{   
      this.newsObj.LoadData(data);         
    });
  }

  public openFullStory(){
    if(this.newsObj.External){
      window.open(this.newsObj.url, '_blank');
    } else {
      this.expanded = !this.expanded;
    }
  }

}
