import { Component, OnInit } from '@angular/core';

import { NotasService, Nota, HelperEscalas } from '../../services/notas.service';

@Component({
  selector: 'app-escalas-escalas',
  templateUrl: './escalas-escalas.component.html',
  styleUrls: ['./escalas-escalas.component.scss']
})
export class EscalasEscalasComponent implements OnInit
{
  constructor(
		private notasService: NotasService
	)
	{}
	
	helperEscalas: HelperEscalas = new HelperEscalas;
	escalas: Escala[] = [];
	key: string;
	
	private romanos: string[] = [
		'I','II','III','IV','V','VI','VII','VIII','IX','X'
	];
	private funcoes: string[] = [
		'Tônica',
		'Supertônica',
		'Mediante',
		'Subdominante',
		'Dominante',
		'Superdominante',
		'Sensível ou Subtônica',
		'Tônica'
	];
	
  ngOnInit()
	{
		this.changeKey('D');
	}
	
	changeKey(key: string)
	{
		this.key = key;
		
		this.escalas = [];
		
		
		
		let tempEscalas = [
			{
				label: 'Escala Maior',
				intervalos: [2,2,1,2,2,2,1]
			},
			{
				label: 'Escala Menor Natural',
				intervalos: [2,1,2,2,1,2,2]
			},
			{
				label: 'Escala Menor Harmônica',
				intervalos: [2,1,2,2,1,3,1]
			},
			{
				label: 'Escala Menor Melódica',
				intervalos: [2,1,2,2,2,2,1]
			}
		]
		
		for (let temp of tempEscalas)
		{
			let escala: Escala = new Escala;
			// Escala maior
			escala.tonica = key;
			escala.tipo = temp.label;
			escala.graus = [0,1,2,3,4,5,6,7];
			escala.funcoes = this.funcoes;
			escala.intervalos = temp.intervalos;
			escala.notas = this.montaEscala(escala.tonica, escala.intervalos);
			this.escalas.push(escala);
		}
	}
	
	private montaEscala(tonica, intervalos):Nota[]
	{
		let notas:Nota[] = [];
		
		let altura: number = this.helperEscalas.notas.indexOf(tonica);
		
		let base: Nota = new Nota(altura, 4);
		notas.push(base);
		
		let total: number = 0;
		
		for(let dif of intervalos)
		{
			total += dif;
			let nota: Nota = new Nota(base.altura + total, base.oitava);
			notas.push(nota);
		}
		
		return notas;
	}
}

class Escala
{
	tipo: string;
	tonica: string;
	graus: number[];
	intervalos: number[];
	funcoes: string[];
	notas: Nota[];
}