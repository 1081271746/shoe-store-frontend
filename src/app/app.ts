import {
  Component,
  OnInit,
  inject,
  ElementRef,
  ViewChild
} from '@angular/core';

import { CommonModule }
from '@angular/common';

import { Producto }
from './models/producto';

import { ProductoService }
from './services/producto.service';

import { CarritoService }
from './services/carrito.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  productos: Producto[] = [];

  cantidadCarrito = 0;

  carritoAbierto = false;

  @ViewChild('productosSection')
  productosSection!: ElementRef;

  private productoService =
    inject(ProductoService);

  carritoService =
    inject(CarritoService);

  ngOnInit(): void {

    this.productoService
      .obtenerProductos()
      .subscribe(data => {

        console.log(data);

        this.productos = data;
      });
  }

  irAProductos() {

    this.productosSection
      .nativeElement
      .scrollIntoView({
        behavior: 'smooth'
      });
  }

  agregarAlCarrito(
    producto: Producto
  ) {

    this.carritoService
      .agregarProducto(producto);

    this.cantidadCarrito =
      this.carritoService
      .obtenerCantidad();
  }

  abrirCarrito() {

    this.carritoAbierto =
      !this.carritoAbierto;
  }

  calcularTotal(): number {

    return this.carritoService
      .obtenerCarrito()
      .reduce(
        (total, item) =>
          total +
          (
            item.producto.precio
            * item.cantidad
          ),
        0
      );
  }

  comprarPorWhatsapp() {

    const numero =
      '573164485328';

    const carrito =
      this.carritoService
      .obtenerCarrito();

    let mensaje =
      'Hola, quiero pedir:%0A%0A';

    carrito.forEach(item => {

      mensaje +=
        `• ${item.producto.nombre}
x${item.cantidad}%0A`;
    });

    mensaje +=
      `%0A💰 Total:
$${this.calcularTotal()}`;

    const url =
      `https://wa.me/${numero}?text=${mensaje}`;

    window.open(
      url,
      '_blank'
    );
  }

}