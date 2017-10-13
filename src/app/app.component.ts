import { Component } from '@angular/core';

import { ConfigService } from './services/config.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent
{
	title = 'Teoria Musical';
	menuItems = [
		{
			url: '/notas',
			label: "Notas e intervalos"
		},
		{
			url: '/escalas',
			label: "Escalas e Chaves"
		},/*
		{
			url: '/intervalos',
			label: "Intervalos"
		},// */
		{
			url: '/acordes',
			label: "Acordes"
		}
	];
	tempo = this.config.tempo;
	
	constructor (
		private config: ConfigService
	) {}
	
	public setTempo(e)
	{
		let t:number = e.target.value;
		this.tempo = t;
		this.config.tempo = t;
	}
}
