import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  store(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }

  get(key: string) {
    return localStorage.getItem(key) ?? 'null';
  }

  dateFormat(key: string) {
    return moment(key).format('DD-MM-YYYY')

  }

  dateUnformat(data: string) {
    return moment(data, 'DD-MM-YYYY').toDate()
  }
}
