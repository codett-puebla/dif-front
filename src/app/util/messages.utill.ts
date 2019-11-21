import Swal from 'sweetalert2';

export default class MessagesUtill {
    static errorMessage(tittle: string, message: string) {
        Swal.fire({
            type: 'error',
            title: 'Error: ' + tittle,
            text: message
        });
    }

    static infoMessage(tittle: string, message: string) {
        Swal.fire({
            type: 'info',
            title: tittle,
            text: message
        });
    }

    static successMessage(tittle: string, message: string) {
        Swal.fire({
            type: 'success',
            title: tittle,
            text: message
        });
    }

    static deleteMessage(id: number, callback: any) {
        Swal.fire({
            title: '¿Deseas eliminar el registro?',
            text: 'Se eliminara de manera permanente',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.value) {
                Swal.fire(
                    'Eliminado!',
                    'Se a eliminado correctamente',
                    'success'
                );
                callback(id);
            }
        });
    }
}
