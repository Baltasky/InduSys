//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////  FUNCIONES DE ARRANQUE  /////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//@* Block onloader *@
var BlockAddSolicitud = document.querySelector("#BlockAddSolicitud");
var BlockModalAddSolicitud = new KTBlockUI(BlockAddSolicitud, {
    message: '<div class="blockui-message"> <span class="badge py-3 px-4 fs-7 badge-light-primary"> <span class="spinner-border text-primary"></span> Validando...</span>  </div>',
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////// DATATABLES ///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var Tabla2 = function () {
    var table;
    var datatable;
    var initDatatable = function () {
        datatable = $(table).DataTable({
            "info": true,
            'order': [],
            "ordering": false,
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
                { "targets": 2, "className": "text-center" },
            ]
        });
    }
    return {
        init: function () {
            table = document.querySelector('#Tabla2');
            if (!table) {
                return;
            }
            initDatatable();

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

    return {
        init: function () {
            table = document.querySelector('#Tabla3');
            if (!table) {
                return;
            }
            initDatatable();
        }
    };
}();
KTUtil.onDOMContentLoaded(function () {
    Tabla3.init();
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////  SOLICITU DE MANIOBRA ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$("#AddSolicitudes_FechaCita").flatpickr({
    locale: "es", // Configurar en español
    minDate: "today",
    showDropdowns: true,
});
$("#AddSolicitudes_HoraCita").flatpickr({
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
});
function HideShowImos(IdMerca) {
    if (IdMerca == 0 || IdMerca == null) {
        $("#AddSolicitudes_IMO").val(null).trigger('change');
        $("#AddSolicitudes_DivIMO").addClass("d-none");
    }
    else {
        $("#AddSolicitudes_IMO").val(null).trigger('change');
        $("#AddSolicitudes_DivIMO").removeClass("d-none");
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
function ModalAddSolicitudes() {

    $('#AddSolicitudes_Tipo').val(null).trigger("change");
    $('#AddSolicitudes_Terminal').val(null).trigger("change");
    $('#AddSolicitudes_TipoOperacion').val(null).trigger("change");
    $('#AddSolicitudes_Naviera').val(null).trigger("change");
    $('#AddSolicitudes_MercaPeligrosa').val(0).trigger("change");
    $('#AddSolicitudes_IMO').val(null).trigger("change");

    document.getElementById("AddSolicitudesForm").reset();
    $("input").removeClass("is-valid").removeClass("is-invalid");
    $('[data-field]').remove();

    document.getElementById("ClearDocuments").click();
    var Tabla3 = $('#Tabla3').DataTable();
    Tabla3.clear().draw();

    $.ajax({
        url: "/PortalCliente/GetCatalogosSM",
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

                for (var i = 0; i < Obj.CRM_Datos_CSF.length; i++) {

                    $('#AddSolicitudes_RFC').val(Obj.CRM_Datos_CSF[i].RFC);
                    $('#AddSolicitudes_RegimenC').val(Obj.CRM_Datos_CSF[i].RegimenCapital);
                    $('#AddSolicitudes_RegimenF').val(Obj.CRM_Datos_CSF[i].RegimenFiscal);
                    $('#AddSolicitudes_RazonS').val(Obj.CRM_Datos_CSF[i].RazonSocial);
                    $('#AddSolicitudes_Paises').val(Obj.CRM_Datos_CSF[i].Pais);
                    $('#AddSolicitudes_EntidadF').val(Obj.CRM_Datos_CSF[i].EntidadFederativa);
                    $('#AddSolicitudes_Municipio').val(Obj.CRM_Datos_CSF[i].Municipio);
                    $('#AddSolicitudes_Colonia').val(Obj.CRM_Datos_CSF[i].Colonia);
                    $('#AddSolicitudes_Calle').val(Obj.CRM_Datos_CSF[i].Calle);
                    $('#AddSolicitudes_EntreCalle').val(Obj.CRM_Datos_CSF[i].EntreCalles);
                    $('#AddSolicitudes_NoExterior').val(Obj.CRM_Datos_CSF[i].NoExterior);
                    $('#AddSolicitudes_NoIxterior').val(Obj.CRM_Datos_CSF[i].NoInterio);
                    $('#AddSolicitudes_PostalCode').val(Obj.CRM_Datos_CSF[i].CodigoPostal);
                    $('#AddSolicitudes_Situacion').val(Obj.CRM_Datos_CSF[i].Status);
                    $('#AddSolicitudes_FechaEm').val(Obj.CRM_Datos_CSF[i].FechaEmisionDoc);
                }

                $("#ModalAddSolicitudes").modal("show");
            }
            else { toastr.error("Error al guardar, por favor contacta al administrador!"); }
        }
    }).fail(function (error) { toastr.error("Error de servidor, por favor contacta al administrador!"); });

}
function SaveSolicitudes() {
    BlockModalAddSolicitud.block()

    var formData = new FormData();

    var Tabla3 = $('#Tabla3').DataTable();
    var dataToSend = [];
    Tabla3.rows().every(function (rowIdx, tableLoop, rowLoop) {
        var rowData = this.data();
        var rowObject = {
            NContenedor : rowData[1],
            TipoContenedor : rowData[2],
            Cantidad : rowData[3],
            Booking : rowData[4],
            BL : rowData[5],
            Peso : rowData[6],
            Sellos : rowData[7],
            Manofactura : rowData[8],
            Observacion: rowData[9],
        };
        dataToSend.push(rowObject);
    });
    var JsonArticulos = JSON.stringify(dataToSend);

    AddSolicitudes_ArchivosCargados.forEach(function (file, index) {
        formData.append("Archivos", file); // Aquí asegúrate de que el nombre coincida con lo que espera tu backend
    });

    formData.append("Ajax", 1);
    formData.append("Articulos", JsonArticulos);
    formData.append("Tipo", $("#AddSolicitudes_Tipo").val());
    formData.append("Terminal", $("#AddSolicitudes_Terminal").val());
    formData.append("FechaCita", $("#AddSolicitudes_FechaCita").val());
    formData.append("HoraCita", $("#AddSolicitudes_HoraCita").val());
    formData.append("TipoOperacion", $("#AddSolicitudes_TipoOperacion").val());
    formData.append("Origen", $("#AddSolicitudes_Origen").val());
    formData.append("Naviera", $("#AddSolicitudes_Naviera").val());
    formData.append("MercaPeligrosa", $("#AddSolicitudes_MercaPeligrosa").val());
    formData.append("IMO", $("#AddSolicitudes_IMO").val());
    formData.append("Transportista", $("#AddSolicitudes_Tranportista").val());
    formData.append("NoPlaca", $("#AddSolicitudes_NoPlaca").val());
    formData.append("Operador", $("#AddSolicitudes_Operador").val());

    $.ajax({
        url: "/PortalCliente/SaveSolicitudes",
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
                BlockModalAddSolicitud.release()
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
                        GetSolicitudes()
                        $("#ModalAddSolicitudes").modal("hide");
                    }
                });
            }
            else {
                BlockModalAddSolicitud.release()
                Swal.fire({
                    text: "Error al guardar, por favor contacta al administrador!",
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
                        //$("#ModalAddSolicitudes").modal("hide");
                    }
                });
            }
        }
    }).fail(function (error) {
        BlockModalAddSolicitud.release()
        toastr.error("Error de servidor, por favor contacta al administrador!");
    });
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////  ARTICULOS DE LA SOLICITUD ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$("#AddArticulos_Manofactura").flatpickr({
    locale: "es", // Configurar en español
    showDropdowns: true,
});
$("#EditArticulos_Manofactura").flatpickr({
    locale: "es", // Configurar en español
    showDropdowns: true,
});
var RowSeleted;
function ModalAddArticulos(IdModal) {
    $("#IdAddArticuloModal").val(IdModal);

    document.getElementById("AddArticulosForm").reset();

    $('#AddArticulos_TipoContenedor').val(null).trigger("change");

    $("input").removeClass("is-valid").removeClass("is-invalid");
    $('[data-field]').remove();
    $("#ModalAddArticulos").modal("show");

}
function AddArticulos() {
    var TablaId = $("#IdAddArticuloModal").val();
    var Tabla = $(`#Tabla${TablaId}`).DataTable();

    var newRow = Tabla.row.add([
        `<a onclick="DeleteArticulo(${TablaId}, this)" class="btn btn-light-youtube me-2 p-2 pe-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Eliminar"><i class="fas fa-times fs-7 fw-bold"></i></a>` +
        `<a onclick="ModalEditArticulo(${TablaId}, this)" class="btn btn-light-warning me-2 p-2 pe-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Editar"><i class="fas fa-edit fs-6 fw-bold"></i></a>`,
        getValueOrNA($('#AddArticulos_NContenedor').val()),
        getValueOrNA($('#AddArticulos_TipoContenedor').find('option:selected').text()),
        getValueOrNA($('#AddArticulos_Cantidad').val()),
        getValueOrNA($('#AddArticulos_Booking').val()),
        getValueOrNA($('#AddArticulos_BL').val()),
        getValueOrNA($('#AddArticulos_Peso').val()),
        getValueOrNA($('#AddArticulos_Sellos').val()),
        getValueOrNA($('#AddArticulos_Manofactura').val()),
        getValueOrNA($("#AddArticulos_Observacion").val()),
    ]).draw(false).node();
    $(newRow).addClass('align-middle');

    toastr.success("Agregado correctamente.");

    $('#ModalAddArticulos').modal('hide');
}
function ModalEditArticulo(TablaId, row) {

    $("#IdEditArticuloModal").val(TablaId);

    RowSeleted = row;

    document.getElementById("EditArticulosForm").reset();
    $("input").removeClass("is-valid").removeClass("is-invalid");
    $('[data-field]').remove();

    $('#EditArticulos_TipoContenedor').val(null).trigger("change");

    // Obtener la fila completa
    var Tabla = $(`#Tabla${TablaId}`).DataTable();
    var data = Tabla.row($(row).parents('tr')).data();

    // Asignar los valores de la fila al formulario para su edición
    $('#EditArticulos_NContenedor').val(data[1]);
    $('#EditArticulos_TipoContenedor option').filter(function () { return $(this).text() === data[2]; }).prop('selected', true).trigger('change');// Tipo Carga
    $('#EditArticulos_Cantidad').val(data[3]); 
    $('#EditArticulos_Booking').val(data[4]);
    $('#EditArticulos_BL').val(data[5]); 
    $('#EditArticulos_Peso').val(data[6]); 
    $('#EditArticulos_Sellos').val(data[7]); 
    $('#EditArticulos_Manofactura').val(data[8]); 
    $('#EditArticulos_Observacion').val(data[9]); 

    $('#ModalEditArticulos').modal('show');
         
}
function EditArticulos() {
    var TablaId = $("#IdEditArticuloModal").val();
    var Tabla = $(`#Tabla${TablaId}`).DataTable();

    var newRow = Tabla.row($(RowSeleted).parents('tr')).data([
        `<a onclick="DeleteArticulo(${TablaId}, this)" class="btn btn-light-youtube me-2 p-2 pe-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Eliminar"><i class="fas fa-times fs-7 fw-bold"></i></a>` +
        `<a onclick="ModalEditArticulo(${TablaId}, this)" class="btn btn-light-warning me-2 p-2 pe-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Editar"><i class="fas fa-edit fs-6 fw-bold"></i></a>`,
        getValueOrNA($('#EditArticulos_NContenedor').val()),
        getValueOrNA($('#EditArticulos_TipoContenedor').find('option:selected').text()),
        getValueOrNA($('#EditArticulos_Cantidad').val()),
        getValueOrNA($('#EditArticulos_Booking').val()),
        getValueOrNA($('#EditArticulos_BL').val()),
        getValueOrNA($('#EditArticulos_Peso').val()),
        getValueOrNA($('#EditArticulos_Sellos').val()),
        getValueOrNA($('#EditArticulos_Manofactura').val()),
        getValueOrNA($("#EditArticulos_Observacion").val()),
    ]).draw(false).node();
    $(newRow).addClass('align-middle');

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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////  DOCUMENTOS DE LA SOLICITUD ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//#region AddDropZona
let AddSolicitudes_ArchivosCargados = [];

// Seleccionar el contenedor de Dropzone
const IdAddSolicitudes_Documents = "#AddSolicitudes_Documents";
const AddSolicitudes_dropzone = document.querySelector(IdAddSolicitudes_Documents);

// Configurar Dropzone
var AddSolicitudes_previewNode = AddSolicitudes_dropzone.querySelector(".dropzone-item");
AddSolicitudes_previewNode.id = "";
var previewTemplate = AddSolicitudes_previewNode.parentNode.innerHTML;
AddSolicitudes_previewNode.parentNode.removeChild(AddSolicitudes_previewNode);

var AddSolicitudes_myDropzone = new Dropzone(IdAddSolicitudes_Documents, { // Crear Dropzone
    url: "https://keenthemes.com/scripts/void.php", // Placeholder URL
    parallelUploads: 20,
    maxFilesize: 50, // Tamaño máximo de archivo en MB
    previewTemplate: previewTemplate,
    previewsContainer: IdAddSolicitudes_Documents + " .dropzone-items", // Definir el contenedor de las previsualizaciones
    clickable: IdAddSolicitudes_Documents + " .dropzone-select", // Definir el botón para seleccionar archivos
    autoProcessQueue: false // Desactivar el envío automático
});

AddSolicitudes_dropzone.querySelector(".dropzone-remove-all").addEventListener('click', function () {
    AddSolicitudes_ArchivosCargados = [];

    AddSolicitudes_dropzone.querySelector('.dropzone-remove-all').style.display = "none";
    AddSolicitudes_myDropzone.removeAllFiles(true);
});

// Evento que se activa al agregar un archivo
AddSolicitudes_myDropzone.on("addedfile", function (file) {
    AddSolicitudes_ArchivosCargados.push(file);

    const dropzoneItems = AddSolicitudes_dropzone.querySelectorAll('.dropzone-item');
    dropzoneItems.forEach(dropzoneItem => {
        dropzoneItem.style.display = ''; // Mostrar elementos de previsualización
    });
});

// Evento para eliminar archivo
AddSolicitudes_myDropzone.on("removedfile", function (file) {
    // Eliminar archivo del arreglo `AddSolicitudes_ArchivosCargados`
    AddSolicitudes_ArchivosCargados = AddSolicitudes_ArchivosCargados.filter(function (f) {
        return f.name !== file.name;
    });
});

// Actualizar barra de progreso
AddSolicitudes_myDropzone.on("totaluploadprogress", function (progress) {
    const progressBars = AddSolicitudes_dropzone.querySelectorAll('.progress-bar');
    progressBars.forEach(progressBar => {
        progressBar.style.width = progress + "%";
    });
});

// Mostrar la barra de progreso cuando comienza la carga
AddSolicitudes_myDropzone.on("sending", function (file) {
    const progressBars = AddSolicitudes_dropzone.querySelectorAll('.progress-bar');
    progressBars.forEach(progressBar => {
        progressBar.style.opacity = "1";
    });
});

// Ocultar la barra de progreso cuando se completa la carga
AddSolicitudes_myDropzone.on("complete", function (progress) {
    const progressBars = AddSolicitudes_dropzone.querySelectorAll('.dz-complete');
    setTimeout(function () {
        progressBars.forEach(progressBar => {
            progressBar.querySelector('.progress-bar').style.opacity = "0";
            progressBar.querySelector('.progress').style.opacity = "0";
        });
    }, 300);
});
//#endregion

function EditSolicitudShowDocument(Id, IdSolicitud, Extension, Nombre) {

    BlockModalEditSolicitud.block()

    var link = document.createElement('a');
    ruta = `/Documents/CRM/FileSolicitudes/${IdSolicitud}/${Id}${Extension}`;
    link.href = ruta;
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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////  FORMS VALIDATION ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//************************** START Validation Add Articulos **************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************
var AddArticulosForm = document.getElementById('AddArticulosForm');
var AddArticulosButton = document.getElementById('AddArticulosButton');
var AddArticulo_Validatator = FormValidation.formValidation(
    AddArticulosForm,
    {
        fields: {
            'AddArticulos_NContenedor': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            },
            'AddArticulos_TipoContenedor': {
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
$(AddArticulosForm.querySelector('[name="AddArticulos_TipoContenedor"]')).on('change', function () { AddArticulo_Validatator.revalidateField('AddArticulos_TipoContenedor'); });
//************************** END Validation Add Articulos **************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************
//************************** START Validation Edit Articulos **************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************
var EditArticulosForm = document.getElementById('EditArticulosForm');
var EditArticulosButton = document.getElementById('EditArticulosButton');
var EditArticulo_Validatator = FormValidation.formValidation(
    EditArticulosForm,
    {
        fields: {
            'EditArticulos_NContenedor': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            },
            'EditArticulos_TipoContenedor': {
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
$(EditArticulosForm.querySelector('[name="EditArticulos_TipoContenedor"]')).on('change', function () { EditArticulo_Validatator.revalidateField('EditArticulos_TipoContenedor'); });
//************************** END Validation Edit Articulos **************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************

//************************** START Validation Add Solicitud de maniobra **************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************
var AddSolicitudesForm = document.getElementById('AddSolicitudesForm');
var AddSolicitudes_Button = document.getElementById('AddSolicitudes_Button');
var AddSolicitudes_Validatator = FormValidation.formValidation(
    AddSolicitudesForm,
    {
        fields: {
            'AddSolicitudes_Tipo': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            },
            'AddSolicitudes_Terminal': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            },
            'AddSolicitudes_TipoOperacion': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            },
            'AddSolicitudes_Origen': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            },
            'AddSolicitudes_Naviera': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            },
            'AddSolicitudes_MercaPeligrosa': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            },
            "AddSolicitudes_IMO": {
                validators: {
                    callback: {
                        message: ErrorMessege,
                        callback: function (input) {
                            var MercaPeligrosa = $("#AddSolicitudes_MercaPeligrosa").val();

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
            'AddSolicitudes_Tranportista': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            },
            'AddSolicitudes_NoPlaca': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            },
            'AddSolicitudes_Operador': {
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
AddSolicitudes_Button.addEventListener('click', function (e) {
    e.preventDefault();

    if (AddSolicitudes_Validatator) {
        AddSolicitudes_Validatator.validate().then(function (status) {
            if (status == 'Valid') {
                AddSolicitudes_Button.setAttribute('data-kt-indicator', 'on');
                AddSolicitudes_Button.disabled = true;
                setTimeout(function () {
                    AddSolicitudes_Button.removeAttribute('data-kt-indicator');
                    AddSolicitudes_Button.disabled = false;

                    var Tabla3 = $('#Tabla3').DataTable();
                    if (Tabla3.data().any()) {
                        // Validar si el arreglo de archivos está vacío
                        if (AddSolicitudes_ArchivosCargados.length === 0) {
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
                            SaveSolicitudes()
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
                AddSolicitudes_Button.setAttribute('data-kt-indicator', 'on');
                AddSolicitudes_Button.disabled = true;
                setTimeout(function () {
                    AddSolicitudes_Button.removeAttribute('data-kt-indicator');
                    AddSolicitudes_Button.disabled = false;

                    var alertMessage = "Revisa que los campos obligatorios no esten vacíos!";
                    toastr.warning(alertMessage);

                }, 150);
            }
        });
    }
});
$(AddSolicitudesForm.querySelector('[name="AddSolicitudes_Tipo"]')).on('change', function () { AddSolicitudes_Validatator.revalidateField('AddSolicitudes_Tipo'); });
$(AddSolicitudesForm.querySelector('[name="AddSolicitudes_Terminal"]')).on('change', function () { AddSolicitudes_Validatator.revalidateField('AddSolicitudes_Terminal'); });
$(AddSolicitudesForm.querySelector('[name="AddSolicitudes_TipoOperacion"]')).on('change', function () { AddSolicitudes_Validatator.revalidateField('AddSolicitudes_TipoOperacion'); });
$(AddSolicitudesForm.querySelector('[name="AddSolicitudes_Naviera"]')).on('change', function () { AddSolicitudes_Validatator.revalidateField('AddSolicitudes_Naviera'); });
//************************** END Validation Add Solicitud de maniobra **************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************
