import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { paginar, simular } from '../core/simulador';
import { INGREDIENTES_MOCK } from '../mock';
import { Ingrediente, Pagina } from '../models';

@Injectable({ providedIn: 'root' })
export class IngredienteService {

  /** Catálogo de ingredientes paginado, con búsqueda por texto (GET /ingredientes?texto=). */
  listar(texto = '', pagina = 0, tamano = 20): Observable<Pagina<Ingrediente>> {
    const t = texto.trim().toLowerCase();
    const filtrados = INGREDIENTES_MOCK.filter(i => !t || i.nombre.toLowerCase().includes(t));
    return simular(paginar(filtrados, pagina, tamano));
  }
}
