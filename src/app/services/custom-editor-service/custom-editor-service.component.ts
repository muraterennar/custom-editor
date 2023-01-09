import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'custom-editor',
  templateUrl: './custom-editor-service.component.html',
  styleUrls: ['./custom-editor-service.component.css']
})
export class CustomEditorServiceComponent implements OnInit {

  @ViewChild('editor')
  private editor: ElementRef
  constructor(
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {

    let code = document.getElementById('code');
    code.setAttribute('contenteditable', "true");
  }

  selectedText() {
    const slected = window.getSelection().toString();
    console.log(slected);
  }
}
