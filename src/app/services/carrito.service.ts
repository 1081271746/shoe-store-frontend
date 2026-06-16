import { Injectable } from '@angular/core';
import { Producto } from '../models/producto';
import { CarritoItem } from '../models/carrito-item';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  carrito: CarritoItem[] = [];

  agregarProducto(producto: Producto) {

    const itemExistente =
      this.carrito.find(
        item => item.producto.id === producto.id
      );

    if (itemExistente) {

      itemExistente.cantidad++;

    } else {

      this.carrito.push({
        producto,
        cantidad: 1
      });
    }
  }

  obtenerCantidad(): number {

    return this.carrito.reduce(
      (total, item) =>
        total + item.cantidad,
      0
    );
  }

  obtenerCarrito() {

    return this.carrito;
  }

}