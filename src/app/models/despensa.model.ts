import { UnidadIngrediente } from './enums';

export interface ItemDespensa {
  ingredienteId: number;
  nombre: string;
  unidad: UnidadIngrediente;
  cantidad: number;
  caducidad: string | null; // 'YYYY-MM-DD'
  imagenUrl?: string;       // solo mockup (fotos del frigorífico)
}
