export interface Category {
  ID: number;
  name: string;
}

export interface FullCategory {
  category_id: number;
  category_name: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  Id: number;
  Name: string;
  CategoryID: number;
}
