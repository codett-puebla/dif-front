
// VARIABLES DE CONEXIÓN LOCAL
// export  const SERVER = 'http://localhost';
// export  const PORT = ':8080';
// export  const BASE_PATH = '/';

//VARIABLES DE CONEXIÓN SERVIDOR/
export  const SERVER = 'http://165.22.2.168';
export  const PORT = ':8080';
export  const BASE_PATH = '/DIFAPI/';

export const ADMIN = 2;

export const USER = 1;

export  const MODULES = [
    {
        name: 'Usuarios', icon: 'fa fa-user', route: 'user', permission: 2
    },

    {
        name: 'Beneficiarios', icon: 'fa fa-users', route: 'clients', permission: 2
    },

    {
        name: 'Artículos', icon: 'fa fa-money', route: 'item', permission: 2
    },

    {
        name: 'Bodegas', icon: 'fa fa-home', route: 'warehouse', permission: 2
    },

    {
        name: 'Inventario', icon: 'fa fa-bar-chart', route: 'inventory', permission: 1
    },

    {
        name: 'Historial', icon: 'fa fa-history', route: 'transaction', permission: 1
    },

    {
        name: 'Entradas', icon: 'fa fa-arrow-circle-o-right', route: 'entry', permission: 1
    },

    {
        name: 'Salidas', icon: 'fa fa-arrow-circle-o-left', route: 'departure', permission: 1
    },
];
