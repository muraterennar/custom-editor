import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CustomHttpClientService } from '../custom-http-client.service';

@Component({
  selector: 'custom-editor',
  templateUrl: './custom-editor-service.component.html',
  styleUrls: ['./custom-editor-service.component.css']
})
export class CustomEditorServiceComponent implements OnInit {

  @ViewChild('editor')
  private editor: ElementRef
  constructor(
    private renderer: Renderer2,
    private httpClientService: CustomHttpClientService
  ) { }

  testText: string = "Lorem Ipsum is simply <b>dummy</b> text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

  ngOnInit(): void {
  }
}
