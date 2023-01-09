import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[customEditor]'
})
export class EditorDirective implements OnInit {
  constructor(
    private _renderer: Renderer2,
    private element: ElementRef
  ) {
    this.cretateToolBar();
    this.createParagraph(this.toolBar);
    this.createHeader(this.toolBar);
    this.createImage(this.toolBar);
    this.createBold(this.toolBar);
    this.createItalic(this.toolBar);
    this.createCode(this.toolBar);
  }

  ngOnInit(): void {
    this.clickParagraph(this.paragraphBtn);
    this.clickHeading();
    this.clickImage();
  }

  // ___ Create Element Button Property ___
  toolBar: HTMLDivElement;
  paragraphBtn: HTMLParagraphElement;
  headerBtn: HTMLDivElement;
  imageBtn: HTMLDivElement;
  boldBtn: HTMLButtonElement;
  italicBtn: HTMLButtonElement;
  codeBtn: HTMLButtonElement;

  // ____ Create Realtime Elements ____
  editor: HTMLElement;
  pTag: HTMLParagraphElement;
  hTag: HTMLHeadingElement;
  imageTag: HTMLImageElement;

  // Create Toolbar buttons
  cretateToolBar() {
    this.toolBar = this._renderer.createElement(CustomCreateElements.div)
    this.toolBar.classList.add('container');
    this.toolBar.classList.add('deneme-container');
    this.toolBar.classList.add('mt-5');
    this._renderer.appendChild(this.element.nativeElement, this.toolBar);
  }

  createParagraph(element: HTMLDivElement) {
    this.paragraphBtn = this._renderer.createElement(CustomCreateElements.btn);
    this.paragraphBtn.innerHTML = CustomElementIcon.paragraph;
    this.paragraphBtn.classList.add('custom-btn');

    element.appendChild(this.paragraphBtn);
  }

  createHeader(element: HTMLDivElement) {
    // create header
    this.headerBtn = this._renderer.createElement(CustomCreateElements.div);
    this.headerBtn.classList.add('dropdown-center');

    // div => btn
    let hBtn: HTMLButtonElement = this._renderer.createElement(CustomCreateElements.btn);
    hBtn.type = 'button';
    hBtn.classList.add('custom-btn');
    hBtn.innerHTML = CustomElementIcon.header;
    hBtn.setAttribute('data-bs-toggle', "dropdown");
    hBtn.setAttribute('aria-expanded', "false");

    // div => ul
    let hUl: HTMLUListElement = this._renderer.createElement(CustomCreateElements.ul);
    hUl.classList.add("dropdown-menu");
    hUl.classList.add("p-2");
    hUl.classList.add("mt-2");

    // div => ul => li
    let hLi: HTMLLIElement = this._renderer.createElement(CustomCreateElements.li);

    // div => ul => li => h1-6
    let limit = 6;
    for (let i = 1; i <= limit; i++) {
      let hButton: HTMLButtonElement = this._renderer.createElement(CustomCreateElements.btn);
      hButton.type = 'button';
      hButton.id = 'header' + i.toString();
      hButton.classList.add("custom-btn");
      hButton.classList.add("w-100");
      hButton.innerHTML = CustomElementIcon.header + i;
      hLi.appendChild(hButton);
    }


    element.appendChild(this.headerBtn);
    this.headerBtn.appendChild(hBtn);
    this.headerBtn.appendChild(hUl);
    hUl.appendChild(hLi);
  }

