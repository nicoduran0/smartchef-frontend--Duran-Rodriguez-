/** Convierte 'YYYY-MM-DD' en Date local (evita problemas de zona horaria). */
function aFecha(fecha: string): Date {
  const [y, m, d] = fecha.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function formatear(fecha: Date): string {
  const y = fecha.getFullYear();
  const m = String(fecha.getMonth() + 1).padStart(2, '0');
  const d = String(fecha.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** Suma (o resta) días a una fecha 'YYYY-MM-DD'. */
export function sumarDias(fecha: string, dias: number): string {
  const f = aFecha(fecha);
  f.setDate(f.getDate() + dias);
  return formatear(f);
}

/** Devuelve el lunes de la semana a la que pertenece la fecha. */
export function inicioSemana(fecha: string): string {
  const f = aFecha(fecha);
  const diasDesdeLunes = (f.getDay() + 6) % 7; // getDay(): domingo = 0
  f.setDate(f.getDate() - diasDesdeLunes);
  return formatear(f);
}
