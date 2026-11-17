import { Usuario } from '../models';

export const USUARIO_MOCK: Usuario = {
  id: 1,
  nombre: 'Nicolás Durán Rodríguez',
  email: 'nduranrodriguez@safareyes.es',
  rol: 'USUARIO',
  preferencias: {
    vegetariana: false,
    sinGluten: false,
    rapida: true,
    economica: true,
  },
  telefono: '+34 682278778', // solo mockup
  avatarUrl: undefined,       // solo mockup
};
