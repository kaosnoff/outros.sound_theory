import { Injectable } from '@angular/core';

import { ConfigService } from './config.service';

// Documentação em: https://github.com/bit101/tones
declare var tones:any;

@Injectable()
export class NotasService
{
	tones = tones;
	
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
}

export class Nota
{
	public altura: number = 0;
	public oitava:number = 2;
	public nome: string = 'C';
	public accid: string = '';
	//public freq: number = 132.0;
	public duration: number = 500;
	
	//private baseFreq: number = 33.0;
	//private interval = null;
	//private sound:OscillatorNode = null;
	//private audioContext:AudioContext;
	
	constructor (altura:number, oitava:number)
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
	/*
	private getFreq(altura:number,oitava:number):number
	{
		while (altura > 11)
		{
			oitava++;
			altura -= 12;
		}
		let valor = this.baseFreq;
		for (let i = 0; i < oitava; i++)
		{
			valor *= 2;
		}
		let k = Nota.listaRelacoes[altura];
		
		valor = valor * k;
		//console.log(this.nome+': '+valor.toString());
		return valor;
	}
	*/
	public play():void
	{
		/*
		let maxT:number = 5000;
		var real = new Float32Array(2);
		var imag = new Float32Array(2);
		if(this.audioContext)
		{
			this.audioContext.close();
		}
		this.audioContext = new AudioContext();
		console.log();
		var osc = this.audioContext.createOscillator();
		
		osc.frequency.value = this.freq;
		osc.connect(this.audioContext.destination);
		
		this.sound = osc;
		this.sound.start();
		//*/
		tones.type = 'sine'; // "sine", "square", "sawtooth" or "triangle"
		tones.attack = 10;
		tones.release = this.duration;
		tones.play(this.nome,this.oitava);
	}
	public stop():void
	{
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