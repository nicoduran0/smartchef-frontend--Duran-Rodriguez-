export type Dificultad = 'FACIL' | 'MEDIA' | 'DIFICIL';

export type UnidadIngrediente = 'GRAMOS' | 'MILILITROS' | 'UNIDADES';

export type MomentoComida = 'DESAYUNO' | 'COMIDA' | 'CENA';

export type EstadoLista = 'ABIERTA' | 'CERRADA';

export type Rol = 'ADMIN' | 'CHEF' | 'USUARIO';

export type TipoNotificacion =
  | 'INGREDIENTE_CADUCA'
  | 'RESUMEN_SEMANAL'
  | 'RECETA_RETIRADA'
  | 'LISTA_ACTUALIZADA';
