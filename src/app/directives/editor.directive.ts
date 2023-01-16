import { HttpErrorResponse } from '@angular/common/http';
import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ImageModel, ImageUploadService } from '../services/image-upload.service';

@Directive({
  selector: '[customEditor]'
})
export class EditorDirective implements OnInit {
  constructor(
    private _renderer: Renderer2,
    private element: ElementRef,
    public imageUploadService: ImageUploadService
  ) {
    this.cretateToolBar();
    this.createParagraph(this.toolBar);
    this.createHeader(this.toolBar);
    this.createImage(this.toolBar);
    this.createBold(this.toolBar);
    this.createItalic(this.toolBar);
    this.createCode(this.toolBar);
    this.createLink(this.toolBar);
  }

  ngOnInit(): void {
    this.clickParagraph(this.paragraphBtn);
    this.clickHeading();
    this.clickImage();
    this.clickCode(this.codeBtn);
    this.clickBold(this.boldBtn);
    this.clickItalic(this.italicBtn);
    this.clickLink();
    this.createBlog(CustomCreateElements.createBlogBtn);
    this.contentEditableDiv();
  }

  IsDataSuccessful: boolean = false;

  // ___ Create Element Button Property ___
  toolBar: HTMLDivElement;
  paragraphBtn: HTMLParagraphElement;
  headerBtn: HTMLDivElement;
  imageBtn: HTMLDivElement;
  boldBtn: HTMLButtonElement;
  italicBtn: HTMLButtonElement;
  codeBtn: HTMLButtonElement;
  linkDiv: HTMLButtonElement;

  // ____ Create Realtime Elements ____
  editor: HTMLElement;
  pTag: HTMLParagraphElement;
  hTag: HTMLHeadingElement;
  imageTag: HTMLImageElement;
  codeTag: HTMLOListElement;
  boldTag: HTMLElement;
  linkTag: HTMLLinkElement;

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
    // create header div
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

    // div => ul => form => > col-2 => iColDiv2 => fileName ınput
    let filenameInput: HTMLInputElement = this._renderer.createElement(CustomCreateElements.input);
    filenameInput.type = 'text';
    filenameInput.placeholder = 'Seçtiğiniz resme isim verin !';
    filenameInput.style.marginBottom = '10px';
    filenameInput.style.marginTop = '10px';
    filenameInput.style.fontSize = '0.7rem';
    filenameInput.classList.add('form-control');
    filenameInput.id = "imageName";
    iColDiv2.appendChild(filenameInput);

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

  createLink(element: HTMLDivElement) {

    this.linkDiv = this._renderer.createElement(CustomCreateElements.div);
    this.linkDiv.classList.add('dropdown-center');

    // div => btn
    let lButton: HTMLButtonElement = this._renderer.createElement(CustomCreateElements.btn);
    lButton.type = CustomCreateElements.btn;
    lButton.innerHTML = CustomElementIcon.link;
    lButton.classList.add("custom-btn");
    lButton.setAttribute('data-bs-toggle', "dropdown");
    lButton.setAttribute('aria-expanded', "false");
    this.linkDiv.appendChild(lButton);

    // div => ul
    let lUl: HTMLUListElement = this._renderer.createElement(CustomCreateElements.div);
    lUl.classList.add("dropdown-menu");
    lUl.classList.add("p-2");
    lUl.classList.add("mt-2");
    this.linkDiv.appendChild(lUl);

    // div => ul => form
    let lForm: HTMLFormElement = this._renderer.createElement(CustomCreateElements.form);
    lForm.classList.add("px-1");
    lForm.classList.add("py-1");
    lForm.setAttribute('formControlName', "lForm");
    lUl.appendChild(lForm);

    // div => ul => form => col-1
    let lCol: HTMLDivElement = this._renderer.createElement(CustomCreateElements.div);
    lCol.classList.add('col-12');
    lForm.appendChild(lCol);

    // div => ul => form => col-1 => div
    let lColDiv: HTMLDivElement = this._renderer.createElement(CustomCreateElements.div);
    lColDiv.classList.add("form-floating");
    lColDiv.classList.add("mb-3");
    lCol.appendChild(lColDiv);

    // div => ul => form => col-1 => iColDiv1 => inputUrl
    let lUrl: HTMLInputElement = this._renderer.createElement(CustomCreateElements.input);
    lUrl.type = 'url';
    lUrl.classList.add("form-control");
    lUrl.classList.add("form-control-sm");
    lUrl.id = 'link_input';
    lUrl.placeholder = 'https://...';
    lColDiv.appendChild(lUrl);

    // div => ul => form => col-1 => iColDiv1 => labelUrl
    let labelUrl: HTMLLabelElement = this._renderer.createElement(CustomCreateElements.label);
    labelUrl.innerHTML = 'Url';
    labelUrl.classList.add('form-control-label');
    labelUrl.htmlFor = 'floatingInput';
    lColDiv.appendChild(labelUrl);

    // div => ul => btn
    let lBtn: HTMLButtonElement = this._renderer.createElement('button');
    lBtn.type = CustomCreateElements.btn;
    lBtn.classList.add('btn');
    lBtn.classList.add('mt-2');
    lBtn.classList.add('mb-1');
    lBtn.classList.add('btn-secondary');
    lBtn.innerHTML = 'Ekle';
    lBtn.id = 'link_btn';

    lForm.appendChild(lBtn);

    element.appendChild(this.linkDiv);
  }

