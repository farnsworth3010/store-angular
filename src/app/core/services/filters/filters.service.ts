import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FilterParams, Filters } from '../../interfaces/filters';

@Injectable({
  providedIn: 'root',
})
export class FiltersService {
  filters = new BehaviorSubject<Filters>({});
  filters$ = this.filters.asObservable();
  setFilter({ name, value }: FilterParams) {
    this.filters.next({ ...this.filters.getValue(), [name]: value });
  }
  constructor() {}
}
