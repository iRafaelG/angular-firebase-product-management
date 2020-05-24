import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/firestore";

import { IProduct } from "../models/products";
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  productsCollection: AngularFirestoreCollection<IProduct>;
  productsDoc: AngularFirestoreDocument<IProduct>;
  products: Observable<IProduct[]>;

  constructor(public db: AngularFirestore) { 
    /* this.products = db.collection('products').valueChanges(); */
    this.productsCollection = db.collection('products');
    this.products = this.productsCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as IProduct;
        data.id = a.payload.doc.id;
        return data;
      })
    }))
  }

  getProducts() {
    return this.products;
  }

  addProducts(product: IProduct) {
    this.productsCollection.add(product);
  }

  editProduct(product: IProduct) {
    this.productsDoc = this.db.doc(`products/${product.id}`);
    this.productsDoc.update(product);
  }

  deleteProduct(product: IProduct) {
    this.productsDoc = this.db.doc(`products/${product.id}`);
    this.productsDoc.delete();
  }
}
