import { UnidadIngrediente } from './enums';

export interface Ingrediente {
  id: number;
  nombre: string;
  unidad: UnidadIngrediente;
  caloriasPorUnidad: number;
  precioPorUnidad: number;
  vegetariano: boolean;
  contieneGluten: boolean;
  categoria?: string; // solo mockup: "Proteínas", "Verduras"...
}
