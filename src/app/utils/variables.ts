'use strict';

export const url_base = "https://api.munimolina.gob.pe";

export const endpoint_login = '/login';

export const endpoint_beneficios = '/beneficios';
export const endpoint_ini_beneficios = '/beneficios/iniRegi';
export const endpoint_iniAct_beneficios = '/beneficios/iniActu';

export const endpoint_empresas = '/empresas';
export const endpoint_ini_empresas = '/empresas/iniRegi';
export const endpoint_iniAct_empresas = '/empresas/iniActu';

export const endpoint_personas = '/personas';
export const endpoint_ini_personas = '/personas/iniRegi';
export const endpoint_personas_editar = '/personas/iniActu';

export const endpoint_usuarios = '/usuarios';
export const endpoint_usuario_login = '/usuarios/getUsuarioLogin';
export const endpoint_ini_usuarios = '/usuarios/iniRegi';
export const endpoint_usuarios_consultar = "/usuarios/getUsuario";
export const endpoint_usuario_persona = "/usuarios/getPerEmp";
export const endpoint_usuario_contribuyente = "/usuarios/getContribuyente";
export const endpoint_iniAct_usuarios = '/usuarios/iniActu';

export const endpoint_beneficios_empresa = '/beneficios/iniBeneficiosByEmpresa';
export const endpoint_validar = '/beneficios/canjear';
export const endpoint_contrasena = '/usuarios/restablecerContrasena'

export const dtOptions = {
	pagingType: 'full_numbers',
	language: {
		'lengthMenu': 'Mostrar _MENU_ registros por página',
		'zeroRecords': 'No hay registros disponibles',
		'info': 'Mostrando _PAGE_ de _PAGES_',
		'infoEmpty': 'No hay registros disponibles',
		'infoFiltered': '(filtrando de _MAX_ registros totales)',
		'search':         'Buscar:',
		'paginate': {
			'first':      'Primero',
			'last':       'Último',
			'next':       'Siguiente',
			'previous':   'Anterior'
		},
	}
};