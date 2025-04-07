///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////  FUNCIONES DE ARRANQUE  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function () {
    if (window.innerWidth <= 992) { $("#kt_app_sidebar").addClass("app-sidebar flex-column drawer drawer-start"); }
    document.querySelectorAll('[data-selected]').forEach(e => { e.value = e.dataset.selected });

    GetSolicitudes()
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////// BLOCK ONLOADER //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//#region BLOCK ONLOADER 
var BlockEditConsignatary = document.querySelector("#BlockEditConsignatary");
var BlockModalEditConsignatary = new KTBlockUI(BlockEditConsignatary, {
    message: '<div class="blockui-message"> <span class="badge py-3 px-4 fs-7 badge-light-primary"> <span class="spinner-border text-primary"></span> Validando...</span>  </div>',
});

var BlockAddSolicitud = document.querySelector("#BlockAddSolicitud");
var BlockModalAddSolicitud = new KTBlockUI(BlockAddSolicitud, {
    message: '<div class="blockui-message"> <span class="badge py-3 px-4 fs-7 badge-light-primary"> <span class="spinner-border text-primary"></span> Validando...</span>  </div>',
});

var BlockEditSolicitud = document.querySelector("#BlockEditSolicitud");
var BlockModalEditSolicitud = new KTBlockUI(BlockEditSolicitud, {
    message: '<div class="blockui-message"> <span class="badge py-3 px-4 fs-7 badge-light-primary"> <span class="spinner-border text-primary"></span> Validando...</span>  </div>',
});

var BlockEditArticulos = document.querySelector("#BlockEditArticulos");
var BlockModalEditArticulos = new KTBlockUI(BlockEditArticulos, {
    message: '<div class="blockui-message"> <span class="badge py-3 px-4 fs-7 badge-light-primary"> <span class="spinner-border text-primary"></span> Validando...</span>  </div>',
});