  createImage(element: HTMLDivElement) {
    //  crete div
    this.imageBtn = this._renderer.createElement(CustomCreateElements.div);
    this.imageBtn.classList.add('dropdown-center');

    // div => btn
    let iButton: HTMLButtonElement = this._renderer.createElement(CustomCreateElements.btn);
    iButton.type = CustomCreateElements.btn;
    iButton.innerHTML = CustomElementIcon.image;
    iButton.classList.add("custom-btn");
    iButton.setAttribute('data-bs-toggle', "dropdown");
    iButton.setAttribute('aria-expanded', "false");
    this.imageBtn.appendChild(iButton);

    // div => ul
    let iUl: HTMLUListElement = this._renderer.createElement(CustomCreateElements.div);
    iUl.classList.add("dropdown-menu");
    iUl.classList.add("p-2");
    iUl.classList.add("mt-2");
    this.imageBtn.appendChild(iUl);

    // div => ul => form
    let iForm: HTMLFormElement = this._renderer.createElement(CustomCreateElements.form);
    iForm.classList.add("px-1");
    iForm.classList.add("py-1");
    iForm.setAttribute('formControlName', "iForm");
    iUl.appendChild(iForm);

    // div => ul => form => col-1
    let iCol1: HTMLDivElement = this._renderer.createElement(CustomCreateElements.div);
    iCol1.classList.add('col-12');
    iForm.appendChild(iCol1);

    // div => ul => form => col-1 => div
    let iColDiv1: HTMLDivElement = this._renderer.createElement(CustomCreateElements.div);
    iColDiv1.classList.add("form-floating");
    iColDiv1.classList.add("mb-3");
    iCol1.appendChild(iColDiv1);

    // div => ul => form => col-1 => iColDiv1 => inputUrl
    let iUrl: HTMLInputElement = this._renderer.createElement(CustomCreateElements.input);
    iUrl.type = 'url';
    iUrl.classList.add("form-control");
    iUrl.classList.add("form-control-sm");
    iUrl.id = 'floatingInputUrl';
    iUrl.placeholder = 'https://...';
    iColDiv1.appendChild(iUrl);

    // div => ul => form => col-1 => iColDiv1 => labelUrl
    let labelUrl: HTMLLabelElement = this._renderer.createElement(CustomCreateElements.label);
    labelUrl.innerHTML = 'Url';
    labelUrl.classList.add('form-control-label');
    labelUrl.htmlFor = 'floatingInput';
    iColDiv1.appendChild(labelUrl);

    // div => ul => form => col-2
    let iCol2: HTMLDivElement = this._renderer.createElement(CustomCreateElements.div);
    iCol2.classList.add('col-12');
    iForm.appendChild(iCol2);

    // div => ul => form => col-2 => iColDiv2
    let iColDiv2: HTMLDivElement = this._renderer.createElement(CustomCreateElements.div);
    iColDiv2.classList.add("form-floating");
    iColDiv2.classList.add("mb-3");
    iCol2.appendChild(iColDiv2);

    // div => ul => form => col-2 => iColDiv2 => inputFile
    let inputFile: HTMLInputElement = this._renderer.createElement(CustomCreateElements.input);
    inputFile.type = 'file';
    inputFile.id = 'floatingInputFile';
    inputFile.classList.add("form-control");
    inputFile.classList.add("form-control-sm");
    iColDiv2.appendChild(inputFile);

    // div => ul => form => col-2 => iColDiv2 => labelFile
    let labelFile: HTMLLabelElement = this._renderer.createElement(CustomCreateElements.label);
    labelFile.htmlFor = 'floatingInputFile';
    labelFile.innerHTML = 'File'
    labelFile.classList.add("form-control-label");
    iColDiv2.appendChild(labelFile);

    // div => ul => form => col-3
    let iCol3: HTMLDivElement = this._renderer.createElement(CustomCreateElements.div);
    iCol3.classList.add('col-12');
    iForm.appendChild(iCol3);

    // div => ul => form => col-3 => btn
    let iBtn: HTMLButtonElement = this._renderer.createElement(CustomCreateElements.btn);
    iBtn.type = CustomCreateElements.btn;
    iBtn.id = 'imageAddBtn'
    iBtn.innerHTML = "Ekle";
    iBtn.classList.add("btn");
    iBtn.classList.add("bg-dark-subtle");
    iCol3.appendChild(iBtn);

    element.appendChild(this.imageBtn);

  }

  createBold(element: HTMLDivElement) {
    this.boldBtn = this._renderer.createElement(CustomCreateElements.btn);
    this.boldBtn.innerHTML = CustomElementIcon.bold;
    this.boldBtn.type = CustomCreateElements.btn;
    this.boldBtn.classList.add("custom-btn");

    element.appendChild(this.boldBtn);
  }

  createItalic(element: HTMLDivElement) {
    this.italicBtn = this._renderer.createElement(CustomCreateElements.btn);
    this.italicBtn.innerHTML = CustomElementIcon.italic;
    this.italicBtn.type = CustomCreateElements.btn;
    this.italicBtn.classList.add('custom-btn');

    element.appendChild(this.italicBtn);
  }

  createCode(element: HTMLDivElement) {
    this.codeBtn = this._renderer.createElement(CustomCreateElements.btn);
    this.codeBtn.innerHTML = CustomElementIcon.code;
    this.codeBtn.type = CustomCreateElements.btn;
    this.codeBtn.classList.add("custom-btn");

    element.appendChild(this.codeBtn);
  }

  // Create Editor Tag

