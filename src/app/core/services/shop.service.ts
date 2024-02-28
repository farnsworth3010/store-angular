import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from '../constants/apiUrl';
import { Observable } from 'rxjs';
import { BlogPost, ResponseNewBlogPost } from '../interfaces/blogPost';
import { Product, ProductInput } from '../interfaces/product';
import {
  JWTToken,
  SignInData,
  SignUpData,
  SignUpResponse,
} from '../interfaces/user';
import { Category } from '../interfaces/categories';
import { Brand } from '../interfaces/brand';
import { ApiPaginatedResponse, ApiResponse } from '../interfaces/response';

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
  createProduct(product: ProductInput): Observable<void> {
    return this.http.post<void>(apiUrl + '/product/', product);
  }
  getBlog(
    page: number,
    limit: number
  ): Observable<ApiPaginatedResponse<BlogPost>> {
    return this.http.get<ApiPaginatedResponse<BlogPost>>(
      apiUrl + `/blog/?page=${page}&limit=${limit}`
    );
  }
  getBrands(): Observable<ApiResponse<Brand>> {
    return this.http.get<ApiResponse<Brand>>(apiUrl + `/product/brands`);
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

  signIn(signInData: SignInData): Observable<JWTToken> {
    return this.http.post<JWTToken>(apiUrl + `/auth/sign-in`, {
      ...signInData,
    });
  }
  signUp(signUpData: SignUpData): Observable<SignUpResponse> {
    return this.http.post<SignUpResponse>(apiUrl + `/auth/sign-up`, {
      ...signUpData,
    });
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
}
