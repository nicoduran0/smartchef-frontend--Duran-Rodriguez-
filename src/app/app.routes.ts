import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'bienvenida', pathMatch: 'full' },

  {
    path: 'bienvenida',
    loadComponent: () => import('./pages/bienvenida/bienvenida.page').then(m => m.BienvenidaPage),
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage),
  },
  {
    path: 'registro',
    loadComponent: () => import('./pages/registro/registro.page').then(m => m.RegistroPage),
  },

  // Pestañas principales
  {
    path: 'app',
    loadComponent: () => import('./pages/tabs/tabs.page').then(m => m.TabsPage),
    children: [
      {
        path: 'descubrir',
        loadComponent: () => import('./pages/descubrir/descubrir.page').then(m => m.DescubrirPage),
      },
      {
        path: 'ingredientes',
        loadComponent: () => import('./pages/ingredientes/ingredientes.page').then(m => m.IngredientesPage),
      },
      {
        path: 'favoritos',
        loadComponent: () => import('./pages/favoritos/favoritos.page').then(m => m.FavoritosPage),
      },
      {
        path: 'semana',
        loadComponent: () => import('./pages/semana/semana.page').then(m => m.SemanaPage),
      },
      { path: '', redirectTo: 'descubrir', pathMatch: 'full' },
    ],
  },

  // Pantallas secundarias (fuera de tabs para no bloquear la pestaña)
  {
    path: 'frigorifico',
    loadComponent: () => import('./pages/frigorifico/frigorifico.page').then(m => m.FrigorificoPage),
  },
  {
    path: 'perfil',
    loadComponent: () => import('./pages/perfil/perfil.page').then(m => m.PerfilPage),
  },
  {
    path: 'receta/:id',
    loadComponent: () => import('./pages/receta-detalle/receta-detalle.page').then(m => m.RecetaDetallePage),
  },
  {
    path: 'lista-compra',
    loadComponent: () => import('./pages/lista-compra/lista-compra.page').then(m => m.ListaCompraPage),
  },
  {
    path: 'notificaciones',
    loadComponent: () => import('./pages/notificaciones/notificaciones.page').then(m => m.NotificacionesPage),
  },

  {
    path: '**',
    loadComponent: () => import('./pages/no-encontrada/no-encontrada.page').then(m => m.NoEncontradaPage),
  },
];
