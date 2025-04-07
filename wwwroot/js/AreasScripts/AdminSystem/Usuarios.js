
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////  FUNCIONES DE ARRANQUE  /////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function () {
    if (window.innerWidth <= 992) { $("#kt_app_sidebar").addClass("app-sidebar flex-column drawer drawer-start"); }
    GetUsuarios()
});

var BlockAddUsuario = document.querySelector("#BlockAddUsuario");
var BlockModalAddUsuario = new KTBlockUI(BlockAddUsuario, {
    message: '<div class="blockui-message"> <span class="badge py-3 px-4 fs-7 badge-light-primary"> <span class="spinner-border text-primary"></span> Validando...</span></div>',
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////  DATATABLES /////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//#region DATATABLES
var TablaUsuarios = function () {
    // Shared variables
    var table;
    var datatable;

    // Private functions
    var initDatatable = function () {

        // Init datatable --- more info on datatables: https://datatables.net/manual/
        datatable = $(table).DataTable({

            "columnDefs": [
                { "targets": 0, "className": "text-center" },
                { "targets": 1, "className": "text-center" },
                { "targets": 2, "className": "text-center" },
            ],
            "scrollY": 600,
            "scrollX": true,
            "info": true,
            'order': [],
            "ordering": false,
            'pageLength': 100,
            'scrollCollapse': true,
            "fixedColumns": {
                leftColumns: 3
            },
            "language": {
                "sProcessing": "Procesando...",
                "sSearch": "Buscar:",
                "sLengthMenu": " _MENU_ ",
                "sInfo": " _START_ al _END_ de _TOTAL_ registros",
                "sInfoEmpty": "Mostrando registros del 0 al 0 de 0 ",
                "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
                "sInfoPostFix": "",
                "sLoadingRecords": "Cargando...",
                "sZeroRecords": "No se encontraron registros",
                "sEmptyTable": "Ningún dato disponible en esta tabla",
                "oPaginate": {
                    "sFirst": "Primero",
                    "sPrevious": "Anterior",
                    "sNext": "Siguiente",
                    "sLast": "Último"
                },
                "oAria": {
                    "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                    "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                }
            }
        });
    }

    // Hook export buttons
    var exportButtons = () => {
        const documentTitle = 'Reporte de empleados';
        var buttons = new $.fn.dataTable.Buttons(table, {
            buttons: [
                {
                    extend: 'copyHtml5',
                    title: documentTitle
                },
                {
                    extend: 'excelHtml5',
                    title: documentTitle
                },
                {
                    extend: 'csvHtml5',
                    title: documentTitle
                },
                {
                    extend: 'pdfHtml5',
                    title: documentTitle
                }
            ]
        }).container().appendTo($('#TablaUsuarios_buttons'));

        // Hook dropdown menu click event to datatable export buttons
        const exportButtons = document.querySelectorAll('#TablaUsuarios_export_menu [TablaUsuarios-export]');
        exportButtons.forEach(exportButton => {
            exportButton.addEventListener('click', e => {
                e.preventDefault();

                const exportValue = e.target.getAttribute('TablaUsuarios-export');
                var target = document.querySelector('div[id="TablaUsuarios_buttons"]');
                target = target.querySelector('.buttons-' + exportValue);
                target.click();
            });
        });
    }

    // Search Datatable --- official docs reference: https://datatables.net/reference/api/search()
    var handleSearchDatatable = () => {
        const filterSearch = document.querySelector('[data-kt-filter="searchEmpleado"]');
        filterSearch.addEventListener('keyup', function (e) {
            datatable.search(e.target.value).draw();
        });
    }

    // Public methods
    return {
        init: function () {
            table = document.querySelector('#TablaUsuarios');

            if (!table) {
                return;
            }

            initDatatable();
            exportButtons();
            handleSearchDatatable();
        }
    };
}();
KTUtil.onDOMContentLoaded(function () {
    TablaUsuarios.init();
});
//#endregion

function makeImageBig(imgElement) {
    // Obtener la fuente de la imagen original
    const src = imgElement.src;

    // Mostrar el contenedor y establecer la imagen grande
    const bigImageContainer = document.getElementById('bigImageContainer');
    const bigImage = document.getElementById('bigImage');
    bigImage.src = src;
    bigImageContainer.style.display = 'flex'; // Mostrarlo como un contenedor flexible
}
function closeBigImage() {
    // Ocultar el contenedor de la imagen grande
    const bigImageContainer = document.getElementById('bigImageContainer');
    bigImageContainer.style.display = 'none';
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////  FUNCIONES //////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//********* Start Funciones globales ****************************************************************************************

//@* Trigger cuando se carga la pagina *@
$(document).ready(function () {
    $(document).ready(function () {
        $('.dataTables_scrollHeadInner').css('min-width', '100%');
    })

    var SeleccionarFila;
})

$(document).ready(function () {
    // Detecta el cambio en los radios
    $('input[name="TipoUsuario"]').change(function () {
        // Asigna el valor del radio seleccionado al input oculto
        $('#TipoChecadaValue').val($(this).val());

        if ($(this).val() == 1) {
            $("#Input-Cliente").removeClass("d-none");
            $("#Input-Personal").addClass("d-none");

        } else {
            $("#Input-Personal").removeClass("d-none");
            $("#Input-Cliente").addClass("d-none");
        }

    });
});

//document.querySelectorAll('[data-selected]').forEach(e => { e.value = e.dataset.selected });

//#region CRUD ACCESO AL SISTEMA
///////////////////////////// CRUD ACCESO AL SISTEMA  /////////////////////////////////////////////////////////////////////
function GetUsuarios() {
    $.ajax({
        url: "/Usuarios/GetUsuarios",
        data: { Ajax: 1 },
        type: "POST",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("XSRF-TOKEN",
                $('input:hidden[name="__RequestVerificationToken"]').val());
        },
    }).done(function (result) {
        if (result != null) {
            if (result == "SessionExpirada") { SwalSessionExpirada() }
            else if (result != "Error") {
                var Obj = JSON.parse(result);

                var tUsuarios = $('#TablaUsuarios').DataTable();
                tUsuarios.clear().draw();

                for (var i = 0; i < Obj.length; i++) {
                    /*   var UsuarioJson = JSON.stringify(Obj[i]).replace(/"/g, '&quot;');*/

                    var Actions = Obj[i].Activo == true ? `<a onclick="DeleteUsuario(${Obj[i].Id})" class="btn btn-light-youtube me-2 p-2 pe-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Eliminar"><i class="fas fa-times fs-7 fw-bold"></i></a>` +
                        `<a onclick="ModalUpdateUsuario(${Obj[i].Id}, '${Obj[i].Usuario}')" class="btn btn-light-warning me-2 p-2 pe-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Editar"><i class="fas fa-edit fs-6 fw-bold"></i></a>`
                        : `<a onclick="ActivarUsuario(${Obj[i].Id})"  class="btn btn-light-success me-2 p-2 pe-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Usuario Visitante"><i class="fas fa-check fs-7 fw-bold"></i></a>` +
                        `<a class="btn btn-light me-2 p-2 pe-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Usuario Inactivo"><i class="fas fa-edit fs-6 fw-bold"></i></a>`;

                    var newRow = tUsuarios.row.add([
                        Actions,
                        Obj[i].Id,
                        `<div class="symbol symbol-35px"><img src="${Obj[i].RutaFoto}" class="rounded-3" alt="user"></div>`,
                        `<a class="text-primary text-hover-primary" onclick="ModalPermisosUsuario(${Obj[i].Id})"> ${Obj[i].Usuario}</a>`,
                        Obj[i].Nombre,
                        Obj[i].Perfil,
                        Obj[i].Segmento,
                    ]).draw(false).node();

                    $(newRow).addClass('align-middle');

                    // Aplicar clase si Activo es false
                    if (Obj[i].Activo == false) {
                        $(newRow).addClass('align-middle bg-light-danger'); // Agrega la clase bg-rosa a la fila
                    }
                }

                KTApp.init();
                KTMenu.init()
            }
            else {
                toastr.error("Error al guardar, por favor contacta al administrador!");
            }
        }
    }).fail(function (error) { toastr.error("Error de servidor, por favor contacta al administrador!"); });
}
function ModalAddUsuario() {

    $('#ModalAddUsuario').modal('show');
    BlockModalAddUsuario.block()

    $('#TipoChecadaValue').val("");

    var S2_Empleado = $("#AddEmpleado");
    $('#AddEmpleado').empty().trigger("change");
    S2_Empleado.append('<option></option>');

    var AddCliente = $("#AddCliente");
    $('#AddCliente').empty().trigger("change");
    AddCliente.append('<option></option>');

    $('#AddCorreo').val('');
    $('#password').val('');
    $('#confirmpassword').val('');

    document.getElementById("FormDarAcceso").reset();
    $("input").removeClass("is-valid").removeClass("is-invalid");
    $('[data-field]').remove();

    $.ajax({
        url: "/Usuarios/ModalNewUsuario",
        data: {
            Ajax: 1,
        },
        type: "POST",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("XSRF-TOKEN",
                $('input:hidden[name="__RequestVerificationToken"]').val());
        },
    }).done(function (result) {
        if (result != null) {

            if (result == "SessionExpirada") {
                SwalSessionExpirada()
            }
            else if (result != "Error") {
                var obj = JSON.parse(result);

                $("#AddEmpleado").select2({ data: obj.Empleados });
                $("#AddCliente").select2({ data: obj.Clientes });

                $('#ModalAddUsuario').modal('show');

                BlockModalAddUsuario.release()
            }
            else {
                SystemServerError()
                BlockModalAddUsuario.release()
            }
        }
    }).fail(function (error) {
        SystemServerError()
        BlockModalAddUsuario.release()
    });
}
function SaveUsuario() {

    var ClaveEmpleado = $('#AddEmpleado option:selected').text().split("|")[0];
    var Clave = ClaveEmpleado == "" || ClaveEmpleado == null ? $('#AddCliente option:selected').text().split("|")[0] : ClaveEmpleado;

    $.ajax({
        url: "/Usuarios/SaveUsuario",
        data: {
            Ajax: 1,
            TipoUsuarioId: $('#TipoChecadaValue').val(),
            ClavePersonal: Clave,
            Correo: $('#AddCorreo').val(),
            Password: $('#confirmpassword').val()
        },
        type: "POST",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("XSRF-TOKEN",
                $('input:hidden[name="__RequestVerificationToken"]').val());
        },
    }).done(function (result) {
        if (result != null) {

            if (result == "SessionExpirada") {
                SwalSessionExpirada()
            }
            else if (result == "Existe") {
                toastr.warning("Ya existe un Usuario con la el mismo Correo!");
            }
            else if (result != "Error") {

                Swal.fire({
                    text: "Guardado correctamente!",
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

                        GetUsuarios()
                        $('#ModalAddUsuario').modal('hide');
                    }
                });
            }
            else {
                SystemServerError()
            }
        }
    }).fail(function (error) {
        SystemServerError()
    });

}
function ModalUpdateUsuario(Id, Correo) {

    $('#ModificarAccesoClaveEmpleado').val(Id);

    //document.getElementById("FormModificarAcceso").reset();
    $("input").removeClass("is-valid").removeClass("is-invalid");
    $('[data-field]').remove();

    $('#ModificarCorreo').val(Correo);
    $('#Modificarconfirmpassword').val("");

    $('#ModalEditUsuario').modal('show');
}
function UpdateUsuario() {

    $.ajax({
        url: "/Usuarios/UpdateUsuario",
        data: {
            Ajax: 1,
            Id: $('#ModificarAccesoClaveEmpleado').val(),
            Correo: $('#ModificarCorreo').val(),
            Password: $('#Modificarconfirmpassword').val()
        },
        type: "POST",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("XSRF-TOKEN",
                $('input:hidden[name="__RequestVerificationToken"]').val());
        },
    }).done(function (result) {
        if (result != null) {

            if (result == "SessionExpirada") {
                SwalSessionExpirada()
            }
            else if (result == "Existe") {
                toastr.warning("Ya existe un Usuario con el mismo Correo!");
            }
            else if (result != "Error") {

                Swal.fire({
                    text: "Guardado correctamente!",
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

                        GetUsuarios()
                        $('#ModalEditUsuario').modal('hide');
                    }
                });
            }
            else {
                SystemServerError()
            }
        }
    }).fail(function (error) {
        SystemServerError()
    });

}
function DeleteUsuario(Id) {
    Swal.fire({
        text: "Esta seguro de eliminar Registro?",
        icon: "question",
        buttonsStyling: false,
        allowEscapeKey: false,
        allowOutsideClick: false,
        showCancelButton: true,
        closeOnCancel: true,
        confirmButtonText: "Confirmar",
        cancelButtonText: 'Cancelar',
        customClass:
        {
            confirmButton: "btn btn-primary",
            cancelButton: 'btn btn-danger'
        }
    }).then((result) => {
        if (result.isConfirmed) {

            $.ajax({
                url: "/Usuarios/OnOfUsuario",
                data: {
                    Ajax: 1, Id: Id, OnOf: 0
                },
                type: "POST",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("XSRF-TOKEN",
                        $('input:hidden[name="__RequestVerificationToken"]').val());
                },
            }).done(function (result) {
                if (result != null) {
                    if (result == "SessionExpirada") { SwalSessionExpirada() }
                    else if (result != "Error") {

                        GetUsuarios()
                        toastr.success("Se elimino correctamente!");

                    }
                    else { toastr.error("Error al eliminar, por favor contacta al administrador!"); }
                }
            }).fail(function (error) { toastr.error("Error de servidor, por favor contacta al administrador!"); });
        }
        else { $('.swal2-container').css('display', 'none'); }
    });

}
function ActivarUsuario(Id) {
    Swal.fire({
        text: "Esta seguro de Reactivar Registro?",
        icon: "question",
        buttonsStyling: false,
        allowEscapeKey: false,
        allowOutsideClick: false,
        showCancelButton: true,
        closeOnCancel: true,
        confirmButtonText: "Confirmar",
        cancelButtonText: 'Cancelar',
        customClass:
        {
            confirmButton: "btn btn-primary",
            cancelButton: 'btn btn-danger'
        }
    }).then((result) => {
        if (result.isConfirmed) {

            $.ajax({
                url: "/Usuarios/OnOfUsuario",
                data: {
                    Ajax: 1, Id: Id, OnOf: 1
                },
                type: "POST",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("XSRF-TOKEN",
                        $('input:hidden[name="__RequestVerificationToken"]').val());
                },
            }).done(function (result) {
                if (result != null) {
                    if (result == "SessionExpirada") { SwalSessionExpirada() }
                    else if (result != "Error") {

                        GetUsuarios()
                        toastr.success("Se Activo correctamente!");

                    }
                    else { toastr.error("Error al eliminar, por favor contacta al administrador!"); }
                }
            }).fail(function (error) { toastr.error("Error de servidor, por favor contacta al administrador!"); });
        }
        else { $('.swal2-container').css('display', 'none'); }
    });

}

