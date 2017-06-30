import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotasComponent } from './pages/notas/notas.component';
import { EscalasComponent } from './pages/escalas/escalas.component';
import { IntervalosComponent } from './pages/intervalos/intervalos.component';
import { AcordesComponent } from './pages/acordes/acordes.component';

const routes: Routes = [
	{
		path: '', redirectTo: '/notas', pathMatch: 'full'
	},
	{
		path: 'notas', component: NotasComponent
	},
	{
		path: 'escalas', component: EscalasComponent
	},
	{
		path: 'intervalos', component: IntervalosComponent
	},
	{
		path: 'acordes', component: AcordesComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
