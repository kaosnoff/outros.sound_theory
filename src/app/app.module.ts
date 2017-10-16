import { MaterializeModule } from 'angular2-materialize';
 
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Services
import { ConfigService } from './services/config.service';
import { NotasService } from './services/notas.service';
import { HelperService } from './services/helper.service';

// Components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotasComponent } from './pages/notas/notas.component';
import { EscalasComponent } from './pages/escalas/escalas.component';
import { IntervalosComponent } from './pages/intervalos/intervalos.component';
import { AcordesComponent } from './pages/acordes/acordes.component';
import { PianoComponent } from './elements/piano/piano.component';
import { PianoTeclaComponent } from './elements/piano-tecla/piano-tecla.component';
import { PartituraComponent } from './elements/partitura/partitura.component';
import { NotaFiguraComponent } from './elements/nota-figura/nota-figura.component';
import { EscalasChavesComponent } from './pages/escalas-chaves/escalas-chaves.component';
import { PartituraChaveComponent } from './elements/partitura-chave/partitura-chave.component';
import { EscalasEscalasComponent } from './pages/escalas-escalas/escalas-escalas.component';
import { PartituraSimplesComponent } from './elements/partitura-simples/partitura-simples.component';
import { EscalasModosComponent } from './pages/escalas-modos/escalas-modos.component';

@NgModule({
	declarations: [
		AppComponent,
		NotasComponent,
		EscalasComponent,
		IntervalosComponent,
		AcordesComponent,
		PianoComponent,
		PianoTeclaComponent,
		PartituraComponent,
		NotaFiguraComponent,
		EscalasChavesComponent,
		PartituraChaveComponent,
		EscalasEscalasComponent,
		PartituraSimplesComponent,
		EscalasModosComponent
	],
	imports: [
		MaterializeModule,
		BrowserModule,
		AppRoutingModule
	],
	providers: [
		ConfigService,
		NotasService,
		HelperService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
