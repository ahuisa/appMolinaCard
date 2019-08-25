import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
	
	user: any;

	lstMenu = [
		{ 'router': '/beneficios-empresa', 'label': 'Beneficios', 'visible': false },
		{ 'router': '/beneficios', 'label': 'Beneficios', 'visible': false },
		{ 'router': '/empresas', 'label': 'Empresas', 'visible': false },
		{ 'router': '/personas', 'label': 'Personas', 'visible': false },
		{ 'router': '/usuarios', 'label': 'Usuarios', 'visible': false }
  ];

  constructor() { }

  ngOnInit() {
  	this.user = JSON.parse(localStorage.getItem('user'));
  	for (var e = 0; e < this.user.lstRol.length; e++) {
  		let item = this.user.lstRol[e];
  		if(item.idRol == 1){
		  	this.lstMenu[1].visible = true;
		  	this.lstMenu[2].visible = true;
		  	this.lstMenu[3].visible = true;
		  	this.lstMenu[4].visible = true;
  		} else if(item.idRol == 3) {
		  	this.lstMenu[1].visible = true;
		  	this.lstMenu[2].visible = true;
		  	this.lstMenu[3].visible = true;
		  	this.lstMenu[4].visible = true;

  		} else if(item.idRol == 2) {
		  	this.lstMenu[0].visible = true;
  		}
  	};
  }

}
