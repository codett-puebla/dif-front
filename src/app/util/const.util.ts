
//VARIABLES DE CONEXIÓN LOCAL
export  const SERVER = 'http://localhost';
export  const PORT = ':8080';
export  const BASE_PATH = '/';

//VARIABLES DE CONEXIÓN SERVIDOR
// export  const SERVER = 'http://165.22.2.168';
// export  const PORT = ':8080';
// export  const BASE_PATH = '/DIFAPI/';



export  const MODULES = [
    {
        name: 'Usuarios', icon: 'fa fa-user', route: 'user'
    },

    {
        name: 'Clientes', icon: 'fa fa-users', route: 'clients'
    },

    {
        name: 'Artículos', icon: 'fa fa-money', route: 'item'
    },

    {
        name: 'Bodegas', icon: 'fa fa-home', route: 'warehouse'
    },

    {
        name: 'Inventario', icon: 'fa fa-bar-chart', route: 'inventory'
    },

    {
        name: 'Historial', icon: 'fa fa-history', route: 'transaction'
    },

    {
        name: 'Entradas', icon: 'fa fa-arrow-circle-o-right', route: 'entry'
    },

    {
        name: 'Salidas', icon: 'fa fa-arrow-circle-o-left', route: 'departure'
    },
];
