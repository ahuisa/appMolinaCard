import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import {AgregarPersonaComponent } from './agregar/agregar.component';
import {EditarPersonaComponent } from './editar/editar.component';
import { PersonaService } from '../../services/persona.service';
import { Persona } from '../../interfaces/persona';
import { Router, ActivatedRoute } from '@angular/router';
import * as variables from '../../utils/variables';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-mant-persona',
  templateUrl: './mant-persona.component.html',
  styleUrls: ['./mant-persona.component.scss']
})
export class MantPersonaComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = variables.dtOptions;

  dtTrigger: Subject<any> = new Subject();
	
	lstPersona: Persona[];
  modalOption: NgbModalOptions = {}; 

  constructor(private modalService: NgbModal,
    private personaService: PersonaService,
    private route: ActivatedRoute,
    private router: Router) {}

  abrirAgregar() {
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;
    this.modalOption.size = 'lg';
    const modalRef = this.modalService.open(AgregarPersonaComponent, this.modalOption);
    modalRef.result.then((result) => {
      this.listar();
    });
  }
  ngOnInit() {
    this.listar();
  }

  listar(){
    this.personaService.listar().subscribe(res => {
      this.lstPersona = res;
      this.rerender();
    }, error => {
      if(error.status == 403){
        this.router.navigate(['/login']);
      }
    });
  }
  cargarPersona(idTipoDocu, nroDocu){
    console.log(idTipoDocu);
    console.log(nroDocu);
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;
    this.modalOption.size = 'lg';

    let persona = {
      'idTipoDocu' : idTipoDocu,
      'nroDocu' : nroDocu
    }

    const modalRef = this.modalService.open(EditarPersonaComponent, this.modalOption);
    modalRef.componentInstance.persona = persona;
    modalRef.result.then((result) => {
      this.listar();
    });
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }
}
