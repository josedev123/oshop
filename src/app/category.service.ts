import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class CategoryService {

  constructor(private af: AngularFireDatabase) { }

  getCategories() : Observable<any>{
    return this.af.list('/categories').valueChanges();
}
}
