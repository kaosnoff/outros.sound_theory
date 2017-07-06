import { Component, OnInit, Input } from '@angular/core';

import { NotasService, Nota } from '../../services/notas.service';

@Component({
	selector: 'app-partitura',
	templateUrl: './partitura.component.html',
	styleUrls: ['./partitura.component.scss']
})
export class PartituraComponent implements OnInit
{
	tempo = {
		num: 4,
		fig: 4
	};
	
	@Input()
	notas:Array<Nota> = [];
	
	notasPautas = [];
	
	pautas = ['g','pausa','f'];
	private oitavaBase:number = 2;
	private oitavas:number = 4;
	private oitavaCorte:number = 1;
	
	constructor()
	{
		
		for (let i=0;i<(this.oitavas*12);i++)
		{
			let j = (i%12);
			let natural = (j < 5) ? (j % 2 == 0) : (j % 2 > 0);
			
			if (!natural) continue;
			
			let nota:Nota = new Nota(i,this.oitavaBase);
			//nota.duration = Math.pow(2,1 + Math.round(Math.random() * 3));
			//let nota = new Nota(4, this.oitavaBase + this.oitavaCorte + 1);
			nota.duration = Math.pow(2, 1+this.notas.length % 5);
			//console.log(nota.duration);
			this.notas.push(nota);
		}
		
		let nota:Nota = new Nota(0,this.oitavas+this.oitavaBase);
		this.notas.push(nota);
	}
	
	ngOnInit()
	{
		this.notasPautas['g'] = [];
		this.notasPautas['f'] = [];
		
		//console.log(this.oitavaBase,this.oitavaCorte);
		
		for(let nota of this.notas)
		{
			//console.log(nota.nome, nota.oitava);
			//console.log(nota.nome, nota.grau);
			this.notasPautas['f'].push((nota.oitava <= (this.oitavaCorte + this.oitavaBase)) ? nota : null);
			this.notasPautas['g'].push((nota.oitava > (this.oitavaCorte + this.oitavaBase)) ? nota : null);
		}
	}
}
