import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.component.html',
  styleUrls: ['./eliminar.component.scss']
})
export class EliminarLocalComponent implements OnInit {
	
	@Input() public index: number;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }
  confirmar(){
  	this.activeModal.close(this.index);
  }
}
