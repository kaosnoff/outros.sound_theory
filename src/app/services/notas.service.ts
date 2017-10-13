import { Injectable } from '@angular/core';
import { EventEmitter} from '@angular/core';

import { Observer, Observable, BehaviorSubject } from 'rxjs/Rx';
//import {Observable} from 'rxjs/Observable';

import { ConfigService } from './config.service';



// Documentação em: https://github.com/bit101/tones
declare var tones:any;

@Injectable()
export class NotasService
{
	tones = tones;
	playing:boolean = false;
	
	teclas:Array<Nota> = [];
	
	//partitura:Array<Nota> = [];
	
	//nota:Observable<Nota>;
	//notaObs:Observer<Nota>;
	nota:BehaviorSubject<Nota> = new BehaviorSubject(new Nota(-1,0));
	
	constructor(
		private config: ConfigService
	)
	{
		//this.nota.next(null);
		/*
		this.nota.value.complete.subscribe(complete =>
		{
			console.log('complete',complete);
		});
		// */
		//this.nota = new Observable(observer => this.notaObs = observer);
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
	
	stop()
	{
		let nota = this.nota.value;
		nota.stop();
		/*this.nota.subscribe(nota => {
			nota.stop();
		});
		// */
	}
	
	play(args:string | Nota | Array<Nota>, params: any = null)
	{
		this.stop();
		
		let notas:Array<Nota>;
		let duration:number = (params != null && params.hasOwnProperty('duration')) ? (params.duration) : 8;
		let oitava:number = (params != null && params.hasOwnProperty('oitava')) ? (params.oitava) : 3;
		
		let tipo:string = typeof(args) as string;
		
		if (tipo === "string")
		{
			notas = this.toSong(args as string,{ duration: duration, oitava: oitava });
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
		
		for (let i = 0; i < notas.length; i++)
		{
			let nota0 = notas[i];
			let nota1 = notas[i+1];
			
			nota0.playing.subscribe(v =>
			{
				if (v) this.nota.next(nota0);
				return v;
			});
			
			if (nota1 == undefined) break;
			
			nota0.next = nota1;
			
			notas[i] = nota0;
		}
		
		if (notas.length > 0)
		{
			notas[0].play();
		}
	}
	/*
	private playNotes()
	{
		let nota:Nota = this.partitura.shift();
		
		this.playing = true;
		
		if (!nota || nota == undefined)
		{
			this.playing = false;
			return;
		}
		
		if (this.teclas)
		{
			let tecla = this.teclas.filter(item => (item.nome == nota.nome && item.oitava == nota.oitava));
			if (tecla.length > 0)
			{
				tecla[0].duration = nota.duration;
				nota = tecla[0];
			}
		}
		
		//this.notaObs.next(nota);
		this.nota.next(nota);
		
		if (nota.oitava > 9)
		{
			nota.oitava = 9;
		}
		/*
		nota.complete.subscribe(complete => 
		{
			if (!complete) return complete;
			console.log(nota, complete)
			//nota.complete.unsubscribe();
			if (complete) this.playNotes();
			return complete;
		});
		// */ /*
		nota.play();
		
		return this;
	}
	// */
	toSong(notasString:string,params: any):Array<Nota>
	{
		let notas:Array<Nota> = new Array<Nota>();
		
		let duration:number = (params.hasOwnProperty('duration')) ? (params.duration) : 4;
		let oitava:number = (params.hasOwnProperty('oitava')) ? (params.oitava) : 3;
		
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
			
			let oit = Number(prox);
			if (!isNaN(oit))
			{
				oitava = oit;
				cur++;
			}
			// */
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
	public grau:number = 0;
	//public freq: number = 132.0;
	public _duration: number = 4;
	public bpm:number = 100;
	
	public playing:BehaviorSubject<boolean> = new BehaviorSubject(false);
	
	private pausa:boolean = false;
	private _next:Nota = null;
	
	public complete:BehaviorSubject<boolean> = new BehaviorSubject(false);
	
	//private baseFreq: number = 33.0;
	//private interval = null;
	//private sound:OscillatorNode = null;
	//private audioContext:AudioContext;
	private timeout = null;
	
	constructor (altura:number, oitava:number,params:any = null)
	{
		this.complete.next(false);// = new Observable(observer => this.completeObs = observer);
		
		if (params != null && params.hasOwnProperty('duration'))
		{
			this.duration = params.duration;
		}
		
		if (altura < 0)
		{
			this.pausa = true;
			this.nome = 'P';
			this.grau = 3.5;
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
			
			this.grau = (altura < 5) ? (Math.floor(altura / 2)/2) : (Math.floor((altura + 1) / 2)/2);
			
			
		}
		
		//this.freq = this.getFreq(altura,oitava);
	}
	
	set duration(v:number)
	{
		this._duration = Math.max(1,Math.round(v));
	}
	get duration():number
	{
		return this._duration;
	}
	
	static naturais:Array<number> = [
		0,2,4,5,7,9,11
	];
	
	static listaNotas:Array<string> = [
		'C','C#','D','D#','E','F','F#','G','G#','A','A#','B'
	];
	/*
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
	//*/
	
	public play():void
	{
		let tempoMs: number = (60000/this.bpm) * (1/this.duration);
		//this.complete = new Observable(observer => {this.completeObs = observer; console.log(observer)});
		this.complete.next(false);
		clearTimeout(this.timeout);
		
		if (this.pausa)
		{
			
		}
		else
		{
			tones.type = 'sine'; // "sine", "square", "sawtooth" or "triangle"
			tones.attack = 10;
			tones.release = tempoMs;
			if (this.oitava < 10)
			{
				tones.play(this.nome,this.oitava);
			}
			
			this.playing.next(true);
			
		}
		this.timeout = setTimeout(() => {
			//this.stop();
			this.onComplete();
		},tempoMs * 5);
	}
	public stop():void
	{
		//console.log('stop');
		this.playing.next(false);
		clearTimeout(this.timeout);
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
	
	set next(nota:Nota)
	{
		this._next = nota;
		this.complete.subscribe(complete =>
		{
			if (complete) {
				this._next.play();
			}
			return complete;
		});
	}
	get next():Nota
	{
		return this._next;
	}
	
	public onComplete()
	{
		/*
		if (this.completeObs !== undefined)
		{
			this.completeObs.next(Observable.of(false));
		}
		// */
		//this.playing = false;
		this.playing.next(false);
		this.complete.next(true);
	}
	
	public getIntervalo(intervalo:number):Nota
	{
		let nota:Nota = new Nota(this.altura + intervalo,this.oitava);
		
		return nota;
	}
	/*
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
	// */
	
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
export class Escalas
{
	cicloSustenido:string[] = [
		'C','G','D','A','E','B'
	];
	cicloBemol:string[] = [
		'F','Bb','Eb','Ab','Db','Gb'
	];
	notas: string[] = [
		'C','C#','D','D#','E','F','F#','G','G#','A','Bb','B'
	];
	notasBemol: string[] = [
		'C','Db','D','Eb','E','F','Gb','G','Ab','A','Bb','B'
	];
}