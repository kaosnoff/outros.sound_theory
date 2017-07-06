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
	//partitura: Array<Nota> = [];
	
	constructor(
		private notasService: NotasService
	)
	{ }
	
	ngOnInit()
	{
		this.notasService.nota.subscribe(nota =>
		{
			if (nota.nome == 'P') return nota;
			
			let tecla = this.teclas.find(n => (n.altura == nota.altura && n.oitava == nota.oitava));
			
			nota.playing.subscribe(pla => 
			{
				tecla.playing.next(pla);
				return pla;
			});
			
			//tecla.playing.next(nota.playing.value);
			/*
			if (tecla)
			{
				tecla.play();
			}
			// */
		});
		//let baseC:Nota = new Nota(0,2);
		//this.notas = this.notasService.getEscala(baseC,this.oitavas);
	}
	
	playSong()
	{
		let song:string = 'cdef..ff-cdcd..dd-cgfe..ee-cdef..ff';
		this.notasService.play(song, {duration: 8, oitava: 4});
	}
}