//#endregion

//#region CRUD PERMISOS A PANTALLAS ASIDEMENU
///////////////////////////// CRUD PERMISOS A PANTALLAS ASIDEMENU /////////////////////////////////////////////////////////////////////
function ModalPermisosUsuario(ClaveEmpleado) {

    $("#IdPermisoClaveEmpleado").val(ClaveEmpleado)

    document.getElementById("Form_PermisosPatallas").reset();
    $("input").removeClass("is-valid").removeClass("is-invalid");
    $('[data-field]').remove();

    $.ajax({
        url: "/Usuarios/GetUsuarioPantallas",
        data: {
            Ajax: 1,
            IdUsuario: ClaveEmpleado
        },
        type: "POST",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("XSRF-TOKEN",
                $('input:hidden[name="__RequestVerificationToken"]').val());
        },
    }).done(function (result) {
        if (result != null) {

            if (result == "SessionExpirada") {
                SwalSessionExpirada()
            }
            else if (result != "Error") {
                var obj = JSON.parse(result);

                for (var i = 0; i < obj.AsideMenu.length; i++) {
                    $("#AsideMenu_" + obj.AsideMenu[i].ID).prop('checked', true);
                }

                for (var i = 0; i < obj.MenuTareas.length; i++) {
                    $("#MenuTarea_" + obj.MenuTareas[i].ID).prop('checked', true);
                }

                $('#ModalPermisosUsuario').modal('show');
            }
            else {
                SystemServerError()
            }
        }
    }).fail(function (error) {
        SystemServerError()
    });

}
function GuardarPermisosUsuario() {

    var AsideMenuSelected = $('#Form_PermisosPatallas .form-check-input:checked').filter('[id^="AsideMenu_"]').map(function () {
        return $(this).val(); // Obtiene el valor del checkbox seleccionado
    }).get().join(','); // Une los elementos del array en una cadena separada por comas

    var MenuTareaSelected = $('#Form_PermisosPatallas .form-check-input:checked').filter('[id^="MenuTarea_"]').map(function () {
        return $(this).val(); // Obtiene el valor del checkbox seleccionado
    }).get().join(','); // Une los elementos del array en una cadena separada por comas

    $.ajax({
        url: "/Usuarios/GuardarPermisos",
        data: {
            Ajax: 1,
            Clave: $("#IdPermisoClaveEmpleado").val(),
            IdAsideMenus: AsideMenuSelected,
            IdMenuTareas: MenuTareaSelected,
        },
        type: "POST",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("XSRF-TOKEN",
                $('input:hidden[name="__RequestVerificationToken"]').val());
        },
    }).done(function (result) {
        if (result != null) {

            if (result == "SessionExpirada") {
                SwalSessionExpirada()
            }
            else if (result != "Error") {

                Swal.fire({
                    text: "Guardado correctamente!",
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

                        $('#ModalPermisosUsuario').modal('hide');
                    }
                });

            }
            else {
                SystemServerError()
            }
        }
    }).fail(function (error) {
        SystemServerError()
    });

}
//#endregion
///////////////////////////// CRUD PERMISOS A  MENU DE TAREAS /////////////////////////////////////////////////////////////////////

