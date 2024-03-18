export interface Filters {
  brand_id?: number;
  title?: string;
  price?: 1 | 2; // 1 low - high / 2 high - low
}

export interface FilterParams {
  name: string;
  value: number | string;
}
