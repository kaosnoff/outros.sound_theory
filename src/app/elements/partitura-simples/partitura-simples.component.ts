import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

import { NotasService, Nota } from '../../services/notas.service';

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
	{}
	
	@Input() notas:Nota[] = [];
	@Input() key: string = 'C';
	
	ngOnInit()
	{}
}
