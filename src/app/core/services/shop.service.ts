import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from '../constants/apiUrl';
import { Observable } from 'rxjs';
import { ResponseBlogPost, ResponseNewBlogPost } from '../interfaces/blogPost';
import { Product, ResponseProduct } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  constructor(private http: HttpClient) {}
  getProducts(page: number, limit: number): Observable<ResponseProduct> {
    return this.http.get<ResponseProduct>(
      apiUrl + `/product/?page=${page}&limit=${limit}`
    );
  }
  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(apiUrl + '/product/' + id);
  }
  getLatestProduct(): Observable<ResponseProduct> {
    return this.http.get<ResponseProduct>(apiUrl + '/product/latest');
  }

  getBlog(page: number, limit: number): Observable<ResponseBlogPost> {
    return this.http.get<ResponseBlogPost>(
      apiUrl + `/blog/?page=${page}&limit=${limit}`
    );
  }
  createBlog(title: string, text: string): Observable<ResponseNewBlogPost> {
    return this.http.post<ResponseNewBlogPost>(apiUrl + `/blog/`, {
      title,
      text,
    });
  }
  deleteBlog(id: number): Observable<void> {
    return this.http.delete<void>(apiUrl + `/blog/${id}`);
  }
}
