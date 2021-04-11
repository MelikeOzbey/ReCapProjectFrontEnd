import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  addLocalStorage(key:string,value:any)
  {
    localStorage.setItem(key,value);
  }

  getLocalStorage(key:string)
  {
    return localStorage.getItem(key);
  }

  removeFromLocalStrorage(key:string)
  {
    localStorage.removeItem(key);
  }
}
