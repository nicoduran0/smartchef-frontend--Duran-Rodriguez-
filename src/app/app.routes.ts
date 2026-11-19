import { Routes } from '@angular/router';
import { authGuard } from './core';

export const routes: Routes = [
  { path: '', redirectTo: 'bienvenida', pathMatch: 'full' },

  // Antes de entrar: sin menú
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

  // Dentro de la app: con menú inferior
  {
    path: 'app',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/tabs/tabs.page').then(m => m.TabsPage),
    children: [
      {
        path: 'descubrir',
        loadComponent: () => import('./pages/descubrir/descubrir.page').then(m => m.DescubrirPage),
      },
      {
        path: 'descubrir/perfil',
        loadComponent: () => import('./pages/perfil/perfil.page').then(m => m.PerfilPage),
      },
      {
        path: 'ingredientes',
        loadComponent: () => import('./pages/ingredientes/ingredientes.page').then(m => m.IngredientesPage),
      },
      {
        path: 'ingredientes/frigorifico',
        loadComponent: () => import('./pages/frigorifico/frigorifico.page').then(m => m.FrigorificoPage),
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

  // Pantalla completa: sin menú, con botón atrás
  {
    path: 'receta/:id',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/receta-detalle/receta-detalle.page').then(m => m.RecetaDetallePage),
  },
  {
    path: 'lista-compra',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/lista-compra/lista-compra.page').then(m => m.ListaCompraPage),
  },
  {
    path: 'notificaciones',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/notificaciones/notificaciones.page').then(m => m.NotificacionesPage),
  },

  // Cualquier otra dirección: 404 (siempre la última)
  {
    path: '**',
    loadComponent: () => import('./pages/no-encontrada/no-encontrada.page').then(m => m.NoEncontradaPage),
  },
];
