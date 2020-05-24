import { Component, OnInit } from '@angular/core';
import { ProductsService } from "../../services/products.service";
import { IProduct } from 'src/app/models/products';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.css']
})
export class ProductsFormComponent implements OnInit {

  product = {} as IProduct;

  constructor(public productService: ProductsService) { }

  ngOnInit() {
  }

  addProduct() {
    if(this.product.name !== "" && this.product.description !== "" && this.product.price !== 0) {
      this.productService.addProducts(this.product);
      this.product = {} as IProduct;
    }
    
  }

}
