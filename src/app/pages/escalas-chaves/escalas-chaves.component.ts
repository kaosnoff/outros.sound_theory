import { Component, OnInit } from '@angular/core';

import { Armadura, HelperEscalas } from '../../services/notas.service';

@Component({
  selector: 'app-escalas-chaves',
  templateUrl: './escalas-chaves.component.html',
  styleUrls: ['./escalas-chaves.component.scss']
})
export class EscalasChavesComponent implements OnInit
{
  constructor()
	{}
	
	key: string = "";
	menor: string = "";
	acidentes: string[] = [];
	acidenteTipo: string = '#';
	armadura: Armadura = null;
	
	escala: HelperEscalas = new HelperEscalas;
	
  ngOnInit()
	{
		this.changeKey('C');
	}
	
	changeKey(key:string, tipo: string = '#')
	{
		this.menor = this.getMenor(key, tipo);
		this.key = key;
		this.acidentes = [];
	}
	
	getMenor(key, tipo: string = '#')
	{
		let i: number = ((tipo == 'b') ? (this.escala.notasBemol) : (this.escala.notas)).indexOf(key);
		let j: number = i - 3;
		if (j < 0)
		{
			j += this.escala.notas.length;
		}
		
		let menor: string = (tipo == 'b') ? (this.escala.notasBemol[j]) : (this.escala.notas[j]);
		return menor;
	}
	
	setArmadura(armadura: Armadura)
	{
		this.armadura = armadura;
		this.acidenteTipo = armadura.tipo;
		for (let item of armadura.notas)
		{
			this.acidentes.push(item.nota);
		}
	}
}
