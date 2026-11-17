import { Notificacion } from '../models';

/** ISO datetime de hace `horas` horas, para que los datos siempre parezcan recientes. */
const hace = (horas: number): string =>
  new Date(Date.now() - horas * 3_600_000).toISOString().slice(0, 19);

export const NOTIFICACIONES_MOCK: Notificacion[] = [
  { id: 1, tipo: 'INGREDIENTE_CADUCA', mensaje: 'La pechuga de pollo caduca mañana. Prueba el Pollo al curry con arroz.', recurso: 'RECETA',    recursoId: 1,    leida: false, creadaEn: hace(1) },
  { id: 2, tipo: 'INGREDIENTE_CADUCA', mensaje: 'Los tomates caducan en 2 días.',                                         recurso: 'DESPENSA',  recursoId: 7,    leida: false, creadaEn: hace(1) },
  { id: 3, tipo: 'LISTA_ACTUALIZADA',  mensaje: 'Tu lista de la compra se ha actualizado con 5 ingredientes.',            recurso: 'LISTA',     recursoId: 1,    leida: false, creadaEn: hace(5) },
  { id: 4, tipo: 'RESUMEN_SEMANAL',    mensaje: 'Resumen de tu semana: cocinaste 9 veces y una media de 1.640 kcal al día.', recurso: 'SEMANA', recursoId: null, leida: true,  creadaEn: hace(30) },
  { id: 5, tipo: 'RECETA_RETIRADA',    mensaje: 'La receta "Tarta de queso" de tu colección Postres ha sido retirada.',   recurso: 'RECETA',    recursoId: 99,   leida: true,  creadaEn: hace(72) },
  { id: 6, tipo: 'INGREDIENTE_CADUCA', mensaje: 'Las hamburguesas de ternera caducaron ayer.',                            recurso: 'DESPENSA',  recursoId: 25,   leida: true,  creadaEn: hace(96) },
];
