import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotasComponent } from './pages/notas/notas.component';
import { EscalasComponent } from './pages/escalas/escalas.component';
import { IntervalosComponent } from './pages/intervalos/intervalos.component';
import { AcordesComponent } from './pages/acordes/acordes.component';

import { EscalasChavesComponent } from './pages/escalas-chaves/escalas-chaves.component';

const routes: Routes = [
	{
		path: '', redirectTo: '/notas', pathMatch: 'full'
	},
	{
		path: 'notas', component: NotasComponent
	},
	{
		path: 'escalas', component: EscalasComponent, children:
		[
			{ path: '', redirectTo: 'chaves', pathMatch: 'full' },
			{ path: 'chaves', component: EscalasChavesComponent }
		]
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