function getValueOrNA(value) {
    return value ? value : "N/A"; // Si el valor es null, undefined o vacío, retorna "N/A"
}
//#endregion

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////// DATATABLES ///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//#region DATATABLES
var Tabla2 = function () {
    var table;
    var datatable;
    var initDatatable = function () {
        datatable = $(table).DataTable({
            "info": true,
            //"scrollY": "500px",
            //"scrollX": "500px",
            //"scrollCollapse": true,
            'order': [],
            'pageLength': 10,
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

var Tabla3 = function () {
    var table;
    var datatable;
    var initDatatable = function () {
        datatable = $(table).DataTable({
            "info": true,
            //"scrollY": "500px",
            //"scrollX": "500px",
            //"scrollCollapse": true,
            'order': [],
            'pageLength': 10,
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
        const filterSearch = document.querySelector('[data-kt-filter="searchTabla3"]');
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

var Tabla4 = function () {
    var table;
    var datatable;
    var initDatatable = function () {
        datatable = $(table).DataTable({
            "info": true,
            "scrollY": "500px",
            "scrollX": "500px",
            "scrollCollapse": true,
            'order': [],
            'pageLength': 10,
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

    return {
        init: function () {
            table = document.querySelector('#Tabla4');
            if (!table) {
                return;
            }
            initDatatable();
        }
    };
}();
KTUtil.onDOMContentLoaded(function () {
    Tabla4.init();
});
//#endregion

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////// SOLICITUDES DE MANIOBRA   /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$("#EditSolicitudes_FechaCita").flatpickr({
    locale: "es", // Configurar en español
    minDate: "today",
    showDropdowns: true,
});
$("#EditSolicitudes_FechaPago").flatpickr({
    locale: "es", // Configurar en español
    minDate: "today",
    showDropdowns: true,
});
$("#EditSolicitudes_HoraCita").flatpickr({
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
});
$("#AddArticulos_FechaPedimento").flatpickr({
    locale: "es", // Configurar en español
    minDate: "today",
    showDropdowns: true,
});
$("#EditArticulos_FechaPedimento").flatpickr({
    locale: "es", // Configurar en español
    minDate: "today",
    showDropdowns: true,
});

$(document).ready(function () {
    $('#EditSearchServicios').on('input', function () {
        var filtro = $(this).val().toLowerCase(); // Obtener el valor del input y convertirlo a minúsculas
        // Recorremos todas las filas de la tabla y mostramos u ocultamos según el filtro
        $('#EditTablaFiltroServicios tr').each(function () {
            var texto = $(this).text().toLowerCase(); // Obtener el texto de la fila en minúsculas
            // Si el texto de la fila contiene el filtro, mostrar la fila; de lo contrario, ocultarla
            if (texto.indexOf(filtro) !== -1) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });

});

var EditcadenaServicios = '';
var EditServiciosSelected = [];
$(document).ready(function () {

    EditcadenaServicios = EditServiciosSelected.join('| ');

    // Manejar el evento de cambio de estado del checkbox "Todos"
    $('#EditIdServicioTodo').on('change', function () {
        if ($(this).is(':checked')) {
            // Seleccionar todos los checkboxes y guardar sus valores
            $('#EditTablaFiltroServicios input[type="checkbox"]').prop('checked', true);
            EditServiciosSelected = $('#EditTablaFiltroServicios input[type="checkbox"]').map(function () {
                return $(this).val();
            }).get();
        } else {
            // Deseleccionar todos los checkboxes y vaciar el array de valores seleccionados
            $('#EditTablaFiltroServicios input[type="checkbox"]').prop('checked', false);

            EditServiciosSelected = [];
        }

        EditcadenaServicios = EditServiciosSelected.join('| ');
        $("#EditIdValuesSubServicios").val(EditcadenaServicios);


    });

    // Manejar el evento de cambio de estado de los checkboxes individuales
    $('#EditTablaFiltroServicios').on('change', 'input[type="checkbox"]', function () {
        var id = $(this).val();

        if ($(this).is(':checked')) {
            EditServiciosSelected.push(id);
        } else {
            var index = EditServiciosSelected.indexOf(id);
            if (index !== -1) {
                EditServiciosSelected.splice(index, 1);
            }
        }

        // Actualizar el estado del checkbox "Todos" según corresponda
        if ($('#EditTablaFiltroServicios input[type="checkbox"]').length === EditServiciosSelected.length) {
            $('#EditIdServicioTodo').prop('checked', true);
        } else {
            $('#EditIdServicioTodo').prop('checked', false);
        }

        EditcadenaServicios = EditServiciosSelected.join('| ');
        $("#EditIdValuesSubServicios").val(EditcadenaServicios);

    });
});
function DestinoFacturarEdit(Id) {
    if (Id == 0) {
        $("#EditSolicitudes_Nombre").val(null).trigger('change');
        $("#EditSolicitudes_RFC").val("");
        $("#EditSolicitudes_DivCliente").addClass("d-none");
        $("#EditSolicitudes_DivDomiAgencia").addClass("d-none");
        $("#EditSolicitudes_DivDomiCliente").addClass("d-none");
    }
    else if (Id == 1) {
        $.ajax({
            url: "/Aprobador_SM/GetCatalogosSM",
            data: { Ajax: 1, IdCliente: $("#EditSolicitudes_IdCliente").val() },
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

                    $("#EditSolicitudes_Nombre").val(null).trigger('change');
                    $("#EditSolicitudes_RFC").val(Obj.CRM_Datos_CSF[0].RFC);
                    $("#EditSolicitudes_DivCliente").addClass("d-none");
                    $("#EditSolicitudes_DivDomiAgencia").removeClass("d-none");
                    $("#EditSolicitudes_DivDomiCliente").addClass("d-none");

                    KTApp.init();
                    KTMenu.init()
                }
                else {
                    toastr.error("Error al guardar, por favor contacta al administrador!");
                }
            }
        }).fail(function (error) { toastr.error("Error de servidor, por favor contacta al administrador!"); });

    }
    else if (Id == 2) {
        $("#EditSolicitudes_DivCliente").removeClass("d-none");

        $("#EditSolicitudes_DivDomiAgencia").addClass("d-none");
        $("#EditSolicitudes_DivDomiCliente").removeClass("d-none");
    }
}
function ModalAddArticulos(IdModal) {
    $("#IdAddArticuloModal").val(IdModal);

    document.getElementById("AddArticulosForm").reset();

    var AddArticulos_TipoCarga = $("#AddArticulos_TipoCarga");
    $('#AddArticulos_TipoCarga').empty().trigger("change");
    AddArticulos_TipoCarga.append('<option></option>');

    var AddArticulos_NoArticulo = $("#AddArticulos_NoArticulo");
    $('#AddArticulos_NoArticulo').empty().trigger("change");
    AddArticulos_NoArticulo.append('<option></option>');

    var AddArticulos_UniMedida = $("#AddArticulos_UniMedida");
    $('#AddArticulos_UniMedida').empty().trigger("change");
    AddArticulos_UniMedida.append('<option></option>');

    var AddArticulos_PuertoOrigen = $("#AddArticulos_PuertoOrigen");
    $('#AddArticulos_PuertoOrigen').empty().trigger("change");
    AddArticulos_PuertoOrigen.append('<option></option>');

    var AddArticulos_PuertoDestino = $("#AddArticulos_PuertoDestino");
    $('#AddArticulos_PuertoDestino').empty().trigger("change");
    AddArticulos_PuertoDestino.append('<option></option>');

    var AddArticulos_PaisOrigen = $("#AddArticulos_PaisOrigen");
    $('#AddArticulos_PaisOrigen').empty().trigger("change");
    AddArticulos_PaisOrigen.append('<option></option>');

    var AddArticulos_PaisDestino = $("#AddArticulos_PaisDestino");
    $('#AddArticulos_PaisDestino').empty().trigger("change");
    AddArticulos_PaisDestino.append('<option></option>');

    var AddArticulos_IMO = $("#AddArticulos_IMO");
    $('#AddArticulos_IMO').empty().trigger("change");
    AddArticulos_IMO.append('<option></option>');

    var AddArticulos_Naviera = $("#AddArticulos_Naviera");
    $('#AddArticulos_Naviera').empty().trigger("change");
    AddArticulos_Naviera.append('<option></option>');

    $.ajax({
        url: "/Aprobador_SM/GetModalArticulos",
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
                var obj = JSON.parse(result);

                $("#AddArticulos_TipoCarga").select2({ data: obj.TipoCarga });
                $("#AddArticulos_NoArticulo").select2({ data: obj.TipoArticulo });
                $("#AddArticulos_TipoCarga").select2({ data: obj.TipoCarga });
                $("#AddArticulos_UniMedida").select2({ data: obj.UnidadesMedida });
                $("#AddArticulos_PuertoOrigen").select2({ data: obj.Puertos });
                $("#AddArticulos_PuertoDestino").select2({ data: obj.Puertos });
                $("#AddArticulos_PaisOrigen").select2({ data: obj.Paises });
                $("#AddArticulos_PaisDestino").select2({ data: obj.Paises });
                $("#AddArticulos_IMO").select2({ data: obj.Imos });
                $("#AddArticulos_Naviera").select2({ data: obj.Navieras });

                $("#ModalAddArticulos").modal("show");
            }
            else { toastr.error("Error al guardar, por favor contacta al administrador!"); }
        }
    }).fail(function (error) { toastr.error("Error de servidor, por favor contacta al administrador!"); });

}
function AddArticulos() {
    var TablaId = $("#IdAddArticuloModal").val();
    var Tabla = $(`#Tabla${TablaId}`).DataTable();

    var newRow = Tabla.row.add([
        `<a onclick="DeleteArticulo(${TablaId}, this)" class="btn btn-light-youtube me-2 p-2 pe-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Eliminar"><i class="fas fa-times fs-7 fw-bold"></i></a>` +
        `<a onclick="ModalEditArticuloAwait(${TablaId}, this)" class="btn btn-light-warning me-2 p-2 pe-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Editar"><i class="fas fa-edit fs-6 fw-bold"></i></a>`,

        getValueOrNA($('#AddArticulos_TipoCarga').find('option:selected').text()),
        getValueOrNA($('#AddArticulos_NoArticulo').find('option:selected').text()),
        getValueOrNA($('#AddArticulos_FacComercial').val()),
        getValueOrNA($("#AddArticulos_Bultos").val()),
        getValueOrNA($("#AddArticulos_Peso").val()),
        getValueOrNA($('#AddArticulos_MontoUsd').val()),
        getValueOrNA($('#AddArticulos_UniMedida').find('option:selected').text()),
        getValueOrNA($('#AddArticulos_FracArancelaria').val()),
        getValueOrNA($('#AddArticulos_PuertoOrigen').find('option:selected').text()),
        getValueOrNA($('#AddArticulos_PuertoDestino').find('option:selected').text()),
        getValueOrNA($('#AddArticulos_PaisOrigen').find('option:selected').text()),
        getValueOrNA($('#AddArticulos_PaisDestino').find('option:selected').text()),
        getValueOrNA($('#AddArticulos_MercaPeligrosa').find('option:selected').text()),
        getValueOrNA($('#AddArticulos_IMO').find('option:selected').text()),
        getValueOrNA($('#AddArticulos_Naviera').find('option:selected').text()),
        getValueOrNA($("#AddArticulos_NumSerie").val()),
        getValueOrNA($("#AddArticulos_NContenedor").val()),
        getValueOrNA($('#AddArticulos_Sellos').val()),
        getValueOrNA($("#AddArticulos_Marca").val()),
        getValueOrNA($("#AddArticulos_Descrip").val()),
        getValueOrNA($("#AddArticulos_Observacion").val()),

        /*  $('#AddArticulos_FechaPedimento').val(),*/
    ]).draw(false).node();
    $(newRow).addClass('align-middle');

    toastr.success("Agregado correctamente.");

    $('#ModalAddArticulos').modal('hide');
}

async function ModalEditArticuloAwait(TablaId, row) {
    BlockModalEditArticulos.block()
    return new Promise((resolve) => {
        ModalEditArticulo(TablaId, row);
        setTimeout(() => {
            ChangeTipoArticulo(TablaId, row);
            BlockModalEditArticulos.release()
            resolve();
        }, 600);
    });
}
var RowSeleted;
function ModalEditArticulo(TablaId, row) {

    $('#ModalEditArticulos').modal('show');

    $("#IdEditArticuloModal").val(TablaId);

    RowSeleted = row;

    document.getElementById("EditArticulosForm").reset();
    $("input").removeClass("is-valid").removeClass("is-invalid");
    $('[data-field]').remove();

    var EditArticulos_TipoCarga = $("#EditArticulos_TipoCarga");
    $('#EditArticulos_TipoCarga').empty().trigger("change");
    EditArticulos_TipoCarga.append('<option></option>');

    var EditArticulos_NoArticulo = $("#EditArticulos_NoArticulo");
    $('#EditArticulos_NoArticulo').empty().trigger("change");
    EditArticulos_NoArticulo.append('<option></option>');

    var EditArticulos_UniMedida = $("#EditArticulos_UniMedida");
    $('#EditArticulos_UniMedida').empty().trigger("change");
    EditArticulos_UniMedida.append('<option></option>');

    var EditArticulos_PuertoOrigen = $("#EditArticulos_PuertoOrigen");
    $('#EditArticulos_PuertoOrigen').empty().trigger("change");
    EditArticulos_PuertoOrigen.append('<option></option>');

    var EditArticulos_PuertoDestino = $("#EditArticulos_PuertoDestino");
    $('#EditArticulos_PuertoDestino').empty().trigger("change");
    EditArticulos_PuertoDestino.append('<option></option>');

    var EditArticulos_PaisOrigen = $("#EditArticulos_PaisOrigen");
    $('#EditArticulos_PaisOrigen').empty().trigger("change");
    EditArticulos_PaisOrigen.append('<option></option>');

    var EditArticulos_PaisDestino = $("#EditArticulos_PaisDestino");
    $('#EditArticulos_PaisDestino').empty().trigger("change");
    EditArticulos_PaisDestino.append('<option></option>');

    var EditArticulos_IMO = $("#EditArticulos_IMO");
    $('#EditArticulos_IMO').empty().trigger("change");
    EditArticulos_IMO.append('<option></option>');

    var EditArticulos_Naviera = $("#EditArticulos_Naviera");
    $('#EditArticulos_Naviera').empty().trigger("change");

    var EditArticulos_Almacen = $("#EditArticulos_Almacen");
    $('#EditArticulos_Almacen').empty().trigger("change");
    EditArticulos_Almacen.append('<option></option>');


    $.ajax({
        url: "/Aprobador_SM/GetModalArticulos",
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
                var obj = JSON.parse(result);

                $("#EditArticulos_TipoCarga").select2({ data: obj.TipoCarga });
                $("#EditArticulos_UniMedida").select2({ data: obj.UnidadesMedida });
                $("#EditArticulos_PuertoOrigen").select2({ data: obj.Puertos });
                $("#EditArticulos_PuertoDestino").select2({ data: obj.Puertos });
                $("#EditArticulos_PaisOrigen").select2({ data: obj.Paises });
                $("#EditArticulos_PaisDestino").select2({ data: obj.Paises });
                $("#EditArticulos_IMO").select2({ data: obj.Imos });
                $("#EditArticulos_Naviera").select2({ data: obj.Navieras });
                $("#EditArticulos_Almacen").select2({ data: obj.Almacenes });

                // Obtener la fila completa
                var Tabla = $(`#Tabla${TablaId}`).DataTable();
                var data = Tabla.row($(row).parents('tr')).data();

                // Asignar los valores de la fila al formulario para su edición
                $('#EditArticulos_TipoCarga option').filter(function () { return $(this).text() === data[1]; }).prop('selected', true).trigger('change');// Tipo Carga
                $('#EditArticulos_NoArticulo option').filter(function () { return $(this).text() === data[2]; }).prop('selected', true).trigger('change');
                $('#EditArticulos_FacComercial').val(data[3]);
                $('#EditArticulos_Bultos').val(data[4]); // Bultos
                $('#EditArticulos_Peso').val(data[5]); // Peso
                $('#EditArticulos_MontoUsd').val(data[6]);
                $('#EditArticulos_UniMedida option').filter(function () { return $(this).text() === data[7]; }).prop('selected', true).trigger('change');
                $('#EditArticulos_FracArancelaria').val(data[8]);
                $('#EditArticulos_PuertoOrigen option').filter(function () { return $(this).text() === data[9]; }).prop('selected', true).trigger('change');
                $('#EditArticulos_PuertoDestino option').filter(function () { return $(this).text() === data[10]; }).prop('selected', true).trigger('change');
                $('#EditArticulos_PaisOrigen option').filter(function () { return $(this).text() === data[11]; }).prop('selected', true).trigger('change');
                $('#EditArticulos_PaisDestino option').filter(function () { return $(this).text() === data[12]; }).prop('selected', true).trigger('change');
                $('#EditArticulos_MercaPeligrosa option').filter(function () { return $(this).text() === data[13]; }).prop('selected', true).trigger('change');
                $('#EditArticulos_IMO option').filter(function () { return $(this).text() === data[14]; }).prop('selected', true).trigger('change');
                $('#EditArticulos_Naviera option').filter(function () { return $(this).text() === data[15]; }).prop('selected', true).trigger('change');
                $('#EditArticulos_NumSerie').val(data[16]); // Número de Serie
                $('#EditArticulos_NContenedor').val(data[17]); // Número de Contenedor
                $('#EditArticulos_Sellos').val(data[18]);
                $('#EditArticulos_Marca').val(data[19]); // Marca
                $('#EditArticulos_Descrip').val(data[20]); // Descripción
                $('#EditArticulos_Observacion').val(data[21]); // Observación
                //$('#EditArticulos_Almacen').val(data[22]); // Almacen
            }
            else { toastr.error("Error al guardar, por favor contacta al administrador!"); }
        }
    }).fail(function (error) { toastr.error("Error de servidor, por favor contacta al administrador!"); });
}
function ChangeTipoArticulo(TablaId, row) {
    $("#IdEditArticuloModal").val(TablaId);
    RowSeleted = row;

    // Obtener la fila completa
    var Tabla = $(`#Tabla${TablaId}`).DataTable();
    var data = Tabla.row($(row).parents('tr')).data();

    // Asignar los valores de la fila al formulario para su edición
    $('#EditArticulos_NoArticulo option').filter(function () { return $(this).text() === data[2]; }).prop('selected', true).trigger('change');
}
function EditArticulos() {
    var TablaId = $("#IdEditArticuloModal").val();

    var Tabla = $(`#Tabla${TablaId}`).DataTable();

    Tabla.row($(RowSeleted).parents('tr')).data([
       /* `<a onclick="DeleteArticulo(${TablaId}, this)" class="btn btn-light-youtube me-2 p-2 pe-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Eliminar"><i class="fas fa-times fs-7 fw-bold"></i></a>` +*/
        `<a onclick="ModalEditArticuloAwait(${TablaId}, this)" class="btn btn-light-warning me-2 p-2 pe-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Editar"><i class="fas fa-edit fs-6 fw-bold"></i></a>`,
        getValueOrNA($('#EditArticulos_TipoCarga').find('option:selected').text()),
        getValueOrNA($('#EditArticulos_NoArticulo').find('option:selected').text()),
        getValueOrNA($('#EditArticulos_FacComercial').val()),
        getValueOrNA($("#EditArticulos_Bultos").val()),
        getValueOrNA($("#EditArticulos_Peso").val()),
        getValueOrNA($('#EditArticulos_MontoUsd').val()),
        getValueOrNA($('#EditArticulos_UniMedida').find('option:selected').text()),
        getValueOrNA($('#EditArticulos_FracArancelaria').val()),
        getValueOrNA($('#EditArticulos_PuertoOrigen').find('option:selected').text()),
        getValueOrNA($('#EditArticulos_PuertoDestino').find('option:selected').text()),
        getValueOrNA($('#EditArticulos_PaisOrigen').find('option:selected').text()),
        getValueOrNA($('#EditArticulos_PaisDestino').find('option:selected').text()),
        getValueOrNA($('#EditArticulos_MercaPeligrosa').find('option:selected').text()),
        getValueOrNA($('#EditArticulos_IMO').find('option:selected').text()),
        getValueOrNA($('#EditArticulos_Naviera').find('option:selected').text()),
        getValueOrNA($("#EditArticulos_NumSerie").val()),
        getValueOrNA($("#EditArticulos_NContenedor").val()),
        getValueOrNA($('#EditArticulos_Sellos').val()),
        getValueOrNA($("#EditArticulos_Marca").val()),
        getValueOrNA($("#EditArticulos_Descrip").val()),
        getValueOrNA($("#EditArticulos_Observacion").val()),
        getValueOrNA($('#EditArticulos_Almacen').find('option:selected').text()),
    ]).draw(false);

    toastr.success("Actualizado correctamente.");
    $('#ModalEditArticulos').modal('hide');
}
function DeleteArticulo(TablaId, Row) {

    Swal.fire({
        text: "Esta seguro de eliminar el artículo?",
        icon: "question",
        buttonsStyling: false,
        allowEscapeKey: false,
        allowOutsideClick: false,
        showCancelButton: true,
        closeOnCancel: true,
        confirmButtonText: "Confirmar",
        cancelButtonText: 'Cancelar',
        customClass: {
            confirmButton: "btn btn-primary",
            cancelButton: 'btn btn-danger'
        }
    }).then((result) => {
        if (result.isConfirmed) {

            var Tabla = $(`#Tabla${TablaId}`).DataTable();
            Tabla.row($(Row).parents('tr')).remove().draw();
            toastr.success("Artículo eliminado correctamente!");

        }
        else {
            $('.swal2-container').css('display', 'none');
        }
    });

}
function AddTipoArt(TipoCarga) {
    if (TipoCarga == 1) {
        $("#AddArticulos_Naviera").val(null).trigger('change');
        $("#AddArticulos_DivNaviera").removeClass("d-none");

        //$("#AddArticulos_NumSerie").val(null).trigger('change');
        //$("#AddArticulos_DivNumSerie").removeClass("d-none");

        $("#AddArticulos_DivNContenedor").val(null).trigger('change');
        $("#AddArticulos_DivNContenedor").removeClass("d-none");

        $("#AddArticulos_Naviera").val(null).trigger('change');
        $("#AddArticulos_DivNaviera").removeClass("d-none");

        $("#AddArticulos_Sellos").val(null).trigger('change');
        $("#AddArticulos_DivSellos").removeClass("d-none");

        $("#AddArticulos_Marca").val(null).trigger('change');
        $("#AddArticulos_DivMarca").removeClass("d-none");

        $("#AddArticulos_Bultos").attr("disabled", true);
        $("#AddArticulos_Bultos").val(1);
    }
    else {

        $("#AddArticulos_Naviera").val(null).trigger('change');
        $("#AddArticulos_DivNaviera").addClass("d-none");

        //$("#AddArticulos_NumSerie").val(null).trigger('change');
        //$("#AddArticulos_DivNumSerie").addClass("d-none");

        $("#AddArticulos_DivNContenedor").val(null).trigger('change');
        $("#AddArticulos_DivNContenedor").addClass("d-none");

        $("#AddArticulos_Naviera").val(null).trigger('change');
        $("#AddArticulos_DivNaviera").addClass("d-none");

        $("#AddArticulos_Sellos").val(null).trigger('change');
        $("#AddArticulos_DivSellos").addClass("d-none");

        $("#AddArticulos_Marca").val(null).trigger('change');
        $("#AddArticulos_DivMarca").addClass("d-none");

        $("#AddArticulos_Bultos").attr("disabled", false);
        $("#AddArticulos_Bultos").val("");
    }

    var AddArticulos_NoArticulo = $("#AddArticulos_NoArticulo");
    $('#AddArticulos_NoArticulo').empty().trigger("change");
    AddArticulos_NoArticulo.append('<option></option>');

    $.ajax({
        url: "/PortalCliente/GetTipoArticulos",
        data: { Ajax: 1, TipoCarga: TipoCarga },
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

                $("#AddArticulos_NoArticulo").select2({ data: Obj.TipoArticulo });

                KTApp.init();
                KTMenu.init()
            }
            else {
                toastr.error("Error al guardar, por favor contacta al administrador!");
            }
        }
    }).fail(function (error) { toastr.error("Error de servidor, por favor contacta al administrador!"); });

}
function EditTipoArt(TipoCarga) {
    if (TipoCarga == 1) {
        $("#EditArticulos_Naviera").val(null).trigger('change');
        $("#EditArticulos_DivNaviera").removeClass("d-none");

        $("#EditArticulos_DivNContenedor").val(null).trigger('change');
        $("#EditArticulos_DivNContenedor").removeClass("d-none");

        $("#EditArticulos_Naviera").val(null).trigger('change');
        $("#EditArticulos_DivNaviera").removeClass("d-none");

        $("#EditArticulos_Sellos").val(null).trigger('change');
        $("#EditArticulos_DivSellos").removeClass("d-none");

        $("#EditArticulos_Marca").val(null).trigger('change');
        $("#EditArticulos_DivMarca").removeClass("d-none");

        $("#EditArticulos_Bultos").attr("disabled", true);
        $("#EditArticulos_Bultos").val(1);
    }
    else {

        $("#EditArticulos_Naviera").val(null).trigger('change');
        $("#EditArticulos_DivNaviera").addClass("d-none");

        $("#EditArticulos_DivNContenedor").val(null).trigger('change');
        $("#EditArticulos_DivNContenedor").addClass("d-none");

        $("#EditArticulos_Naviera").val(null).trigger('change');
        $("#EditArticulos_DivNaviera").addClass("d-none");

        $("#EditArticulos_Sellos").val(null).trigger('change');
        $("#EditArticulos_DivSellos").addClass("d-none");

        $("#EditArticulos_Marca").val(null).trigger('change');
        $("#EditArticulos_DivMarca").addClass("d-none");

        $("#EditArticulos_Bultos").attr("disabled", false);
        $("#EditArticulos_Bultos").val("");
    }

    var EditArticulos_NoArticulo = $("#EditArticulos_NoArticulo");
    $('#EditArticulos_NoArticulo').empty().trigger("change");
    EditArticulos_NoArticulo.append('<option></option>');

    $.ajax({
        url: "/PortalCliente/GetTipoArticulos",
        data: { Ajax: 1, TipoCarga: TipoCarga },
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

                $("#EditArticulos_NoArticulo").select2({ data: Obj.TipoArticulo });

                KTApp.init();
                KTMenu.init()
            }
            else {
                toastr.error("Error al guardar, por favor contacta al administrador!");
            }
        }
    }).fail(function (error) { toastr.error("Error de servidor, por favor contacta al administrador!"); });

}
function HideShowImos(IdMerca) {
    if (IdMerca == 0 || IdMerca == null) {
        $("#AddArticulos_IMO").val(null).trigger('change');
        $("#AddArticulos_DivIMO").addClass("d-none");
    }
    else {
        $("#AddArticulos_IMO").val(null).trigger('change');
        $("#AddArticulos_DivIMO").removeClass("d-none");
    }
}
function HideShowImosEdit(IdMerca) {
    if (IdMerca == 0 || IdMerca == null) {
        $("#EditArticulos_IMO").val(null).trigger('change');
        $("#EditArticulos_DivIMO").addClass("d-none");
    }
    else {
        $("#EditArticulos_IMO").val(null).trigger('change');
        $("#EditArticulos_DivIMO").removeClass("d-none");
    }
}
function validateNumeric(event) {
    const inputElement = event.target;
    const inputValue = inputElement.value;
    const numericPattern = /^[0-9]*$/;

    if (!numericPattern.test(inputValue)) {
        inputElement.value = inputValue.replace(/[^0-9]/g, '');
    }
}

//#region EditDropZona
let EditSolicitudes_ArchivosCargados = [];

// Seleccionar el contenedor de Dropzone
const IdEditSolicitudes_Documents = "#EditSolicitudes_Documents";
const EditSolicitudes_dropzone = document.querySelector(IdEditSolicitudes_Documents);

// Configurar Dropzone
var EditSolicitudes_previewNode = EditSolicitudes_dropzone.querySelector(".dropzone-item");
EditSolicitudes_previewNode.id = "";
var EditSolicitudes_previewTemplate = EditSolicitudes_previewNode.parentNode.innerHTML;
EditSolicitudes_previewNode.parentNode.removeChild(EditSolicitudes_previewNode);

var EditSolicitudes_myDropzone = new Dropzone(IdEditSolicitudes_Documents, { // Crear Dropzone
    url: "https://keenthemes.com/scripts/void.php", // Placeholder URL
    parallelUploads: 20,
    maxFilesize: 10, // Tamaño máximo de archivo en MB
    previewTemplate: EditSolicitudes_previewTemplate,
    previewsContainer: IdEditSolicitudes_Documents + " .dropzone-items", // Definir el contenedor de las previsualizaciones
    clickable: IdEditSolicitudes_Documents + " .dropzone-select", // Definir el botón para seleccionar archivos
    autoProcessQueue: false // Desactivar el envío automático
});

EditSolicitudes_dropzone.querySelector(".dropzone-remove-all").addEventListener('click', function () {
    EditSolicitudes_ArchivosCargados = [];

    EditSolicitudes_dropzone.querySelector('.dropzone-remove-all').style.display = "none";
    EditSolicitudes_myDropzone.removeAllFiles(true);
});

// Evento que se activa al agregar un archivo
EditSolicitudes_myDropzone.on("addedfile", function (file) {
    EditSolicitudes_ArchivosCargados.push(file);

    const dropzoneItems = EditSolicitudes_dropzone.querySelectorAll('.dropzone-item');
    dropzoneItems.forEach(dropzoneItem => {
        dropzoneItem.style.display = ''; // Mostrar elementos de previsualización
    });
});

// Evento para eliminar archivo
EditSolicitudes_myDropzone.on("removedfile", function (file) {
    // Eliminar archivo del arreglo `EditSolicitudes_ArchivosCargados`
    EditSolicitudes_ArchivosCargados = EditSolicitudes_ArchivosCargados.filter(function (f) {
        return f.name !== file.name;
    });
});

// Actualizar barra de progreso
EditSolicitudes_myDropzone.on("totaluploadprogress", function (progress) {
    const progressBars = EditSolicitudes_dropzone.querySelectorAll('.progress-bar');
    progressBars.forEach(progressBar => {
        progressBar.style.width = progress + "%";
    });
});

// Mostrar la barra de progreso cuando comienza la carga
EditSolicitudes_myDropzone.on("sending", function (file) {
    const progressBars = EditSolicitudes_dropzone.querySelectorAll('.progress-bar');
    progressBars.forEach(progressBar => {
        progressBar.style.opacity = "1";
    });
});

// Ocultar la barra de progreso cuando se completa la carga
EditSolicitudes_myDropzone.on("complete", function (progress) {
    const progressBars = EditSolicitudes_dropzone.querySelectorAll('.dz-complete');
    setTimeout(function () {
        progressBars.forEach(progressBar => {
            progressBar.querySelector('.progress-bar').style.opacity = "0";
            progressBar.querySelector('.progress').style.opacity = "0";
        });
    }, 300);
});
//#endregion

function GetSolicitudes() {

    $.ajax({
        url: "/Aprobador_SM/GetSolicitudes",
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

                var Tabla2 = $('#Tabla2').DataTable();
                Tabla2.clear().draw();

                for (var i = 0; i < Obj.length; i++) {
                    var Json = JSON.stringify(Obj[i]).replace(/"/g, '&quot;');

                    var Actions = Obj[i].IdStatus == 1 || Obj[i].IdStatus == 3 ? `<a onclick="ModalEditSolicitudes(${Json})" class="btn btn-light-primary me-2 p-2 pe-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Editar Solicitud"><i class="fas fa-calendar-check fs-6 fw-bold"></i></a>`
                        : `<a onclick="VisualizarSolicitudes(${Json})" class="btn btn-light-warning me-2 p-2 pe-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Visualizar Solicitud"><i class="fas fa-eye fs-6 fw-bold"></i></a>`

                    var newRow = Tabla2.row.add([
                        Actions,
                        Obj[i].FolioSolicitud,
                        Obj[i].Agencia,
                        Obj[i].Nombre_Receptor,
                        Obj[i].Trafico,
                        Obj[i].Servicio,
                        `<a onclick="ModalHistorialStatus(${Obj[i].Id})" class="btn btn-light me-2 p-0 pe-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Historial Estatus"><span class="badge badge-light-primary p-2 fw-bolder text-white" style="background-color:${Obj[i].StatusColor};">${Obj[i].Estatus}</span></a>`,
                        Obj[i].FechaRegistro
                    ]).draw(false).node();
                    $(newRow).addClass('align-middle');
                    if (Obj[i].IdStatus == 3) {
                        $(newRow).addClass('align-middle bg-light-danger'); // Agrega la clase bg-rosa a la fila
                    }
                }

                KTApp.init();
                KTMenu.init();
            }
            else {
                toastr.error("Error al guardar, por favor contacta al administrador!");
            }
        }
    }).fail(function (error) { toastr.error("Error de servidor, por favor contacta al administrador!"); });
}
var EditSolicitud_DocumentsActuales = 0;
function ModalEditSolicitudes(Datos) {

    EditSolicitud_DocumentsActuales = 0;

    $("#ModalEditSolicitudes").modal("show");
    BlockModalEditSolicitud.block()

    document.getElementById("EditSolicitudesForm").reset();

    $("#EditSolicitudes_Id").val(Datos.Id);
    $("#EditSolicitudes_IdCliente").val(Datos.IdCliente);

    var EditSolicitudes_Nombre = $("#EditSolicitudes_Nombre");
    $('#EditSolicitudes_Nombre').empty().trigger("change");
    EditSolicitudes_Nombre.append('<option></option>');

    var EditSolicitudes_TipoRegimen = $("#EditSolicitudes_TipoRegimen");
    $('#EditSolicitudes_TipoRegimen').empty().trigger("change");
    EditSolicitudes_TipoRegimen.append('<option></option>');

    var EditSolicitudes_Servicios = $("#EditSolicitudes_Servicios");
    $('#EditSolicitudes_Servicios').empty().trigger("change");
    EditSolicitudes_Servicios.append('<option></option>');

    var EditSolicitudes_Naviera = $("#EditSolicitudes_Naviera");
    $('#EditSolicitudes_Naviera').empty().trigger("change");
    EditSolicitudes_Naviera.append('<option></option>');

    var EditSolicitudes_ContenedorStatus = $("#EditSolicitudes_ContenedorStatus");
    $('#EditSolicitudes_ContenedorStatus').empty().trigger("change");
    EditSolicitudes_ContenedorStatus.append('<option></option>');

    var EditSolicitudes_ClavePedimento = $("#EditSolicitudes_ClavePedimento");
    $('#EditSolicitudes_ClavePedimento').empty().trigger("change");
    EditSolicitudes_ClavePedimento.append('<option></option>');

    var EditSolicitudes_CFDI = $("#EditSolicitudes_CFDI");
    $('#EditSolicitudes_CFDI').empty().trigger("change");
    EditSolicitudes_CFDI.append('<option></option>');

    var EditSolicitudes_MetodoPago = $("#EditSolicitudes_MetodoPago");
    $('#EditSolicitudes_MetodoPago').empty().trigger("change");
    EditSolicitudes_MetodoPago.append('<option></option>');

    var EditSolicitudes_FormaPago = $("#EditSolicitudes_FormaPago");
    $('#EditSolicitudes_FormaPago').empty().trigger("change");
    EditSolicitudes_FormaPago.append('<option></option>');

    var EditSolicitudes_IMO = $("#EditSolicitudes_IMO");
    $('#EditSolicitudes_IMO').empty().trigger("change");
    EditSolicitudes_IMO.append('<option></option>');

    var EditSolicitudes_Transportista = $("#EditSolicitudes_Transportista");
    $('#EditSolicitudes_Transportista').empty().trigger("change");
    EditSolicitudes_Transportista.append('<option></option>');

    document.getElementById("EditClearDocuments").click();
    var Tabla4 = $('#Tabla4').DataTable();
    Tabla4.clear().draw();

    $.ajax({
        url: "/Aprobador_SM/ModalEditSolicitudes",
        data: { Ajax: 1, IdSolicitud: Datos.Id, IdCliente: Datos.IdCliente },
        type: "POST",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("XSRF-TOKEN",
                $('input:hidden[name="__RequestVerificationToken"]').val());
        },
    }).done(function (result) {
        if (result != null) {
            if (result == "SessionExpirada") { SwalSessionExpirada() }
            else if (result != "Error") {
                var obj = JSON.parse(result);

                $("#EditSolicitudes_AgenteCorreo").val(obj.DatosContacto[0].Correo);
                $("#EditSolicitudes_Referencia").val(obj.DatosContacto[0].Patente);
                $("#EditSolicitudes_Agencia").val(obj.CRM_Datos_CSF[0].RazonSocial);
                $("#EditSolicitudes_AgenciaCalle").val(obj.CRM_Datos_CSF[0].Calle);
                $("#EditSolicitudes_AgenciaCol").val(obj.CRM_Datos_CSF[0].Colonia);
                $("#EditSolicitudes_Num").val(obj.CRM_Datos_CSF[0].NoExterior);
                $("#EditSolicitudes_AgenciaCd").val(obj.CRM_Datos_CSF[0].Municipio);
                $("#EditSolicitudes_AgenciaEstado").val(obj.CRM_Datos_CSF[0].EntidadFederativa);
                $("#EditSolicitudes_AgenciaCp").val(obj.CRM_Datos_CSF[0].CodigoPostal);

                $("#EditSolicitudes_DestinoFac").val(Datos.IdDestinoFacturacion).trigger('change');

                $("#EditSolicitudes_Nombre").select2({ data: obj.Clientes });
                $("#EditSolicitudes_Nombre").val(Datos.IdConsignatario).trigger('change');

                $("#EditSolicitudes_TipoRegimen").select2({ data: obj.Trafico });
                $("#EditSolicitudes_TipoRegimen").val(Datos.IdRegimen).trigger('change');

                $("#EditSolicitudes_CFDI").select2({ data: obj.UsoCFDI });
                $("#EditSolicitudes_CFDI").val(Datos.IdUsoCFDI).trigger('change');

                $("#EditSolicitudes_MetodoPago").select2({ data: obj.MetodoPago });
                $("#EditSolicitudes_MetodoPago").val(Datos.IdMetodoPago).trigger('change');

                $("#EditSolicitudes_FormaPago").select2({ data: obj.FormaPago });
                $("#EditSolicitudes_FormaPago").val(Datos.IdFormaPago).trigger('change');

                $("#EditSolicitudes_Servicios").select2({ data: obj.Servicios });
                $("#EditSolicitudes_Servicios").val(Datos.IdServicio).trigger('change');

                $("#EditSolicitudes_Transportista").select2({ data: obj.Transportistas });
                $("#EditSolicitudes_Transportista").val(Datos.IdTransportista).trigger('change');

                $("#EditSolicitudes_FechaCita").val(Datos.FechaEntregaRaw);
                $("#EditSolicitudes_HoraCita").val(Datos.HoraEntrega);
                $("#EditSolicitudes_BL").val(Datos.BL);
                $("#EditSolicitudes_Booking").val(Datos.Booking);
                $("#EditSolicitudes_Buque").val(Datos.Buque);
                $("#EditSolicitudes_NuViaje").val(Datos.NumeroViaje);
                $("#EditSolicitudes_ValorComercial").val(Datos.ValorComercial);
                $("#EditSolicitudes_Remitente").val(Datos.Remitente);
                $("#EditSolicitudes_Proveedor").val(Datos.Proveedor);
                $("#EditSolicitudes_Embarcador").val(Datos.Embarcador);
                $("#EditSolicitudes_FechaPago").val(Datos.FechaPagoRaw);
                $("#EditSolicitudes_Pesaje").val(Datos.Pesaje);
                $("#EditSolicitudes_CAAT").val(Datos.CAAT);
                $("#EditSolicitudes_NoPlaca").val(Datos.Placas);
                $("#EditSolicitudes_Operador").val(Datos.Operador);

                var selectedArray = Datos.IdSubServicios.split('|').map(id => id.trim());

                EditcadenaServicios = "";
                $("#EditIdValuesSubServicios").val("");

                var printServicios = "";
                for (i = 0; i < obj.SubServicios.length; i++) {
                    // Revisar si el ID actual está en el arreglo de valores seleccionados
                    let isChecked = selectedArray.includes(obj.SubServicios[i].id.toString()) ? "checked" : "";

                    printServicios = printServicios + `<tr><td><div class="form-check form-check-custom form-check-sm">` +
                        `<input type="checkbox" ${isChecked} id="IdEditSubSeb-${obj.SubServicios[i].id}" value="${obj.SubServicios[i].id}" class="form-check-input border border-dark me-2">` +
                        `<label for="IdEditSubSeb-${obj.SubServicios[i].id}">${obj.SubServicios[i].text}</label></div></td></tr>`;
                }
                $("#EditTablaFiltroServicios").html(printServicios);

                EditServiciosSelected = Datos.IdSubServicios.split('|').map(id => id.trim());
                EditcadenaServicios = Datos.IdSubServicios;
                $("#EditIdValuesSubServicios").val(EditcadenaServicios);

                var Tabla4 = $('#Tabla4').DataTable();

                for (i = 0; i < obj.ArticulosModel.length; i++) {
                    var newRow = Tabla4.row.add([
                        /*`<a onclick="DeleteArticulo(4, this)" class="btn btn-light-youtube me-2 p-2 pe-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Eliminar"><i class="fas fa-times fs-7 fw-bold"></i></a>` +*/
                        `<a onclick="ModalEditArticuloAwait(4, this)" class="btn btn-light-warning me-2 p-2 pe-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Editar"><i class="fas fa-edit fs-6 fw-bold"></i></a>`,

                        obj.ArticulosModel[i].TipoCarga,
                        obj.ArticulosModel[i].TipoArticulo,
                        obj.ArticulosModel[i].NumeroFactura,
                        obj.ArticulosModel[i].TotalBultos,
                        obj.ArticulosModel[i].Peso,
                        obj.ArticulosModel[i].MontoDolares,
                        obj.ArticulosModel[i].UnidadMedida,
                        obj.ArticulosModel[i].FraccionArancelaria,
                        obj.ArticulosModel[i].PuertoOrigen,
                        obj.ArticulosModel[i].PuertoDestino,
                        obj.ArticulosModel[i].PaisOrigen,
                        obj.ArticulosModel[i].PaisDestino,
                        obj.ArticulosModel[i].MercaPeligrosa,
                        obj.ArticulosModel[i].Imos,
                        obj.ArticulosModel[i].Naviera,
                        obj.ArticulosModel[i].NumeroSerie,
                        obj.ArticulosModel[i].Contenedor,
                        obj.ArticulosModel[i].Sellos,
                        obj.ArticulosModel[i].Marca,
                        obj.ArticulosModel[i].DescripcionMercancia,
                        obj.ArticulosModel[i].Observaciones,
                        obj.ArticulosModel[i].Almacen,
                    ]).draw(false).node();
                    $(newRow).addClass('align-middle');
                }

                EditSolicitud_DocumentsActuales = obj.CRM_SolicitudesFiles.length;

                var FileHtml = "";
                for (i = 0; i < obj.CRM_SolicitudesFiles.length; i++) {
                    FileHtml = FileHtml + `<div class="d-flex flex-stack bg-gray-100 p-2 mb-2">
                        <a class="text-primary fw-semibold fs-6 me-2"  onclick="EditSolicitudShowDocument(${obj.CRM_SolicitudesFiles[i].Id}, ${obj.CRM_SolicitudesFiles[i].IdSolicitud}, '${obj.CRM_SolicitudesFiles[i].Extension}', '${obj.CRM_SolicitudesFiles[i].Descripcion}' )" >${obj.CRM_SolicitudesFiles[i].Descripcion}</a>
                     </div>`;
                }

                $("#EditSolicitudes_FileSaved").html(FileHtml);

                //$("input").removeClass("is-valid").removeClass("is-invalid");
                //$('[data-field]').remove();

                KTApp.init();
                KTMenu.init()

                BlockModalEditSolicitud.release()
            }
            else { toastr.error("Error al guardar, por favor contacta al administrador!"); }
        }
    }).fail(function (error) { toastr.error("Error de servidor, por favor contacta al administrador!"); });

}
function UpdateSolicitudes() {

    $("#ModalAprobarRechazar").modal("hide");

    BlockModalEditSolicitud.block()

    var formData = new FormData();

    var Tabla4 = $('#Tabla4').DataTable();
    var dataToSend = [];
    var registrosSinAlmacen = 0;
    Tabla4.rows().every(function (rowIdx, tableLoop, rowLoop) {
        var rowData = this.data();
        var rowObject = {
            TipoCarga: rowData[1],
            TipoArticulo: rowData[2],
            NumeroFactura: rowData[3],
            TotalBultos: rowData[4],
            Peso: rowData[5],
            MontoDolares: rowData[6],
            UnidadMedida: rowData[7],
            FraccionArancelaria: rowData[8],
            PuertoOrigen: rowData[9],
            PuertoDestino: rowData[10],
            PaisOrigen: rowData[11],
            PaisDestino: rowData[12],
            MercaPeligrosa: rowData[13],
            Imos: rowData[14],
            Naviera: rowData[15],
            NumeroSerie: rowData[16],
            Contenedor: rowData[17],
            Sellos: rowData[18],
            Marca: rowData[19],
            DescripcionMercancia: rowData[20],
            Observaciones: rowData[21],
            Almacen: rowData[22],
        };
        dataToSend.push(rowObject);
    });
    var JsonArticulos = JSON.stringify(dataToSend);

    EditSolicitudes_ArchivosCargados.forEach(function (file, index) {
        formData.append("Archivos", file); // Aquí asegúrate de que el nombre coincida con lo que espera tu backend
    });

    formData.append("Ajax", 1);
    formData.append("IdSolicitud", $("#EditSolicitudes_Id").val());
    formData.append("IdCliente", $("#EditSolicitudes_IdCliente").val());
    formData.append("Articulos", JsonArticulos);
    formData.append("FechaCita", $("#EditSolicitudes_FechaCita").val());
    formData.append("HoraCita", $("#EditSolicitudes_HoraCita").val());
    formData.append("Consignatario", $("#EditSolicitudes_Nombre").val());
    formData.append("TipoRegimen", $("#EditSolicitudes_TipoRegimen").val());
    formData.append("BL", $("#EditSolicitudes_BL").val());
    formData.append("Booking", $("#EditSolicitudes_Booking").val());
    formData.append("Servicios", $("#EditSolicitudes_Servicios").val());
    formData.append("SubServicios", $("#EditIdValuesSubServicios").val());
    formData.append("DestinoFac", $("#EditSolicitudes_DestinoFac").val());
    formData.append("CFDI", $("#EditSolicitudes_CFDI").val());
    formData.append("MetodoPago", $("#EditSolicitudes_MetodoPago").val());
    formData.append("FormaPago", $("#EditSolicitudes_FormaPago").val());
    formData.append("FechaPago", $("#EditSolicitudes_FechaPago").val());
    formData.append("Buque", $("#EditSolicitudes_Buque").val());
    formData.append("NuViaje", $("#EditSolicitudes_NuViaje").val());
    formData.append("ValorComercial", $("#EditSolicitudes_ValorComercial").val());
    formData.append("Remitente", $("#EditSolicitudes_Remitente").val());
    formData.append("Proveedor", $("#EditSolicitudes_Proveedor").val());
    formData.append("Embarcador", $("#EditSolicitudes_Embarcador").val());
    formData.append("Pesaje", $("#EditSolicitudes_Pesaje").val());
    formData.append("Transportista", $("#EditSolicitudes_Transportista").val());
    formData.append("CAAT", $("#EditSolicitudes_CAAT").val());
    formData.append("NoPlaca", $("#EditSolicitudes_NoPlaca").val());
    formData.append("Operador", $("#EditSolicitudes_Operador").val());

    formData.append("IdAprobarRechazar", $("#IdAprobarRechazar").val());
    formData.append("Comentarios", $("#ComentariosAprobRechazo").val());

    $.ajax({
        url: "/Aprobador_SM/AprobarSolicitudes",
        data: formData,
        type: "POST",
        processData: false,
        contentType: false,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("XSRF-TOKEN",
                $('input:hidden[name="__RequestVerificationToken"]').val());
        },
    }).done(function (Result) {
        if (Result != null) {

            if (Result == "SessionExpirada") { SwalSessionExpirada() }
            else if (Result == 'Correcto') {
                BlockModalEditSolicitud.release()
                Swal.fire({
                    text: "Actualizado Correctamente!",
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
                        GetSolicitudes()
                        $("#ModalEditSolicitudes").modal("hide");
                    }
                });
            }
            else {
                BlockModalEditSolicitud.release()
                toastr.error("Error al guardar, por favor contacta al administrador!");
                $("#ModalEditSolicitudes").modal("hide");
            }
        }
    }).fail(function (error) {
        BlockModalEditSolicitud.release()
        toastr.error("Error de servidor, por favor contacta al administrador!");
    });
}
function GetClienteDataEdit(Id) {
    if (Id > 0) {
        $.ajax({
            url: "/Aprobador_SM/GetConsignatario",
            data: { Ajax: 1, Id: Id },
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

                    $("#EditSolicitudes_RFC").val(Obj[0].RFC);
                    $("#EditSolicitudes_C_Estado").val(Obj[0].EntidadFederativa);
                    $("#EditSolicitudes_C_Ciudad").val(Obj[0].Municipio);
                    $("#EditSolicitudes_C_Calle").val(Obj[0].Calle);
                    $("#EditSolicitudes_C_Colonia").val(Obj[0].Colonia);
                    $("#EditSolicitudes_C_Numero").val(Obj[0].NoExterior);
                    $("#EditSolicitudes_C_Cp").val(Obj[0].CodigoPostal);

                    KTApp.init();
                    KTMenu.init()
                }
                else {
                    toastr.error("Error al guardar, por favor contacta al administrador!");
                }
            }
        }).fail(function (error) { toastr.error("Error de servidor, por favor contacta al administrador!"); });

    } else {
        $("#EditSolicitudes_RFC").val("");
        $("#EditSolicitudes_C_Estado").val("");
        $("#EditSolicitudes_C_Ciudad").val("");
        $("#EditSolicitudes_C_Calle").val("");
        $("#EditSolicitudes_C_Colonia").val("");
        $("#EditSolicitudes_C_Numero").val("");
        $("#EditSolicitudes_C_Cp").val("");
    }
}
function AdaptarCamposByRegimenEdit(Regimen) {
    if (Regimen == 1) {
        $("#DivEditBLM").removeClass("d-none");
        $("#DivEditBooking").addClass("d-none");
        $("#EditSolicitudes_BL").val("");
        $("#EditSolicitudes_Booking").val("N/A");
    } else if (Regimen == 2) {
        $("#DivEditBLM").addClass("d-none");
        $("#DivEditBooking").removeClass("d-none");
        $("#EditSolicitudes_BL").val("N/A");
        $("#EditSolicitudes_Booking").val("");
    } else {
        $("#DivEditBLM").addClass("d-none");
        $("#DivEditBooking").addClass("d-none");
        $("#EditSolicitudes_BL").val("N/A");
        $("#EditSolicitudes_Booking").val("N/A");
    }
}
function EditSolicitudShowDocument(Id, IdSolicitud, Extension, Nombre) {

    BlockModalEditSolicitud.block()

    var link = document.createElement('a');
    link.href = `/Documents/CRM/FileSolicitudes/${IdSolicitud}/${Id}${Extension}`;
    link.download = `${Nombre}`; // Nombre personalizado para el archivo
    document.body.appendChild(link); // Agregar el enlace al DOM
    link.click(); // Activar la descarga
    document.body.removeChild(link); // Remover el enlace del DOM después de descargar

    BlockModalEditSolicitud.release()
}
function GetSolicitudesDocuments(IdSolicitud) {
    $.ajax({
        url: "/PortalCliente/GetSolicitudesDocuments",
        data: { Ajax: 1, IdSolicitud: IdSolicitud },
        type: "POST",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("XSRF-TOKEN",
                $('input:hidden[name="__RequestVerificationToken"]').val());
        },
    }).done(function (result) {
        if (result != null) {
            if (result == "SessionExpirada") { SwalSessionExpirada() }
            else if (result != "Error") {
                var obj = JSON.parse(result);

                EditSolicitud_DocumentsActuales = obj.length;

                var FileHtml = "";
                for (i = 0; i < obj.length; i++) {
                    FileHtml = FileHtml + `<div class="d-flex flex-stack bg-gray-100 p-2 mb-2">
                        <a class="text-primary fw-semibold fs-6 me-2"  onclick="EditSolicitudShowDocument(${obj[i].Id}, ${obj[i].IdSolicitud}, '${obj[i].Extension}', '${obj[i].Descripcion}' )" >${obj[i].Descripcion}</a>
                        <a onclick="DeleteSolicitudDocumento(${obj[i].Id}, ${obj[i].IdSolicitud})" class="btn btn-icon btn-sm h-auto btn-color-gray-500 btn-active-color-primary justify-content-end"><i class="bi bi-x fs-1"></i></a>
                     </div>`;
                }

                $("#EditSolicitudes_FileSaved").html(FileHtml);

                KTApp.init();
                KTMenu.init()
            }
            else {
                toastr.error("Error al guardar, por favor contacta al administrador!");
            }
        }
    }).fail(function (error) { toastr.error("Error de servidor, por favor contacta al administrador!"); });
}
function DeleteSolicitudDocumento(Id, IdSolicitud) {

    Swal.fire({
        text: "El documento se borrara definitivamente de esta solicitud?",
        icon: "question",
        buttonsStyling: false,
        allowEscapeKey: false,
        allowOutsideClick: false,
        showCancelButton: true,
        closeOnCancel: true,
        confirmButtonText: "Confirmar",
        cancelButtonText: 'Cancelar',
        customClass: {
            confirmButton: "btn btn-primary",
            cancelButton: 'btn btn-danger'
        }
    }).then((result) => {
        if (result.isConfirmed) {

            $.ajax({
                url: "/PortalCliente/DeleteSolicitudDocumento",
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

                        GetSolicitudesDocuments(IdSolicitud)
                        toastr.success("El documento se elimino correctamente de la solicitud!");

                    }
                    else { toastr.error("Error al eliminar, por favor contacta al administrador!"); }
                }
            }).fail(function (error) { toastr.error("Error de servidor, por favor contacta al administrador!"); });

        }
        else {
            $('.swal2-container').css('display', 'none');
        }
    });

}
function ModalAprobarRechazar(Tipo) {

    var Tabla4 = $('#Tabla4').DataTable();
    var registrosSinAlmacen = 0;
    Tabla4.rows().every(function (rowIdx, tableLoop, rowLoop) {
        var rowData = this.data();
        var almacenValue = rowData[22]; // Columna 22
        if (!almacenValue || almacenValue.trim() === "") {
            registrosSinAlmacen++;
        }
    });

    if (registrosSinAlmacen == 0 ) {
        document.getElementById("FormAprobarRechazar").reset();
        $("input").removeClass("is-valid").removeClass("is-invalid");
        $('[data-field]').remove();

        $("#IdAprobarRechazar").val(Tipo);

        if (Tipo == 1) { $("#TitleAprobRechazar").text("Aprobar Solicitud de Maniobra"); }
        else { $("#TitleAprobRechazar").text("Rechazar Solicitud de Maniobra"); }

        $("#ModalAprobarRechazar").modal("show");
    }
    else
    {
        if (Tipo == 1) {
            Swal.fire({
                text: "Tiene Articulos registrados sin Almacén definido!",
                icon: "info",
                buttonsStyling: false,
                confirmButtonText: "Ok!",
                customClass: {
                    confirmButton: "btn btn-primary"
                }
            });
        } else {
            document.getElementById("FormAprobarRechazar").reset();
            $("input").removeClass("is-valid").removeClass("is-invalid");
            $('[data-field]').remove();

            $("#IdAprobarRechazar").val(Tipo);

            if (Tipo == 1) { $("#TitleAprobRechazar").text("Aprobar Solicitud de Maniobra"); }
            else { $("#TitleAprobRechazar").text("Rechazar Solicitud de Maniobra"); }

            $("#ModalAprobarRechazar").modal("show");
        }
       
    }
}
function ModalHistorialStatus(IdSolicitud) {
    $.ajax({
        url: "/SolicitudesManiobra/ModalHistoricoStatus",
        data: { Ajax: 1, IdSolicitud: IdSolicitud },
        type: "POST",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("XSRF-TOKEN",
                $('input:hidden[name="__RequestVerificationToken"]').val());
        },
    }).done(function (result) {
        if (result != null) {
            if (result == "SessionExpirada") { SwalSessionExpirada() }
            else if (result != "Error") {
                var obj = JSON.parse(result);

                console.log(obj)

                var LineaHistorica = "";
                for (i = 0; i < obj.length; i++) {
                    LineaHistorica = LineaHistorica +
                        `<div class="timeline-item align-items-center mb-7">
                        <div class="timeline-line mt-1 mb-n6 mb-sm-n7"></div>
                        <div class="timeline-icon"> <i class="${obj[i].Icono}" ></i></div>
                        <div class="timeline-content m-0">
                            <div class="d-flex flex-stack">
                                <div class="d-flex align-items-center me-5">
                                    <div class="me-5">
                                     <span class="badge badge-light-primary py-3 px-4 fs-7 fw-bolder text-white" style="background-color:${obj[i].Color}; ">${obj[i].Estatus}</span>
                                        <span class="text-gray-500 fw-semibold fs-7 d-block text-start ps-0">Comentarios: ${obj[i].Comentarios}</span>
                                    </div>
                                </div>
                                <div class="text-gray-500 fw-bold fs-7 text-end">${obj[i].Fecha}</div>
                            </div>
                        </div>
                    </div>`;
                }

                $("#LineaHistorica").html(LineaHistorica);


                KTApp.init();
                KTMenu.init()
                $("#ModalHistorialStatus").modal("show");

                /*BlockModalSeeSolicitud.release()*/

            }
            else { toastr.error("Error al guardar, por favor contacta al administrador!"); }
        }
    }).fail(function (error) { toastr.error("Error de servidor, por favor contacta al administrador!"); });
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////  FORMS VALIDATION ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//#region FORMS VALIDATION 
var ErrorMessege = "Campo obligatorio.";
//************************** START Validation Add Articulos **************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************
var AddArticulosForm = document.getElementById('AddArticulosForm');
var AddArticulosButton = document.getElementById('AddArticulosButton');
var AddArticulo_Validatator = FormValidation.formValidation(
    AddArticulosForm,
    {
        fields: {
            'AddArticulos_TipoCarga': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            },
            'AddArticulos_NoArticulo': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            },
            'AddArticulos_FacComercial': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            },
            'AddArticulos_Bultos': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            },
            'AddArticulos_Peso': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            },
            'AddArticulos_MontoUsd': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            },
            'AddArticulos_UniMedida': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            },
            'AddArticulos_FracArancelaria': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            },
            'AddArticulos_PuertoOrigen': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            },
            'AddArticulos_PuertoDestino': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            },
            'AddArticulos_PaisOrigen': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            },
            'AddArticulos_PaisDestino': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            },
            'AddArticulos_MercaPeligrosa': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            },
            "AddArticulos_IMO": {
                validators: {
                    callback: {
                        message: 'El campo es requerido.',
                        callback: function (input) {
                            var MercaPeligrosa = $("#AddArticulos_MercaPeligrosa").val();

                            if (MercaPeligrosa == 0) {

                                return true; //true es que no le pedira como requerido el campo cliente.
                            }
                            else {

                                if (input.value != "") {
                                    return true; //true es que no le pedira como requerido el campo cliente.
                                }
                                else {
                                    return false;
                                }
                            }
                        }
                    }
                }
            },
            'AddArticulos_NumSerie': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            },
            'AddArticulos_Descrip': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
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
AddArticulosButton.addEventListener('click', function (e) {
    e.preventDefault();
    var ErrorMessege = "Campo obligatorio.";

    if (AddArticulo_Validatator) {
        AddArticulo_Validatator.validate().then(function (status) {
            if (status == 'Valid') {
                AddArticulosButton.setAttribute('data-kt-indicator', 'on');
                AddArticulosButton.disabled = true;
                setTimeout(function () {
                    AddArticulosButton.removeAttribute('data-kt-indicator');
                    AddArticulosButton.disabled = false;

                    AddArticulos()

                }, 100);
            }
            else {
                AddArticulosButton.setAttribute('data-kt-indicator', 'on');
                AddArticulosButton.disabled = true;
                setTimeout(function () {
                    AddArticulosButton.removeAttribute('data-kt-indicator');
                    AddArticulosButton.disabled = false;

                    var alertMessage = "Revisa que los campos obligatorios no esten vacíos!";
                    toastr.warning(alertMessage);

                }, 150);
            }
        });
    }
});
$(AddArticulosForm.querySelector('[name="AddArticulos_TipoCarga"]')).on('change', function () { AddArticulo_Validatator.revalidateField('AddArticulos_TipoCarga'); });
$(AddArticulosForm.querySelector('[name="AddArticulos_NoArticulo"]')).on('change', function () { AddArticulo_Validatator.revalidateField('AddArticulos_NoArticulo'); });
$(AddArticulosForm.querySelector('[name="AddArticulos_UniMedida"]')).on('change', function () { AddArticulo_Validatator.revalidateField('AddArticulos_UniMedida'); });
$(AddArticulosForm.querySelector('[name="AddArticulos_PuertoOrigen"]')).on('change', function () { AddArticulo_Validatator.revalidateField('AddArticulos_PuertoOrigen'); });
$(AddArticulosForm.querySelector('[name="AddArticulos_PuertoDestino"]')).on('change', function () { AddArticulo_Validatator.revalidateField('AddArticulos_PuertoDestino'); });
$(AddArticulosForm.querySelector('[name="AddArticulos_PaisOrigen"]')).on('change', function () { AddArticulo_Validatator.revalidateField('AddArticulos_PaisOrigen'); });
$(AddArticulosForm.querySelector('[name="AddArticulos_PaisDestino"]')).on('change', function () { AddArticulo_Validatator.revalidateField('AddArticulos_PaisDestino'); });
$(AddArticulosForm.querySelector('[name="AddArticulos_MercaPeligrosa"]')).on('change', function () { AddArticulo_Validatator.revalidateField('AddArticulos_MercaPeligrosa'); });
$(AddArticulosForm.querySelector('[name="AddArticulos_IMO"]')).on('change', function () { AddArticulo_Validatator.revalidateField('AddArticulos_IMO'); });
//************************** END Validation Add Articulos **************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************
//************************** START Validation Edit Articulos **************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************
var EditArticulosForm = document.getElementById('EditArticulosForm');
var EditArticulosButton = document.getElementById('EditArticulosButton');
var EditArticulo_Validatator = FormValidation.formValidation(
    EditArticulosForm,
    {
        fields: {
            'EditArticulos_Almacen': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            },
            'EditArticulos_TipoCarga': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            },
            'EditArticulos_NoArticulo': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            },
            'EditArticulos_FacComercial': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            },
            'EditArticulos_Bultos': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            },
            'EditArticulos_Peso': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            },
            'EditArticulos_MontoUsd': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            },
            'EditArticulos_UniMedida': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            },
            'EditArticulos_FracArancelaria': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            },
            'EditArticulos_PuertoOrigen': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            },
            'EditArticulos_PuertoDestino': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            },
            'EditArticulos_PaisOrigen': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            },
            'EditArticulos_PaisDestino': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            },
            'EditArticulos_MercaPeligrosa': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            },
            "EditArticulos_IMO": {
                validators: {
                    callback: {
                        message: 'El campo es requerido.',
                        callback: function (input) {
                            var MercaPeligrosa = $("#EditArticulos_MercaPeligrosa").val();

                            if (MercaPeligrosa == 0) {

                                return true; //true es que no le pedira como requerido el campo cliente.
                            }
                            else {

                                if (input.value != "") {
                                    return true; //true es que no le pedira como requerido el campo cliente.
                                }
                                else {
                                    return false;
                                }
                            }
                        }
                    }
                }
            },
            'EditArticulos_NumSerie': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            },
            'EditArticulos_Descrip': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
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
EditArticulosButton.addEventListener('click', function (e) {
    e.preventDefault();
    var ErrorMessege = "Campo obligatorio.";

    if (EditArticulo_Validatator) {
        EditArticulo_Validatator.validate().then(function (status) {
            if (status == 'Valid') {
                EditArticulosButton.setAttribute('data-kt-indicator', 'on');
                EditArticulosButton.disabled = true;
                setTimeout(function () {
                    EditArticulosButton.removeAttribute('data-kt-indicator');
                    EditArticulosButton.disabled = false;

                    EditArticulos()

                }, 100);
            }
            else {
                EditArticulosButton.setAttribute('data-kt-indicator', 'on');
                EditArticulosButton.disabled = true;
                setTimeout(function () {
                    EditArticulosButton.removeAttribute('data-kt-indicator');
                    EditArticulosButton.disabled = false;

                    var alertMessage = "Revisa que los campos obligatorios no esten vacíos!";
                    toastr.warning(alertMessage);

                }, 150);
            }
        });
    }
});
$(EditArticulosForm.querySelector('[name="EditArticulos_Almacen"]')).on('change', function () { EditArticulo_Validatator.revalidateField('EditArticulos_Almacen'); });
$(EditArticulosForm.querySelector('[name="EditArticulos_TipoCarga"]')).on('change', function () { EditArticulo_Validatator.revalidateField('EditArticulos_TipoCarga'); });
$(EditArticulosForm.querySelector('[name="EditArticulos_NoArticulo"]')).on('change', function () { EditArticulo_Validatator.revalidateField('EditArticulos_NoArticulo'); });
$(EditArticulosForm.querySelector('[name="EditArticulos_UniMedida"]')).on('change', function () { EditArticulo_Validatator.revalidateField('EditArticulos_UniMedida'); });
$(EditArticulosForm.querySelector('[name="EditArticulos_PuertoOrigen"]')).on('change', function () { EditArticulo_Validatator.revalidateField('EditArticulos_PuertoOrigen'); });
$(EditArticulosForm.querySelector('[name="EditArticulos_PuertoDestino"]')).on('change', function () { EditArticulo_Validatator.revalidateField('EditArticulos_PuertoDestino'); });
$(EditArticulosForm.querySelector('[name="EditArticulos_PaisOrigen"]')).on('change', function () { EditArticulo_Validatator.revalidateField('EditArticulos_PaisOrigen'); });
$(EditArticulosForm.querySelector('[name="EditArticulos_PaisDestino"]')).on('change', function () { EditArticulo_Validatator.revalidateField('EditArticulos_PaisDestino'); });
$(EditArticulosForm.querySelector('[name="EditArticulos_MercaPeligrosa"]')).on('change', function () { EditArticulo_Validatator.revalidateField('EditArticulos_MercaPeligrosa'); });
$(EditArticulosForm.querySelector('[name="EditArticulos_IMO"]')).on('change', function () { EditArticulo_Validatator.revalidateField('EditArticulos_IMO'); });
//************************** END Validation Edit Articulos **************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************

