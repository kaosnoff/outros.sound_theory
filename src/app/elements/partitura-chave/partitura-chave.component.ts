import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';

import { Armadura, Escalas } from '../../services/notas.service';

@Component({
  selector: 'app-partitura-chave',
  templateUrl: './partitura-chave.component.html',
  styleUrls: ['./partitura-chave.component.scss']
})
export class PartituraChaveComponent implements OnInit
{
	constructor()
	{}
	
	@Output() keyChange:EventEmitter<Armadura> = new EventEmitter;
	@Input() standalone:boolean = false;
	@Input() clave: string = "G";
	@Input() tempo: number[] = null;
	@Input() set key(v: string)
	{
		this._chave = v;
		this.getArmadura();
	}
	get key():string
	{
		return this._chave;
	}
	
	private _chave:string;
	armadura: Armadura = new Armadura;
	tipoAcidente: string = '#';
	escala: Escalas = new Escalas;
	
	ordemSustenido:any[] = [
		{ nota: 'F', linha: 1 },
		{ nota: 'C', linha: 4 },
		{ nota: 'G', linha: 0 },
		{ nota: 'D', linha: 3 },
		{ nota: 'A', linha: 6 }
	];
	ordemBemol:any[] = [
		{ nota: 'B', linha: 5 },
		{ nota: 'E', linha: 2 },
		{ nota: 'A', linha: 6 },
		{ nota: 'D', linha: 3 },
		{ nota: 'G', linha: 7 },
		{ nota: 'C', linha: 4 }
	];
	
  ngOnInit()
	{
		if (!this.key)
		{
			this.key = 'C';
		}
	}
	
	getArmadura()
	{
		let n: number = this.escala.cicloSustenido.indexOf(this._chave);
		if (n < 0)
		{
			n = this.escala.cicloBemol.indexOf(this._chave);
			this.tipoAcidente = 'b';
		} 
		else
		{
			this.tipoAcidente = '#';
		}
		this.armadura.tipo = this.tipoAcidente;
		
		let ordem:any[] = (this.tipoAcidente == '#') ? this.ordemSustenido : this.ordemBemol;
		let base: number = (this.tipoAcidente == '#') ? 0 : 1;
		this.armadura.notas = [];
		for (let i = 0; i < n + base; i++)
		{
			this.armadura.notas.push(ordem[i]);
		}
		
		this.keyChange.emit(this.armadura);
	}
}
