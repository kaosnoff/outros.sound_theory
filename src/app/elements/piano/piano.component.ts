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
	oitavas: number = 6;
	
	notas:Array<Nota>;
	playing:boolean = false;
	
	constructor(
		private notasService: NotasService
	)
	{ }
	
	ngOnInit()
	{
		let baseC:Nota = new Nota(0,2);
		this.notas = this.notasService.getEscala(baseC,this.oitavas);
		//baseC.song();
		this.mysong();
	}
	
	private mysong()
	{
		let tones = this.notasService.tones;
		
		tones.type = 'square';
		
		tones.release = 500;
		tones.play('e',2);
		tones.play('b',2);
		tones.play('e',3);
	}
}
