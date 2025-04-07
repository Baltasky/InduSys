

jQuery(document).ready(function ($) {
    var images = [
        "/Images/SystemPictures/Login/fondo1.jpg",
        "/Images/SystemPictures/Login/fondo2.jpg",
        "/Images/SystemPictures/Login/fondo3.jpg",
        "/Images/SystemPictures/Login/fondo4.jpg",
        "/Images/SystemPictures/Login/fondo5.jpg",
        "/Images/SystemPictures/Login/fondo6.jpg",
    ];

    var currentIndex = 0;
    var bodyElement = document.querySelector("body");

    function loadBackgroundImage(url) {
        return new Promise(function (resolve, reject) {
            var img = new Image();
            img.src = url;
            img.addEventListener("load", function () {
                resolve();
            });
            img.addEventListener("error", function () {
                reject();
            });
        });
    }

    function changeBackgroundImage() {
        var imageUrl = images[currentIndex];
        loadBackgroundImage(imageUrl)
            .then(function () {
                bodyElement.style.backgroundImage = "url('" + imageUrl + "')";
                currentIndex++;
                if (currentIndex >= images.length) {
                    currentIndex = 0;
                }
            })
            .catch(function () {
                console.log("Error al cargar la imagen de fondo: " + imageUrl);
            });
    }

    changeBackgroundImage();
    setInterval(changeBackgroundImage, 4000);
});
function Login() {

    $.ajax({
        url: "/Login/Index",
        type: "POST",
        data: {
            Usuario: $('#Usuario').val(),
            Password: $('#Password').val()
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader("XSRF-TOKEN",
                $('input:hidden[name="__RequestVerificationToken"]').val());
        },
    }).done(function (result) {
        if (result != null) {
            if (result == "Correcto") {
                window.location.href = "/";
            }
            else {

                $("#DescMensaje").text("Usuario o contraseña incorrectos.")

                ButtonLogin.disabled = false;
            }
        }
    }).fail(function (xhr, status, error) {
      /*  SystemServerError()*/
        ButtonLogin.disabled = false;
    })
}

var BlockChangePass = document.querySelector("#BlockChangePass");
var BlockModalChangePass = new KTBlockUI(BlockChangePass, {
    message: '<div class="blockui-message"><span class="spinner-border text-primary"></span> Loading...</div>',
});

function AbrirModalRecuperarPassword() {
    $('#email').val("");
    $("input").removeClass("is-valid").removeClass("is-invalid");
    $('[data-field]').remove();
    $("#ModalRecuperarPassword").modal("show");
}

function RecuperarPassword() {
    var Correo = $('#email').val();

    BlockModalChangePass.block()

    $.ajax({
        type: 'POST',
        url: "Login/RecuperarPassword",
        data: {
            Correo: Correo,
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader("XSRF-TOKEN",
                $('input:hidden[name="__RequestVerificationToken"]').val());
        },
    }).done(function (result) {
        if (result != null) {
            if (result == "Correcto") {
                BlockModalChangePass.release()
                ButtonRecuperarPassword.disabled = false;
                $("#ModalRecuperarPassword").modal("hide");
                Swal.fire({
                    text: "Revisa la bandeja de tu correo.",
                    icon: "success",
                    buttonsStyling: false,
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    confirmButtonText: "Ok!",
                    customClass: {
                        confirmButton: "btn btn-primary"
                    }
                }).then((result) => {
                    if (result.isConfirmed) {
                    }
                });
            }
            else {
                BlockModalChangePass.release()
                ButtonRecuperarPassword.disabled = false;
                $("#ModalRecuperarPassword").modal("hide");
                Swal.fire({
                    text: "El usuario no existe, envía un correo al administrador.",
                    icon: "warning",
                    buttonsStyling: false,
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    confirmButtonText: "Ok!",
                    customClass: {
                        confirmButton: "btn btn-primary"
                    }
                }).then((result) => {
                    if (result.isConfirmed) {
                    }
                });
            }
        }
    }).fail(function (xhr, status, error) {
       /* SystemServerError()*/
        BlockModalChangePass.release()
    })
}

var ErrorMessege = "El campo es requerido.";
//Form validation Login
var ValidarLogin = document.getElementById('ValidarLogin');
var ButtonLogin = document.getElementById('ButtonLogin');
var validatorNewRew = FormValidation.formValidation(
    ValidarLogin,
    {
        fields: {
            'Usuario': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            },
            'Password': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            }
        },

        plugins: {
            trigger: new FormValidation.plugins.Trigger(),
            bootstrap: new FormValidation.plugins.Bootstrap5({
                rowSelector: '.fv-row',
                eleInvalidClass: '',
                eleValidClass: ''
            })
        }
    }
);

ButtonLogin.addEventListener('click', function (e) {

    $("input").removeClass("is-valid").removeClass("is-invalid");
    $('[data-field]').remove();

    e.preventDefault();
    if (validatorNewRew) {
        validatorNewRew.validate().then(function (status) {
            if (status == 'Valid') {
                ButtonLogin.setAttribute('data-kt-indicator', 'on');

                ButtonLogin.disabled = true;
                setTimeout(function () {
                    ButtonLogin.removeAttribute('data-kt-indicator');

                    Login()

                }, 1000);
            }
            else {
                ButtonLogin.setAttribute('data-kt-indicator', 'on');
                ButtonLogin.disabled = true;

                setTimeout(function () {
                    ButtonLogin.removeAttribute('data-kt-indicator');
                    ButtonLogin.disabled = false;

                }, 100);
            }
        });
    }
});

/*Form validation Login*/
var FormRecuperarPassword = document.getElementById('FormRecuperarPassword');
var ButtonRecuperarPassword = document.getElementById('ButtonRecuperarPassword');
var ValidateRecuperarPassword = FormValidation.formValidation(
    FormRecuperarPassword,
    {
        fields: {
            'email': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            }

        },

        plugins: {
            trigger: new FormValidation.plugins.Trigger(),
            bootstrap: new FormValidation.plugins.Bootstrap5({
                rowSelector: '.fv-row',
                eleInvalidClass: '',
                eleValidClass: ''
            })
        }
    }
);

ButtonRecuperarPassword.addEventListener('click', function (e) {

    $("input").removeClass("is-valid").removeClass("is-invalid");
    $('[data-field]').remove();

    var ErrorMessege = "El campo es requerido.";

    e.preventDefault();
    if (ValidateRecuperarPassword) {
        ValidateRecuperarPassword.validate().then(function (status) {
            if (status == 'Valid') {
                ButtonRecuperarPassword.setAttribute('data-kt-indicator', 'on');

                ButtonRecuperarPassword.disabled = true;
                setTimeout(function () {
                    ButtonRecuperarPassword.removeAttribute('data-kt-indicator');

                    RecuperarPassword()

                }, 1000);
            }
            else {
                ButtonRecuperarPassword.setAttribute('data-kt-indicator', 'on');
                ButtonRecuperarPassword.disabled = true;

                setTimeout(function () {
                    ButtonRecuperarPassword.removeAttribute('data-kt-indicator');
                    ButtonRecuperarPassword.disabled = false;

                }, 100);
            }
        });
    }
});
