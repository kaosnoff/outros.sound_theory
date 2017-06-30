import { MaterializeModule } from 'angular2-materialize';
 
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Services
import { ConfigService } from './services/config.service';
import { NotasService } from './services/notas.service';

// Components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotasComponent } from './pages/notas/notas.component';
import { EscalasComponent } from './pages/escalas/escalas.component';
import { IntervalosComponent } from './pages/intervalos/intervalos.component';
import { AcordesComponent } from './pages/acordes/acordes.component';
import { PianoComponent } from './elements/piano/piano.component';
import { PianoTeclaComponent } from './elements/piano-tecla/piano-tecla.component';

@NgModule({
	declarations: [
		AppComponent,
		NotasComponent,
		EscalasComponent,
		IntervalosComponent,
		AcordesComponent,
		PianoComponent,
		PianoTeclaComponent
	],
	imports: [
		MaterializeModule,
		BrowserModule,
		AppRoutingModule
	],
	providers: [
		ConfigService,
		NotasService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
