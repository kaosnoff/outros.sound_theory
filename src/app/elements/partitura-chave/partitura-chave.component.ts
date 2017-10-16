import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';

import { Armadura, HelperEscalas } from '../../services/helper.service';

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
	
  ngOnInit()
	{
		if (!this.key)
		{
			this.key = 'C';
		}
	}
	
	getArmadura()
	{
		this.armadura = HelperEscalas.getArmadura(this._chave);
		if (this.armadura == null) this.armadura = HelperEscalas.getArmadura('C');
		
		this.tipoAcidente = this.armadura.tipo;
		
		this.keyChange.emit(this.armadura);
	}
}
