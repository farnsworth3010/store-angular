import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../../constants/apiUrl';
import { BlogPost } from '../../interfaces/blogPost';
import { Admin, ShortUser } from '../../interfaces/user';
import { ApiPaginatedResponse, ApiResponse } from '../../interfaces/response';

@Injectable({
  providedIn: 'root',
})
export class PanelService {
  constructor(private http: HttpClient) {}

  getAdmins(): Observable<ApiResponse<Admin>> {
    return this.http.get<ApiResponse<Admin>>(apiUrl + '/panel/admins');
  }

  getUsers(): Observable<ApiResponse<ShortUser>> {
    return this.http.get<ApiResponse<ShortUser>>(apiUrl + '/panel/users');
  }

  getBlogs(): Observable<ApiPaginatedResponse<BlogPost>> {
    return this.http.get<ApiPaginatedResponse<BlogPost>>(
      apiUrl + '/panel/blogs'
    );
  }

  setRole({ id, role_id }: { id: number; role_id: number }): Observable<void> {
    return this.http.post<void>(apiUrl + '/panel/setRole', {
      id,
      role_id,
    });
  }
}
