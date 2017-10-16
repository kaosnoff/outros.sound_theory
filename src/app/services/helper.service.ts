import { Injectable } from '@angular/core';

@Injectable()
export class HelperService
{
  constructor() { }
}

export class Armadura
{
	tipo: string;
	notas: ArmaduraNota[];
}
export class ArmaduraNota
{
	nota: string;
	linha: number;
}
export class HelperEscalas
{
	static naturais:string[] = [
		'C','D','E','F','G','A','B'
	]
	static valores:any[] = [
		{ nota: 'B#', value: 0 },
		{ nota: 'C', value: 0 },
		{ nota: 'C#', value: 0.5 },
		{ nota: 'Db', value: 0.5 },
		{ nota: 'D', value: 1.0 },
		{ nota: 'D#', value: 1.5 },
		{ nota: 'Eb', value: 1.5 },
		{ nota: 'E', value: 2.0 },
		{ nota: 'Fb', value: 2.0 },
		{ nota: 'E#', value: 2.5 },
		{ nota: 'F', value: 2.5 },
		{ nota: 'F#', value: 3.0 },
		{ nota: 'Gb', value: 3.0 },
		{ nota: 'G', value: 3.5 },
		{ nota: 'G#', value: 4.0 },
		{ nota: 'Ab', value: 4.0 },
		{ nota: 'A', value: 4.5 },
		{ nota: 'A#', value: 5.0 },
		{ nota: 'Bb', value: 5.0 },
		{ nota: 'B', value: 5.5 },
		{ nota: 'Cb', value: 5.5 },
		{ nota: 'B#', value: 6.0 }
	]
	static cicloSustenido:string[] = [
		'C','G','D','A','E','B','F#','C#'
	];
	static cicloSustenidoMenor:string[] = [
		'a','e','b','f#','c#','g#','d#'
	];
	static cicloBemol:string[] = [
		'C','F','Bb','Eb','Ab','Db','Gb','Cb'
	];
	static cicloBemolMenor:string[] = [
		'a','d','g','c','f','bb','eb'
	];
	
	static notas: string[] = [
		'C','C#','D','D#','E','F','F#','G','G#','A','A#','B'
	];
	static notasBemol: string[] = [
		'C','Db','D','Eb','E','F','Gb','G','Ab','A','Bb','B'
	];
	static notasPadrao: string[] = [
		'C','C#','D','D#','E','F','F#','G','G#','A','Bb','B'
	];
	
	static ordemSustenido:any[] = [
		{ nota: 'F', linha: 1 },
		{ nota: 'C', linha: 4 },
		{ nota: 'G', linha: 0 },
		{ nota: 'D', linha: 3 },
		{ nota: 'A', linha: 6 },
		{ nota: 'E', linha: 2 },
		{ nota: 'B', linha: 5 }
	];
	static ordemBemol:any[] = [
		{ nota: 'B', linha: 5 },
		{ nota: 'E', linha: 2 },
		{ nota: 'A', linha: 6 },
		{ nota: 'D', linha: 3 },
		{ nota: 'G', linha: 7 },
		{ nota: 'C', linha: 4 },
		{ nota: 'F', linha: 8 }
	];
	
	static getArmadura(key: string)
	{
		let armadura: Armadura = new Armadura;
		
		let n: number;
		if (key.toLowerCase() === key)
		{
			n = HelperEscalas.cicloSustenidoMenor.indexOf(key);
			if (n < 0)
			{
				n = this.cicloBemolMenor.indexOf(key);
				armadura.tipo = 'b';
			}
			else
			{
				armadura.tipo = '#';
			}
			//n--;
		}
		else
		{
			n = HelperEscalas.cicloSustenido.indexOf(key);
			if (n < 0)
			{
				n = this.cicloBemol.indexOf(key);
				armadura.tipo = 'b';
			}
			else
			{
				armadura.tipo = '#';
			}
		}
		if (n < 0) return null;
		
		let ordem:any[] = (armadura.tipo == '#') ? this.ordemSustenido : this.ordemBemol;
		armadura.notas = [];
		
		for (let i = 0; i < n; i++)
		{
			armadura.notas.push(ordem[i]);
		}
		
		return armadura;
	}
	
	static getMenor(key: string, tipo: string = '#')
	{
		let notas: string[] = (tipo == 'b') ? HelperEscalas.notasBemol : HelperEscalas.notas;
		//console.log(tipo, notas);
		let i: number = notas.indexOf(key);
		let j: number = i - 3;
		if (j < 0)
		{
			j += HelperEscalas.notas.length;
		}
		let menor: string = notas[j];
		//console.log(key, i, j, menor);
		return menor.toLowerCase();
	}
}