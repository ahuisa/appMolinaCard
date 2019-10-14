'use strict';
export var url_base = "https://api.munimolina.gob.pe";
export var endpoint_login = '/login';
export var endpoint_beneficios = '/beneficios';
export var endpoint_ini_beneficios = '/beneficios/iniRegi';
export var endpoint_iniAct_beneficios = '/beneficios/iniActu';
export var endpoint_empresas = '/empresas';
export var endpoint_ini_empresas = '/empresas/iniRegi';
export var endpoint_iniAct_empresas = '/empresas/iniActu';
export var endpoint_personas = '/personas';
export var endpoint_ini_personas = '/personas/iniRegi';
export var endpoint_personas_editar = '/personas/iniActu';
export var endpoint_usuarios = '/usuarios';
export var endpoint_usuario_login = '/usuarios/getUsuarioLogin';
export var endpoint_ini_usuarios = '/usuarios/iniRegi';
export var endpoint_usuarios_consultar = "/usuarios/getUsuario";
export var endpoint_usuario_persona = "/usuarios/getPerEmp";
export var endpoint_usuario_contribuyente = "/usuarios/getContribuyente";
export var endpoint_iniAct_usuarios = '/usuarios/iniActu';
export var endpoint_beneficios_empresa = '/beneficios/iniBeneficiosByEmpresa';
export var endpoint_validar = '/beneficios/canjear';
export var endpoint_contrasena = '/public/restablecerContrasena';
export var dtOptions = {
    pagingType: 'full_numbers',
    language: {
        'lengthMenu': 'Mostrar _MENU_ registros por página',
        'zeroRecords': 'No hay registros disponibles',
        'info': 'Mostrando _PAGE_ de _PAGES_',
        'infoEmpty': 'No hay registros disponibles',
        'infoFiltered': '(filtrando de _MAX_ registros totales)',
        'search': 'Buscar:',
        'paginate': {
            'first': 'Primero',
            'last': 'Último',
            'next': 'Siguiente',
            'previous': 'Anterior'
        },
    },
    responsive: true
};
//# sourceMappingURL=variables.js.map