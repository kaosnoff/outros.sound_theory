import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';

import { PianoComponent } from '../../elements/piano/piano.component';

import { ConfigService } from '../../services/config.service';

import { NotasService, Nota } from '../../services/notas.service';

@Component({
	selector: 'app-notas',
	templateUrl: './notas.component.html',
	styleUrls: ['./notas.component.scss']
})
export class NotasComponent implements OnInit
{
	@ViewChild('piano')
	piano: PianoComponent;
	
	teclas:Array<Nota>;
	
	buffer:Array<Nota> = [];
	
	constructor(
		private config:ConfigService,
		private notasService: NotasService
	)
	{
		let baseC:Nota = new Nota(0,0);
		this.teclas = this.notasService.getEscala(baseC,7);
		this.notasService.teclas = this.teclas;
	}
	
	tempo:number = this.config.tempo;
	
	ngOnInit()
	{
		//this.buffer = [];
		
		this.notasService.nota.subscribe(nota =>
		{
			this.buffer.push(new Nota(nota.altura, nota.oitava,{duration: nota.duration}));
		});
		this.buffer = [];
		
		//this.song3();
	}
	
	playSong()
	{
		this.buffer = [];
		//this.piano.playSong();
		let rnd = Math.random();
		
		if (rnd < 0.33) this.song1();
		else if (rnd < 0.66) this.song2();
		else this.song3();
	}
	
	song1()
	{
		this.buffer = [];
		let song:string = 'cdef..ff-cdcd..dd-cgfe..ee-cdef..ff';
		this.notasService.play(song, {duration: 8, oitava: 4});
	}
	
	song2()
	{
		this.buffer = [];
		let song = "ccggaag-ffeeddc-ggffeed-ggffeed-ccggaag-ffeeddc---";
		this.notasService.play(song, {duration: 8, oitava: 4});
	}
	song3()
	{
		this.buffer = [];
		let song = "d3ddg...d4...cb3ag4...d..cb3ag4...d..cb3c4a3...";
		this.notasService.play(song, {duration: 16});
	}
	
	playCicloQuintas()
	{
		this.buffer = [];
		
		let notaBase:Nota = new Nota(0,0);
		
		let song:Array<Nota> = [];
		
		for (let i=0;i<13;i++)
		{
			let nota:Nota = notaBase.getIntervalo(i*7);
			
			song.push(nota);
		}
		
		this.notasService.play(song);
	}
	
	playCicloGenerico(intervalo:number, oitavaBase:number)
	{
		this.buffer = [];
		
		if (!oitavaBase || oitavaBase <= 0) oitavaBase = 0;
		
		let notaBase:Nota = new Nota(0,oitavaBase);
		
		let song:Array<Nota> = [];
		
		for (let i=0;i<13;i++)
		{
			let nota:Nota = notaBase.getIntervalo(i*intervalo);
			
			if (nota.oitava > 9) break;
			
			song.push(nota);
		}
		
		this.notasService.play(song);
	}
}
