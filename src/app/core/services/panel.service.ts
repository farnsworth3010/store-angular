import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from '../constants/apiUrl';
import { AdminResponse, UsersResponse } from '../interfaces/user';
import { ResponseShortBlogPost } from '../interfaces/blogPost';

@Injectable({
  providedIn: 'root',
})
export class PanelService {
  constructor(private http: HttpClient) {}
  getAdmins(): Observable<AdminResponse> {
    return this.http.get<AdminResponse>(apiUrl + '/panel/admins');
  }
  getUsers(): Observable<UsersResponse> {
    return this.http.get<UsersResponse>(apiUrl + '/panel/users');
  }
  getBlogs(): Observable<ResponseShortBlogPost> {
    return this.http.get<ResponseShortBlogPost>(apiUrl + '/panel/blogs');
  }
  setRole({ id, role_id }: { id: number; role_id: number }): Observable<void> {
    return this.http.post<void>(apiUrl + '/panel/setRole', {
      id,
      role_id,
    });
  }
}
