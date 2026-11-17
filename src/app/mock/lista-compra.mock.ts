import { ListaCompra } from '../models';

export const LISTA_COMPRA_MOCK: ListaCompra = {
  id: 1,
  estado: 'ABIERTA',
  recetaOrigen: 'Pollo al curry con arroz', // solo mockup
  costeEstimado: 8.5,
  lineas: [
    { id: 1, ingredienteId: 1, nombre: 'Pechuga de pollo deshuesada', cantidad: 200, unidad: 'GRAMOS',     comprado: false, categoria: 'Proteínas' },
    { id: 2, ingredienteId: 7, nombre: 'Tomates maduros de ensalada', cantidad: 2,   unidad: 'UNIDADES',   comprado: true,  categoria: 'Verduras' },
    { id: 3, ingredienteId: 5, nombre: 'Cebollas medianas',           cantidad: 1,   unidad: 'UNIDADES',   comprado: false, categoria: 'Verduras' },
    { id: 4, ingredienteId: 6, nombre: 'Ajo fresco',                  cantidad: 1,   unidad: 'UNIDADES',   comprado: false, categoria: 'Verduras' },
    { id: 5, ingredienteId: 3, nombre: 'Curry en polvo suave',        cantidad: 1,   unidad: 'UNIDADES',   comprado: false, categoria: 'Especias y Otros' },
    { id: 6, ingredienteId: 4, nombre: 'Leche de coco premium',       cantidad: 1,   unidad: 'UNIDADES',   comprado: true,  categoria: 'Especias y Otros' },
    { id: 7, ingredienteId: 2, nombre: 'Arroz basmati',               cantidad: 80,  unidad: 'GRAMOS',     comprado: false, categoria: 'Cereales' },
  ],
};
