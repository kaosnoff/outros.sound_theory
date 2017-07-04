import { Injectable } from '@angular/core';
import { EventEmitter} from '@angular/core';

import { Observer, Observable } from 'rxjs/Rx';
//import {Observable} from 'rxjs/Observable';

import { ConfigService } from './config.service';



// Documentação em: https://github.com/bit101/tones
declare var tones:any;

@Injectable()
export class NotasService
{
	tones = tones;
	
	teclas:Array<Nota> = [];
	
	constructor(
		private config: ConfigService
	)
	{
		
	}
	
	public getEscala(base:Nota,oitavas:number):Array<Nota>
	{
		let escala:Array<Nota> = new Array<Nota>();
		
		let i = 0;
		let oitava = 0;
		for (oitava=base.oitava;oitava < oitavas + base.oitava; oitava++)
		{
			for (i=0;i<12;i++)
			{
				let nota:Nota = new Nota(i,oitava);
				escala.push(nota);
			}
		}
		let nota:Nota = new Nota(i,oitava-1);
		escala.push(nota);
		return escala;
	}
	
	play(args:string | Nota | Array<Nota>, params: any = null)
	{
		let notas:Array<Nota>;
		let duration:number = (params.hasOwnProperty('duration')) ? (params.duration) : 4;
		
		let tipo:string = typeof(args) as string;
		
		if (tipo === "string")
		{
			notas = this.toSong(args as string,duration);
		}
		else if (tipo === "Nota")
		{
			notas = new Array<Nota>();
			notas.push(args as Nota);
		}
		else
		{
			notas = args as Nota[];
		}
		//console.log(notas);
		
		this.playNotes(notas);
		
	}
	private playNotes(notas:Array<Nota>)
	{
		let nota:Nota = notas.shift();
		
		if (!nota || nota == undefined) return;
		
		if (this.teclas)
		{
			//console.log(this.teclas.indexOf(nota));
		}
		
		nota.play();
		nota.complete.subscribe(complete => {
			this.playNotes(notas);
		});
		return this;
	}
	
	toSong(notasString:string,duration: number):Array<Nota>
	{
		let notas:Array<Nota> = new Array<Nota>();
		
		let oitava:number = 3;
		
		let lista:Array<string> = Nota.listaNotas;
		
		//let escala:Array<Nota> = this.getEscala(base,1);
		
		let cur = 0;
		let i = 0;
		let nota:Nota;
		while (cur < notasString.length)
		{
			let char = notasString[cur];
			let prox = notasString[cur + 1];
			
			if (prox == '#')
			{
				char += '#';
				cur++;
			}
			
			char = char.toUpperCase();
			let altura = lista.indexOf(char);
			
			if (char == '.')
			{
				nota.duration -= duration/4;
				notas[i-1] = nota;
			}
			else
			{
				nota = new Nota(altura,oitava);
				nota.duration = duration;
				nota.bpm = this.config.tempo;
				notas[i] = nota;
				i++;
			}
			cur++;
		}
		
		return notas;
	}
	
	public mysong()
	{
		let tones = this.tones;
		
		tones.type = 'square';
		
		tones.release = 500;
		tones.play('e',2);
		tones.play('b',2);
		tones.play('e',3);
	}
}

export class Nota
{
	public altura: number = 0;
	public oitava:number = 2;
	public nome: string = 'C';
	public accid: string = '';
	//public freq: number = 132.0;
	public duration: number = 4;
	public bpm:number = 100;
	
	public playing:boolean = false;
	
	private pausa:boolean = false;
	
	public complete:Observable<any>;
	public completeObs:Observer<any>;
	
	//private baseFreq: number = 33.0;
	//private interval = null;
	//private sound:OscillatorNode = null;
	//private audioContext:AudioContext;
	private timeout = null;
	
	constructor (altura:number, oitava:number)
	{
		this.complete = new Observable(observer => this.completeObs = observer);
		
		if (altura < 0)
		{
			this.pausa = true;
			this.nome = 'P';
		}
		else
		{
			while (altura > 11)
			{
				oitava++;
				altura = altura - 12;
			}
			this.altura = altura;
			this.oitava = oitava;
			
			let tmp = Nota.listaNotas[altura];
			this.nome = tmp;
			
			if (Nota.naturais.indexOf(altura) < 0)
			{
				this.accid = '#';
			}
		}
		
		//this.freq = this.getFreq(altura,oitava);
	}
	
	static naturais:Array<number> = [
		0,2,4,5,7,9,11
	];
	
	static listaNotas:Array<string> = [
		'C','C#','D','D#','E','F','F#','G','G#','A','A#','B'
	];
	static listaRelacoes = [
		1.000,
		1.059,
		1.122,
		1.189,
		1.260,
		1.335,
		1.414,
		1.498,
		1.587,
		1.682,
		1.782,
		1.888
	];
	
	public play():void
	{
		let tempoMs: number = (60000/this.bpm) * (1/this.duration);
		//this.complete = new Observable(observer => {this.completeObs = observer; console.log(observer)});
		//console.log(tempoMs);
		//console.log(this.completeObs);
		if (this.pausa)
		{
			
		}
		else
		{
			tones.type = 'sine'; // "sine", "square", "sawtooth" or "triangle"
			tones.attack = 10;
			tones.release = tempoMs;
			tones.play(this.nome,this.oitava);
			
			this.playing = true;
			
		}
		this.timeout = setTimeout(() => {
			this.stop();
			this.onComplete();
		},tempoMs * 5);
	}
	public stop():void
	{
		//console.log('stop');
		this.playing = false;
		/*
		if (!this.sound) return;
		
		this.sound.stop();
		this.sound.disconnect();
		this.audioContext.close();
		this.audioContext = null;
		
		this.sound = null;
		this.interval = null;
		// */
	}
	public onComplete()
	{
		//console.log(this.completeObs);
		if (this.completeObs !== undefined)
		{
			this.completeObs.next(Observable.of(false));
		}
	}
	
	public song()
	{
        tones.type = "square";
        tones.attack = 20;
        tones.release = 200;

        var notes = "ccggaag-ffeeddc-ggffeed-ggffeed-ccggaag-ffeeddc-----",
            timing = 300,
            index = 0;

        var prevTime = tones.getTimeMS();
        var elapsed = 0;
		
		var running = true;
		
        play();
		
        function play()
		{
			var now = tones.getTimeMS();
            elapsed += now - prevTime;
            if(elapsed > timing) {
                elapsed -= timing;
                var note = notes.charAt(index);
                if(note !== "-") {
                    tones.play(note);
                }
                index++;
                index %= notes.length;
            }
			
            prevTime = now;
            if(running)
               requestAnimationFrame(play);
        }
    }
	
}