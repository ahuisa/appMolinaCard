import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-msesion',
  templateUrl: './msesion.component.html',
  styleUrls: ['./msesion.component.scss']
})
export class MsesionComponent implements OnInit {

	user: any;
  constructor(private route: ActivatedRoute,
							private router: Router) { }

  ngOnInit() {
  	this.user = JSON.parse(localStorage.getItem('user'));
  }

  cerrar(){
  	localStorage.clear();
  	this.router.navigate(['/login']);
  }

}
