//*************************************************************************************************** */
//************************************Funciones de arranque ************************************ */
//*************************************************************************************************** */
$(document).ready(function () {
    if(window.innerWidth <= 992){if(window.innerWidth <= 992){$("#kt_app_sidebar").addClass("app-sidebar flex-column drawer drawer-start");}}
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////  DATATABLES /////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var Tabla1 = function () {
    var table;
    var datatable;
    var initDatatable = function () {
        datatable = $(table).DataTable({
            "info": true,
            'order': [],
            'pageLength': 100,
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
            },
            "columnDefs": [
                {"targets": 0, "className": "text-center"},
                {"targets": 3, "className": "text-center"},
            ]
        });
    }
    var handleSearchDatatable = () => {
        const filterSearch = document.querySelector('[data-kt-filter="searchSecciones"]');
        filterSearch.addEventListener('keyup', function (e) {
            datatable.search(e.target.value).draw();
        });
    }
    return {
        init: function () {
            table = document.querySelector('#Tabla1');
            if (!table) {
                return;
            }
            initDatatable();
            handleSearchDatatable();
        }
    };
}();
KTUtil.onDOMContentLoaded(function () {
    Tabla1.init();
});

var Tabla2 = function () {
    var table;
    var datatable;
    var initDatatable = function () {
        datatable = $(table).DataTable({
            "info": true,
            'order': [],
            'pageLength': 100,
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
            },
            "columnDefs": [
                { "targets": 0, "className": "text-center" },
            ]
        });
    }
    var handleSearchDatatable = () => {
        const filterSearch = document.querySelector('[data-kt-filter="searchSubSecciones"]');
        filterSearch.addEventListener('keyup', function (e) {
            datatable.search(e.target.value).draw();
        });
    }
    return {
        init: function () {
            table = document.querySelector('#Tabla2');
            if (!table) {
                return;
            }
            initDatatable();
            handleSearchDatatable();
        }
    };
}();
KTUtil.onDOMContentLoaded(function () {
    Tabla2.init();
});

var Tabla3 = function () {
    var table;
    var datatable;
    var initDatatable = function () {
        datatable = $(table).DataTable({
            "info": true,
            'order': [],
            'pageLength': 100,
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
            },
            "columnDefs": [
                { "targets": 0, "className": "text-center" },
            ]
        });
    }
    var handleSearchDatatable = () => {
        const filterSearch = document.querySelector('[data-kt-filter="searchPantallas"]');
        filterSearch.addEventListener('keyup', function (e) {
            datatable.search(e.target.value).draw();
        });
    }
    return {
        init: function () {
            table = document.querySelector('#Tabla3');
            if (!table) {
                return;
            }
            initDatatable();
            handleSearchDatatable();
        }
    };
}();
KTUtil.onDOMContentLoaded(function () {
    Tabla3.init();
});