//#region  FORMS VALIDATION
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////  FORMS VALIDATION ///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//************************** START Validation Acceso al sitema ****************************************************************************************
var AgregarNuevoUsuario = function () {
    var handleChangePassword = function (e) {

        var validation;
        var passwordForm = document.getElementById('FormDarAcceso');
        const strongPassword = function () {
            return {
                validate: function (input) {
                    const value = input.value;
                    if (value === '') {
                        return {
                            valid: true,
                        };
                    }

                    if (value.length < 8) {
                        return {
                            valid: false,
                            message: 'La contraseña debe tener más de 8 caracteres.',
                        };
                    }

                    if (value === value.toLowerCase()) {
                        return {
                            valid: false,
                            message: 'La contraseña debe contener al menos un carácter en mayúscula.',
                        };
                    }

                    if (value === value.toUpperCase()) {
                        return {
                            valid: false,
                            message: 'La contraseña debe contener al menos un carácter en minúscula.',
                        };
                    }

                    if (value.search(/[0-9]/) < 0) {
                        return {
                            valid: false,
                            message: 'La contraseña debe contener al menos un dígito.',
                        };
                    }


                    return {
                        valid: true,
                    };
                },
            };
        };

        validation = FormValidation.formValidation(
            passwordForm,
            {
                fields: {

                    "AddEmpleado": {
                        validators: {
                            callback: {
                                message: 'El campo es requerido.',
                                callback: function (input) {
                                    var tipoUsuario = $("#TipoChecadaValue").val();
                                    if (tipoUsuario == 2) {
                                        return input.value !== '';
                                    }
                                    else {
                                        return true;
                                    }
                                }
                            }
                        }
                    },
                    "AddCliente": {
                        validators: {
                            callback: {
                                message: 'El campo es requerido.',
                                callback: function (input) {
                                    var tipoUsuario = $("#TipoChecadaValue").val();
                                    if (tipoUsuario == 1) {
                                        return input.value !== '';
                                    }
                                    else {
                                        return true;
                                    }
                                }
                            }
                        }
                    },
                    AddCorreo: {
                        validators: {
                            notEmpty: {
                                message: 'El campo es requerido.'
                            }
                        }
                    },
                    TipoChecadaValue: {
                        validators: {
                            notEmpty: {
                                message: 'El campo es requerido.'
                            }
                        }
                    },
                    password: {
                        validators: {
                            notEmpty: {
                                message: 'El campo es requerido'
                            },
                            checkPassword: {
                                message: 'The password is too weak',
                            }
                        }
                    },

                    confirmpassword: {
                        validators: {
                            notEmpty: {
                                message: 'Confirm Password is required'
                            },
                            identical: {
                                compare: function () {
                                    return passwordForm.querySelector('[name="password"]').value;
                                },
                                message: 'The password and its confirm are not the same'
                            }
                        }
                    },
                },

                plugins: { //Learn more: https://formvalidation.io/guide/plugins
                    trigger: new FormValidation.plugins.Trigger(),
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: '.fv-row'
                    })
                }
            }
        ).registerValidator('checkPassword', strongPassword);

        passwordForm.querySelector('#AddUsuarioSave').addEventListener('click', function (e) {
            e.preventDefault();

            validation.validate().then(function (status) {
                if (status == 'Valid') {

                    SaveUsuario()
                }
            });
        });
    }

    return {
        init: function () {
            handleChangePassword();
        }
    }

    $(FormDarAcceso.querySelector('[name="AddCliente"]')).on('change', function () { validation.revalidateField('AddCliente'); });
    $(FormDarAcceso.querySelector('[name="AddEmpleado"]')).on('change', function () { validation.revalidateField('AddEmpleado'); });

}();

