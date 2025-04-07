//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////  FUNCIONES DE ARRANQUE  /////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function () {
    if (window.innerWidth <= 992) { $("#kt_app_sidebar").addClass("app-sidebar flex-column drawer drawer-start"); }
    GetInfoFiscal()
    GetDocumentsList()
    GetDatosFacturacion() 
    GetDatosCobranza() 
    GetReferencias()
});

function ModalAvisoPrivacidad() {
    $("#ModalAvisoPrivacidad").modal("show");
}

function ModalDatosSolicitante() {
    $("#ModalDatosSolicitante").modal("show");
}

function ModalCodigoEtica() {

    var pdfViewer = document.getElementById("IdRutaCodigo");
    pdfViewer.src = "/Documents/CRM/CODIGO_ETICA.pdf"; // Reemplaza "ruta_del_pdf.pdf" con la ruta de tu archivo PDF
    $('#ModalCodigoEtica').modal('show');
}

document.querySelectorAll('[data-selected]').forEach(e => { e.value = e.dataset.selected });

//@* Block onloader *@
var BlockCargarDocs = document.querySelector("#BlockCargarDocs");
var BlockModalCargarDocs = new KTBlockUI(BlockCargarDocs, {
    message: '<div class="blockui-message"> <span class="badge py-3 px-4 fs-7 badge-light-primary"> <span class="spinner-border text-primary"></span> Validando...</span></div>',
});