//#region  FORMS VALIDATION
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////  FORMS VALIDATION ///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//************************** START Validation Acceso al sitema ****************************************************************************************
// Insertar
var AddSeccionForm = document.getElementById('AddSeccionesForm');
var validatorNewSeccion = FormValidation.formValidation(
    AddSeccionForm,
    {
        fields: {
            "IdAddSecciones": {
                validators: {
                    notEmpty: {
                        message: 'El campo es requerido.'
                    }
                }
            },
            "IdAddIcono": {
                validators: {
                    notEmpty: {
                        message: 'El campo es requerido.'
                    }
                }
            },
            "IdAddOrden": {
                validators: {
                    notEmpty: {
                        message: 'El campo es requerido.'
                    }
                }
            },
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
var AddSecciondButton = document.getElementById('NewSeccionesButton'); // Controlador de botón Enviar
AddSecciondButton.addEventListener('click', function (e) // Prevenir la acción del botón predeterminado
{
    e.preventDefault();
    if (validatorNewSeccion)    // Validar formulario antes de enviar
    {
        validatorNewSeccion.validate().then(function (status) {
            if (status == 'Valid') {
                AddSecciondButton.setAttribute('data-kt-indicator', 'on');
                AddSecciondButton.disabled = true;
                setTimeout(function () {
                    AddSecciondButton.removeAttribute('data-kt-indicator');
                    AddSecciondButton.disabled = false;
                    NewSeccionModal()
                }, 1000);
            }
            else {
                AddSecciondButton.setAttribute('data-kt-indicator', 'on');
                AddSecciondButton.disabled = true;
                setTimeout(function () {
                    AddSecciondButton.removeAttribute('data-kt-indicator');
                    AddSecciondButton.disabled = false;
                }, 150);
            }
        });
    }
});

// Editar
var EditSeccion_ = document.getElementById('EditSecciones');
var validatorEditSeccion = FormValidation.formValidation(
    EditSeccion_,
    {
        fields: {
            "IdEditSecciones": {
                validators: {
                    notEmpty: {
                        message: 'El campo es requerido.'
                    }
                }
            },
            "IdEditIcono": {
                validators: {
                    notEmpty: {
                        message: 'El campo es requerido.'
                    }
                }
            },
            "IdEditOrden": {
                validators: {
                    notEmpty: {
                        message: 'El campo es requerido.'
                    }
                }
            },
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
var EditSeccionesButton = document.getElementById('EditSeccionesButton'); // Enviar controlador de botón
EditSeccionesButton.addEventListener('click', function (e) {

    e.preventDefault();// Evitar la acción del botón predeterminado
    if (validatorEditSeccion) // Validar formulario antes de enviar
    {
        validatorEditSeccion.validate().then(function (status) {
            if (status == 'Valid') {
                EditSeccionesButton.setAttribute('data-kt-indicator', 'on');
                EditSeccionesButton.disabled = true;
                setTimeout(function () {
                    EditSeccionesButton.removeAttribute('data-kt-indicator');
                    EditSeccionesButton.disabled = false;
                    EditSeccion()
                }, 1000);
            }
            else {
                EditSeccionesButton.setAttribute('data-kt-indicator', 'on');
                EditSeccionesButton.disabled = true;
                setTimeout(function () {
                    EditSeccionesButton.removeAttribute('data-kt-indicator');
                    EditSeccionesButton.disabled = false;
                }, 150);
            }
        });
    }
});

//  Form Validar Módulo Secciones
// Insertar
var AddMSeccionForm = document.getElementById('ModalAddSubSeccionForm');
var validatorNewMSeccion = FormValidation.formValidation(
    AddMSeccionForm,
    {
        fields: {
            "IdAddSubSeccion": {
                validators: {
                    notEmpty: {
                        message: 'El campo es requerido.'
                    }
                }
            },


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
var AddMSecciondButton = document.getElementById('AddModuloSubSeccionButton'); // Controlador de botón Enviar
AddMSecciondButton.addEventListener('click', function (e) // Prevenir la acción del botón predeterminado
{
    e.preventDefault();
    if (validatorNewMSeccion)    // Validar formulario antes de enviar
    {
        validatorNewMSeccion.validate().then(function (status) {
            if (status == 'Valid') {
                AddMSecciondButton.setAttribute('data-kt-indicator', 'on');
                AddMSecciondButton.disabled = true;
                setTimeout(function () {
                    AddMSecciondButton.removeAttribute('data-kt-indicator');
                    AddMSecciondButton.disabled = false;
                    NewSubSeccionModal()
                }, 1000);
            }
            else {
                AddMSecciondButton.setAttribute('data-kt-indicator', 'on');
                AddMSecciondButton.disabled = true;
                setTimeout(function () {
                    AddMSecciondButton.removeAttribute('data-kt-indicator');
                    AddMSecciondButton.disabled = false;
                }, 150);
            }
        });
    }
});

// Editar
var EditMSeccion_ = document.getElementById('ModalEditSubSeccionForm');
var validatorEditMSeccion = FormValidation.formValidation(
    EditMSeccion_,
    {
        fields: {
            "IdEditSubSeccion": {
                validators: {
                    notEmpty: {
                        message: 'El campo es requerido.'
                    }
                }
            },

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
var EditMSeccionesButton = document.getElementById('EditSubSeccionButton'); // Enviar controlador de botón
EditMSeccionesButton.addEventListener('click', function (e) {

    e.preventDefault();// Evitar la acción del botón predeterminado
    if (validatorEditMSeccion) // Validar formulario antes de enviar
    {
        validatorEditMSeccion.validate().then(function (status) {
            if (status == 'Valid') {
                EditMSeccionesButton.setAttribute('data-kt-indicator', 'on');
                EditMSeccionesButton.disabled = true;
                setTimeout(function () {
                    EditMSeccionesButton.removeAttribute('data-kt-indicator');
                    EditMSeccionesButton.disabled = false;
                    EditSubSeccion()
                }, 1000);
            }
            else {
                EditMSeccionesButton.setAttribute('data-kt-indicator', 'on');
                EditMSeccionesButton.disabled = true;
                setTimeout(function () {
                    EditMSeccionesButton.removeAttribute('data-kt-indicator');
                    EditMSeccionesButton.disabled = false;
                }, 150);
            }
        });
    }
});

//  Form Validar Módulo Pantallas
// Insertar
var AddMPantallasForm = document.getElementById('ModalEditPantallasForm');
var validatorNewMPantallas = FormValidation.formValidation(
    AddMPantallasForm,
    {
        fields: {
            "IdAddPantallas": {
                validators: {
                    notEmpty: {
                        message: 'El campo es requerido.'
                    }
                }
            },

            "IdAddRuta": {
                validators: {
                    notEmpty: {
                        message: 'El campo es requerido.'
                    }
                }
            },

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
var AddMPantallasButton = document.getElementById('AddModuloPantallasButton'); // Controlador de botón Enviar
AddMPantallasButton.addEventListener('click', function (e) // Prevenir la acción del botón predeterminado
{
    e.preventDefault();
    if (validatorNewMPantallas)    // Validar formulario antes de enviar
    {
        validatorNewMPantallas.validate().then(function (status) {
            if (status == 'Valid') {
                AddMPantallasButton.setAttribute('data-kt-indicator', 'on');
                AddMPantallasButton.disabled = true;
                setTimeout(function () {
                    AddMPantallasButton.removeAttribute('data-kt-indicator');
                    AddMPantallasButton.disabled = false;
                    NewPantallasModal()
                }, 1000);
            }
            else {
                AddMPantallasButton.setAttribute('data-kt-indicator', 'on');
                AddMPantallasButton.disabled = true;
                setTimeout(function () {
                    AddMPantallasButton.removeAttribute('data-kt-indicator');
                    AddMPantallasButton.disabled = false;
                }, 150);
            }
        });
    }
});

var ModalEditPantallas = document.getElementById('ModalEditPantallasForm');
var validatorEditPantallas = FormValidation.formValidation(
    ModalEditPantallas,
    {
        fields: {
            "IdEditPantallas": {
                validators: {
                    notEmpty: {
                        message: 'El campo es requerido.'
                    }
                }
            }, "IdEditRuta": {
                validators: {
                    notEmpty: {
                        message: 'El campo es requerido.' 
                    }
                }
            },

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
var EditPantallasesButton = document.getElementById('EditModuloPantallasButton'); // Enviar controlador de botón
EditPantallasesButton.addEventListener('click', function (e) {

    e.preventDefault();// Evitar la acción del botón predeterminado
    if (validatorEditPantallas) // Validar formulario antes de enviar
    {
        validatorEditPantallas.validate().then(function (status) {
            if (status == 'Valid') {
                EditPantallasesButton.setAttribute('data-kt-indicator', 'on');
                EditPantallasesButton.disabled = true;
                setTimeout(function () {
                    EditPantallasesButton.removeAttribute('data-kt-indicator');
                    EditPantallasesButton.disabled = false;
                    EditPantallas()
                }, 1000);
            }
            else {
                EditPantallasesButton.setAttribute('data-kt-indicator', 'on');
                EditPantallasesButton.disabled = true;
                setTimeout(function () {
                    EditPantallasesButton.removeAttribute('data-kt-indicator');
                    EditPantallasesButton.disabled = false;
                }, 150);
            }
        });
    }
});

//*************************************************************************************************** */
//************************************Star CRUD de Modales******************************************* */
//*************************************************************************************************** */

//#region CRUD Seccion
function RefreshSecciones()
{
    $.ajax({
        url: "/ControlMenus/GetSecciones",
        data: { Ajax: 1},
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

                var tSeccion = $('#Tabla1').DataTable();
                tSeccion.clear().draw();

                for (var i = 0; i < Obj.length; i++) {

                   tSeccion.row.add([
                    `<a onclick="DeleteSeccion(this, ${Obj[i].Id})" class="btn btn-light-youtube me-2 p-1 ps-2 pt-0" data-bs-toggle="tooltip" data-bs-placement="top" title="Eliminar"><i class="fas fa-times fs-7 fw-bold"></i></a>`+
                       `<a onclick="ModalSubSeccion(${Obj[i].Id}, ${Obj[i].Descripcion}  )" class="btn btn-light-primary me-2 p-1 ps-2 pt-0" data-bs-toggle="tooltip" data-bs-placement="top" title="Agregar Subseccion"><i class="fas fa-plus-circle fs-7 fw-bold"></i></a>`,
                    `<a class="text-primary text-hover-primary" onclick="EditSeccionModal(this, ${Obj[i].Id}, '${Obj[i].Descripcion}', '${Obj[i].Icono}', '${Obj[i].Orden}')">${Obj[i].Descripcion}</a>`,
                    Obj[i].Icono,
                    Obj[i].Orden,
                    Obj[i].FechaReg]).draw(false);
                }

                KTApp.init();
                KTMenu.init()

            }
            else
            {
                toastr.error("Error al guardar, por favor contacta al administrador!");
            }
        }
    }).fail(function (error) { toastr.error("Error de servidor, por favor contacta al administrador!"); });
}
function AddSeccionesModal() {
    $('#IdAddSecciones').val('');
    $('#IdAddIcono').val('');
    $('#IdAddOrden').val('');
    $("input").removeClass("is-valid").removeClass("is-invalid");//Se borra las alertas de error al validar
    $('[data-field]').remove();////Se borra las alertas de error al validar
    $('#AddSecciones').modal('show');
}
function NewSeccionModal() {
    var IdAddSecciones = $("#IdAddSecciones").val();
    var IdAddIcono = $("#IdAddIcono").val();
    var IdAddOrden = $("#IdAddOrden").val();

    $.ajax({
        url: "/ControlMenus/SaveSeccion",
        data: { Ajax: 1, IdAddSecciones: IdAddSecciones, IdAddIcono: IdAddIcono, IdAddOrden: IdAddOrden },
        type: "POST",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("XSRF-TOKEN",
                $('input:hidden[name="__RequestVerificationToken"]').val());
        },
    }).done(function (result) {
        if (result != null) {
            if (result == "SessionExpirada") { SwalSessionExpirada() }
            else if (result == "Existe") { toastr.warning("Ya existe una registro con ese nombre!"); }
            else if (result != "Error") {
                var Obj = JSON.parse(result);
                var tSeccion = $('#Tabla1').DataTable();

                Swal.fire({
                    text: "El registro se guardado correctamente!",
                    icon: "success",
                    buttonsStyling: false,
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    confirmButtonText: "Ok!",
                    customClass:
                    {
                        confirmButton: "btn btn-primary"
                    }
                }).then((result) => {
                    if (result.isConfirmed)
                    {
                        RefreshSecciones()

                        $("#AddSecciones").modal("hide");
                    }
                });
            }
            else { toastr.error("Error al guardar, por favor contacta al administrador!"); }
        }
    }).fail(function (error) { toastr.error("Error de servidor, por favor contacta al administrador!"); });
}
function EditSeccionModal(Fila, Id, Descripcion, Icono, Orden) {
    SeleccionarFila = Fila;
    $('#IdSecciones').val(Id);
    $('#IdEditSecciones').val(Descripcion);
    $('#IdEditIcono').val(Icono);
    $('#IdEditOrden').val(Orden);
    $("input").removeClass("is-valid").removeClass("is-invalid");//Se borra las alertas de error al validar
    $('[data-field]').remove();////Se borra las alertas de error al validar
    $('#EditSecciones').modal('show');
}
function EditSeccion() {
    var Id = $("#IdSecciones").val();
    var IdAddSecciones = $("#IdEditSecciones").val();
    var IdAddIcono = $("#IdEditIcono").val();
    var IdAddOrden = $("#IdEditOrden").val();

    $.ajax({
        url: "/ControlMenus/UpdateSeccion",
        data: { Ajax: 1, Id: Id, IdAddSecciones: IdAddSecciones, IdAddIcono: IdAddIcono, IdAddOrden: IdAddOrden },
        type: "POST",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("XSRF-TOKEN",
                $('input:hidden[name="__RequestVerificationToken"]').val());
        },
    }).done(function (result) {
        if (result != null) {
            if (result == "SessionExpirada") { SwalSessionExpirada() }
            else if (result == "Existe") { toastr.warning("Ya existe un registro con ese nombre!"); }
            else if (result != "Error") {
                var Obj = JSON.parse(result);

                Swal.fire({
                    text: "El registro se guardado correctamente!",
                    icon: "success",
                    buttonsStyling: false,
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    confirmButtonText: "Ok!",
                    customClass:
                    {
                        confirmButton: "btn btn-primary"
                    }
                }).then((result) => {
                    if (result.isConfirmed) {

                        RefreshSecciones()

                        $("#EditSecciones").modal("hide");
                    }
                });
            } else { toastr.error("Error en la actualización, por favor contacta al administrador!"); }
        }
    }).fail(function (error) { toastr.error("Error de servidor, por favor contacta al administrador!"); });
}
function DeleteSeccion(Row, Id) {
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
                url: "/ControlMenus/DeleteSeccion",
                data: {
                    Ajax: 1, Id: Id
                },
                type: "POST",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("XSRF-TOKEN",
                        $('input:hidden[name="__RequestVerificationToken"]').val());
                },
            }).done(function (result) {
                if (result != null) {
                    if (result == "SessionExpirada") { SwalSessionExpirada() }
                    else if (result != "Error")
                    {
                        var tSeccion = $('#Tabla1').DataTable();
                        tSeccion.row($(Row).parents('tr')).remove().draw();
                        toastr.primary("Se elimino correctamente!");
                    }
                    else { toastr.error("Error al eliminar, por favor contacta al administrador!"); }
                }
            }).fail(function (error) { toastr.error("Error de servidor, por favor contacta al administrador!"); });
        }
        else { $('.swal2-container').css('display', 'none'); }
    });

}
//#endregion

//#region CRUD Módulo Seccion
function ModalSubSecciones(IdSeccion, Descripcion) {

    $("#IdAddSubSeccion_SeccionId").val(IdSeccion);

    $.ajax({
        url: "/ControlMenus/GetSubSecciones",
        data: { Ajax: 1, IdSeccion: IdSeccion },
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

                var Tabla2 = $('#Tabla2').DataTable();
                Tabla2.clear().draw();

                for (var i = 0; i < Obj.length; i++) {

                    Tabla2.row.add([
                    `<a onclick="DeleteSubSecciones(this, ${Obj[i].Id})" class="btn btn-light-youtube me-2 p-1 ps-2 pt-0" data-bs-toggle="tooltip" data-bs-placement="top" title="Eliminar"><i class="fas fa-times fs-7 fw-bold"></i></a>` +
                     `<a onclick="ModalPantallas(${Obj[i].Id}, '${Obj[i].Descripcion}')" class="btn btn-light-primary me-2 p-1 ps-2 pt-0" data-bs-toggle="tooltip" data-bs-placement="top" title="Agregar Pantallas"><i class="fas fa-plus-circle fs-7 fw-bold"></i></a>`,
                     `<a class="text-primary text-hover-primary" onclick="EditSubSeccionesModal(this, ${Obj[i].Id}, '${Obj[i].Descripcion}', ${IdSeccion})">${Obj[i].Descripcion}</a>`,
                    Obj[i].FechaReg]).draw(false);
                }

                KTApp.init();
                KTMenu.init();

                $('#SubDescrip').text(Descripcion);
                $('#ModalSubSecciones').modal('show');

            }
            else {
                toastr.error("Error al guardar, por favor contacta al administrador!");
            }
        }
    }).fail(function (error) { toastr.error("Error de servidor, por favor contacta al administrador!"); });
}
function GetSubSecciones(IdSeccion) {

    $.ajax({
        url: "/ControlMenus/GetSubSecciones",
        data: { Ajax: 1, IdSeccion: IdSeccion },
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

                var Tabla2 = $('#Tabla2').DataTable();
                Tabla2.clear().draw();

                for (var i = 0; i < Obj.length; i++) {

                    Tabla2.row.add([
                        `<a onclick="DeleteSubSecciones(this, ${Obj[i].Id})" class="btn btn-light-youtube me-2 p-1 ps-2 pt-0" data-bs-toggle="tooltip" data-bs-placement="top" title="Eliminar"><i class="fas fa-times fs-7 fw-bold"></i></a>` +
                        `<a onclick="ModalPantallas(${Obj[i].Id}, '${Obj[i].Descripcion}')" class="btn btn-light-primary me-2 p-1 ps-2 pt-0" data-bs-toggle="tooltip" data-bs-placement="top" title="Agregar Pantallas"><i class="fas fa-plus-circle fs-7 fw-bold"></i></a>`,
                        `<a class="text-primary text-hover-primary" onclick="EditSubSeccionesModal(this, ${Obj[i].Id}, '${Obj[i].Descripcion}', ${IdSeccion})">${Obj[i].Descripcion}</a>`,
                        Obj[i].FechaReg]).draw(false);
                }

                KTApp.init();
                KTMenu.init()

                $('#ModalSubSecciones').modal('show');

            }
            else {
                toastr.error("Error al guardar, por favor contacta al administrador!");
            }
        }
    }).fail(function (error) { toastr.error("Error de servidor, por favor contacta al administrador!"); });
}
function AddSubSeccionesModal() {
    $('#IdAddSubSeccion').val('');
    $("input").removeClass("is-valid").removeClass("is-invalid");//Se borra las alertas de error al validar
    $('[data-field]').remove();////Se borra las alertas de error al validar
    $('#ModalAddSubSeccion').modal('show');
}
function NewSubSeccionModal() {
    var SubSeccion = $("#IdAddSubSeccion").val();
    var IdSeccion = $("#IdAddSubSeccion_SeccionId").val();

    $.ajax({
        url: "/ControlMenus/SaveSubSeccion",
        data: { Ajax: 1, SubSeccion: SubSeccion, IdSeccion: IdSeccion },
        type: "POST",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("XSRF-TOKEN",
                $('input:hidden[name="__RequestVerificationToken"]').val());
        },
    }).done(function (result) {
        if (result != null) {
            if (result == "SessionExpirada") { SwalSessionExpirada() }
            else if (result == "Existe") { toastr.warning("Ya existe una registro con ese nombre!"); }
            else if (result != "Error") {
                var Obj = JSON.parse(result);

                Swal.fire({
                    text: "El registro se guardado correctamente!",
                    icon: "success",
                    buttonsStyling: false,
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    confirmButtonText: "Ok!",
                    customClass:
                    {
                        confirmButton: "btn btn-primary"
                    }
                }).then((result) => {
                    if (result.isConfirmed)
                    {
                        GetSubSecciones(IdSeccion)
                         $('#ModalAddSubSeccion').modal('hide');
                    }

                });


            }
            else { toastr.error("Error al guardar, por favor contacta al administrador!"); }
        }

    }).fail(function (error) { toastr.error("Error de servidor, por favor contacta al administrador!"); });
}
function EditSubSeccionesModal(Fila, Id, Descripcion, IdSeccion) {
    SeleccionarFila = Fila;
    $('#IdEditSubSeccionId').val(Id);
    $('#IdEditSubSeccionId_SeccionId').val(IdSeccion);
    $('#IdEditSubSeccion').val(Descripcion);

    $("input").removeClass("is-valid").removeClass("is-invalid");//Se borra las alertas de error al validar
    $('[data-field]').remove();////Se borra las alertas de error al validar

    $('#ModalEditSubSeccion').modal('show');
}
function EditSubSeccion() {
    var Id = $("#IdEditSubSeccionId").val();
    var IdSeccion = $("#IdEditSubSeccionId_SeccionId").val();
    var SubSeccion = $("#IdEditSubSeccion").val();

    $.ajax({
        url: "/ControlMenus/UpdateSubSeccion",
        data: { Ajax: 1, Id: Id, SubSeccion: SubSeccion},
        type: "POST",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("XSRF-TOKEN",
                $('input:hidden[name="__RequestVerificationToken"]').val());
        },
    }).done(function (result) {
        if (result != null) {
            if (result == "SessionExpirada") { SwalSessionExpirada() }
            else if (result == "Existe") { toastr.warning("Ya existe un registro con ese nombre!"); }
            else if (result != "Error") {
                var Obj = JSON.parse(result);

                Swal.fire({
                    text: "El registro se guardado correctamente!",
                    icon: "success",
                    buttonsStyling: false,
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    confirmButtonText: "Ok!",
                    customClass:
                    {
                        confirmButton: "btn btn-primary"
                    }
                }).then((result) => {
                    if (result.isConfirmed) {

                        GetSubSecciones(IdSeccion)

                        $('#ModalEditSubSeccion').modal('hide');
                    }
                });
            } else { toastr.error("Error en la actualización, por favor contacta al administrador!"); }
        }
    }).fail(function (error) { toastr.error("Error de servidor, por favor contacta al administrador!"); });
}
function DeleteSubSecciones(Row, Id) {
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
                url: "/ControlMenus/DeleteSubSeccion",
                data: {
                    Ajax: 1, Id: Id
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
                        var tMSeccion = $('#Tabla2').DataTable();
                        tMSeccion.row($(Row).parents('tr')).remove().draw();
                        toastr.success("Se elimino correctamente!");
                    }
                    else { toastr.error("Error al eliminar, por favor contacta al administrador!"); }
                }
            }).fail(function (error) { toastr.error("Error de servidor, por favor contacta al administrador!"); });
        }
        else { $('.swal2-container').css('display', 'none'); }
    });

}
//#endregion

