import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path:'',
    redirectTo:'/menu/home',
    pathMatch:'full'
  },
  {
    path: '',
    component: MenuPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
      },{
        path: 'reportinicial',
        loadChildren: () => import('../reportinicial/reportinicial.module').then( m => m.ReportinicialPageModule)
      },{
        path: 'reportlist',
        loadChildren: () => import('../reportlist/reportlist.module').then( m => m.ReportlistPageModule)
      },
      {
        path: 'responsable',
        loadChildren: () => import('../responsable/responsable.module').then( m => m.ResponsablePageModule)
      },
      {
        path: 'reportvacun',
        loadChildren: () => import('../reportvacun/reportvacun.module').then( m => m.ReportvacunPageModule)
      },
      {
        path: 'fisicoquimicos',
        loadChildren: () => import('../fisicoquimicos/fisicoquimicos.module').then( m => m.FisicoquimicosPageModule)
      },
      {
        path: 'materiasconsumo',
        loadChildren: () => import('../materiasconsumo/materiasconsumo.module').then( m => m.MateriasconsumoPageModule)
      },
      {
        path: 'materiasconsumoreg',
        loadChildren: () => import('../materiasconsumoreg/materiasconsumoreg.module').then( m => m.MateriasconsumoregPageModule)
      },
      {
        path: 'mortalidad',
        loadChildren: () => import('../mortalidad/mortalidad.module').then( m => m.MortalidadPageModule)
      },
      {
        path: 'mortalidadreg',
        loadChildren: () => import('../mortalidadreg/mortalidadreg.module').then( m => m.MortalidadregPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