var BlockShowDoc = document.querySelector("#BlockShowDoc");
var BlockModalShowDocs = new KTBlockUI(BlockShowDoc, {
    message: '<div class="blockui-message"> <span class="badge py-3 px-4 fs-7 badge-light-primary"> <span class="spinner-border text-primary"></span> Validando...</span></div>',
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////// DATATABLES ///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var Tabla1 = function () {
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
            table = document.querySelector('#Tabla1');
            if (!table) {
                return;
            }
            initDatatable();
         
        }
    };
}();
KTUtil.onDOMContentLoaded(function () {
    Tabla1.init();
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////  FUNCIONES ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*Valida que toda los datos de alta del cliente estes cargados para poder pasar al tab de Generar Solicitudes*/
document.getElementById("Panel2").addEventListener("click", function (event) {

    BlockPantalla.block()

    $.ajax({
        url: "/PortalCliente/ValidarInfGenerarl",
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
                // Realiza aquí tu validación
                if (result != "Ok") { // Reemplaza "validacionCumplida" con tu lógica de validación
                    event.preventDefault(); // Detiene la acción del enlace

                    var TitleVal = "Su informacion de alta esta incompleta, o pendiente por aprobar es necesaria para acceder al apartado de Generar Solicitudes.";

                    Swal.fire({
                        title: TitleVal,
                        icon: "info",
                        buttonsStyling: false,
                        allowEscapeKey: false,
                        allowOutsideClick: false,
                        confirmButtonText: "Ok!",
                        customClass: {
                            confirmButton: "btn btn-primary"
                        }
                    }).then((result) => {
                        if (result.isConfirmed) {
                            BlockPantalla.release()
                        }
                    });

                    // Cambia el tab activo de vuelta al Tab 1
                    document.querySelector('a[href="#kt_tab_pane_1"]').click();

                    BlockPantalla.release()
                }
                else {
                    //GetAgencias()
                    //GetConsignatario()
                    BlockPantalla.release()
                }

            }
            else {
                SystemServerError()
                BlockPantalla.release()
            }
        }
    }).fail(function (error) {
        SystemServerError()
        BlockPantalla.release()
    });

});
function getValueOrNA(value) {
    return value ? value : "N/A"; // Si el valor es null, undefined o vacío, retorna "N/A"
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////  DATOS FISCALES /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function GetInfoFiscal() {
    $.ajax({
        url: "/PortalCliente/GetInfoFiscal",
        data: {
            Ajax: 1
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
                var Obj = JSON.parse(result);

                for (var i = 0; i < Obj.length; i++) {
                    $('#Df_RFC').val(Obj[i].RFC);
                    $('#Df_RegimenC').val(Obj[i].RegimenCapital);
                    $('#Df_RegimenF').val(Obj[i].RegimenFiscal);
                    $('#Df_RazonS').val(Obj[i].RazonSocial);
                    $('#Df_Paises').val(Obj[i].Pais);
                    $('#Df_EntidadF').val(Obj[i].EntidadFederativa);
                    $('#Df_Municipio').val(Obj[i].Municipio);
                    $('#Df_Colonia').val(Obj[i].Colonia);
                    $('#Df_Calle').val(Obj[i].Calle);
                    $('#Df_EntreCalle').val(Obj[i].EntreCalles);
                    $('#Df_NoExterior').val(Obj[i].NoExterior);
                    $('#Df_NoIxterior').val(Obj[i].NoInterio);
                    $('#Df_PostalCode').val(Obj[i].CodigoPostal);
                    $('#Df_Situacion').val(Obj[i].Status);
                    $('#Df_FechaEm').val(Obj[i].FechaEmisionDoc);
               
                }

            }
            else {
                toastr.error("Error al guardar, por favor contacta al administrador!");
            }
        }
    }).fail(function (error) { toastr.error("Error de servidor, por favor contacta al administrador!"); });

}
function ModalCargarCSF() {

    stepper.goFirst();

    document.getElementById("AddDocument_Form").reset();
    $("input").removeClass("is-valid").removeClass("is-invalid");
    $('[data-field]').remove();

    $("#ModalCargarCSF").modal("show");
}
function CargarCSF() {

    BlockModalCargarDocs.block()

    var analysis = document.getElementById("DocumentoFile").files;

    var files = /(.*?)\.(pdf)$/i;
    var formData = new FormData();

    if (analysis[0].name.match(files)) {

        formData.append("Ajax", 1);
        formData.append("Documento", analysis[0]);

        $.ajax({
            url: "/PortalCliente/CargarCSF",
            data: formData,
            type: "POST",
            processData: false,
            contentType: false,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("XSRF-TOKEN",
                    $('input:hidden[name="__RequestVerificationToken"]').val());
            },
        }).done(function (result) {
            if (result != null) {

                var obj = JSON.parse(result);

                if (result == "SessionExpirada") {
                    SwalSessionExpirada()
                }
                else if (result == 'ErrorServer') {
                    BlockModalCargarDocs.release()
                    $("#DocumentoFile").val("");
                    SystemServerError()
                }
                else if (obj.Result == 'Correcto') {
                    BlockModalCargarDocs.release()

                    var Df = obj.CRM_Datos_CSF

                    $("#Df_RFC").val(Df.RFC);
                    $("#Df_RazonS").val(Df.RazonSocial);
                    $("#Df_RegimenF").val(Df.RegimenFiscal);
                    $("#Df_Paises").val(Df.Pais);
                    $("#Df_EntidadF").val(Df.EntidadFederativa);
                    $("#Df_Municipio").val(Df.Municipio);
                    $("#Df_Calle").val(Df.Calle);
                    $("#Df_Colonia").val(Df.Colonia);
                    $("#Df_NoExterior").val(Df.NoExterior);
                    $("#Df_NoIxterior").val(Df.NoInterio);
                    $("#Df_PostalCode").val(Df.CodigoPostal);
                    $("#Df_Situacion").val(Df.Status);
                    $("#Df_FechaEm").val(Df.FechaEmisionDoc);

                    $('#ModalCargarCSF').modal('hide');

                    $("#DocumentoFile").val("");
                    toastr.success("CSF Cargada Correctamente");

                }
                else {
                    BlockModalCargarDocs.release()

                    Swal.fire({
                        text: obj.Result,
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
                            $("#DocumentoFile").val("");
                        }
                    });
                }
            }
            else {
                BlockModalCargarDocs.release()
                $("#DocumentoFile").val("");
                SystemServerError()
            }
        }).fail(function (error) {
            BlockModalCargarDocs.release()
            $("#DocumentoFile").val("");
            SystemServerError()
        });
    }
    else {
        BlockModalCargarDocs.release()
        $("#DocumentoFile").val("");
        toastr.warning("Solo se pueden subir archivos PDF.");
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////  DOCUMENTS //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Stepper lement
var element = document.querySelector("#Stepper_Documents_v1");
// Initialize Stepper
var stepper = new KTStepper(element);
// Handle next step
stepper.on("kt.stepper.next", function (stepper) {
    stepper.goNext(); // go next step
});
// Handle previous step
stepper.on("kt.stepper.previous", function (stepper) {
    stepper.goPrevious(); // go previous step
});
function GetDocumentsList() {
   
    $.ajax({
        url: "/PortalCliente/GetDocumetList",
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

            var obj = JSON.parse(result);

            var tDocumentos = $('#Tabla1').DataTable();
            tDocumentos.clear().draw();

            for (var a = 0; a < obj.ClientesDocumentList.length; a++)
            {
                var OpenDoc = obj.ClientesDocumentList[a].IdDocList > 0 ?
                    `<a onclick="ObtenerDocumento(this, ${obj.ClientesDocumentList[a].TipoDoc})" class="btn btn-light-youtube me-2 p-2 ps-2 pt-2 pe-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Ver Documento"><i class="fas fa-file-pdf fs-2"></i></a>`
                    : `<a class="btn btn-light me-2 p-2 ps-2 pt-2 pe-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Sin documento"><i class="fas fa-file-pdf fs-2"></i></a>`;

            
                var newRow = tDocumentos.row.add([
                    `<a onclick="ModalCargarDocumentos(this, ${obj.ClientesDocumentList[a].TipoDoc})" class="btn btn-light-success me-2 p-2 ps-2 pt-2 pe-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Cargar o Actualizar Documento"><i class="fas fa-file-upload fs-2"></i></a>`,
                    obj.ClientesDocumentList[a].Descripcion,
                    OpenDoc,
                    obj.ClientesDocumentList[a].FechaRegistro, 
                    `<span class="badge py-3 px-4 fs-7 badge-light-${obj.ClientesDocumentList[a].StatusColor}">${obj.ClientesDocumentList[a].Status}</span>`,
                    obj.ClientesDocumentList[a].Comentarios,
                    obj.ClientesDocumentList[a].FechaModificacion,
                ]).draw(false).node(); 
                $(newRow).addClass('align-middle');
            }

            KTApp.init();
            KTMenu.init();

        }
        else {
            SystemServerError()
        }
    }).fail(function (xhr, status, error) {
        SystemServerError()
    })
}

