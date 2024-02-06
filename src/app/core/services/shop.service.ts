import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from '../constants/apiUrl';
import { Observable } from 'rxjs';
import { FeaturedProduct } from '../interfaces/featuredProduct';
import { ResponseBlogPost, ResponseNewBlogPost } from '../interfaces/blogPost';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  constructor(private http: HttpClient) {}
  getProducts(): Observable<FeaturedProduct[]> {
    return this.http.get<FeaturedProduct[]>(apiUrl + '/products');
  }

  getPosts(page: number, limit: number): Observable<ResponseBlogPost> {
    return this.http.get<ResponseBlogPost>(
      apiUrl + `/blog/?page=${page}&limit=${limit}`
    );
  }
  addPost(title: string, text: string): Observable<ResponseNewBlogPost> {
    return this.http.post<ResponseNewBlogPost>(apiUrl + `/blog/`, {
      title,
      text,
    });
  }
}
