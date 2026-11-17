import { ItemDespensa } from '../models';
import { fechaRelativa } from './fechas';

export const DESPENSA_MOCK: ItemDespensa[] = [
  { ingredienteId: 1,  nombre: 'Pechuga de pollo', unidad: 'GRAMOS',     cantidad: 500, caducidad: fechaRelativa(1)  },  // caduca mañana
  { ingredienteId: 2,  nombre: 'Arroz basmati',    unidad: 'GRAMOS',     cantidad: 800, caducidad: fechaRelativa(180) },
  { ingredienteId: 7,  nombre: 'Tomate',           unidad: 'UNIDADES',   cantidad: 4,   caducidad: fechaRelativa(2)  },  // caduca pronto
  { ingredienteId: 5,  nombre: 'Cebolla',          unidad: 'UNIDADES',   cantidad: 3,   caducidad: fechaRelativa(15) },
  { ingredienteId: 20, nombre: 'Leche',            unidad: 'MILILITROS', cantidad: 750, caducidad: fechaRelativa(4)  },
  { ingredienteId: 26, nombre: 'Yogur natural',    unidad: 'UNIDADES',   cantidad: 4,   caducidad: fechaRelativa(6)  },
  { ingredienteId: 21, nombre: 'Plátano',          unidad: 'UNIDADES',   cantidad: 5,   caducidad: fechaRelativa(3)  },
  { ingredienteId: 25, nombre: 'Hamburguesa de ternera', unidad: 'UNIDADES', cantidad: 4, caducidad: fechaRelativa(-1) }, // caducada
  { ingredienteId: 27, nombre: 'Chocolate negro',  unidad: 'GRAMOS',     cantidad: 100, caducidad: fechaRelativa(90) },
  { ingredienteId: 22, nombre: 'Huevo',            unidad: 'UNIDADES',   cantidad: 6,   caducidad: fechaRelativa(10) },
];
