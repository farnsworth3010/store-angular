import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../../constants/apiUrl';
import { BlogPost } from '../../interfaces/blogPost';
import {
  ApiPaginatedResponse,
  ApiPostResponse,
} from '../../interfaces/response';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private http: HttpClient) {}

  getBlog(
    page: number,
    limit: number
  ): Observable<ApiPaginatedResponse<BlogPost>> {
    return this.http.get<ApiPaginatedResponse<BlogPost>>(
      apiUrl + `/blog/?page=${page}&limit=${limit}`
    );
  }

  createBlog(title: string, text: string): Observable<ApiPostResponse> {
    return this.http.post<ApiPostResponse>(apiUrl + `/blog/`, {
      title,
      text,
    });
  }

  deleteBlog(id: number): Observable<void> {
    return this.http.delete<void>(apiUrl + `/blog/${id}`);
  }

  updateBlog(id: number, title: string, text: string) {
    return this.http.patch<void>(apiUrl + `/blog/`, {
      id,
      title,
      text,
    });
  }
}
