import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getCategories() { 
    return this.db.list('/categories',
    ref => ref.orderByChild('name')).snapshotChanges().pipe(
      map(actions => 
        actions.map(a => ({ key: a.key, ...a.payload.val() }))
      )
    );
}
}