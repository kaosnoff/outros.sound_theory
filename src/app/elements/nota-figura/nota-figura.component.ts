import { Component, OnInit, Input } from '@angular/core';

import { NotasService, Nota, HelperEscalas, Armadura } from '../../services/notas.service';

@Component({
	selector: 'app-nota-figura',
	templateUrl: './nota-figura.component.html',
	styleUrls: ['./nota-figura.component.scss']
})
export class NotaFiguraComponent implements OnInit
{
	@Input() nota:Nota;
	@Input() key:string = 'C';
	
	constructor()
	{}
	
	private helperEscalas: HelperEscalas = new HelperEscalas;
	private armadura: Armadura = new Armadura;
	
	ngOnInit()
	{
		this.armadura = this.helperEscalas.getArmadura(this.key);
		
		if (this.nota.accid)
		{
			if (this.nota.accid == this.armadura.tipo)
			{
				let notaBase: string = this.nota.nome[0];
				if (this.armadura.notas.find(item => item.nota === notaBase))
				{
					this.nota.accid = '';
				}
			}
		}
	}
}