var DescargarCTPAT = document.getElementById('DescargarCTPAT');
DescargarCTPAT.addEventListener('click', function (e) {
    e.preventDefault();

    DescargarCTPAT.setAttribute('data-kt-indicator', 'on');
    DescargarCTPAT.disabled = true;

    var link = document.createElement('a');
    link.href = `/Documents/CRM/ClientesDocuments/C-TPAT.pdf`;
    link.download = "C-TPAT.pdf";
    link.click();

    setTimeout(function () {
        DescargarCTPAT.removeAttribute('data-kt-indicator');
        DescargarCTPAT.disabled = false;
    }, 1000);
});

var DocSeleccionado
function ModalCargarDocumentos(Fila, TipoDocumento) {

    DocSeleccionado = Fila;

    stepper.goFirst();

    switch (TipoDocumento) {
            case 1:
            $("#DocumentTitle").text("Constancia de Situación Fiscal. (Vigente del SAT,  del Mes en curso)");
                $("#DocumentosSat").removeClass("d-none");
                $("#DocumentosImms").addClass("d-none");
                $("#DocumentosInfonavit").addClass("d-none");
                $("#TablaRequerimientos").addClass("d-none");
            $("#BtnsAltaCliente").addClass("d-none");
            $("#BtnsC-tpat").addClass("d-none");
                break;
            case 2:
            $("#DocumentTitle").text("Opinión del Cumplimiento de Obligaciones Fiscales. (Vigente del SAT, del Mes en curso)");
                $("#DocumentosSat").removeClass("d-none");
                $("#DocumentosImms").addClass("d-none");
                $("#DocumentosInfonavit").addClass("d-none");
                $("#TablaRequerimientos").addClass("d-none");
            $("#BtnsAltaCliente").addClass("d-none");
            $("#BtnsC-tpat").addClass("d-none");
                break;
            case 3:
                $("#DocumentTitle").text("Identificación del Representante Legal. (INE, Pasaporte)");
                $("#DocumentosSat").addClass("d-none");
                $("#DocumentosImms").addClass("d-none");
                $("#DocumentosInfonavit").addClass("d-none");
                $("#TablaRequerimientos").removeClass("d-none");
                $("#DocColor").removeClass("d-none");
                $("#DocBlackWhite").addClass("d-none");
                $("#DocModScan").removeClass("d-none");
                $("#DocLadoScan").addClass("d-none");
            $("#BtnsAltaCliente").addClass("d-none");
            $("#BtnsC-tpat").addClass("d-none");
                break;
            case 4:
                $("#DocumentTitle").text("Comprobante de Domicilio. (Agua, Luz, Télefono. No mayor a 2 meses)");
                $("#DocumentosSat").addClass("d-none");
                $("#DocumentosImms").addClass("d-none");
                $("#DocumentosInfonavit").addClass("d-none");
                $("#TablaRequerimientos").removeClass("d-none");
                $("#DocColor").addClass("d-none");
                $("#DocBlackWhite").removeClass("d-none");
                $("#DocModScan").addClass("d-none");
                $("#DocLadoScan").removeClass("d-none");
            $("#BtnsAltaCliente").addClass("d-none");
            $("#BtnsC-tpat").addClass("d-none");
                break;
            case 5:
            $("#DocumentTitle").text("Carátula del último estado de cuenta bancario o carta bancaria indicando CLABE Interbancaria");
                $("#DocumentosSat").addClass("d-none");
                $("#DocumentosImms").addClass("d-none");
                $("#DocumentosInfonavit").addClass("d-none");
                $("#TablaRequerimientos").removeClass("d-none");
                $("#DocColor").addClass("d-none");
                $("#DocBlackWhite").removeClass("d-none");
                $("#DocModScan").addClass("d-none");
                $("#DocLadoScan").removeClass("d-none");
            $("#BtnsAltaCliente").addClass("d-none");
            $("#BtnsC-tpat").addClass("d-none");
                break;
            case 6:
            $("#DocumentTitle").text("Poder Notarial que acredite la personalidad del Representante Legal");
                $("#DocumentosSat").addClass("d-none");
                $("#DocumentosImms").addClass("d-none");
                $("#DocumentosInfonavit").addClass("d-none");
                $("#TablaRequerimientos").removeClass("d-none");
                $("#DocColor").addClass("d-none");
                $("#DocBlackWhite").removeClass("d-none");
                $("#DocModScan").addClass("d-none");
                $("#DocLadoScan").removeClass("d-none");
            $("#BtnsAltaCliente").addClass("d-none");
            $("#BtnsC-tpat").addClass("d-none");
                break;
            case 7:
            $("#DocumentTitle").text("Acta Constitutiva (Personas Morales)");
                $("#DocumentosSat").addClass("d-none");
                $("#DocumentosImms").addClass("d-none");
                $("#DocumentosInfonavit").addClass("d-none");
                $("#TablaRequerimientos").removeClass("d-none");
                $("#DocColor").addClass("d-none");
                $("#DocBlackWhite").removeClass("d-none");
                $("#DocModScan").addClass("d-none");
                $("#DocLadoScan").removeClass("d-none");
            $("#BtnsAltaCliente").addClass("d-none");
            $("#BtnsC-tpat").addClass("d-none");
                break;
            case 8:
            $("#DocumentTitle").text("C-TPAT Cuestionario de Seguridad.");
            $("#DocumentosSat").addClass("d-none");
            $("#DocumentosImms").addClass("d-none");
            $("#DocumentosInfonavit").addClass("d-none");
            $("#TablaRequerimientos").removeClass("d-none");
            $("#DocColor").removeClass("d-none");
            $("#DocBlackWhite").addClass("d-none");
            $("#DocModScan").removeClass("d-none");
            $("#DocLadoScan").addClass("d-none");
                $("#BtnsAltaCliente").addClass("d-none");
                $("#BtnsC-tpat").removeClass("d-none");
            break;
            case 9:
            $("#DocumentTitle").text("Alta del Cliente con nombre y firma de representante legal.");
            $("#DocumentosSat").addClass("d-none");
            $("#DocumentosImms").addClass("d-none");
            $("#DocumentosInfonavit").addClass("d-none");
            $("#TablaRequerimientos").removeClass("d-none");
            $("#DocColor").removeClass("d-none");
            $("#DocBlackWhite").addClass("d-none");
            $("#DocModScan").removeClass("d-none");
            $("#DocLadoScan").addClass("d-none");
            $("#BtnsAltaCliente").removeClass("d-none");
            $("#BtnsC-tpat").addClass("d-none");
            break;
        }
   
    document.getElementById("AddDocument_Form").reset();
    $("input").removeClass("is-valid").removeClass("is-invalid");
    $('[data-field]').remove();

    $("#AddDocument_TipoDoc").val(TipoDocumento);
    $("#ModalCargarDocumentos").modal("show");
}
function CargarDocumento() {

    BlockModalCargarDocs.block()

    var analysis = document.getElementById("DocumentoFile").files;

    var files = /(.*?)\.(pdf)$/i;
    var formData = new FormData();

    if (analysis[0].name.match(files)) {

        formData.append("Ajax", 1);
        formData.append("Documento", analysis[0]);
        formData.append("TipoDocumento", $("#AddDocument_TipoDoc").val());

        $.ajax({
            url: "/PortalCliente/CargarDocumento",
            data: formData,
            type: "POST",
            processData: false,
            contentType: false,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("XSRF-TOKEN",
                    $('input:hidden[name="__RequestVerificationToken"]').val());
            },
        }).done(function (result) {
            if (result != null) {

                console.log(result)

                var obj = JSON.parse(result);

                if (result == "SessionExpirada") {
                    SwalSessionExpirada()
                }
                else if (result == 'ErrorServer') {
                    BlockModalCargarDocs.release()
                    $("#DocumentoFile").val("");
                    SystemServerError()
                }
                else if (obj.Result == 'Correcto') {
                    BlockModalCargarDocs.release()

                    Swal.fire({
                        text: "El archivo se cargo correctamente!",
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

                            GetDocumentsList()
                            GetInfoFiscal()
                            $('#ModalCargarDocumentos').modal('hide');
                        }
                    });

                }

                else {
                    BlockModalCargarDocs.release()

                    Swal.fire({
                        text: obj.Result,
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
                            $("#DocumentoFile").val("");
                        }
                    });

                }
            }
            else {
                BlockModalCargarDocs.release()
                $("#DocumentoFile").val("");
                SystemServerError()
            }
        }).fail(function (error) {
            BlockModalCargarDocs.release()
            $("#DocumentoFile").val("");
            SystemServerError()
        });
    }
    else {
        BlockModalCargarDocs.release()
        $("#DocumentoFile").val("");
        toastr.warning("Solo se pueden subir archivos PDF.");
    }
}
function ObtenerDocumento(Fila, TipoDocumento) {

    $('#ModalMostrarDocumento').modal('show');

    $("#TituloDoc").text("");
    $("#idRutaDoc").attr("src", "");
    BlockModalShowDocs.block()

    switch (TipoDocumento) {
        case 1: $("#TituloDoc").text("Constancia de Situación Fiscal. (Vigente del SAT,  del Mes en curso)"); break;
        case 2: $("#TituloDoc").text("Opinión del Cumplimiento de Obligaciones Fiscales. (Vigente del SAT, del Mes en curso)"); break;
        case 3: $("#TituloDoc").text("Identificación del Representante Legal. (INE, Pasaporte)"); break;
        case 4: $("#TituloDoc").text("Comprobante de Domicilio. (Agua, Luz, Télefono. No mayor a 2 meses)"); break;
        case 5: $("#TituloDoc").text("Carátula del último estado de cuenta bancario o carta bancaria indicando CLABE Interbancaria"); break;
        case 6: $("#TituloDoc").text("Poder Notarial que acredite la personalidad del Representante Legal"); break;
        case 7: $("#TituloDoc").text("Acta Constitutiva (Personas Morales)"); break;
        case 8: $("#TituloDoc").text("C-TPAT Cuestionario de Seguridad."); break;
        case 9: $("#TituloDoc").text("Alta del Cliente con nombre y firma de representante legal."); break;
    }

    $.ajax({
        url: "/PortalCliente/ObtenerDocumento",
        data: {
            Ajax: 1,
            TipoDocumento: TipoDocumento
        },
        type: "POST",
        xhrFields: {
            responseType: "blob" // Indica que esperamos una respuesta binaria (archivo)
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader("XSRF-TOKEN",
                $('input:hidden[name="__RequestVerificationToken"]').val());
        },

    }).done(function (result) {
        if (result != null) {
            if (result == "SessionExpirada") {
                SwalSessionExpirada()
                BlockModalShowDocs.release()
            }
            else if (result != "Error") {

                //Este te abre el pdf en una nueva ventana
                var blob = new Blob([result], { type: "application/pdf" });
                var ruta = URL.createObjectURL(blob);

                $("#idRutaDoc").attr("src", ruta);
                
                BlockModalShowDocs.release()
            }
            else {
                SystemServerError()
                BlockModalShowDocs.release()
            }
        }

    }).fail(function (error) {
        SystemServerError()
        BlockModalShowDocs.release()
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////// DATOS FACTURACION /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Inputmask({
    //mask: "*{1,20}[.*{1,20}][.*{1,20}][.*{1,20}]@*{1,20}[.*{2,6}][.*{1,2}]",
    mask: "*{1,40}[.*{1,40}][.*{1,40}][.*{1,40}]@*{1,40}[.*{2,6}][.*{1,2}]",

    greedy: false,
    onBeforePaste: function (pastedValue, opts) {
        pastedValue = pastedValue.toLowerCase();
        return pastedValue.replace("mailto:", "");
    },
    definitions: {
        "*": {
            validator: '[0-9A-Za-z!#$%&"*+/=?^_`{|}~\-]',
            cardinality: 1,
            casing: "lower"
        }
    }
}).mask("#DFac_Correo");
function GetDatosFacturacion() {

    document.getElementById("DFac_Form").reset();
    $("input").removeClass("is-valid").removeClass("is-invalid");
    $('[data-field]').remove();


    $.ajax({
        url: "/PortalCliente/GetDatosFacturacion",
        data: {
            Ajax: 1
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
                var Obj = JSON.parse(result);

                for (var i = 0; i < Obj.length; i++) {
                    $("#DFac_Nombre").val(Obj[i].Nombre);
                    $("#DFac_Correo").val(Obj[i].Correo);
                    $("#DFac_MetodoPago").val(Obj[i].IdMetodoPago).trigger('change');
                    $("#DFac_CFDI").val(Obj[i].IdCFDI).trigger('change');
                    $("#DFac_Banco").val(Obj[i].IdBanco).trigger('change');
                    $("#DFac_Cuenta").val(Obj[i].NoCuenta);
                    $("#DFac_Proceso").val(Obj[i].ProcesoDescripcion);
                }

            }
            else {
                toastr.error("Error al guardar, por favor contacta al administrador!");
            }
        }
    }).fail(function (error) { toastr.error("Error de servidor, por favor contacta al administrador!"); });

}
function SaveDatosFacturacion() {

    BlockPantalla.block()

    $.ajax({
        url: "/PortalCliente/SaveDatosFacturacion",
        data: {
            Ajax: 1,
            Nombre: $("#DFac_Nombre").val(),
            Correo: $("#DFac_Correo").val(),
            IdMetodoPago: $("#DFac_MetodoPago").val(),
            IdCFDI: $("#DFac_CFDI").val(),
            IdBanco: $("#DFac_Banco").val(),
            NoCuenta: $("#DFac_Cuenta").val(),
            Descripcion: $("#DFac_Proceso").val(),
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
                var Messege = "Guardado Correctamente!";

                BlockPantalla.release()
                Swal.fire({
                    text: Messege,
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
                        GetDatosFacturacion()
                    }
                });
            }
            else {
                SystemServerError()
                BlockPantalla.release()
            }
        }
    }).fail(function (error) {
        SystemServerError()
        BlockPantalla.release()
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////// DATOS DEL CONTACTO PARA COBRANZA /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Inputmask({
    //mask: "*{1,20}[.*{1,20}][.*{1,20}][.*{1,20}]@*{1,20}[.*{2,6}][.*{1,2}]",
    mask: "*{1,40}[.*{1,40}][.*{1,40}][.*{1,40}]@*{1,40}[.*{2,6}][.*{1,2}]",

    greedy: false,
    onBeforePaste: function (pastedValue, opts) {
        pastedValue = pastedValue.toLowerCase();
        return pastedValue.replace("mailto:", "");
    },
    definitions: {
        "*": {
            validator: '[0-9A-Za-z!#$%&"*+/=?^_`{|}~\-]',
            cardinality: 1,
            casing: "lower"
        }
    }
}).mask("#DCob_Correo");
Inputmask({
    //mask: "*{1,20}[.*{1,20}][.*{1,20}][.*{1,20}]@*{1,20}[.*{2,6}][.*{1,2}]",
    mask: "*{1,40}[.*{1,40}][.*{1,40}][.*{1,40}]@*{1,40}[.*{2,6}][.*{1,2}]",

    greedy: false,
    onBeforePaste: function (pastedValue, opts) {
        pastedValue = pastedValue.toLowerCase();
        return pastedValue.replace("mailto:", "");
    },
    definitions: {
        "*": {
            validator: '[0-9A-Za-z!#$%&"*+/=?^_`{|}~\-]',
            cardinality: 1,
            casing: "lower"
        }
    }
}).mask("#DCob_CorreoEnvio");
Inputmask({ "mask": "(999) 999-9999" }).mask("#DCob_Telefono");
function GetDatosCobranza() {

    document.getElementById("DCob_Form").reset();
    $("input").removeClass("is-valid").removeClass("is-invalid");
    $('[data-field]').remove();

    $.ajax({
        url: "/PortalCliente/GetDatosCobranza",
        data: {
            Ajax: 1
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
                var Obj = JSON.parse(result);

                for (var i = 0; i < Obj.length; i++) {
                    $("#DCob_Nombre").val(Obj[i].Nombre);
                    $("#DCob_Correo").val(Obj[i].Correo);
                    $("#DCob_CodTelefono").val(Obj[i].CodeTelefonico).trigger('change');
                    $("#DCob_Telefono").val(Obj[i].Telefono);
                    $("#DCob_Extension").val(Obj[i].Extension);
                    $("#DCob_CorreoEnvio").val(Obj[i].CorreoEnvio);
                    $("#DCob_Banco").val(Obj[i].IdBanco).trigger('change');
                    $("#DCob_Cuenta").val(Obj[i].NoCuenta);
                    $("#DCob_Observaciones").val(Obj[i].Observaciones);
                }

            }
            else {
                toastr.error("Error al guardar, por favor contacta al administrador!");
            }
        }
    }).fail(function (error) { toastr.error("Error de servidor, por favor contacta al administrador!"); });

}
function SaveDatosCobranza() {

    BlockPantalla.block()

    $.ajax({
        url: "/PortalCliente/SaveDatosCobranza",
        data: {
            Ajax: 1,
            Nombre: $("#DCob_Nombre").val(),
            Correo: $("#DCob_Correo").val(),
            CodeTelefonico: $("#DCob_CodTelefono").val(),
            Telefono: $("#DCob_Telefono").val(),
            Extension: $("#DCob_Extension").val(),
            CorreoEnvio: $("#DCob_CorreoEnvio").val(),
            IdBanco: $("#DCob_Banco").val(),
            NoCuenta: $("#DCob_Cuenta").val(),
            Descripcion: $("#DCob_Observaciones").val(),
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
                var Messege = "Guardado Correctamente!";

                BlockPantalla.release()
                Swal.fire({
                    text: Messege,
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
                        GetDatosCobranza()
                    }
                });
            }
            else {
                SystemServerError()
                BlockPantalla.release()
            }
        }
    }).fail(function (error) {
        SystemServerError()
        BlockPantalla.release()
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////  REFERENCIAS COMERCIALES /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Inputmask({ "mask": "(999) 999-9999" }).mask("#Dc_Telefono");
Inputmask({ "mask": "(999) 999-9999" }).mask("#Dc_Celular");
Inputmask({ "mask": "(999) 999-9999" }).mask("#Dc_v2_Telefono");
Inputmask({ "mask": "(999) 999-9999" }).mask("#Dc_v3_Telefono");
Inputmask({ "mask": "(999) 999-9999" }).mask("#Dc_v2_Celular");
Inputmask({ "mask": "(999) 999-9999" }).mask("#Dc_v3_Celular");
Inputmask({
    //mask: "*{1,20}[.*{1,20}][.*{1,20}][.*{1,20}]@*{1,20}[.*{2,6}][.*{1,2}]",
    mask: "*{1,40}[.*{1,40}][.*{1,40}][.*{1,40}]@*{1,40}[.*{2,6}][.*{1,2}]",

    greedy: false,
    onBeforePaste: function (pastedValue, opts) {
        pastedValue = pastedValue.toLowerCase();
        return pastedValue.replace("mailto:", "");
    },
    definitions: {
        "*": {
            validator: '[0-9A-Za-z!#$%&"*+/=?^_`{|}~\-]',
            cardinality: 1,
            casing: "lower"
        }
    }
}).mask("#Dc_Correo");
Inputmask({
    //mask: "*{1,20}[.*{1,20}][.*{1,20}][.*{1,20}]@*{1,20}[.*{2,6}][.*{1,2}]",
    mask: "*{1,40}[.*{1,40}][.*{1,40}][.*{1,40}]@*{1,40}[.*{2,6}][.*{1,2}]",

    greedy: false,
    onBeforePaste: function (pastedValue, opts) {
        pastedValue = pastedValue.toLowerCase();
        return pastedValue.replace("mailto:", "");
    },
    definitions: {
        "*": {
            validator: '[0-9A-Za-z!#$%&"*+/=?^_`{|}~\-]',
            cardinality: 1,
            casing: "lower"
        }
    }
}).mask("#Dc_v2_Correo");
Inputmask({
    //mask: "*{1,20}[.*{1,20}][.*{1,20}][.*{1,20}]@*{1,20}[.*{2,6}][.*{1,2}]",
    mask: "*{1,40}[.*{1,40}][.*{1,40}][.*{1,40}]@*{1,40}[.*{2,6}][.*{1,2}]",

    greedy: false,
    onBeforePaste: function (pastedValue, opts) {
        pastedValue = pastedValue.toLowerCase();
        return pastedValue.replace("mailto:", "");
    },
    definitions: {
        "*": {
            validator: '[0-9A-Za-z!#$%&"*+/=?^_`{|}~\-]',
            cardinality: 1,
            casing: "lower"
        }
    }
}).mask("#Dc_v3_Correo");

function GetReferencias() {

    document.getElementById("Dc_Form").reset();
    $("input").removeClass("is-valid").removeClass("is-invalid");
    $('[data-field]').remove();

    $.ajax({
        url: "/PortalCliente/GetReferencias",
        data: {
            Ajax: 1
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
                var Obj = JSON.parse(result);

                for (var i = 0; i < Obj.length; i++) {
                    if (Obj[i].IdContactoPuesto == 1) {
                        $("#Dc_v2_CodTelefono").val(Obj[i].CodeTelefonico).trigger('change');
                        $("#Dc_Nombre").val(Obj[i].NombreEmpresa);
                        $("#Dc_CodTelefono").val(Obj[i].CodeTelefonico);
                        $("#Dc_Telefono").val(Obj[i].Telefono);
                        $("#Dc_Extension").val(Obj[i].Extension);
                        $("#Dc_Celular").val(Obj[i].Celular);
                        $("#Dc_Correo").val(Obj[i].Correo);
                    }
                    if (Obj[i].IdContactoPuesto == 2) {
                        $("#Dc_CodTelefono").val(Obj[i].CodeTelefonico).trigger('change');
                        $("#Dc_v2_Nombre").val(Obj[i].NombreEmpresa);
                        $("#Dc_v2_CodTelefono").val(Obj[i].CodeTelefonico);
                        $("#Dc_v2_Telefono").val(Obj[i].Telefono);
                        $("#Dc_v2_Extension").val(Obj[i].Extension);
                        $("#Dc_v2_Celular").val(Obj[i].Celular);
                        $("#Dc_v2_Correo").val(Obj[i].Correo);
                    }
                    if (Obj[i].IdContactoPuesto == 3) {
                        $("#Dc_v3_CodTelefono").val(Obj[i].CodeTelefonico).trigger('change');
                        $("#Dc_v3_Nombre").val(Obj[i].NombreEmpresa);
                        $("#Dc_v3_CodTelefono").val(Obj[i].CodeTelefonico);
                        $("#Dc_v3_Telefono").val(Obj[i].Telefono);
                        $("#Dc_v3_Extension").val(Obj[i].Extension);
                        $("#Dc_v3_Celular").val(Obj[i].Celular);
                        $("#Dc_v3_Correo").val(Obj[i].Correo);
                    }

                }

            }
            else {
                toastr.error("Error al guardar, por favor contacta al administrador!");
            }
        }
    }).fail(function (error) { toastr.error("Error de servidor, por favor contacta al administrador!"); });

}
function SaveReferencias() {

    BlockPantalla.block()

    $.ajax({
        url: "/PortalCliente/SaveReferencias",
        data: {
            Ajax: 1,
            Dc_Nombre: $("#Dc_Nombre").val(),
            Dc_CodTelefono: $("#Dc_CodTelefono").val(),
            Dc_Telefono: $("#Dc_Telefono").val(),
            Dc_Extension: $("#Dc_Extension").val(),
            Dc_Celular: $("#Dc_Celular").val(),
            Dc_Correo: $("#Dc_Correo").val(),

            Dc_v2_Nombre: $("#Dc_v2_Nombre").val(),
            Dc_v2_CodTelefono: $("#Dc_v2_CodTelefono").val(),
            Dc_v2_Telefono: $("#Dc_v2_Telefono").val(),
            Dc_v2_Extension: $("#Dc_v2_Extension").val(),
            Dc_v2_Celular: $("#Dc_v2_Celular").val(),
            Dc_v2_Correo: $("#Dc_v2_Correo").val(),

            Dc_v3_Nombre: $("#Dc_v3_Nombre").val(),
            Dc_v3_CodTelefono: $("#Dc_v3_CodTelefono").val(),
            Dc_v3_Telefono: $("#Dc_v3_Telefono").val(),
            Dc_v3_Extension: $("#Dc_v3_Extension").val(),
            Dc_v3_Celular: $("#Dc_v3_Celular").val(),
            Dc_v3_Correo: $("#Dc_v3_Correo").val(),

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
                var Messege = "Guardado Correctamente!";

                BlockPantalla.release()
                Swal.fire({
                    text: Messege,
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
                        GetReferencias()
                    }
                });
            }
            else {
                SystemServerError()
                BlockPantalla.release()
            }
        }
    }).fail(function (error) {
        SystemServerError()
        BlockPantalla.release()
    });
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////  FORMS VALIDATION ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var ErrorMessege = "Campo obligatorio.";
//************************** START Validation Add Documentss **************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************
var AddDocuments_Form = document.getElementById('AddDocument_Form');
var AddDocuments_Button = document.getElementById('AddDocument_Button');
var Validator_AddDocuments = FormValidation.formValidation(
    AddDocuments_Form,
    {
        fields: {
            'DocumentoFile': {
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
AddDocuments_Button.addEventListener('click', function (e) {
    e.preventDefault();

    $("input").removeClass("is-valid").removeClass("is-invalid");
    $('[data-field]').remove();

    if (Validator_AddDocuments) {
        Validator_AddDocuments.validate().then(function (status) {
            if (status == 'Valid') {
                AddDocuments_Button.setAttribute('data-kt-indicator', 'on');
                AddDocuments_Button.disabled = true;
                setTimeout(function () {
                    AddDocuments_Button.removeAttribute('data-kt-indicator');
                    AddDocuments_Button.disabled = false;

                    CargarDocumento()

                }, 1000);
            }
            else {
                AddDocuments_Button.setAttribute('data-kt-indicator', 'on');
                AddDocuments_Button.disabled = true;
                setTimeout(function () {
                    AddDocuments_Button.removeAttribute('data-kt-indicator');
                    AddDocuments_Button.disabled = false;

                    var alertMessage = idiomaAlmacenado == "es" ? "Revisa que los campos requeridos no esten vacíos!" : "Please check that the required fields are not empty!";
                    toastr.warning(alertMessage);

                }, 150);
            }
        });
    }
});
//************************** END Validation Add Documentss **************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************

//************************** START Validation Datos de Facturacion **************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************
var DFac_Form = document.getElementById('DFac_Form');
var DFac_Button = document.getElementById('DFac_Button');
var DFac_Validator = FormValidation.formValidation(
    DFac_Form,
    {
        fields: {
            'DFac_Nombre': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            },
            'DFac_Correo': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    },
                    emailAddress: {
                        requireGlobalDomain: true,
                        message: "Favor de ingresar una dirección de correo válida"
                    }
                }
            }, 'DFac_MetodoPago': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            },
            'DFac_Banco': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            },
            'DFac_Cuenta': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            },
            'DFac_Proceso': {
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
DFac_Button.addEventListener('click', function (e) {
    e.preventDefault();

    if (DFac_Validator) {
        DFac_Validator.validate().then(function (status) {
            if (status == 'Valid') {
                DFac_Button.setAttribute('data-kt-indicator', 'on');
                DFac_Button.disabled = true;
                setTimeout(function () {
                    DFac_Button.removeAttribute('data-kt-indicator');
                    DFac_Button.disabled = false;

                    SaveDatosFacturacion()

                }, 1000);
            }
            else {
                DFac_Button.setAttribute('data-kt-indicator', 'on');
                DFac_Button.disabled = true;
                setTimeout(function () {
                    DFac_Button.removeAttribute('data-kt-indicator');
                    DFac_Button.disabled = false;

                    var alertMessage = "Revisa que los campos requeridos no esten vacíos!";
                    toastr.warning(alertMessage);

                }, 150);
            }
        });
    }
});
//************************** END Validation Datos de Facturacion **************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************

//************************** START Validation Datos de Cobranza **************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************
var DCob_Form = document.getElementById('DCob_Form');
var DCob_Button = document.getElementById('DCob_Button');
var DCob_Validator = FormValidation.formValidation(
    DCob_Form,
    {
        fields: {
            'DCob_Nombre': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            },
            'DCob_Correo': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    },
                    emailAddress: {
                        requireGlobalDomain: true,
                        message: "Favor de ingresar una dirección de correo válida"
                    }
                }
            }, 'DCob_CodTelefono': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            },'DCob_Telefono': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            },
            'DCob_CorreoEnvio': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    },
                    emailAddress: {
                        requireGlobalDomain: true,
                        message: "Favor de ingresar una dirección de correo válida"
                    }
                }
            },
            'DCob_Banco': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            },
            'DCob_Cuenta': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            },
            'DCob_Observaciones': {
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
DCob_Button.addEventListener('click', function (e) {
    e.preventDefault();

    if (DCob_Validator) {
        DCob_Validator.validate().then(function (status) {
            if (status == 'Valid') {
                DCob_Button.setAttribute('data-kt-indicator', 'on');
                DCob_Button.disabled = true;
                setTimeout(function () {
                    DCob_Button.removeAttribute('data-kt-indicator');
                    DCob_Button.disabled = false;

                    SaveDatosCobranza()

                }, 1000);
            }
            else {
                DCob_Button.setAttribute('data-kt-indicator', 'on');
                DCob_Button.disabled = true;
                setTimeout(function () {
                    DCob_Button.removeAttribute('data-kt-indicator');
                    DCob_Button.disabled = false;

                    var alertMessage = "Revisa que los campos requeridos no esten vacíos!";
                    toastr.warning(alertMessage);

                }, 150);
            }
        });
    }
});
//************************** END Validation Datos de Facturacion **************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************

//************************** START Validation Datos de Referencias **************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************
var Dc_Form = document.getElementById('Dc_Form');
var Dc_Button = document.getElementById('Dc_Button');
var Dc_Validator = FormValidation.formValidation(
    Dc_Form,
    {
        fields: {
            'Dc_Nombre': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            },
            'Dc_CodTelefono': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            }, 'Dc_Telefono': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            },
            'Dc_Correo': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    },
                    emailAddress: {
                        requireGlobalDomain: true,
                        message: "Favor de ingresar una dirección de correo válida"
                    }
                }
            },
            'Dc_v2_Nombre': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            },

            'Dc_v2_CodTelefono': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            },
            'Dc_v2_Telefono': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            },
            'Dc_v2_Correo': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    },
                    emailAddress: {
                        requireGlobalDomain: true,
                        message: "Favor de ingresar una dirección de correo válida"
                    }
                }
            },
            'Dc_v3_Nombre': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            },

            'Dc_v3_CodTelefono': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            },
            'Dc_v3_Telefono': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            },
            'Dc_v3_Correo': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    },
                    emailAddress: {
                        requireGlobalDomain: true,
                        message: "Favor de ingresar una dirección de correo válida"
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
Dc_Button.addEventListener('click', function (e) {
    e.preventDefault();

    if (Dc_Validator) {
        Dc_Validator.validate().then(function (status) {
            if (status == 'Valid') {
                Dc_Button.setAttribute('data-kt-indicator', 'on');
                Dc_Button.disabled = true;
                setTimeout(function () {
                    Dc_Button.removeAttribute('data-kt-indicator');
                    Dc_Button.disabled = false;

                    SaveReferencias()

                }, 1000);
            }
            else {
                Dc_Button.setAttribute('data-kt-indicator', 'on');
                Dc_Button.disabled = true;
                setTimeout(function () {
                    Dc_Button.removeAttribute('data-kt-indicator');
                    Dc_Button.disabled = false;

                    var alertMessage = "Revisa que los campos requeridos no esten vacíos!";
                    toastr.warning(alertMessage);

                }, 150);
            }
        });
    }
});
//************************** END Validation Datos de Contacto **************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************

