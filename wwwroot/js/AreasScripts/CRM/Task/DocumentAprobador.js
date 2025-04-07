//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////  FUNCIONES DE ARRANQUE  /////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function () {
    if(window.innerWidth <= 992){$("#kt_app_sidebar").addClass("app-sidebar flex-column drawer drawer-start");}
 /*   GetClientes()*/
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

            "columnDefs": [
                { "targets": 0, "className": "text-center" },
                { "targets": 3, "className": "text-center" },
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

    var exportButtons = () => {
        const documentTitle = 'Documentos por aprobar';
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

    var handleSearchDatatable = () => {
        const filterSearch = document.querySelector('[data-kt-filter="searchCliente"]');
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
            exportButtons();
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
                { "targets": 1, "className": "text-center" },
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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////  Star CRUD de Modales  ///////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//************** CRUD Clientes **************************************** */
var FilaSeleccionada = null;

function ObtenerDocumento(IdCliente, TipoDocumento) {

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
        url: "/ClientesDocAprobador/ObtenerDocumento",
        data: {
            Ajax: 1,
            IdCliente: IdCliente,
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
function AprobarDocumento() {

    var formData = new FormData();
    formData.append("Ajax", 1);
    formData.append("IdCliente", $("#IdClienteAprobar").val());
    formData.append("IdDocumento", $("#IdDocumentAprobar").val());
    formData.append("IdStatus", $("#IdStatusDoc").val());
    formData.append("Comentarios", $("#ComentarioAprobacion").val());

    $.ajax({
        url: "/ClientesDocAprobador/AprobarDoc",
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

            if (result == "SessionExpirada") {
                SwalSessionExpirada()
            }
            else if (result != "Error") {

                var Tabla1 = $('#Tabla1').DataTable();
                Tabla1.row($(FilaSeleccionada).parents('tr')).remove().draw();

                toastr.success("Aprobado correctamente!");
               
                $("#ModalDocAprobarRechazar").modal("hide")
            }
            else {
                toastr.error("Error, por favor contacta al administrador!");
            }
        }
        else {
            $("#IdDocumentAprobar").val("");
            SystemServerError()

        }
    }).fail(function (error) {
        $("#IdDocumentAprobar").val("");
        SystemServerError()
    });
}
function ModalAprobarDoc(Fila, IdCliente, AprobarRechazar, IdDocumento, Documento) {

    FilaSeleccionada = Fila;

    if (AprobarRechazar == 3) {
        $("#ModalDocAproval").text('Aprobar Documento: ' + Documento);
    } else {
        $("#ModalDocAproval").text('Rechazar Documento: ' + Documento);
    }
    $("#IdStatusDoc").val(AprobarRechazar);
    $("#IdClienteAprobar").val(IdCliente);
    $("#IdDocumentAprobar").val(IdDocumento);

    document.getElementById("DocAprobarRechazarForm").reset();
    $("input").removeClass("is-valid").removeClass("is-invalid");
    $('[data-field]').remove();

    $("#ModalDocAprobarRechazar").modal("show")
}

function ModalInfoCliente(IdCliente) {

    $.ajax({
        url: "/ClientesDocAprobador/ModalInfoCliente",
        data: {
            Ajax: 1, IdCliente: IdCliente,
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

                for (var i = 0; i < Obj.CRM_Datos_CSF.length; i++) {
                    $('#Df_RFC').val(Obj.CRM_Datos_CSF[i].RFC);
                    $('#Df_RegimenC').val(Obj.CRM_Datos_CSF[i].RegimenCapital);
                    $('#Df_RegimenF').val(Obj.CRM_Datos_CSF[i].RegimenFiscal);
                    $('#Df_RazonS').val(Obj.CRM_Datos_CSF[i].RazonSocial);
                    $('#Df_Paises').val(Obj.CRM_Datos_CSF[i].Pais);
                    $('#Df_EntidadF').val(Obj.CRM_Datos_CSF[i].EntidadFederativa);
                    $('#Df_Municipio').val(Obj.CRM_Datos_CSF[i].Municipio);
                    $('#Df_Colonia').val(Obj.CRM_Datos_CSF[i].Colonia);
                    $('#Df_Calle').val(Obj.CRM_Datos_CSF[i].Calle);
                    $('#Df_EntreCalle').val(Obj.CRM_Datos_CSF[i].EntreCalles);
                    $('#Df_NoExterior').val(Obj.CRM_Datos_CSF[i].NoExterior);
                    $('#Df_NoIxterior').val(Obj.CRM_Datos_CSF[i].NoInterio);
                    $('#Df_PostalCode').val(Obj.CRM_Datos_CSF[i].CodigoPostal);
                    $('#Df_Situacion').val(Obj.CRM_Datos_CSF[i].Status);
                    $('#Df_FechaEm').val(Obj.CRM_Datos_CSF[i].FechaEmisionDoc);
                }

                var tDocumentos = $('#Tabla2').DataTable();
                tDocumentos.clear().draw();

                for (var a = 0; a < Obj.ClientesDocumentList.length; a++) {
                    var OpenDoc = Obj.ClientesDocumentList[a].IdDocList > 0 ?
                        `<a onclick="ObtenerDocumento(${Obj.ClientesDocumentList[a].IdCliente}, ${Obj.ClientesDocumentList[a].TipoDoc})" class="btn btn-light-youtube me-2 p-2 ps-2 pt-2 pe-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Ver Documento"><i class="fas fa-file-pdf fs-2"></i></a>`
                        : `<a class="btn btn-light me-2 p-2 ps-2 pt-2 pe-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Sin documento"><i class="fas fa-file-pdf fs-2"></i></a>`;

                    var newRow = tDocumentos.row.add([
                        Obj.ClientesDocumentList[a].Descripcion,
                        OpenDoc,
                        Obj.ClientesDocumentList[a].FechaRegistro,
                        `<span class="badge py-3 px-4 fs-7 badge-light-${Obj.ClientesDocumentList[a].StatusColor}">${Obj.ClientesDocumentList[a].Status}</span>`,
                        Obj.ClientesDocumentList[a].Comentarios,
                        Obj.ClientesDocumentList[a].FechaModificacion,
                    ]).draw(false).node();
                    $(newRow).addClass('align-middle');
                }

                for (var i = 0; i < Obj.CRM_Clientes_Facturacion.length; i++) {
                    $("#DFac_Nombre").val(Obj.CRM_Clientes_Facturacion[i].Nombre);
                    $("#DFac_Correo").val(Obj.CRM_Clientes_Facturacion[i].Correo);
                    $("#DFac_MetodoPago").val(Obj.CRM_Clientes_Facturacion[i].IdMetodoPago).trigger('change');
                    $("#DFac_CFDI").val(Obj.CRM_Clientes_Facturacion[i].IdCFDI).trigger('change');
                    $("#DFac_Banco").val(Obj.CRM_Clientes_Facturacion[i].IdBanco).trigger('change');
                    $("#DFac_Cuenta").val(Obj.CRM_Clientes_Facturacion[i].NoCuenta);
                    $("#DFac_Proceso").val(Obj.CRM_Clientes_Facturacion[i].ProcesoDescripcion);
                }

                for (var i = 0; i < Obj.CRM_Clientes_DatosCobranza.length; i++) {
                    $("#DCob_Nombre").val(Obj.CRM_Clientes_DatosCobranza[i].Nombre);
                    $("#DCob_Correo").val(Obj.CRM_Clientes_DatosCobranza[i].Correo);
                    $("#DCob_CodTelefono").val(Obj.CRM_Clientes_DatosCobranza[i].CodeTelefonico).trigger('change');
                    $("#DCob_Telefono").val(Obj.CRM_Clientes_DatosCobranza[i].Telefono);
                    $("#DCob_Extension").val(Obj.CRM_Clientes_DatosCobranza[i].Extension);
                    $("#DCob_CorreoEnvio").val(Obj.CRM_Clientes_DatosCobranza[i].CorreoEnvio);
                    $("#DCob_Banco").val(Obj.CRM_Clientes_DatosCobranza[i].IdBanco).trigger('change');
                    $("#DCob_Cuenta").val(Obj.CRM_Clientes_DatosCobranza[i].NoCuenta);
                    $("#DCob_Observaciones").val(Obj.CRM_Clientes_DatosCobranza[i].Observaciones);
                }

                for (var i = 0; i < Obj.CRM_DatosReferencias.length; i++) {
                    if (Obj.CRM_DatosReferencias[i].IdContactoPuesto == 1) {
                        $("#Dc_v2_CodTelefono").val(Obj.CRM_DatosReferencias[i].CodeTelefonico).trigger('change');
                        $("#Dc_Nombre").val(Obj.CRM_DatosReferencias[i].NombreEmpresa);
                        $("#Dc_CodTelefono").val(Obj.CRM_DatosReferencias[i].CodeTelefonico);
                        $("#Dc_Telefono").val(Obj.CRM_DatosReferencias[i].Telefono);
                        $("#Dc_Extension").val(Obj.CRM_DatosReferencias[i].Extension);
                        $("#Dc_Celular").val(Obj.CRM_DatosReferencias[i].Celular);
                        $("#Dc_Correo").val(Obj.CRM_DatosReferencias[i].Correo);
                    }
                    if (Obj.CRM_DatosReferencias[i].IdContactoPuesto == 2) {
                        $("#Dc_CodTelefono").val(Obj.CRM_DatosReferencias[i].CodeTelefonico).trigger('change');
                        $("#Dc_v2_Nombre").val(Obj.CRM_DatosReferencias[i].NombreEmpresa);
                        $("#Dc_v2_CodTelefono").val(Obj.CRM_DatosReferencias[i].CodeTelefonico);
                        $("#Dc_v2_Telefono").val(Obj.CRM_DatosReferencias[i].Telefono);
                        $("#Dc_v2_Extension").val(Obj.CRM_DatosReferencias[i].Extension);
                        $("#Dc_v2_Celular").val(Obj.CRM_DatosReferencias[i].Celular);
                        $("#Dc_v2_Correo").val(Obj.CRM_DatosReferencias[i].Correo);
                    }
                    if (Obj.CRM_DatosReferencias[i].IdContactoPuesto == 3) {
                        $("#Dc_v3_CodTelefono").val(Obj.CRM_DatosReferencias[i].CodeTelefonico).trigger('change');
                        $("#Dc_v3_Nombre").val(Obj.CRM_DatosReferencias[i].NombreEmpresa);
                        $("#Dc_v3_CodTelefono").val(Obj.CRM_DatosReferencias[i].CodeTelefonico);
                        $("#Dc_v3_Telefono").val(Obj.CRM_DatosReferencias[i].Telefono);
                        $("#Dc_v3_Extension").val(Obj.CRM_DatosReferencias[i].Extension);
                        $("#Dc_v3_Celular").val(Obj.CRM_DatosReferencias[i].Celular);
                        $("#Dc_v3_Correo").val(Obj.CRM_DatosReferencias[i].Correo);
                    }
                }

                KTApp.init();
                KTMenu.init();

                $("#ModalDocumentos").modal("show");
            }
            else {
                toastr.error("Error al guardar, por favor contacta al administrador!");
            }
        }
    }).fail(function (error) { toastr.error("Error de servidor, por favor contacta al administrador!"); });


}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////  FORMS VALIDATION ///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var ErrorMessege = "Campo obligatorio.";
//************************** START Validation Aprobar doc **************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************
var DocAprobarRechazarForm = document.getElementById('DocAprobarRechazarForm');
var DocAprobarRechazarButton = document.getElementById('DocAprobarRechazarButton');
var DocAprobarRechazar_Validatator = FormValidation.formValidation(
    DocAprobarRechazarForm,
    {
        fields: {
            'ComentarioAprobacion': {
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
DocAprobarRechazarButton.addEventListener('click', function (e) {
    e.preventDefault();

    if (DocAprobarRechazar_Validatator) {
        DocAprobarRechazar_Validatator.validate().then(function (status) {
            if (status == 'Valid') {
                DocAprobarRechazarButton.setAttribute('data-kt-indicator', 'on');
                DocAprobarRechazarButton.disabled = true;
                setTimeout(function () {
                    DocAprobarRechazarButton.removeAttribute('data-kt-indicator');
                    DocAprobarRechazarButton.disabled = false;
                    AprobarDocumento()

                }, 1000);
            }
            else {
                DocAprobarRechazarButton.setAttribute('data-kt-indicator', 'on');
                DocAprobarRechazarButton.disabled = true;
                setTimeout(function () {
                    DocAprobarRechazarButton.removeAttribute('data-kt-indicator');
                    DocAprobarRechazarButton.disabled = false;

                    var alertMessage = "Revisa que los campos requeridos no esten vacíos!";
                    toastr.warning(alertMessage);

                }, 150);
            }
        });
    }
});
//************************** END Validation Aprobar doc **************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************
