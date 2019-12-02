import Swal from 'sweetalert2';

export default class MessagesUtill {
    static errorMessage(message: string) {
        Swal.fire({
            type: 'error',
            title: 'Error',
            text: message
        });
    }

    static infoMessage(message: string) {
        Swal.fire({
            type: 'info',
            title: 'Información',
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
            // icon: 'warning',
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

    static getMessageError(code: number): string {
        let message = '';

        switch (code) {
            case 400: message = 'El servicio no esta disponible'; break;
            case 500: message = 'El servicio no esta disponible'; break;
        }
        return '';
    }
}
