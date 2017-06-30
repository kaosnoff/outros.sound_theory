import { Component, OnInit, Input } from '@angular/core';

import { NotasService, Nota } from '../../services/notas.service';

@Component({
	selector: 'app-piano-tecla',
	templateUrl: './piano-tecla.component.html',
	styleUrls: ['./piano-tecla.component.scss']
})
export class PianoTeclaComponent implements OnInit
{
	@Input()
	nota:Nota;
	
	playing:boolean = false;
	preta:boolean = false;
	
	constructor(
		private notasService: NotasService
	) { }
	
	ngOnInit()
	{
		this.preta = this.nota.accid == '#';
	}
	
	pressed()
	{
		this.playing = true;
		this.nota.play();
	}
	released()
	{
		this.playing = false;
		this.nota.stop();
	}
}
