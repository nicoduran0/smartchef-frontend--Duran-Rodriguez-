import { Observable, of, throwError, timer } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';
import { Pagina } from '../models';

/** Devuelve un dato como si viniera del servidor (con retraso). */
export function simular<T>(dato: T, ms = 300): Observable<T> {
  return of(structuredClone(dato)).pipe(delay(ms));
}

/** Simula un error del servidor (por ejemplo, un 404). */
export function simularError(mensaje: string, ms = 300): Observable<never> {
  return timer(ms).pipe(switchMap(() => throwError(() => new Error(mensaje))));
}

/** Trocea una lista en una página, con la misma forma que Page<T> de Spring. */
export function paginar<T>(items: T[], pagina = 0, tamano = 10): Pagina<T> {
  const inicio = pagina * tamano;
  return {
    content: items.slice(inicio, inicio + tamano),
    totalElements: items.length,
    totalPages: Math.ceil(items.length / tamano),
    number: pagina,
    size: tamano,
  };
}
