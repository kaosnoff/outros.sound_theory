import { Component, OnInit } from '@angular/core';

import { ConfigService } from '../../services/config.service';

@Component({
	selector: 'app-notas',
	templateUrl: './notas.component.html',
	styleUrls: ['./notas.component.scss']
})
export class NotasComponent implements OnInit
{
	constructor(
		private config:ConfigService
	)
	{ }
	
	tempo:number = this.config.tempo;
	
	ngOnInit()
	{
	}
	
}
