import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Brand } from '../../interfaces/brand';
import { apiUrl } from '../../constants/apiUrl';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../interfaces/response';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  constructor(private http: HttpClient) {}
  getBrands(): Observable<ApiResponse<Brand>> {
    return this.http.get<ApiResponse<Brand>>(apiUrl + '/brand/');
  }
  deleteBrand(id: number): Observable<void> {
    return this.http.delete<void>(apiUrl + '/brand/' + id);
  }
  editBrand(id: number, name: string): Observable<void> {
    return this.http.patch<void>(apiUrl + '/brand/' + id, {
      id,
      name,
    });
  }
  createBrand(name: string): Observable<{ id: number }> {
    return this.http.post<{ id: number }>(apiUrl + '/brand/', {
      name,
    });
  }
}
