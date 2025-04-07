//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////  FUNCIONES DE ARRANQUE  /////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function () {
    if(window.innerWidth <= 992){$("#kt_app_sidebar").addClass("app-sidebar flex-column drawer drawer-start");}
 /*   GetClientes()*/
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////// DATATABLES ///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var Tabla1 = function () {
    // Shared variables
    var table;
    var datatable;

    // Private functions
    var initDatatable = function () {

        // Init datatable --- more info on datatables: https://datatables.net/manual/
        datatable = $(table).DataTable({

            //"columnDefs": [
            //    { "targets": 0, "className": "text-center" },
            //    { "targets": 1, "className": "text-center" },
            //    { "targets": 2, "className": "text-center" },
            //],
            "scrollY": 500,
            "scrollX": true,
            "info": true,
            'order': [],
            "ordering": true,
            'pageLength': 100,
            'scrollCollapse': true,
            "language": {
                "sProcessing": "Procesando...",
                "sSearch": "Buscar:",
                "sLengthMenu": " _MENU_ ",
                "sInfo": " _START_ al _END_ de _TOTAL_ registros",
                "sInfoClientty": "Mostrando registros del 0 al 0 de 0 ",
                "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
                "sInfoPostFix": "",
                "sLoadingRecords": "Cargando...",
                "sZeroRecords": "No se encontraron registros",
                "sClienttyTable": "Ningún dato disponible en esta tabla",
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
        const documentTitle = 'Reporte de Clientes';
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
        }).container().appendTo($('#Tabla1_buttons'));

        // Hook dropdown menu click event to datatable export buttons
        const exportButtons = document.querySelectorAll('#Tabla1_export_menu [Tabla1-export]');
        exportButtons.forEach(exportButton => {
            exportButton.addEventListener('click', e => {
                e.preventDefault();

                const exportValue = e.target.getAttribute('Tabla1-export');
                var target = document.querySelector('div[id="Tabla1_buttons"]');
                target = target.querySelector('.buttons-' + exportValue);
                target.click();
            });
        });
    }

    // Search Datatable --- official docs reference: https://datatables.net/reference/api/search()
    var handleSearchDatatable = () => {
        const filterSearch = document.querySelector('[data-kt-filter="searchCliente"]');
        filterSearch.addEventListener('keyup', function (e) {
            datatable.search(e.target.value).draw();
        });
    }

    // Public methods
    return {
        init: function () {
            table = document.querySelector('#Tabla1');

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
    Tabla1.init();
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////  Star CRUD de Modales  ///////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//************** CRUD Clientes **************************************** */
var FilaSeleccionada = null;

function GetClientes() {

   /* BlockPantalla.block()*/

    $.ajax({
        url: "/Clientes/GetClientes",
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

                var tClientes = $('#Tabla1').DataTable();
                tClientes.clear().draw();

                for (var i = 0; i < Obj.length; i++) {
                    //var ClienteJson = JSON.stringify(Obj[i]).replace(/"/g, '&quot;');
                    //var Actions = Obj[i].Activo == true ? `<a onclick="OnOfCliente(${Obj[i].Id})" class="btn btn-light-youtube me-2 p-2 pe-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Eliminar"><i class="fas fa-times fs-7 fw-bold"></i></a>` +
                    //`<a onclick="ModalEditCliente(${ClienteJson})" class="btn btn-light-warning me-2 p-2 pe-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Editar"><i class="fas fa-edit fs-6 fw-bold"></i></a>`
                    //:`<a onclick="OnOfCliente( ${Obj[i].Id})"  class="btn btn-light-success me-2 p-2 pe-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Activar Cliente"><i class="fas fa-check fs-7 fw-bold"></i></a>` +
                    //`<a class="btn btn-light me-2 p-2 pe-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Cliente Inactivo"><i class="fas fa-edit fs-6 fw-bold"></i></a>`;

                    var newRow = tClientes.row.add([
                        "",
                        Obj[i].Clave,
                        Obj[i].NombreCliente,
                        Obj[i].RFC,
                        Obj[i].Activo
                    ]).draw(false).node();

                    //$(newRow).addClass('align-middle');

                    // Aplicar clase si Activo es false
                    //if (Obj[i].Activo == false) {
                    //    $(newRow).addClass('align-middle bg-light-danger'); // Agrega la clase bg-rosa a la fila
                    //}
                }

                KTApp.init();
                KTMenu.init();

               /* BlockPantalla.release()*/
            }
            else {
                toastr.error("Error al guardar, por favor contacta al administrador!");
                /*BlockPantalla.release()*/
            }
        }
    }).fail(function (error) {
    
        toastr.error("Error de servidor, por favor contacta al administrador!");
        BlockPantalla.release()
    });
}
function ModalNewCliente() {

    $('#IdAddClientClave').val("");
    $('#IdAddClientNombre').val("");
    $('#IdAddClientRFC').val("");

    document.getElementById("AddClienteForm").reset();
    $("input").removeClass("is-valid").removeClass("is-invalid");
    $('[data-field]').remove();

    $("#AddCliente").modal("show");
}
function SaveCliente() {
    formData = new FormData();
    formData.append("Ajax", 1);
    formData.append("Clave", $('#IdAddClientClave').val());
    formData.append("Nombre", $('#IdAddClientNombre').val());
    formData.append("RFC", $('#IdAddClientRFC').val());

    $.ajax({
        url: "/Clientes/SaveCliente",
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
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
                toastr.warning("Ya existe un Cliente con la misma Clave SAP o RFC!");
            }
            else if (result != "Error") {

                var Obj = JSON.parse(result);

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

                        var tClientes = $('#Tabla1').DataTable();
                        for (var i = 0; i < Obj.length; i++) {

                            var ClienteJson = JSON.stringify(Obj[i]).replace(/"/g, '&quot;');
                            var Actions = Obj[i].Status == "ACTIVO" ? `<a onclick="OnOfCliente(this, ${Obj[i].Id})" class="btn btn-light-youtube me-2 p-2 pe-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Eliminar"><i class="fas fa-times fs-7 fw-bold"></i></a>` +
                            `<a onclick="ModalEditCliente(this, ${ClienteJson})" class="btn btn-light-warning me-2 p-2 pe-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Editar"><i class="fas fa-edit fs-6 fw-bold"></i></a>`
                                :`<a onclick="OnOfCliente(this, ${Obj[i].Id})"  class="btn btn-light-success me-2 p-2 pe-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Activar Cliente"><i class="fas fa-check fs-7 fw-bold"></i></a>` +
                            `<a class="btn btn-light me-2 p-2 pe-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Cliente Inactivo"><i class="fas fa-edit fs-6 fw-bold"></i></a>`;

                            var newRow = tClientes.row.add([
                                Actions,
                                Obj[i].Clave,
                                Obj[i].NombreCliente,
                                Obj[i].RFC,
                                Obj[i].Status
                            ]).draw(false).node();
                            $(newRow).addClass('align-middle');
                            $('#AddCliente').modal('hide');
                            //if (Obj[i].Status != "ACTIVO") {
                            //    $(newRow).addClass('align-middle bg-light-danger'); 
                            //}
                        }


                        KTApp.init();
                        KTMenu.init();
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
function ModalEditCliente(Fila, Cliente) {

    FilaSeleccionada = Fila;

    document.getElementById("EditClienteForm").reset();
    $("input").removeClass("is-valid").removeClass("is-invalid");
    $('[data-field]').remove();

    $('#IdEditCliente').val(Cliente.Id);
    $('#IdEditClientClave').val(Cliente.Clave);
    $('#IdEditClientNombre').val(Cliente.NombreCliente);
    $('#IdEditClientRFC').val(Cliente.RFC);

    $("#EditCliente").modal("show");
}
function UpdateCliente() {

    formData = new FormData();
    formData.append("Ajax", 1);
    formData.append("Id", $('#IdEditCliente').val());
    formData.append("Clave", $('#IdEditClientClave').val());
    formData.append("Nombre", $('#IdEditClientNombre').val());
    formData.append("RFC", $('#IdEditClientRFC').val());

    $.ajax({
        url: "/Clientes/UpdateCliente",
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
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
                toastr.warning("Ya existe un Cliente con la misma CURP!");
            }
            else if (result != "Error") {

                var Obj = JSON.parse(result);

                Swal.fire({
                    text: "Editado Correctamente!",
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

                        var tClientes = $('#Tabla1').DataTable();
                        for (var i = 0; i < Obj.length; i++) {

                            var ClienteJson = JSON.stringify(Obj[i]).replace(/"/g, '&quot;');
                            var Actions = Obj[i].Status == "ACTIVO" ? `<a onclick="OnOfCliente(this, ${Obj[i].Id})" class="btn btn-light-youtube me-2 p-2 pe-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Eliminar"><i class="fas fa-times fs-7 fw-bold"></i></a>` +
                                `<a onclick="ModalEditCliente(this, ${ClienteJson})" class="btn btn-light-warning me-2 p-2 pe-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Editar"><i class="fas fa-edit fs-6 fw-bold"></i></a>`
                                : `<a onclick="OnOfCliente(this, ${Obj[i].Id})"  class="btn btn-light-success me-2 p-2 pe-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Activar Cliente"><i class="fas fa-check fs-7 fw-bold"></i></a>` +
                                `<a class="btn btn-light me-2 p-2 pe-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Cliente Inactivo"><i class="fas fa-edit fs-6 fw-bold"></i></a>`;

                            var newRow = tClientes.row($(FilaSeleccionada).parents('tr')).data([
                                Actions,
                                Obj[i].Clave,
                                Obj[i].NombreCliente,
                                Obj[i].RFC,
                                Obj[i].Status
                            ]).draw(false).node();
                            $(newRow).addClass('align-middle');
                            $('#AddCliente').modal('hide');
                        }
                        $('#EditCliente').modal('hide');
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
function OnOfCliente(Fila, Id, Status) {

    var Estatus = Status == 0 ? "desactivar" : "activar";

    Swal.fire({
        text: `Esta seguro de ${Estatus} el Registro?`,
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
                url: "/Clientes/OnOfCliente",
                data: {
                    Ajax: 1, Id: Id, OnOf: Status
                },
                type: "POST",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("XSRF-TOKEN",
                        $('input:hidden[name="__RequestVerificationToken"]').val());
                },
            }).done(function (result) {
                if (result != null)
                {
                    if (result == "SessionExpirada") { SwalSessionExpirada() }
                    else if (result != "Error") {

                        var Obj = JSON.parse(result);

                        var tClientes = $('#Tabla1').DataTable();
                        for (var i = 0; i < Obj.length; i++) {

                            var ClienteJson = JSON.stringify(Obj[i]).replace(/"/g, '&quot;');
                            var Actions = Obj[i].Status == "ACTIVO" ? `<a onclick="OnOfCliente(this, ${Obj[i].Id}, 0)" class="btn btn-light-youtube me-2 p-2 pe-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Eliminar"><i class="fas fa-times fs-7 fw-bold"></i></a>` +
                                `<a onclick="ModalEditCliente(this, ${ClienteJson})" class="btn btn-light-warning me-2 p-2 pe-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Editar"><i class="fas fa-edit fs-6 fw-bold"></i></a>`
                                : `<a onclick="OnOfCliente(this, ${Obj[i].Id}, 1)"  class="btn btn-light-success me-2 p-2 pe-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Activar Cliente"><i class="fas fa-check fs-7 fw-bold"></i></a>` +
                                `<a class="btn btn-light me-2 p-2 pe-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Cliente Inactivo"><i class="fas fa-edit fs-6 fw-bold"></i></a>`;

                            var newRow = tClientes.row($(Fila).parents('tr')).data([
                                Actions,
                                Obj[i].Clave,
                                Obj[i].NombreCliente,
                                Obj[i].RFC,
                                Obj[i].Status
                            ]).draw(false).node();
                            $(newRow).addClass('align-middle');
                            if (Obj[i].Status != "ACTIVO") {
                                $(newRow).addClass('align-middle bg-light-danger');
                            } else {
                                $(newRow).removeClass('bg-light-danger');
                            }
                        }

                        $('#EditCliente').modal('hide');

                        toastr.success("Se actualizo el estatus correctamente!");

                    }
                    else { toastr.error("Error al eliminar, por favor contacta al administrador!"); }
                }
            }).fail(function (error) { toastr.error("Error de servidor, por favor contacta al administrador!"); });
        }
        else { $('.swal2-container').css('display', 'none'); }
    });

}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////  FORMS VALIDATION ///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//************************** START Validation Add Cliente ****************************************************************************************
var AddClienteForm = document.getElementById('AddClienteForm');
var validatorAddCliente = FormValidation.formValidation(
    AddClienteForm,
    {

        fields: {
             
                'IdAddClientClave': {
                    validators: {
                        notEmpty: {
                            message: 'El campo es requerido.'
                        }
                    }
                },
                'IdAddClientNombre': {
                    validators: {
                        notEmpty: {
                            message: 'El campo es requerido.'
                        }
                    }
                }, 'IdAddClientRFC': {
                    validators: {
                        notEmpty: {
                            message: 'El campo es requerido.'
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
var AddClienteButton = document.getElementById('AddClienteButton');
AddClienteButton.addEventListener('click', function (e) {
    e.preventDefault();

    if (validatorAddCliente) {
        validatorAddCliente.validate().then(function (status) {
            if (status == 'Valid') {
                AddClienteButton.setAttribute('data-kt-indicator', 'on');
                AddClienteButton.disabled = true;
                setTimeout(function () {
                    AddClienteButton.removeAttribute('data-kt-indicator');
                    AddClienteButton.disabled = false;

                    SaveCliente()

                }, 1000);
            }
            else {
                AddClienteButton.setAttribute('data-kt-indicator', 'on');
                AddClienteButton.disabled = true;
                setTimeout(function () {
                    AddClienteButton.removeAttribute('data-kt-indicator');
                    AddClienteButton.disabled = false;

                }, 150);
            }
        });
    }
});
//************************** END Validation Add Cliente ****************************************************************************************

//************************** START Validation Edit Cliente ****************************************************************************************
var EditClienteForm = document.getElementById('EditClienteForm');
var validatorEditCliente = FormValidation.formValidation(
    EditClienteForm,
    {

        fields: {

            'IdEditClientClave': {
                validators: {
                    notEmpty: {
                        message: 'El campo es requerido.'
                    }
                }
            },
            'IdEditClientNombre': {
                validators: {
                    notEmpty: {
                        message: 'El campo es requerido.'
                    }
                }
            }, 'IdEditClientRFC': {
                validators: {
                    notEmpty: {
                        message: 'El campo es requerido.'
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
var EditClienteButton = document.getElementById('EditClienteButton');
EditClienteButton.addEventListener('click', function (e) {
    e.preventDefault();

    if (validatorEditCliente) {
        validatorEditCliente.validate().then(function (status) {
            if (status == 'Valid') {
                EditClienteButton.setAttribute('data-kt-indicator', 'on');
                EditClienteButton.disabled = true;
                setTimeout(function () {
                    EditClienteButton.removeAttribute('data-kt-indicator');
                    EditClienteButton.disabled = false;

                    UpdateCliente()

                }, 1000);
            }
            else {
                EditClienteButton.setAttribute('data-kt-indicator', 'on');
                EditClienteButton.disabled = true;
                setTimeout(function () {
                    EditClienteButton.removeAttribute('data-kt-indicator');
                    EditClienteButton.disabled = false;

                }, 150);
            }
        });
    }
});
//************************** END Validation Edit Cliente ****************************************************************************************
