import { Component, OnInit, Input } from '@angular/core';

import { NotasService, Nota } from '../../services/notas.service';

@Component({
	selector: 'app-piano',
	templateUrl: './piano.component.html',
	styleUrls: ['./piano.component.scss']
})
export class PianoComponent implements OnInit
{
	@Input()
	teclas:Array<Nota>;
	partitura: Array<Nota> = [];
	
	constructor(
		private notasService: NotasService
	)
	{ }
	
	ngOnInit()
	{
		//let baseC:Nota = new Nota(0,2);
		//this.notas = this.notasService.getEscala(baseC,this.oitavas);
	}
	
	playSong()
	{
		let song:string = 'cdef..ff-cdcd..dd-cgfe..ee-cdef..ff';
		this.notasService.play(song, {duration: 8});
	}
}
