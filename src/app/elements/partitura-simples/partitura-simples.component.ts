import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

import { NotasService, Nota } from '../../services/notas.service';
import { HelperEscalas, Armadura } from '../../services/helper.service';

@Component({
  selector: 'app-partitura-simples',
  templateUrl: './partitura-simples.component.html',
  styleUrls: ['./partitura-simples.component.scss']
})
export class PartituraSimplesComponent implements OnInit
{
	constructor(
		private notasService: NotasService
	)
	{
		this.notasService.nota.subscribe(nota =>
		{
			if(nota.next === null) this.playing = false;
		});
	}
	
	@Input() notas:Nota[] = [];
	@Input() key: string = 'C';
	@Input() playable: boolean = false;
	
	armadura: Armadura = new Armadura;
	playing: boolean = false;
	
	ngOnInit()
	{
		this.armadura = HelperEscalas.getArmadura(this.key);
	}
	
	togglePlay()
	{
		this.notasService.stop();
		if (!this.playing)
		{
			this.notasService.play(this.notas);
			this.playing = true;
		}
		else
		{
			this.playing = false;
		}
	}
}