  clickParagraph(htmlElement: HTMLElement) {
    htmlElement.addEventListener('click', () => {
      this.editor = document.getElementById(CustomCreateElements.editor);
      // Cretate <p>
      this.pTag = this._renderer.createElement(CustomCreateElements.p);
      this.pTag.innerHTML = 'Paragraf';
      this.pTag.contentEditable = 'true';
      this.pTag.style.padding = '5px';
      this.editor.appendChild(this.pTag);
      console.log(this.pTag);
    });


  }

  clickHeading() {
    this.editor = document.getElementById(CustomCreateElements.editor);
    // Create H1
    let h1: HTMLElement = document.getElementById('header1');
    h1.addEventListener('click', () => {
      this.hTag = this._renderer.createElement('h1');
      this.hTag.innerHTML = 'Başlık',
        this.hTag.contentEditable = 'true';
      this.editor.appendChild(this.hTag);
    });

    // Create H2
    let h2: HTMLElement = document.getElementById('header2');
    h2.addEventListener('click', () => {
      this.hTag = this._renderer.createElement('h2');
      this.hTag.innerHTML = 'Başlık',
        this.hTag.contentEditable = 'true';
      this.editor.appendChild(this.hTag);
    });

    // Create H3
    let h3: HTMLElement = document.getElementById('header3');
    h3.addEventListener('click', () => {
      this.hTag = this._renderer.createElement('h3');
      this.hTag.innerHTML = 'Başlık',
        this.hTag.contentEditable = 'true';
      this.editor.appendChild(this.hTag);
    });

    // Create H4
    let h4: HTMLElement = document.getElementById('header4');
    h4.addEventListener('click', () => {
      this.hTag = this._renderer.createElement('h4');
      this.hTag.innerHTML = 'Başlık',
        this.hTag.contentEditable = 'true';
      this.editor.appendChild(this.hTag);
    });

    // Create H5
    let h5: HTMLElement = document.getElementById('header5');
    h5.addEventListener('click', () => {
      this.hTag = this._renderer.createElement('h5');
      this.hTag.innerHTML = 'Başlık',
        this.hTag.contentEditable = 'true';
      this.editor.appendChild(this.hTag);
    });

    // Create H6
    let h6: HTMLElement = document.getElementById('header6');
    h6.addEventListener('click', () => {
      this.hTag = this._renderer.createElement('h6');
      this.hTag.innerHTML = 'Başlık',
        this.hTag.contentEditable = 'true';
      this.editor.appendChild(this.hTag);
    });

  }

  clickImage() {

    let url: any = document.getElementById('floatingInputUrl');
    let file = document.getElementById('floatingInputFile') as HTMLInputElement;
    file.files[0];
    let imageAddBtn: HTMLElement = document.getElementById('imageAddBtn');

    imageAddBtn.addEventListener('click', () => {
      let urlValue = url.value;
      url.value = urlValue;
      // console.log(url)

      if (url.value) {
        this.imageTag = this._renderer.createElement('img');
        this.imageTag.id = 'urlImage'
        this.imageTag.src = url.value;
        this.imageTag.style.width = '50%';
        this.imageTag.style.height = 'auto';
        this.imageTag.style.display = 'block';
        this.imageTag.style.margin = 'auto';
        this.imageTag.style.borderRadius = '3px';

        this.editor.appendChild(this.imageTag);
      }
      else {

        this.imageTag = this._renderer.createElement('img');
        this.imageTag.id = 'fileImage';
        // this.imageTag.src = file.files[0].name;
        this.imageTag.style.width = '50%';
        this.imageTag.style.height = 'auto';
        this.imageTag.style.display = 'block';
        this.imageTag.style.margin = 'auto';
        this.imageTag.style.borderRadius = '3px';


        // var f: HTMLInputElement | null = document.querySelector('input[type=file]');
        // f.files[0];

        // debugger;
        var reader: FileReader = new FileReader();
        reader.onloadend = () => {
          this.imageTag.src = reader.result as string;
        }

        if (file) {
          reader.readAsDataURL(file.files[0]);
          console.log(this.imageTag);
        }
        else {
          this.imageTag.src = '';
          console.log(this.imageTag);
        }

        this.editor.appendChild(this.imageTag);
      }
    });

  }
}

export enum CustomCreateElements {
  editor = 'editor',
  btn = 'button',
  div = 'div',
  ul = 'ul',
  li = 'li',
  img = 'img',
  form = 'form',
  input = 'input',
  label = 'label',
  p = 'p'
}

export enum CustomElementIcon {
  paragraph = '<i class="ri-file-text-line"></i>',
  header = 'H',
  image = '<i class="ri-image-line"></i>',
  bold = '<strong>B</strong>',
  italic = '<i>I</i>',
  code = '<i class="ri-code-line"></i>'
}
