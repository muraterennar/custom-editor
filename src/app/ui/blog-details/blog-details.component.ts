import { Component, OnInit } from '@angular/core';
import { CustomHttpClientService } from 'src/app/services/custom-http-client.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {

  constructor(
    private httpClient:CustomHttpClientService
  ) { }

  ngOnInit(): void {
  }

}