KTUtil.onDOMContentLoaded(function () {
    AgregarNuevoUsuario.init();
});




//@* Form validation Modificar Acceso al sitema *@
// Class definition
var SettingsSigninMethods = function () {

    var handleChangePassword = function (e) {
        var validation;

        // form elements
        var passwordForm = document.getElementById('FormModificarAcceso');

        const strongPassword = function () {
            return {
                validate: function (input) {
                    const value = input.value;
                    if (value === '') {
                        return {
                            valid: true,
                        };
                    }

                    // Check the password strength
                    if (value.length < 8) {
                        return {
                            valid: false,
                            message: 'La contraseña debe tener más de 8 caracteres.',
                        };
                    }

                    // The password doesn't contain any uppercase character
                    if (value === value.toLowerCase()) {
                        return {
                            valid: false,
                            message: 'La contraseña debe contener al menos un carácter en mayúscula.',
                        };
                    }

                    // The password doesn't contain any uppercase character
                    if (value === value.toUpperCase()) {
                        return {
                            valid: false,
                            message: 'La contraseña debe contener al menos un carácter en minúscula.',
                        };
                    }

                    // The password doesn't contain any digit
                    if (value.search(/[0-9]/) < 0) {
                        return {
                            valid: false,
                            message: 'La contraseña debe contener al menos un dígito.',
                        };
                    }

                    return {
                        valid: true,
                    };
                },
            };
        };

        validation = FormValidation.formValidation(
            passwordForm,
            {
                fields: {
                    ModificarCorreo: {
                        validators: {
                            notEmpty: {
                                message: 'El campo es requerido.'
                            }
                        }
                    },
                    Modificarpassword: {
                        validators: {
                            notEmpty: {
                                message: 'El campo es requerido'
                            },
                            checkPassword: {
                                message: 'The password is too weak',
                            }
                        }
                    },

                    Modificarconfirmpassword: {
                        validators: {
                            notEmpty: {
                                message: 'Confirm Password is required'
                            },
                            identical: {
                                compare: function () {
                                    return passwordForm.querySelector('[name="Modificarpassword"]').value;
                                },
                                message: 'The password and its confirm are not the same'
                            }
                        }
                    },
                },

                plugins: { //Learn more: https://formvalidation.io/guide/plugins
                    trigger: new FormValidation.plugins.Trigger(),
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: '.fv-row'
                    })
                }
            }
        ).registerValidator('checkPassword', strongPassword);

        passwordForm.querySelector('#Modificar_Button').addEventListener('click', function (e) {
            e.preventDefault();

            validation.validate().then(function (status) {
                if (status == 'Valid') {

                    UpdateUsuario()
                }
            });
        });
    }

    return {
        init: function () {
            handleChangePassword();
        }
    }
}();

KTUtil.onDOMContentLoaded(function () {
    SettingsSigninMethods.init();
});
//#endregion