//************************** START Validation Aporbar Rechazar Solicitudes **************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************
var FormAprobarRechazar = document.getElementById('FormAprobarRechazar');
var ButtonAprobarRechazar = document.getElementById('ButtonAprobarRechazar');
var SolicitudAprobarRechazar_Validatator = FormValidation.formValidation(
    FormAprobarRechazar,
    {
        fields: {
            'ComentariosAprobRechazo': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
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
ButtonAprobarRechazar.addEventListener('click', function (e) {
    e.preventDefault();
    var ErrorMessege = "Campo obligatorio.";

    if (SolicitudAprobarRechazar_Validatator) {
        SolicitudAprobarRechazar_Validatator.validate().then(function (status) {
            if (status == 'Valid') {
                ButtonAprobarRechazar.setAttribute('data-kt-indicator', 'on');
                ButtonAprobarRechazar.disabled = true;
                setTimeout(function () {
                    ButtonAprobarRechazar.removeAttribute('data-kt-indicator');
                    ButtonAprobarRechazar.disabled = false;

                    UpdateSolicitudes()

                }, 100);
            }
            else {
                ButtonAprobarRechazar.setAttribute('data-kt-indicator', 'on');
                ButtonAprobarRechazar.disabled = true;
                setTimeout(function () {
                    ButtonAprobarRechazar.removeAttribute('data-kt-indicator');
                    ButtonAprobarRechazar.disabled = false;

                    var alertMessage = "Revisa que los campos obligatorios no esten vacíos!";
                    toastr.warning(alertMessage);

                }, 150);
            }
        });
    }
});
//************************** END Validation  Aporbar Rechazar Solicitudes **************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************

//************************** START Validation Edit Solicitud de maniobra **************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************
var EditSolicitudesForm = document.getElementById('EditSolicitudesForm');
var EditSolicitudes_Button = document.getElementById('EditSolicitudes_Button');
var EditSolicitudes_Validatator = FormValidation.formValidation(
    EditSolicitudesForm,
    {
        fields: {
            'EditSolicitudes_FechaCita': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            },
            'EditSolicitudes_HoraCita': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            },
            'EditSolicitudes_DestinoFac': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            },
            "EditSolicitudes_Nombre": {
                validators: {
                    callback: {
                        message: 'El campo es requerido.',
                        callback: function (input) {
                            var DestinoFacturacion = $("#EditSolicitudes_DestinoFac").val();

                            if (DestinoFacturacion == 1) {
                                return true; //true es que no le pedira como requerido el campo cliente.
                            }
                            else {
                                if (input.value != "") {
                                    return true; //true es que no le pedira como requerido el campo cliente.
                                }
                                else {
                                    return false;
                                }
                            }
                        }
                    }
                }
            },
            'EditSolicitudes_TipoRegimen': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            },
            'EditSolicitudes_BL': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            },
            'EditSolicitudes_Embarcador': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            },
            'EditSolicitudes_CFDI': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            },
            'AddSolicitudes_MetodoPago': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            },
            'EditSolicitudes_Servicios': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            },
            'EditIdValuesSubServicios': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            },
            'EditSolicitudes_Pesaje': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            },
            'EditSolicitudes_Transportista': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            },
            'EditSolicitudes_CAAT': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            },
            'EditSolicitudes_NoPlaca': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            },
            'EditSolicitudes_Operador': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
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
EditSolicitudes_Button.addEventListener('click', function (e) {
    e.preventDefault();

    if (EditSolicitudes_Validatator) {
        EditSolicitudes_Validatator.validate().then(function (status) {
            if (status == 'Valid') {
                EditSolicitudes_Button.setAttribute('data-kt-indicator', 'on');
                EditSolicitudes_Button.disabled = true;
                setTimeout(function () {
                    EditSolicitudes_Button.removeAttribute('data-kt-indicator');
                    EditSolicitudes_Button.disabled = false;

                    var Tabla4 = $('#Tabla4').DataTable();
                    if (Tabla4.data().any()) {
                        // Validar si el arreglo de archivos está vacío
                        if (EditSolicitudes_ArchivosCargados.length === 0 && EditSolicitud_DocumentsActuales === 0) {
                            Swal.fire({
                                text: "Es obligatorio agregar los Documentes pertenecientes a la Solicitud!",
                                icon: "info",
                                buttonsStyling: false,
                                confirmButtonText: "Ok!",
                                customClass: {
                                    confirmButton: "btn btn-primary"
                                }
                            });

                        } else {
                            ModalAprobarRechazar(1)
                        }
                    }
                    else {
                        Swal.fire({
                            text: "Es obligatorio agregar artículos a la tabla!",
                            icon: "info",
                            buttonsStyling: false,
                            confirmButtonText: "Ok!",
                            customClass: {
                                confirmButton: "btn btn-primary"
                            }
                        });
                    }


                }, 100);
            }
            else {
                EditSolicitudes_Button.setAttribute('data-kt-indicator', 'on');
                EditSolicitudes_Button.disabled = true;
                setTimeout(function () {
                    EditSolicitudes_Button.removeAttribute('data-kt-indicator');
                    EditSolicitudes_Button.disabled = false;

                    var alertMessage = "Revisa que los campos obligatorios no esten vacíos!";
                    toastr.warning(alertMessage);

                }, 150);
            }
        });
    }
});
$(EditSolicitudesForm.querySelector('[name="EditSolicitudes_DestinoFac"]')).on('change', function () { EditSolicitudes_Validatator.revalidateField('EditSolicitudes_DestinoFac'); });
$(EditSolicitudesForm.querySelector('[name="EditSolicitudes_Nombre"]')).on('change', function () { EditSolicitudes_Validatator.revalidateField('EditSolicitudes_Nombre'); });
$(EditSolicitudesForm.querySelector('[name="EditSolicitudes_TipoRegimen"]')).on('change', function () { EditSolicitudes_Validatator.revalidateField('EditSolicitudes_TipoRegimen'); });
$(EditSolicitudesForm.querySelector('[name="EditSolicitudes_CFDI"]')).on('change', function () { EditSolicitudes_Validatator.revalidateField('EditSolicitudes_CFDI'); });
$(EditSolicitudesForm.querySelector('[name="EditSolicitudes_MetodoPago"]')).on('change', function () { EditSolicitudes_Validatator.revalidateField('EditSolicitudes_MetodoPago'); });
$(EditSolicitudesForm.querySelector('[name="EditSolicitudes_Servicios"]')).on('change', function () { EditSolicitudes_Validatator.revalidateField('EditSolicitudes_Servicios'); });
$(EditSolicitudesForm.querySelector('[name="EditSolicitudes_Transportista"]')).on('change', function () { EditSolicitudes_Validatator.revalidateField('EditSolicitudes_Transportista'); });
//************************** END Validation Edit Solicitud de maniobra **************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************
//#endregion