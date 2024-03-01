import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../../constants/apiUrl';
import { Brand } from '../../interfaces/brand';
import { Category } from '../../interfaces/categories';
import { NewProductInput, Product } from '../../interfaces/product';
import { ApiPaginatedResponse, ApiResponse } from '../../interfaces/response';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  constructor(private http: HttpClient) {}

  getProducts(
    page: number,
    limit: number
  ): Observable<ApiPaginatedResponse<Product>> {
    return this.http.get<ApiPaginatedResponse<Product>>(
      apiUrl + `/product/?page=${page}&limit=${limit}`
    );
  }
  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(apiUrl + '/product/' + id);
  }

  getLatestProduct(): Observable<ApiPaginatedResponse<Product>> {
    return this.http.get<ApiPaginatedResponse<Product>>(
      apiUrl + '/product/latest'
    );
  }

  deleteProduct(ID: number): Observable<void> {
    return this.http.delete<void>(apiUrl + '/product/' + ID);
  }

  createProduct(product: NewProductInput): Observable<void> {
    return this.http.post<void>(apiUrl + '/product/', product);
  }

  getBrands(): Observable<ApiResponse<Brand>> {
    return this.http.get<ApiResponse<Brand>>(apiUrl + `/product/brands`);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(apiUrl + '/categories/');
  }

  getProductsByName(name: string): Observable<ApiPaginatedResponse<Product>> {
    return this.http.post<ApiPaginatedResponse<Product>>(
      apiUrl + '/product/search',
      {
        name,
      }
    );
  }

  updateProduct(product: Product): Observable<void> {
    return this.http.patch<void>(apiUrl + '/product/', product);
  }
}
