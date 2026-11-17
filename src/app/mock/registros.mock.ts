import { RegistroComida } from '../models';
import { fechaRelativa } from './fechas';

export const REGISTROS_MOCK: RegistroComida[] = [
  // Hoy: la cena queda vacía a propósito
  { id: 1, fecha: fechaRelativa(0), momento: 'DESAYUNO', recetaId: 5, recetaTitulo: 'Bowl de avena y frutos rojos', descripcionLibre: null, calorias: 320, proteinas: 12, carbohidratos: 54 },
  { id: 2, fecha: fechaRelativa(0), momento: 'COMIDA',   recetaId: 1, recetaTitulo: 'Pollo al curry con arroz',     descripcionLibre: null, calorias: 480, proteinas: 43, carbohidratos: 56 },

  // Ayer
  { id: 3, fecha: fechaRelativa(-1), momento: 'DESAYUNO', recetaId: null, recetaTitulo: null, descripcionLibre: 'Tostada con aceite y tomate', calorias: 250, proteinas: 7,  carbohidratos: 38 },
  { id: 4, fecha: fechaRelativa(-1), momento: 'COMIDA',   recetaId: 3,    recetaTitulo: 'Bowl de quinoa y aguacate',    descripcionLibre: null, calorias: 420, proteinas: 14, carbohidratos: 45 },
  { id: 5, fecha: fechaRelativa(-1), momento: 'CENA',     recetaId: 4,    recetaTitulo: 'Sopa rústica de calabaza',     descripcionLibre: null, calorias: 190, proteinas: 5,  carbohidratos: 28 },

  // Hace 2 días
  { id: 6, fecha: fechaRelativa(-2), momento: 'COMIDA', recetaId: 7, recetaTitulo: 'Arroz con pollo y vegetales', descripcionLibre: null, calorias: 520, proteinas: 40, carbohidratos: 60 },
  { id: 7, fecha: fechaRelativa(-2), momento: 'CENA',   recetaId: 2, recetaTitulo: 'Ensalada griega con aderezo de limón', descripcionLibre: null, calorias: 310, proteinas: 11, carbohidratos: 14 },

  // Mañana (planificado, para mostrar el selector con días futuros)
  { id: 8, fecha: fechaRelativa(1), momento: 'DESAYUNO', recetaId: 6, recetaTitulo: 'Tortitas saludables de plátano', descripcionLibre: null, calorias: 350, proteinas: 13, carbohidratos: 52 },
];
