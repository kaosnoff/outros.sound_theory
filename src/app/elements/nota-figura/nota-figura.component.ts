import { Component, OnInit, Input } from '@angular/core';

import { NotasService, Nota } from '../../services/notas.service';
import { HelperEscalas, Armadura } from '../../services/helper.service';

@Component({
	selector: 'app-nota-figura',
	templateUrl: './nota-figura.component.html',
	styleUrls: ['./nota-figura.component.scss']
})
export class NotaFiguraComponent implements OnInit
{
	@Input() nota:Nota;
	@Input() armadura:Armadura
	
	hasArmadura:boolean = false;
	
	constructor()
	{}
	
	playing: boolean = false;
	
	ngOnInit()
	{
		this.hasArmadura = !(this.armadura === undefined);
		
		this.nota.playing.subscribe(playing =>
		{
			this.playing = playing;
			return playing;
		});
		
		let notaBase: string = this.nota.nome[0];
		if (this.hasArmadura)
		{
			if (this.nota.accid)
			{
				if (this.nota.accid == this.armadura.tipo)
				{
					if (this.armadura.notas.find(item => item.nota === notaBase))
					{
						this.nota.accid = '';
					}
				}
			}
			else
			{
				if (this.armadura.notas.find(item => item.nota == notaBase))
				{
					this.nota.accid = 'n';
				}
			}
		}
	}
}
