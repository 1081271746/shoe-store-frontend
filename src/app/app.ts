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

  filtroGenero = '';

  filtroMarca = '';
  modalAbierto = false;

productoSeleccionado: Producto | null = null;

tallaSeleccionada = '';

  

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

  obtenerProductosFiltrados(): Producto[] {

    return this.productos.filter(producto => {

      const coincideGenero =
        !this.filtroGenero ||
        producto.genero === this.filtroGenero;

      return coincideGenero;

    });

  }

  agregarAlCarrito(
  producto: Producto
) {

  const talla =
    this.tallaSeleccionada || 'Sin talla';
if (!this.tallaSeleccionada) {

  alert(
    'Debes seleccionar una talla primero.'
  );

  return;

}

  this.carritoService
    .agregarProducto(
      producto,
      talla
    );

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
  'SHOE STORE\n\n' +

  'Hola,\n\n' +

  'Quiero realizar el siguiente pedido:\n\n';

  carrito.forEach(item => {

  mensaje +=
    `Producto: ${item.producto.nombre}\n`;

  mensaje +=
    `Talla: ${item.talla}\n`;

  mensaje +=
    `Cantidad: ${item.cantidad}\n`;

  mensaje +=
    `Precio: $${item.producto.precio}\n\n`;

});



    mensaje +=

  '━━━━━━━━━━━━━━\n\n' +

  `TOTAL: $${this.calcularTotal()}\n\n` +

  'Quedo atento a disponibilidad y métodos de pago.\n\n' +

  'Gracias.';

const mensajeCodificado =
  encodeURIComponent(mensaje);
  
    const url =
  `https://wa.me/${numero}?text=${mensajeCodificado}`;

    window.open(
      url,
      '_blank'
    );
  }

 abrirProducto(
  producto: Producto
) {

  console.log('ABRIENDO MODAL');
  console.log(producto);

  this.productoSeleccionado =
    producto;

  this.tallaSeleccionada = '';

  this.modalAbierto = true;

}

cerrarProducto() {

  

  this.modalAbierto = false;

  this.productoSeleccionado = null;
  
}

seleccionarTalla(
  talla: string
) {

  this.tallaSeleccionada =
    talla;

}
  probarClick() {

    console.log('CLICK FUNCIONA');

  }

}