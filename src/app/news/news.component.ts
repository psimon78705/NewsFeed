import { Component, OnInit } from '@angular/core';
import { ApiService } from "../api.service";
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  newsItems = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getNews().subscribe((data: any[]) =>{
      this.newsItems = data;
    });
  }

}
