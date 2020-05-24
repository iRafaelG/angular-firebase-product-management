import { Component, OnInit } from '@angular/core';
import { ProductsService } from "../../services/products.service";
import { IProduct } from 'src/app/models/products';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products = [];
  editableProduct: IProduct;
  editForm = false;

  constructor(public productService: ProductsService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  deleteProduct(product){
    if(confirm('Are you sure you want to delete?')) {
      this.productService.deleteProduct(product);
    }
  }

  editProduct(product){
    this.editableProduct = product;
    this.editForm = !this.editForm;
  }

  updateProduct(product) {
    this.productService.editProduct(product);
    this.editableProduct = {} as IProduct;
    this.editForm = !this.editForm;
  }



}
