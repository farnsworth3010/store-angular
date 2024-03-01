export interface ApiResponse<T> {
  data: T[];
}

export interface ApiPaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
}

export interface ApiPostResponse {
  id: number;
}
