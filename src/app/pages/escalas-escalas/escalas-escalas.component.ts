import { Component, OnInit } from '@angular/core';

import { NotasService, Nota } from '../../services/notas.service';
import { HelperEscalas, Armadura } from '../../services/helper.service';

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
	
	escalas: Escala[] = [];
	key: string;
	notas: string[] = ['C','G','D','A','E','B','F#','Gb','Db','Ab','Eb','Bb','F','C#'/*,'G#','D#','Cb'*/];
	
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
		this.changeKey('C');
	}
	
	changeKey(key: string)
	{
		this.key = key;
		
		this.escalas = [];
		
		let tipo: string = (key.length > 1 && key[1] == 'b') ? 'b' : '#';
		
		let tempEscalas = [
			{
				label: 'Escala Maior',
				key: key,
				intervalos: [2,2,1,2,2,2,1]
			},
			{
				label: 'Escala Menor Relativa Natural',
				key: HelperEscalas.getMenor(key,tipo).toLowerCase(),
				intervalos: [2,1,2,2,1,2,2]
			},
			{
				label: 'Escala Menor Natural',
				key: key.toLowerCase(),
				intervalos: [2,1,2,2,1,2,2]
			},
			{
				label: 'Escala Menor Harmônica',
				key: key.toLowerCase(),
				intervalos: [2,1,2,2,1,3,1]
			},
			{
				label: 'Escala Menor Melódica',
				key: key.toLowerCase(),
				intervalos: [2,1,2,2,2,2,1]
			}
		]
		
		for (let temp of tempEscalas)
		{
			let escala: Escala = new Escala;
			// Escala maior
			escala.tonica = temp.key;
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
		
		let key:string = tonica;
		key = key[0].toUpperCase() + key.slice(1);
		
		let oitava: number = 4;
		
		let altura: number = HelperEscalas.notas.indexOf(key);
		if (altura < 0) altura = HelperEscalas.notasBemol.indexOf(key);
		if (altura < 0)
		{
			if (key == 'Cb') 
			{
				altura = 11;
				//oitava--;
			}
		}
		
		let armadura: Armadura = HelperEscalas.getArmadura(tonica);
		if (!armadura) return null;
		
		let base: Nota = new Nota(altura, oitava);
		base.duration = 8;
		if (key == 'Cb')
		{
			base.nome = 'Cb';
			base.accid = 'b';
		}
		notas.push(base);
		
		if (tonica.length > 1 && tonica[1] == 'b' && base.accid == '#')
		{
			base.invert();
		}
		
		if (base.altura > 9) base.oitava--;
		
		let total: number = 0;
		
		for(let dif of intervalos)
		{
			total += dif;
			let nota: Nota = new Nota(base.altura + total, base.oitava);
			nota.duration = base.duration;
			notas.push(nota);
		}
		
		notas = NotasService.arrumaNotas(key,notas);
		
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