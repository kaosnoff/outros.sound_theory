import { Component, OnInit } from '@angular/core';

import { Armadura, HelperEscalas } from '../../services/helper.service';

@Component({
  selector: 'app-escalas-chaves',
  templateUrl: './escalas-chaves.component.html',
  styleUrls: ['./escalas-chaves.component.scss']
})
export class EscalasChavesComponent implements OnInit
{
  constructor()
	{
		this.changeKey('C');
	}
	
	key: string = "C";
	menor: string = "";
	acidentes: string[] = [];
	acidenteTipo: string = '#';
	armadura: Armadura = null;
	
	cicloSustenido: string[] = HelperEscalas.cicloSustenido;
	cicloBemol: string[] = HelperEscalas.cicloBemol;
	
  ngOnInit()
	{
		//this.menor = this.getMenor(this.key);
		//setTimeout(() => { this.changeKey('C'); },5000);
	}
	
	changeKey(key:string, tipo: string = '#')
	{
		this.menor = this.getMenor(key, tipo);
		this.key = key;
		this.setArmadura(HelperEscalas.getArmadura(key));
	}
	
	getMenor(key:string, tipo: string = '#')
	{
		return HelperEscalas.getMenor(key,tipo);
	}
	
	setArmadura(armadura: Armadura)
	{
		this.armadura = armadura;
		this.acidenteTipo = armadura.tipo;
		this.acidentes = [];
		for (let item of armadura.notas)
		{
			this.acidentes.push(item.nota);
		}
	}
}
