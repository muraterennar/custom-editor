import { Injectable } from '@angular/core';
import { CustomHttpClientService } from './custom-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(
    public customHttpService: CustomHttpClientService
  ) { }

  getAll() {
    return this.customHttpService.get<BlogDetailModel[]>({
      controller: "blogs",
      action: "getllbtdto"
    });
  }

  getbyid(id: number) {
    return this.customHttpService.get({
      controller: "blogs",
      action: "getbyid"
    }, id);
  }

  blogPost(data: Partial<BlogModel>) {
    return this.customHttpService.post<BlogModel>({
      controller: "Blogs",
      action: "add"
    }, {
      blogDescription: data.blogDescription,
      blogCategoryId: data.blogCategoryId
    });
  }



  /* #region Blog Category Service */
  getByCategoryIdForCategoryName(id: number) {
    return this.customHttpService.get({
      controller: "BlogCategories",
      action: `getbyid/${id}`
    });
  }

  getAllByCategory() {
    return this.customHttpService.get<BlogCategory[]>({
      controller: "BlogCategories"
    });
  }


  /* #endregion */



}

export interface BlogModel {
  id: number;
  blogCategoryId: number;
  blogDescription: string;
}

export interface BlogCategory {
  id: number;
  categoryName: string;
}

export interface BlogDetailModel {
  id: number;
  categoryName: string;
  blogDescription: string;
}

export interface BlogCategoryService {
  id: number;
  categoryName: string;
}
