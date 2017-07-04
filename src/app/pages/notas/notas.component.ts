import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';

import { PianoComponent } from '../../elements/piano/piano.component';

import { ConfigService } from '../../services/config.service';

import { NotasService, Nota } from '../../services/notas.service';

@Component({
	selector: 'app-notas',
	templateUrl: './notas.component.html',
	styleUrls: ['./notas.component.scss']
})
export class NotasComponent implements OnInit
{
	@ViewChild('piano')
	piano: PianoComponent;
	
	teclas:Array<Nota>;
	
	constructor(
		private config:ConfigService,
		private notasService: NotasService
	)
	{
		let baseC:Nota = new Nota(0,3);
		this.teclas = this.notasService.getEscala(baseC,3);
		this.notasService.teclas = this.teclas;
	}
	
	tempo:number = this.config.tempo;
	
	ngOnInit()
	{
	}
	
	playSong()
	{
		this.piano.playSong();
		//let song:string = 'cdef..ff-cdcd..dd-cgfe..ee-cdef..ff';
		//this.notasService.play(song, {duration: 8});
	}
}
