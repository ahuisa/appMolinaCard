import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrls: ['./modal-imagen.component.scss']
})
export class ModalImagenComponent {

  @Input() urlImagen;
  constructor(public activeModal: NgbActiveModal) {}
  cerrar(){
    this.activeModal.close('');
  }
}
