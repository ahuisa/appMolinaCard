import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AutenticacionService } from '../../services/autenticacion.service';
import { first } from 'rxjs/operators';	

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;
	submitted = false;
	loading = false;
	error = '';
	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private autenticacionService: AutenticacionService
	) { }

	ngOnInit() {
		this.loginForm = this.formBuilder.group({
			username: ['', [Validators.required, Validators.minLength(4)]],
			password: ['', Validators.required]
		});
	}

	get f() { return this.loginForm.controls; }
	
	onSubmit() {
		this.submitted = true;
		this.error = '';
		if (this.loginForm.invalid) {
			return;
		}
		this.loading = true;
		this.autenticacionService.login(this.f.username.value, this.f.password.value)
			.pipe(first())
			.subscribe(
					data => {
						this.autenticacionService.getUsuario(this.f.username.value).subscribe(res => {
							localStorage.setItem('user', JSON.stringify(res));
							let flagEmpresa = false;
							for (var i = 0; i < res.lstRol.length; i++) {
								if(res.lstRol[i].idRol == 2){
									flagEmpresa = true;
								}
							};
							if(flagEmpresa)
								this.router.navigate(['/beneficios-empresa']);
							else
								this.router.navigate(['/beneficios']);
						}, error => {
							if(error.status == 401){
								this.error = 'Servicio no disponible';
							}
						});
					},
					error => {
						this.error = 'Usuario no existe';
						this.loading = false;
					});
	}
}
