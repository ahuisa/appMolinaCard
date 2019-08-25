export interface Usuario {
	idTipoDocu: string;
	nroDocu: string;
	idTipoDocuPadre: string;
	nroDocuPadre: string;
	username: string;
	password: string;
	idTipoUsuario: string;
	verificado: boolean;
	validado: boolean;
	lstRol: any[];
}