  // ------------------------- Create Editor Tag -------------------------

  contentEditableDiv() {
    this.editor.contentEditable = 'true';
  }

  clickParagraph(htmlElement: HTMLElement) {
    htmlElement.addEventListener('click', () => {
      this.editor = document.getElementById(CustomCreateElements.editor);
      // Cretate <p>
      this.pTag = this._renderer.createElement(CustomCreateElements.p);
      this.pTag.id = 'toolParagraph'
      this.pTag.innerHTML = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.";
      // this.pTag.contentEditable = 'true';
      // this.pTag.style.padding = '5px';
      this.editor.appendChild(this.pTag);
    });


  }

  //  create headers h1, h2...
  clickHeading() {
    this.editor = document.getElementById(CustomCreateElements.editor);
    // Create H1
    let h1: HTMLElement = document.getElementById('header1');
    h1.addEventListener('click', () => {
      this.hTag = this._renderer.createElement('h1');
      this.hTag.innerHTML = 'Başlık';
      // this.hTag.contentEditable = 'true';
      this.editor.appendChild(this.hTag);
    });

    // Create H2
    let h2: HTMLElement = document.getElementById('header2');
    h2.addEventListener('click', () => {
      this.hTag = this._renderer.createElement('h2');
      this.hTag.innerHTML = 'Başlık',
        // this.hTag.contentEditable = 'true';
        this.editor.appendChild(this.hTag);
    });

    // Create H3
    let h3: HTMLElement = document.getElementById('header3');
    h3.addEventListener('click', () => {
      this.hTag = this._renderer.createElement('h3');
      this.hTag.innerHTML = 'Başlık',
        // this.hTag.contentEditable = 'true';
        this.editor.appendChild(this.hTag);
    });

    // Create H4
    let h4: HTMLElement = document.getElementById('header4');
    h4.addEventListener('click', () => {
      this.hTag = this._renderer.createElement('h4');
      this.hTag.innerHTML = 'Başlık',
        // this.hTag.contentEditable = 'true';
        this.editor.appendChild(this.hTag);
    });

    // Create H5
    let h5: HTMLElement = document.getElementById('header5');
    h5.addEventListener('click', () => {
      this.hTag = this._renderer.createElement('h5');
      this.hTag.innerHTML = 'Başlık',
        // this.hTag.contentEditable = 'true';
        this.editor.appendChild(this.hTag);
    });

    // Create H6
    let h6: HTMLElement = document.getElementById('header6');
    h6.addEventListener('click', () => {
      this.hTag = this._renderer.createElement('h6');
      this.hTag.innerHTML = 'Başlık',
        // this.hTag.contentEditable = 'true';
        this.editor.appendChild(this.hTag);
    });

  }

