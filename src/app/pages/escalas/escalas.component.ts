import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-escalas',
  templateUrl: './escalas.component.html',
  styleUrls: ['./escalas.component.scss']
})
export class EscalasComponent implements OnInit
{
  constructor()
	{}
	
	menu = [
		{ label: "Chaves", url: '/escalas/chaves' },
		{ label: "Escalas", url: '/escalas/escalas' },
		{ label: "Modos", url: '/escalas/modos' },
	]
	
  ngOnInit()
	{}
	
}
