import { Component, OnInit, Input } from '@angular/core';

import { NotasService, Nota } from '../../services/notas.service';

@Component({
	selector: 'app-nota-figura',
	templateUrl: './nota-figura.component.html',
	styleUrls: ['./nota-figura.component.scss']
})
export class NotaFiguraComponent implements OnInit
{
	@Input()
	nota:Nota;
	
	constructor() { }
	
	ngOnInit() {
	}
}
