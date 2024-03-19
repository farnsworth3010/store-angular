import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../../constants/apiUrl';
import { Brand } from '../../interfaces/brand';
import { FullCategory } from '../../interfaces/categories';
import { NewProductInput, Product } from '../../interfaces/product';
import { ApiPaginatedResponse, ApiResponse } from '../../interfaces/response';
import { FiltersService } from '../filters/filters.service';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  constructor(
    private http: HttpClient,
    private filters: FiltersService
  ) {}

  getProducts(
    page: number,
    limit: number
  ): Observable<ApiPaginatedResponse<Product>> {
    return this.http.get<ApiPaginatedResponse<Product>>(
      apiUrl + `/product/?page=${page}&limit=${limit}`
    );
  }
  getFilteredProducts(
    page: number,
    limit: number
  ): Observable<ApiPaginatedResponse<Product>> {
    console.log(page);
    console.log(limit);
    return this.http.post<ApiPaginatedResponse<Product>>(
      apiUrl + `/product/filter`,
      this.filters.filters.getValue()
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

  getCategories(): Observable<FullCategory[]> {
    return this.http.get<FullCategory[]>(apiUrl + '/categories/');
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
