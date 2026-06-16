export interface Producto {

  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  genero: string;
  activo: boolean;

  marca: {
    id: number;
    nombre: string;
  };

}