  // create image ang Image Upload and Reader
  clickImage() {

    let imageurl: any = document.getElementById('floatingInputUrl');
    let fileInput = document.getElementById('floatingInputFile') as HTMLInputElement;
    let imageAddBtn: HTMLElement = document.getElementById('imageAddBtn');

    imageAddBtn.addEventListener('click', () => {
      let urlValue = imageurl.value;

      if (urlValue) {
        this.imageTag = this._renderer.createElement('img');
        this.imageTag.id = 'urlImage'
        this.imageTag.src = urlValue;
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
        this.imageTag.style.width = '50%';
        this.imageTag.style.height = 'auto';
        this.imageTag.style.display = 'block';
        this.imageTag.style.margin = 'auto';
        this.imageTag.style.borderRadius = '3px';

        let imageNameInput = document.getElementById("imageName") as HTMLInputElement;
        let imagename: string = imageNameInput.value

        // inputdan gelen file ismi ile File göndererek server'a kayıt ediyorum.
        this.imageUploadService.fileUpload(fileInput.files[0], imagename).subscribe(() => {

          // kayıt edilen veriyi burada link olarak çağırıyorum imaga'ın src sine yazdırıyorum.
          this.imageUploadService.getFileByImageName(imagename).subscribe((response) => {
            this.imageTag.src = response.imageUrl;
          }, (errorResponse: HttpErrorResponse) => {
            console.log('throw Error Message', `${errorResponse.error}`);
          });

        }, (errorResponse: HttpErrorResponse) => {
          this.IsDataSuccessful = false;
          console.log(errorResponse);
        });

        // this.imageUploadService.imageReader(this.imageTag, fileInput);

        this.editor.appendChild(this.imageTag);
      }
    });

  }

  // create code text
  clickCode(htmlElement: HTMLElement) {
    htmlElement.addEventListener('click', () => {
      let codeOl: HTMLOListElement = this._renderer.createElement(CustomCreateElements.ol);
      codeOl.id = 'code';
      // codeOl.contentEditable = 'true';
      codeOl.classList.add('codeList');
      this.editor.appendChild(codeOl);

      // ol => code
      let code: HTMLElement = this._renderer.createElement(CustomCreateElements.code);
      code.classList.add('code');
      code.classList.add('p-2');
      codeOl.appendChild(code);

      // ol => code => li
      let codeLi: HTMLLIElement = this._renderer.createElement(CustomCreateElements.li);
      codeLi.classList.add('list');
      codeLi.childElementCount
      code.appendChild(codeLi);
    })
  }

  // create bold text
  clickBold(htmlElement: HTMLElement) {
    htmlElement.addEventListener('click', () => {
      const selectedText: string = window.getSelection().toString();
      let p: HTMLElement = document.getElementById('toolParagraph');
      let result: string = p.innerHTML.replace(selectedText, `<b>${selectedText}</b>`);
      p.innerHTML = result;
    });
  }

  // create italic text
  clickItalic(htmlElement: HTMLElement) {
    htmlElement.addEventListener('click', () => {
      const selectedText: string = window.getSelection().toString();
      let p: HTMLElement = document.getElementById('toolParagraph');
      let result: string = p.innerHTML.replace(selectedText, `<i>${selectedText}</i>`);
      p.innerHTML = result;
    })
  }

  clickLink() {
    let linkBtn: HTMLElement = document.getElementById('link_btn');
    linkBtn.addEventListener('click', () => {

      const selectedText: string = window.getSelection().toString();
      let p: HTMLElement = document.getElementById('toolParagraph');
      let linkInput = document.getElementById('link_input') as HTMLInputElement;

      let result: string = p.innerHTML.replace(selectedText, `<a href="${linkInput.value}" target="_blank">${selectedText}</a>`);
      p.innerHTML = result;

      console.log(result);
    })
  }

  // ********************** Create Blog **********************
  createBlog(id: CustomCreateElements | string) {
    let createBlogElement: HTMLElement = document.getElementById(id);
    let testText: HTMLElement = document.getElementById('testText');
    createBlogElement.addEventListener('click', () => {
      testText.contentEditable = 'false';
      testText.innerHTML = this.editor.innerHTML;
      console.log(createBlogElement);
      console.log(this.editor.innerHTML);
    });

  }
}

export enum CustomCreateElements {
  editor = 'editor',
  btn = 'button',
  div = 'div',
  ul = 'ul',
  ol = 'ol',
  li = 'li',
  img = 'img',
  form = 'form',
  input = 'input',
  label = 'label',
  p = 'p',
  code = 'code',
  link = 'a',
  createBlogBtn = 'createBlog'
}

export enum CustomElementIcon {
  paragraph = '<i class="ri-file-text-line"></i>',
  header = 'H',
  image = '<i class="ri-image-line"></i>',
  bold = '<strong>B</strong>',
  italic = '<i>I</i>',
  code = '<i class="ri-code-line"></i>',
  link = '<i class="ri-links-line"></i>'
}