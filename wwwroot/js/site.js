function click() {
    if ((e.which != 1)) {
        e.preventDefault();
    }
}

toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toastr-top-center",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
};

function SwalSessionExpirada() {
    var ErrorMessege =  "La Session ha Expirado!";

    let timerInterval
    Swal.fire({
        title: ErrorMessege,
        html: '-> Login...',
        allowEscapeKey: false,
        allowOutsideClick: false,
        timer: 4000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading()
            const b = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
                b.textContent = Swal.getTimerLeft()
            }, 100)
        },
        willClose: () => {
            clearInterval(timerInterval)
            location.reload()
        }
    }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer')
        }
    })
}

function SystemServerError() {
    var ErrorMessege = "Error de servidor, por favor contacta al administrador!";

    toastr.error(ErrorMessege);
}

function ValidarModalCambiarPassword() {
    $.ajax({
        url: "/Profile/ValidarModalCambiarPassword",
        type: "post",
        data: {
            Ajax: 1,
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader("XSRF-TOKEN",
                $('input:hidden[name="__RequestVerificationToken"]').val());
        },
    }).done(function (result) {
        if (result != null) {

            if (result != "Ok")
            {
                document.getElementById("kt_signin_change_password").reset();
                $("input").removeClass("is-valid").removeClass("is-invalid");
                $('[data-field]').remove();

                $('#kt_signin_password_edit').modal('show');
            }
        }
        else {
            SystemServerError()
        }
    }).fail(function (xhr, status, error) {
        SystemServerError()
    })
}


//Bloquea la pantalla para que ya no pueda hacer nada -BlockPantalla.block() , -BlockPantalla.release()
var target = document.querySelector("#BlockPantalla");
var BlockPantalla = new KTBlockUI(target, {
    message: '<div class="blockui-message"> <span class="badge py-3 px-4 fs-7 badge-light-primary"> <span class="spinner-border text-primary"></span> Cargando...</span></div>',
});