//#region CRUD Módulo Pantallas
function ModalPantallas(IdSubSeccion, Descripcion) {

    $("#IdAddPantallas_SubSeccionId").val(IdSubSeccion);

    $.ajax({
        url: "/ControlMenus/GetPantallas",
        data: { Ajax: 1, IdSubSeccion: IdSubSeccion },
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

                var Tabla3 = $('#Tabla3').DataTable();
                Tabla3.clear().draw();

                for (var i = 0; i < Obj.length; i++) {

                    Tabla3.row.add([
                        `<a onclick="DeletePantallas(this, ${Obj[i].Id})" class="btn btn-light-youtube me-2 p-1 ps-2 pt-0" data-bs-toggle="tooltip" data-bs-placement="top" title="Eliminar"><i class="fas fa-times fs-7 fw-bold"></i></a>`,
                        `<a class="text-primary text-hover-primary" onclick="EditPantallasModal(this, ${Obj[i].Id}, '${Obj[i].Descripcion}', '${Obj[i].Ruta}', ${IdSubSeccion})">${Obj[i].Descripcion}</a>`,
                        Obj[i].Ruta,
                        Obj[i].FechaReg]
                    ).draw(false);
                }

                KTApp.init();
                KTMenu.init()

                $('#PantallasDescrip').text(Descripcion);
                $('#ModalPantallas').modal('show');

            }
            else {
                toastr.error("Error al guardar, por favor contacta al administrador!");
            }
        }
    }).fail(function (error) { toastr.error("Error de servidor, por favor contacta al administrador!"); });
}
function GetPantallas(IdSubSeccion) {

    $("#IdAddPantallas_SubSeccionId").val(IdSubSeccion);

    $.ajax({
        url: "/ControlMenus/GetPantallas",
        data: { Ajax: 1, IdSubSeccion: IdSubSeccion },
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

                var Tabla3 = $('#Tabla3').DataTable();
                Tabla3.clear().draw();

                for (var i = 0; i < Obj.length; i++) {
                    Tabla3.row.add([
                        `<a onclick="DeletePantallas(this, ${Obj[i].Id})" class="btn btn-light-youtube me-2 p-1 ps-2 pt-0" data-bs-toggle="tooltip" data-bs-placement="top" title="Eliminar"><i class="fas fa-times fs-7 fw-bold"></i></a>`,
                        `<a class="text-primary text-hover-primary" onclick="EditPantallasModal(this, ${Obj[i].Id}, '${Obj[i].Descripcion}', '${Obj[i].Ruta}', ${IdSubSeccion})">${Obj[i].Descripcion}</a>`,
                        Obj[i].Ruta,
                        Obj[i].FechaReg]
                    ).draw(false);
                }

                KTApp.init();
                KTMenu.init()

                $('#ModalPantallas').modal('show');

            }
            else {
                toastr.error("Error al guardar, por favor contacta al administrador!");
            }
        }
    }).fail(function (error) { toastr.error("Error de servidor, por favor contacta al administrador!"); });
}
function AddPantallasModal() {
    $('#IdAddPantallas').val('');
    $('#IdAddRuta').val('');
    $("input").removeClass("is-valid").removeClass("is-invalid");//Se borra las alertas de error al validar
    $('[data-field]').remove();////Se borra las alertas de error al validar
    $('#ModalAddPantallas').modal('show');
}
function NewPantallasModal() {
    var Pantalla = $("#IdAddPantallas").val();
    var Ruta = $("#IdAddRuta").val();
    var IdSubSeccion = $("#IdAddPantallas_SubSeccionId").val();

    $.ajax({
        url: "/ControlMenus/SavePantallas",
        data: { Ajax: 1, Pantalla: Pantalla, Ruta: Ruta, IdSubSeccion: IdSubSeccion },
        type: "POST",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("XSRF-TOKEN",
                $('input:hidden[name="__RequestVerificationToken"]').val());
        },
    }).done(function (result) {
        if (result != null) {
            if (result == "SessionExpirada") { SwalSessionExpirada() }
            else if (result == "Existe") { toastr.warning("Ya existe una registro con ese nombre!"); }
            else if (result != "Error") {
                var Obj = JSON.parse(result);

                Swal.fire({
                    text: "El registro se guardado correctamente!",
                    icon: "success",
                    buttonsStyling: false,
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    confirmButtonText: "Ok!",
                    customClass:
                    {
                        confirmButton: "btn btn-primary"
                    }
                }).then((result) => {
                    if (result.isConfirmed) {
                        GetPantallas(IdSubSeccion)
                        $('#ModalAddPantallas').modal('hide');
                    }

                });


            }
            else { toastr.error("Error al guardar, por favor contacta al administrador!"); }
        }

    }).fail(function (error) { toastr.error("Error de servidor, por favor contacta al administrador!"); });
}
function EditPantallasModal(Fila, Id, Descripcion, Ruta, IdSeccion) {
    SeleccionarFila = Fila;
    $('#IdEditPantallas_Id').val(Id);
    $('#IdEditPantallas_SubSeccionId').val(IdSeccion);
    $('#IdEditPantallas').val(Descripcion);
    $('#IdEditRuta').val(Ruta);

    $("input").removeClass("is-valid").removeClass("is-invalid");//Se borra las alertas de error al validar
    $('[data-field]').remove();////Se borra las alertas de error al validar

    $('#ModalEditPantallas').modal('show');
}
function EditPantallas() {
    var Id = $("#IdEditPantallas_Id").val();
    var IdSubSeccion = $("#IdEditPantallas_SubSeccionId").val();
    var Pantalla = $("#IdEditPantallas").val();
    var Ruta = $("#IdEditRuta").val();

    $.ajax({
        url: "/ControlMenus/UpdatePantallas",
        data: { Ajax: 1, Id: Id, Pantalla: Pantalla, Ruta: Ruta  },
        type: "POST",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("XSRF-TOKEN",
                $('input:hidden[name="__RequestVerificationToken"]').val());
        },
    }).done(function (result) {
        if (result != null) {
            if (result == "SessionExpirada") { SwalSessionExpirada() }
            else if (result == "Existe") { toastr.warning("Ya existe un registro con ese nombre!"); }
            else if (result != "Error") {
                var Obj = JSON.parse(result);

                Swal.fire({
                    text: "Registro actualizado correctamente!",
                    icon: "success",
                    buttonsStyling: false,
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    confirmButtonText: "Ok!",
                    customClass:
                    {
                        confirmButton: "btn btn-primary"
                    }
                }).then((result) => {
                    if (result.isConfirmed) {

                        GetPantallas(IdSubSeccion)

                        $('#ModalEditPantallas').modal('hide');
                    }
                });
            } else { toastr.error("Error en la actualización, por favor contacta al administrador!"); }
        }
    }).fail(function (error) { toastr.error("Error de servidor, por favor contacta al administrador!"); });
}
function DeletePantallas(Row, Id) {
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
                url: "/ControlMenus/DeletePantallas",
                data: {
                    Ajax: 1, Id: Id
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
                        var tMSeccion = $('#Tabla3').DataTable();
                        tMSeccion.row($(Row).parents('tr')).remove().draw();
                        toastr.success("Se elimino correctamente!");
                    }
                    else { toastr.error("Error al eliminar, por favor contacta al administrador!"); }
                }
            }).fail(function (error) { toastr.error("Error de servidor, por favor contacta al administrador!"); });
        }
        else { $('.swal2-container').css('display', 'none'); }
    });

}
//#endregion



