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
	@Input() armadura:Armadura
	
	constructor()
	{}
	
	ngOnInit()
	{
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
