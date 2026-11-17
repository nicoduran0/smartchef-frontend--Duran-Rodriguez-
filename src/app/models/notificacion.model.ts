import { TipoNotificacion } from './enums';

export interface Notificacion {
  id: number;
  tipo: TipoNotificacion;
  mensaje: string;
  recurso: string;
  recursoId: number | null;
  leida: boolean;
  creadaEn: string; // ISO datetime
}
