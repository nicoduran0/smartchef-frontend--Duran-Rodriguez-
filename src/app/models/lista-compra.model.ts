import { EstadoLista, UnidadIngrediente } from './enums';

export interface LineaListaCompra {
  id: number;
  ingredienteId: number;
  nombre: string;
  cantidad: number;
  unidad: UnidadIngrediente;
  comprado: boolean;
  categoria?: string; // solo mockup (agrupación por categoría)
}

export interface ListaCompra {
  id: number;
  estado: EstadoLista;
  recetaOrigen?: string; // solo mockup ("Para: Pollo al curry con arroz")
  lineas: LineaListaCompra[];
  costeEstimado: number;
}
