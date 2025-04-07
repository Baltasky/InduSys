//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////  FUNCIONES DE ARRANQUE  /////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function () {
    if(window.innerWidth <= 992){$("#kt_app_sidebar").addClass("app-sidebar flex-column drawer drawer-start");}
    GetTipoDocs()
});

document.getElementById("Panel2").addEventListener("click", function (event) {
    GetBancos()
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////// DATATABLES ///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var Tabla1 = function () {
    var table;
    var datatable;
    var initDatatable = function () {
        datatable = $(table).DataTable({
            "columnDefs": [
                { "targets": 0, "className": " text-center" },
            ],
            //"scrollY": 400,
            "scrollX": true,
            "info": true,
            'order': [],
            "ordering": false,
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

    var handleSearchDatatable = () => {
        const filterSearch = document.querySelector('[data-kt-filter="searchTabla1"]');
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

var TablaAsignarUsuario = function () {
    var table;
    var datatable;
    var initDatatable = function () {
        datatable = $(table).DataTable({
            "columnDefs": [
                { "targets": 0, "className": "min-w-100px text-center" },
                { "targets": 1, "className": "min-w-300px" },
                { "targets": 2, "className": "min-w-250px" },
            ],
            "info": true,
            'order': [],
            "ordering": false,
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

    return {
        init: function () {
            table = document.querySelector('#TablaAsignarUsuario');

            if (!table) {
                return;
            }

            initDatatable();
        }
    };
}();
KTUtil.onDOMContentLoaded(function () {
    TablaAsignarUsuario.init();
});

var Tabla2 = function () {
    var table;
    var datatable;
    var initDatatable = function () {
        datatable = $(table).DataTable({
            "columnDefs": [
                { "targets": 0, "className": "min-w-100px text-center" },
            ],
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

    var handleSearchDatatable = () => {
        const filterSearch = document.querySelector('[data-kt-filter="searchTabla2"]');
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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////  Star CRUD de Modales  ///////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//************** CRUD Documentos **************************************** */
var FilaSeleccionada = null;

function GetTipoDocs() {

    BlockPantalla.block()

    $.ajax({
        url: "/Clientes/GetTipoDocs",
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

                var Tabla1 = $('#Tabla1').DataTable();
                Tabla1.clear().draw();

                for (var i = 0; i < Obj.length; i++) {
                    var Tabla1Json = JSON.stringify(Obj[i]).replace(/"/g, '&quot;');
                    var Actions = Obj[i].Status == "ACTIVO" ? `<a onclick="OnOfDocs(${Obj[i].Id}, 0)" class="btn btn-light-youtube me-2 p-2 pe-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Eliminar"><i class="fas fa-times fs-7 fw-bold"></i></a>` +
                     `<a onclick="ModalEditDocs(${Tabla1Json})" class="btn btn-light-warning me-2 p-2 pe-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Editar"><i class="fas fa-edit fs-6 fw-bold"></i></a>` +
                     `<a onclick="ModalLinkedDocUser(${Obj[i].Id}, '${Obj[i].Descripcion}')" class="btn btn-light-primary me-2 p-2 pe-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Asignar Usuarios"><i class="fas fa-user-cog fs-7 fw-bold"></i></a>`
                    : `<a onclick="OnOfDocs(${Obj[i].Id}, 1)"  class="btn btn-light-success me-2 p-2 pe-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Activar Doc"><i class="fas fa-check fs-7 fw-bold"></i></a>` +
                    `<a class="btn btn-light me-2 p-2 pe-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Banco Doc"><i class="fas fa-edit fs-6 fw-bold"></i></a>`;

                    var newRow = Tabla1.row.add([
                        Actions,
                        Obj[i].Descripcion,
                        Obj[i].UsuarioRegistro,
                        Obj[i].FechaRegistro,
                        Obj[i].UsuarioModificacion,
                        Obj[i].FechaModificacion,
                        Obj[i].Status
                    ]).draw(false).node();
                    $(newRow).addClass('align-middle');
                    if (Obj[i].Status != "ACTIVO") {
                        $(newRow).addClass('align-middle bg-light-danger'); // Agrega la clase bg-rosa a la fila
                    } else {
                        $(newRow).removeClass('bg-light-danger');
                    }

                    KTApp.init();
                    KTMenu.init();
                }

                BlockPantalla.release()
            }
            else {
                toastr.error("Error al guardar, por favor contacta al administrador!");
                BlockPantalla.release()
            }
        }
    }).fail(function (error) {

        toastr.error("Error de servidor, por favor contacta al administrador!");
        BlockPantalla.release()
    });
}
function ModalNewDocs() {

    $('#IdAddDescripcionTD').val("");

    document.getElementById("AddTDocumentoForm").reset();
    $("input").removeClass("is-valid").removeClass("is-invalid");
    $('[data-field]').remove();

    $("#AddDocumento").modal("show");
}
function SaveDocs() {
    formData = new FormData();
    formData.append("Ajax", 1);
    formData.append("Descripcion", $('#IdAddDescripcionTD').val());

    $.ajax({
        url: "/Clientes/SaveDoc",
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
                toastr.warning("Ya existe un Documento con la mismo nombre!");
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

                        GetTipoDocs()
                        $("#AddDocumento").modal("hide");
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
function ModalEditDocs(Doc) {

    document.getElementById("EditDocsForm").reset();
    $("input").removeClass("is-valid").removeClass("is-invalid");
    $('[data-field]').remove();

    $('#IdTDocumento').val(Doc.Id);
    $('#IdEditDescripcionTD').val(Doc.Descripcion);

    $("#EditDocumento").modal("show");
}
function UpdateDocs() {

    formData = new FormData();
    formData.append("Ajax", 1);
    formData.append("Id", $('#IdTDocumento').val());
    formData.append("Descripcion", $('#IdEditDescripcionTD').val());

    $.ajax({
        url: "/Clientes/UpdateDoc",
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
                toastr.warning("Ya existe un Documento con la mismo nombre!");
            }
            else if (result != "Error") {

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

                        GetTipoDocs()
                        $('#EditDocumento').modal('hide');
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
function OnOfDocs(Id, Status) {

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
                url: "/Clientes/OnOfDoc",
                data: {
                    Ajax: 1, Id: Id, OnOf: Status
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

                        GetTipoDocs()

                        toastr.success("Se actualizo el estatus correctamente!");
                    }
                    else { toastr.error("Error al eliminar, por favor contacta al administrador!"); }
                }
            }).fail(function (error) { toastr.error("Error de servidor, por favor contacta al administrador!"); });
        }
        else { $('.swal2-container').css('display', 'none'); }
    });

}

function UsariosAsignados(IdTipoDoc) {

    $.ajax({
        url: "/Clientes/UsariosAsignados",
        data: { Ajax: 1, IdTipoDoc: IdTipoDoc },
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

                var TablaAsignarUsuario = $('#TablaAsignarUsuario').DataTable();
                TablaAsignarUsuario.clear().draw();

                for (var i = 0; i < Obj.length; i++) {

                    var newRow = TablaAsignarUsuario.row.add([
                        `<a onclick="DeleteLinkedUser(${Obj[i].Id})" class="btn btn-light-youtube me-2 p-2 pe-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Eliminar"><i class="fas fa-times fs-7 fw-bold"></i></a>`,
                        Obj[i].Descripcion,
                        Obj[i].FechaRegistro
                    ]).draw(false).node();
                    $(newRow).addClass('align-middle');

                    KTApp.init();
                    KTMenu.init();
                }

                BlockPantalla.release()
            }
            else {
                toastr.error("Error al guardar, por favor contacta al administrador!");
                BlockPantalla.release()
            }
        }
    }).fail(function (error) {

        toastr.error("Error de servidor, por favor contacta al administrador!");
        BlockPantalla.release()
    });
   
}
function ModalLinkedDocUser(IdTipoDoc, Descripcion) {

    $("#IdAddTipoSUsuario").val(null).trigger('change');
    $('#AddLnkedIdTipoDoc').val("");
    $('#TituloTDoc').text('');
    $('#AddLnkedIdTipoDoc').val(IdTipoDoc);
    $('#TituloTDoc').text(Descripcion);

    UsariosAsignados(IdTipoDoc);
    $('#ModalLinkedDocUser').modal('show');
}
function SaveLinkedDocUser() {

    var IdTipoDoc = $('#AddLnkedIdTipoDoc').val();

    $.ajax({
        url: "/Clientes/SaveLinkedDocUser",
        data: {
            Ajax: 1,
            IdTipoDoc: IdTipoDoc,
            Id_Usuario: $("#IdAddTipoSUsuario").val()
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
            else if (result == "Existe") { toastr.warning("El usuario ya esta como aprobador del Doc.!"); }
            else if (result != "Error")
            {
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
                        $("#IdAddTipoSUsuario").val(null).trigger('change');//Metodo para limpiar los combox
                        UsariosAsignados(IdTipoDoc);
                    }
                });
            }
            else { toastr.error("Error al guardar, por favor contacta al administrador!"); }
        }
    }).fail(function (error) {
        toastr.error("Error de servidor, por favor contacta al administrador!");
    });
}
function DeleteLinkedUser(Id) {

    var IdTipoDoc = $('#AddLnkedIdTipoDoc').val();

    Swal.fire({
        text: "Esta seguro de eliminar el Registro?",
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
                url: "/Clientes/DeleteLinkedUser",
                data: { Ajax: 1, Id: Id, IdTipoDoc:IdTipoDoc },
                type: "POST", // se coloca para que validen con el token del controlador
                beforeSend: function (xhr)// se coloca para que validen con el token del controlador
                {
                    xhr.setRequestHeader("XSRF-TOKEN",
                        $('input:hidden[name="__RequestVerificationToken"]').val());
                },
            }).done(function (result) {
                if (result != null) {
                    if (result == "SessionExpirada") { SwalSessionExpirada() }
                    else if (result != "Error")
                    {
                        $("#IdAddTipoSUsuario").val(null).trigger('change');//Metodo para limpiar los combox
                        UsariosAsignados(IdTipoDoc);
                        toastr.success("Se elimino correctamente!");
                    }
                    else { toastr.error("Error al eliminar, por favor contacta al administrador!"); }
                }
            }).fail(function (error) { toastr.error("Error de servidor, por favor contacta al administrador!"); });
        }
        else { $('.swal2-container').css('display', 'none'); }
    });
}

//************** CRUD Bancos **************************************** */
function GetBancos() {

    BlockPantalla.block()

    $.ajax({
        url: "/Clientes/GetBancos",
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

                var tBancos = $('#Tabla2').DataTable();
                tBancos.clear().draw();

                for (var i = 0; i < Obj.length; i++) {
                    var BancoJson = JSON.stringify(Obj[i]).replace(/"/g, '&quot;');
                    var Actions = Obj[i].Status == "ACTIVO" ? `<a onclick="OnOfBanco(this, ${Obj[i].Id})" class="btn btn-light-youtube me-2 p-2 pe-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Eliminar"><i class="fas fa-times fs-7 fw-bold"></i></a>` +
                        `<a onclick="ModalEditBanco(this, ${BancoJson})" class="btn btn-light-warning me-2 p-2 pe-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Editar"><i class="fas fa-edit fs-6 fw-bold"></i></a>`
                        : `<a onclick="OnOfBanco(this, ${Obj[i].Id})"  class="btn btn-light-success me-2 p-2 pe-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Activar Banco"><i class="fas fa-check fs-7 fw-bold"></i></a>` +
                        `<a class="btn btn-light me-2 p-2 pe-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Banco Inactivo"><i class="fas fa-edit fs-6 fw-bold"></i></a>`;

                    var newRow = tBancos.row.add([
                        Actions,
                        Obj[i].Nombre,
                        Obj[i].NombreFiscal,
                        Obj[i].UsuarioRegistro,
                        Obj[i].FechaRegistro,
                        Obj[i].Status
                    ]).draw(false).node();
                    $(newRow).addClass('align-middle');
                    if (Obj[i].Status != "ACTIVO") { 
                        $(newRow).addClass('align-middle bg-light-danger'); // Agrega la clase bg-rosa a la fila
                    } else {
                        $(newRow).removeClass('bg-light-danger');
                    }

                    KTApp.init()
                    KTMenu.init()

                }
                

                BlockPantalla.release()
            }
            else {
                toastr.error("Error al guardar, por favor contacta al administrador!");
                BlockPantalla.release()
            }
        }
    }).fail(function (error) {
    
        toastr.error("Error de servidor, por favor contacta al administrador!");
        BlockPantalla.release()
    });
}
function ModalNewBanco() {

    $('#IdAddNombre').val("");
    $('#IdAddNombreFiscal').val("");

    document.getElementById("AddBancoForm").reset();
    $("input").removeClass("is-valid").removeClass("is-invalid");
    $('[data-field]').remove();

    $("#AddBanco").modal("show");
}
function SaveBanco() {
    formData = new FormData();
    formData.append("Ajax", 1);
    formData.append("Clave", $('#IdAddClientClave').val());
    formData.append("Nombre", $('#IdAddClientNombre').val());
    formData.append("RFC", $('#IdAddClientRFC').val());

    $.ajax({
        url: "/Clientes/SaveBanco",
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
                toastr.warning("Ya existe un Banco con la misma Clave SAP o RFC!");
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

                        var tBancos = $('#Tabla2').DataTable();
                        for (var i = 0; i < Obj.length; i++) {

                            var BancoJson = JSON.stringify(Obj[i]).replace(/"/g, '&quot;');
                            var Actions = Obj[i].Status == "ACTIVO" ? `<a onclick="OnOfBanco(this, ${Obj[i].Id})" class="btn btn-light-youtube me-2 p-2 pe-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Eliminar"><i class="fas fa-times fs-7 fw-bold"></i></a>` +
                                `<a onclick="ModalEditBanco(this, ${BancoJson})" class="btn btn-light-warning me-2 p-2 pe-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Editar"><i class="fas fa-edit fs-6 fw-bold"></i></a>`
                                : `<a onclick="OnOfBanco(this, ${Obj[i].Id})"  class="btn btn-light-success me-2 p-2 pe-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Activar Banco"><i class="fas fa-check fs-7 fw-bold"></i></a>` +
                                `<a class="btn btn-light me-2 p-2 pe-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Banco Inactivo"><i class="fas fa-edit fs-6 fw-bold"></i></a>`;

                            var newRow = tBancos.row.add([
                                Actions,
                                Obj[i].Nombre,
                                Obj[i].NombreFiscal,
                                Obj[i].UsuarioRegistro,
                                Obj[i].FechaRegistro,
                                Obj[i].Status
                            ]).draw(false).node();
                            $(newRow).addClass('align-middle');
                            $('#AddBanco').modal('hide');
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
function ModalEditBanco(Fila, Banco) {

    FilaSeleccionada = Fila;

    document.getElementById("EditBancoForm").reset();
    $("input").removeClass("is-valid").removeClass("is-invalid");
    $('[data-field]').remove();

    $('#IdEditBanco').val(Banco.Id);
    $('#IdEditClientClave').val(Banco.Clave);
    $('#IdEditClientNombre').val(Banco.NombreBanco);
    $('#IdEditClientRFC').val(Banco.RFC);

    $("#EditBanco").modal("show");
}
function UpdateBanco() {

    formData = new FormData();
    formData.append("Ajax", 1);
    formData.append("Id", $('#IdEditBanco').val());
    formData.append("Clave", $('#IdEditClientClave').val());
    formData.append("Nombre", $('#IdEditClientNombre').val());
    formData.append("RFC", $('#IdEditClientRFC').val());

    $.ajax({
        url: "/Clientes/UpdateBanco",
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
                toastr.warning("Ya existe un Banco con la misma CURP!");
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

                        var tBancos = $('#Tabla2').DataTable();
                        for (var i = 0; i < Obj.length; i++) {

                            var BancoJson = JSON.stringify(Obj[i]).replace(/"/g, '&quot;');
                            var Actions = Obj[i].Status == "ACTIVO" ? `<a onclick="OnOfBanco(this, ${Obj[i].Id})" class="btn btn-light-youtube me-2 p-2 pe-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Eliminar"><i class="fas fa-times fs-7 fw-bold"></i></a>` +
                                `<a onclick="ModalEditBanco(this, ${BancoJson})" class="btn btn-light-warning me-2 p-2 pe-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Editar"><i class="fas fa-edit fs-6 fw-bold"></i></a>`
                                : `<a onclick="OnOfBanco(this, ${Obj[i].Id})"  class="btn btn-light-success me-2 p-2 pe-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Activar Banco"><i class="fas fa-check fs-7 fw-bold"></i></a>` +
                                `<a class="btn btn-light me-2 p-2 pe-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Banco Inactivo"><i class="fas fa-edit fs-6 fw-bold"></i></a>`;

                            var newRow = tBancos.row($(FilaSeleccionada).parents('tr')).data([
                                Actions,
                                Obj[i].Clave,
                                Obj[i].NombreBanco,
                                Obj[i].RFC,
                                Obj[i].Status
                            ]).draw(false).node();
                            $(newRow).addClass('align-middle');
                            $('#AddBanco').modal('hide');
                        }
                        $('#EditBanco').modal('hide');
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
function OnOfBanco(Fila, Id, Status) {

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
                url: "/Clientes/OnOfBanco",
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

                        var tBancos = $('#Tabla2').DataTable();
                        for (var i = 0; i < Obj.length; i++) {

                            var BancoJson = JSON.stringify(Obj[i]).replace(/"/g, '&quot;');
                            var Actions = Obj[i].Status == "ACTIVO" ? `<a onclick="OnOfBanco(this, ${Obj[i].Id}, 0)" class="btn btn-light-youtube me-2 p-2 pe-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Eliminar"><i class="fas fa-times fs-7 fw-bold"></i></a>` +
                                `<a onclick="ModalEditBanco(this, ${BancoJson})" class="btn btn-light-warning me-2 p-2 pe-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Editar"><i class="fas fa-edit fs-6 fw-bold"></i></a>`
                                : `<a onclick="OnOfBanco(this, ${Obj[i].Id}, 1)"  class="btn btn-light-success me-2 p-2 pe-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Activar Banco"><i class="fas fa-check fs-7 fw-bold"></i></a>` +
                                `<a class="btn btn-light me-2 p-2 pe-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Banco Inactivo"><i class="fas fa-edit fs-6 fw-bold"></i></a>`;

                            var newRow = tBancos.row($(Fila).parents('tr')).data([
                                Actions,
                                Obj[i].Clave,
                                Obj[i].NombreBanco,
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

                        $('#EditBanco').modal('hide');

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
//************************** START Validation Add Tipo Documento ****************************************************************************************
var AddTDocumentoForm = document.getElementById('AddTDocumentoForm');
var validatorTDocumento = FormValidation.formValidation(
    AddTDocumentoForm,
    {
        fields: {
            "IdAddDescripcionTD": {
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
var AddTDocumenButton = document.getElementById('NewTDocumentoButton'); // Controlador de bot�n Enviar
AddTDocumenButton.addEventListener('click', function (e) // Prevenir la acci�n del bot�n predeterminado
{
    e.preventDefault();
    if (validatorTDocumento)    // Validar formulario antes de enviar
    {
        validatorTDocumento.validate().then(function (status) {
            if (status == 'Valid') {
                AddTDocumenButton.setAttribute('data-kt-indicator', 'on');
                AddTDocumenButton.disabled = true;
                setTimeout(function () {
                    AddTDocumenButton.removeAttribute('data-kt-indicator');
                    AddTDocumenButton.disabled = false;
                    SaveDocs();
                }, 1000);
            }
            else {
                AddTDocumenButton.setAttribute('data-kt-indicator', 'on');
                AddTDocumenButton.disabled = true;
                setTimeout(function () {
                    AddTDocumenButton.removeAttribute('data-kt-indicator');
                    AddTDocumenButton.disabled = false;
                }, 150);
            }
        });
    }
});
//************************** END Validation Add Tipo Documento ****************************************************************************************

//************************** START Validation Add Tipo Documento ****************************************************************************************
var EditTDocumentos = document.getElementById('EditDocsForm');
var validatorEditTDoc = FormValidation.formValidation(
    EditTDocumentos,
    {
        fields: {
            "IdEditDescripcionTD": {
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
var EdiTDocButton = document.getElementById('EditTDocumentoButton');       // Enviar controlador de bot�n
EdiTDocButton.addEventListener('click', function (e) {

    e.preventDefault();// Evitar la acci�n del bot�n predeterminado
    if (validatorEditTDoc) // Validar formulario antes de enviar
    {
        validatorEditTDoc.validate().then(function (status) {
            if (status == 'Valid') {
                EdiTDocButton.setAttribute('data-kt-indicator', 'on');
                EdiTDocButton.disabled = true;
                setTimeout(function () {
                    EdiTDocButton.removeAttribute('data-kt-indicator');
                    EdiTDocButton.disabled = false;
                    UpdateDocs();
                }, 1000);
            }
            else {
                EdiTDocButton.setAttribute('data-kt-indicator', 'on');
                EdiTDocButton.disabled = true;
                setTimeout(function () {
                    EdiTDocButton.removeAttribute('data-kt-indicator');
                    EdiTDocButton.disabled = false;
                }, 150);
            }
        });
    }
});
//************************** END Validation Add Tipo Documento ****************************************************************************************

//************************** START Validation Add Linkear Aprobadores de Documento ****************************************************************************************
var AddAsignarUForm = document.getElementById('FormAsignarUsuario');
var validatorNewAsingarU = FormValidation.formValidation(
    AddAsignarUForm,
    {
        fields: {
            "IdAddTipoSUsuario": {
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
var AddAsingarUserButton = document.getElementById('ButtonAsignarUsuario'); // Controlador de bot�n Enviar
AddAsingarUserButton.addEventListener('click', function (e) // Prevenir la acci�n del bot�n predeterminado
{
    e.preventDefault();
    if (validatorNewAsingarU)    // Validar formulario antes de enviar
    {
        validatorNewAsingarU.validate().then(function (status) {
            if (status == 'Valid') {
                AddAsingarUserButton.setAttribute('data-kt-indicator', 'on');
                AddAsingarUserButton.disabled = true;
                setTimeout(function () {
                    AddAsingarUserButton.removeAttribute('data-kt-indicator');
                    AddAsingarUserButton.disabled = false;
                    SaveLinkedDocUser();
                }, 1000);
            }
            else {
                AddAsingarUserButton.setAttribute('data-kt-indicator', 'on');
                AddAsingarUserButton.disabled = true;
                setTimeout(function () {
                    AddAsingarUserButton.removeAttribute('data-kt-indicator');
                    AddAsingarUserButton.disabled = false;
                }, 150);
            }
        });
    }
});
//************************** END Validation Add Linkear Aprobadores de Documento ****************************************************************************************

//************************** START Validation Add Banco ****************************************************************************************
var AddBancoForm = document.getElementById('AddBancoForm');
var validatorAddBanco = FormValidation.formValidation(
    AddBancoForm,
    {

        fields: {

            'IdAddNombre': {
                validators: {
                    notEmpty: {
                        message: 'El campo es requerido.'
                    }
                }
            },
            'IdAddNombreFiscal': {
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
var AddBancoButton = document.getElementById('AddBancoButton');
AddBancoButton.addEventListener('click', function (e) {
    e.preventDefault();

    if (validatorAddBanco) {
        validatorAddBanco.validate().then(function (status) {
            if (status == 'Valid') {
                AddBancoButton.setAttribute('data-kt-indicator', 'on');
                AddBancoButton.disabled = true;
                setTimeout(function () {
                    AddBancoButton.removeAttribute('data-kt-indicator');
                    AddBancoButton.disabled = false;

                    SaveBanco()

                }, 1000);
            }
            else {
                AddBancoButton.setAttribute('data-kt-indicator', 'on');
                AddBancoButton.disabled = true;
                setTimeout(function () {
                    AddBancoButton.removeAttribute('data-kt-indicator');
                    AddBancoButton.disabled = false;

                }, 150);
            }
        });
    }
});
//************************** END Validation Add Banco ****************************************************************************************

//************************** START Validation Edit Banco ****************************************************************************************
//var EditBancoForm = document.getElementById('EditBancoForm');
//var validatorEditBanco = FormValidation.formValidation(
//    EditBancoForm,
//    {

//        fields: {

//            'IdEditClientClave': {
//                validators: {
//                    notEmpty: {
//                        message: 'El campo es requerido.'
//                    }
//                }
//            },
//            'IdEditClientNombre': {
//                validators: {
//                    notEmpty: {
//                        message: 'El campo es requerido.'
//                    }
//                }
//            }, 'IdEditClientRFC': {
//                validators: {
//                    notEmpty: {
//                        message: 'El campo es requerido.'
//                    }
//                }
//            }

//        },

//        plugins: {
//            trigger: new FormValidation.plugins.Trigger(),
//            bootstrap: new FormValidation.plugins.Bootstrap5({
//                rowSelector: '.fv-row',
//                eleInvalidClass: '',
//                eleValidClass: ''
//            })
//        }
//    }
//);
//var EditBancoButton = document.getElementById('EditBancoButton');
//EditBancoButton.addEventListener('click', function (e) {
//    e.preventDefault();

//    if (validatorEditBanco) {
//        validatorEditBanco.validate().then(function (status) {
//            if (status == 'Valid') {
//                EditBancoButton.setAttribute('data-kt-indicator', 'on');
//                EditBancoButton.disabled = true;
//                setTimeout(function () {
//                    EditBancoButton.removeAttribute('data-kt-indicator');
//                    EditBancoButton.disabled = false;

//                    UpdateBanco()

//                }, 1000);
//            }
//            else {
//                EditBancoButton.setAttribute('data-kt-indicator', 'on');
//                EditBancoButton.disabled = true;
//                setTimeout(function () {
//                    EditBancoButton.removeAttribute('data-kt-indicator');
//                    EditBancoButton.disabled = false;

//                }, 150);
//            }
//        });
//    }
//});
//************************** END Validation Edit Banco ****************************************************************************************
