import { Component, OnInit } from '@angular/core';

import { NotasService, Nota } from '../../services/notas.service';
import { HelperEscalas, Armadura } from '../../services/helper.service';

@Component({
  selector: 'app-escalas-modos',
  templateUrl: './escalas-modos.component.html',
  styleUrls: ['./escalas-modos.component.scss']
})
export class EscalasModosComponent implements OnInit
{
  constructor()
	{
		this.setBase('C');
	}
	
	modos:ModoGrego[] = [];
	bases: string[] = HelperEscalas.notas;
	base: Nota;
	armadura: Armadura;
	key: string;
	
  ngOnInit()
	{
		this.bases[3] = 'Eb';
		this.bases[8] = 'Ab';
		this.bases[10] = 'Bb';
	}
	
	private getModos()
	{
		let modos: ModoGrego[] = [];
		
		let modo: ModoGrego;
		
		modo = new ModoGrego;
		modo.nome = 'Jônio';
		modo.tonica = 'C';
		modo.tipo = 'Maior';
		modos.push(modo);
		
		modo = new ModoGrego;
		modo.nome = 'Dórico';
		modo.tonica = 'D';
		modo.tipo = 'Menor';
		modos.push(modo);
		
		modo = new ModoGrego;
		modo.nome = 'Frígio';
		modo.tonica = 'E';
		modo.tipo = 'Menor';
		modo.grauDominante = 6;
		modos.push(modo);
		
		modo = new ModoGrego;
		modo.nome = 'Lídio';
		modo.tonica = 'F';
		modo.tipo = 'Maior';
		modos.push(modo);
		
		modo = new ModoGrego;
		modo.nome = 'Mixolídio';
		modo.tonica = 'G';
		modo.tipo = 'Maior';
		modos.push(modo);
		
		modo = new ModoGrego;
		modo.nome = 'Eólio';
		modo.tonica = 'A';
		modo.tipo = 'Menor';
		modos.push(modo);
		
		modo = new ModoGrego;
		modo.nome = 'Lócrio';
		modo.tonica = 'B';
		modo.tipo = 'Menor';
		modo.grauDominante = null;
		modos.push(modo);
		
		let naturais:string[] = HelperEscalas.naturais;
		let intervalos:number[] = [2,2,1,2,2,2,1];
		for(let i in modos)
		{
			modo = modos[i];
			
			let pos: number = naturais.indexOf(modo.tonica[0]);
			let altura: number = this.base.altura + this.bases.indexOf(modo.tonica);
			let base: Nota = new Nota(altura, this.base.oitava);
			base.duration = 8;
			
			if (this.bases.indexOf(base.nome) < 0)
			{
				base.invert();
			}
			
			modo.intervalos = [];
			modo.notas = [];
			altura = base.altura;
			modo.notas.push(base);
			for (let j = 0; j < intervalos.length; j++)
			{
				pos = Number(i) + j;
				if (pos >= intervalos.length) pos -= intervalos.length;
				
				modo.intervalos.push(intervalos[pos]);
				
				altura += intervalos[pos];
				
				let nota: Nota = new Nota(altura,base.oitava);
				nota.duration = base.duration;
				modo.notas.push(nota);
			}
			modo.notas = NotasService.arrumaNotas(base.nome[0], modo.notas);
			
			if (modo.grauDominante !== null)
			{
				let nDominante: number = pos + modo.grauDominante;
				if (nDominante > naturais.length) nDominante -= naturais.length;
				modo.dominante = naturais[nDominante - 1];
			}
			//console.log(modo.nome, this.key, modo.notas);
			modos[i] = modo;
		}
		
		this.modos = modos;
	}
	
	setBase(nota: string)
	{
		this.key = nota;
		let altura: number = this.bases.indexOf(nota);
		let oitavaBase: number = 4;
		
		this.base = new Nota(altura, oitavaBase);
		this.base.duration = 8;
		
		this.armadura = HelperEscalas.getArmadura(nota);
		
		this.getModos();
	}
}

export class ModoGrego
{
	nome: string;
	tipo: string;
	tonica: string;
	dominante: string;
	grauDominante: number = 5;
	intervalos:number[];
	notas: Nota[];
}
