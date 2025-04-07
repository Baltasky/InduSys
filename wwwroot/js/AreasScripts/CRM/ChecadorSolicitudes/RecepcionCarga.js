///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////  FUNCIONES DE ARRANQUE  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function () {
    if (window.innerWidth <= 992) { $("#kt_app_sidebar").addClass("app-sidebar flex-column drawer drawer-start"); }
    document.querySelectorAll('[data-selected]').forEach(e => { e.value = e.dataset.selected });

    GetRecepciones()
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////// BLOCK ONLOADER //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//#region BLOCK ONLOADER 
var BlockSeeSolicitud = document.querySelector("#BlockSeeSolicitud");
var BlockModalSeeSolicitud = new KTBlockUI(BlockSeeSolicitud, {
    message: '<div class="blockui-message"> <span class="badge py-3 px-4 fs-7 badge-light-primary"> <span class="spinner-border text-primary"></span> Validando...</span>  </div>',
});
//#endregion

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////// SCANER QR /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//#region Scaner QR
//crea elemento
const video = document.createElement("video");

//nuestro camvas
const canvasElement = document.getElementById("qr-canvas");
const canvas = canvasElement.getContext("2d");

//div donde llegara nuestro canvas
const btnScanQR = document.getElementById("btn-scan-qr");

//lectura desactivada
let scanning = false;

//funcion para encender la camara
const encenderCamara = () => {
    navigator.mediaDevices
        .getUserMedia({ video: { facingMode: "environment" } })
        .then(function (stream) {
            scanning = true;
            btnScanQR.hidden = true;
            canvasElement.hidden = false;
            video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
            video.srcObject = stream;
            video.play();
            tick();
            scan();
        });
};

//funciones para levantar las funiones de encendido de la camara
function tick() {
    canvasElement.height = video.videoHeight;
    canvasElement.width = video.videoWidth;
    canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);

    scanning && requestAnimationFrame(tick);
}

function scan() {
    try {
        qrcode.decode();
    } catch (e) {
        setTimeout(scan, 300);
    }
}

//apagara la camara
const cerrarCamara = () => {
    video.srcObject.getTracks().forEach((track) => {
        track.stop();
    });
    canvasElement.hidden = true;
    btnScanQR.hidden = false;
};

const activarSonido = () => {
    var audio = document.getElementById('audioScaner');
    audio.play();
}

//callback cuando termina de leer el codigo QR
qrcode.callback = (respuesta) => {
    if (respuesta) {
        if (respuesta.includes("SolicitudId")) {
            console.log(respuesta)
            var SolicitudId = respuesta.split("=")[1];
            VisualizarSolicitudes(SolicitudId)

            activarSonido();
            //encenderCamara();    
            cerrarCamara();
            $("#ModalAddRecepcion").modal("hide");

        }
        else {
            Swal.fire({
                text: "El codigo QR que trata de scanear no es valido!",
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
                    cerrarCamara();

                }
            });

        }

    }
};
//evento para mostrar la camara sin el boton 
window.addEventListener('load', (e) => {
    /*encenderCamara();*/
})

//#endregion

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////// DATATABLES ///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//#region DATATABLES
var Tabla1 = function () {
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
            //"scrollY": 600,
            //"scrollX": true,
            "info": true,
            'order': [],
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
        const documentTitle = 'Reporte Recepciones de carga';
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
        const filterSearch = document.querySelector('[data-kt-filter="searchTabla1"]');
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

var Tabla2 = function () {
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
            "info": false,
            //"scrollY": "500px",
            //"scrollX": "500px",
            "scrollCollapse": true,
            'order': [],
            'pageLength': 10,
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

var Tabla4 = function () {
    var table;
    var datatable;
    var initDatatable = function () {
        datatable = $(table).DataTable({
            "info": false,
            //"scrollY": "500px",
            //"scrollX": "500px",
            "scrollCollapse": true,
            'order': [],
            'pageLength': 10,
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

var Tabla5 = function () {
    var table;
    var datatable;
    var initDatatable = function () {
        datatable = $(table).DataTable({
            "info": false,
            //"scrollY": "500px",
            //"scrollX": "500px",
            "scrollCollapse": true,
            'order': [],
            'pageLength': 10,
            "columnDefs": [
                { "targets": 0, "className": "text-center" },
            ]
        });
    }
    return {
        init: function () {
            table = document.querySelector('#Tabla5');
            if (!table) {
                return;
            }
            initDatatable();
        }
    };
}();
KTUtil.onDOMContentLoaded(function () {
    Tabla5.init();
});

//#endregion

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////// SOLICITUDES DE MANIOBRA   /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function GetRecepciones() {

    $.ajax({
        url: "/SolicitudesManiobra/GetRecepciones",
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
                    var Json = JSON.stringify(Obj[i]).replace(/"/g, '&quot;');

                    //var Actions = Obj[i].IdStatus == 1 || Obj[i].IdStatus == 3 ? `<a onclick="ModalEditSolicitudes(${Json})" class="btn btn-light-primary me-2 p-2 pe-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Editar Solicitud"><i class="fas fa-calendar-check fs-6 fw-bold"></i></a>`
                    //: `<a onclick="VisualizarSolicitudes(${Json})" class="btn btn-light-warning me-2 p-2 pe-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Visualizar Solicitud"><i class="fas fa-eye fs-6 fw-bold"></i></a>`

                    var newRow = Tabla1.row.add([
                       
                        `<a href="${Obj[i].RutaReport2}"  class="text-primary text-hover-primary" >${Obj[i].FolioBR}</a>`,
                        `<a href="${Obj[i].RutaReport1}"  class="text-primary text-hover-primary" >${Obj[i].FolioSolicitud}</a>`,
                        Obj[i].Agencia,
                        Obj[i].Trafico,
                        Obj[i].Servicio,
                        Obj[i].Observaciones,
                        Obj[i].EstadoMercancia,
                        Obj[i].Checador,
                        Obj[i].FechaRegistro
                    ]).draw(false).node();
                    $(newRow).addClass('align-middle');
                   
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

function ModalAddRecepcion()
{
    $("#ModalAddRecepcion").modal("show");
}

function getValueOrNA(value) {
    return value ? value : "N/A"; // Si el valor es null, undefined o vac�o, retorna "N/A"
}

$(document).ready(function () {
    // Detecta el cambio en los radios
    $('input[name="TipoChecada"]').change(function () {
        // Asigna el valor del radio seleccionado al input oculto
        $('#TipoChecadaValue').val($(this).val());

    });
});

var cadenaArticulos = "";
$(document).ready(function () {
    var selectedIDs = new Set();

    $('#Tabla2 tbody').on('change', 'input[type="checkbox"]', function () {
        var value = $(this).val();

        if ($(this).is(':checked')) {
            selectedIDs.add(value);
        } else {
            selectedIDs.delete(value);
        }

        cadenaArticulos = Array.from(selectedIDs).join(', ');
        $("#IdcadenaArticulos").val(cadenaArticulos)

    });
});

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
    maxFilesize: 10, // Tama�o m�ximo de archivo en MB
    previewTemplate: previewTemplate,
    previewsContainer: IdAddSolicitudes_Documents + " .dropzone-items", // Definir el contenedor de las previsualizaciones
    clickable: IdAddSolicitudes_Documents + " .dropzone-select", // Definir el bot�n para seleccionar archivos
    autoProcessQueue: false, // Desactivar el env�o autom�tico
    acceptedFiles: "image/jpeg, image/png, image/gif" // S�lo aceptar im�genes
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
        dropzoneItem.style.display = ''; // Mostrar elementos de previsualizaci�n
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

function VisualizarSolicitudes(SolicitudId) {

    BlockModalSeeSolicitud.block()

    document.getElementById("SeeSolicitudesForm").reset();
    $("#SeeSolicitudes_Id").val(SolicitudId);

    cadenaArticulos = "";

    var SeeSolicitudes_Nombre = $("#SeeSolicitudes_Nombre");
    $('#SeeSolicitudes_Nombre').empty().trigger("change");
    SeeSolicitudes_Nombre.append('<option></option>');

    var SeeSolicitudes_TipoRegimen = $("#SeeSolicitudes_TipoRegimen");
    $('#SeeSolicitudes_TipoRegimen').empty().trigger("change");
    SeeSolicitudes_TipoRegimen.append('<option></option>');

    var SeeSolicitudes_Servicios = $("#SeeSolicitudes_Servicios");
    $('#SeeSolicitudes_Servicios').empty().trigger("change");
    SeeSolicitudes_Servicios.append('<option></option>');

    var SeeSolicitudes_CFDI = $("#SeeSolicitudes_CFDI");
    $('#SeeSolicitudes_CFDI').empty().trigger("change");
    SeeSolicitudes_CFDI.append('<option></option>');

    var SeeSolicitudes_MetodoPago = $("#SeeSolicitudes_MetodoPago");
    $('#SeeSolicitudes_MetodoPago').empty().trigger("change");
    SeeSolicitudes_MetodoPago.append('<option></option>');

    var SeeSolicitudes_FormaPago = $("#SeeSolicitudes_FormaPago");
    $('#SeeSolicitudes_FormaPago').empty().trigger("change");
    SeeSolicitudes_FormaPago.append('<option></option>');

    var SeeSolicitudes_Transportista = $("#SeeSolicitudes_Transportista");
    $('#SeeSolicitudes_Transportista').empty().trigger("change");
    SeeSolicitudes_Transportista.append('<option></option>');

    var Tabla2 = $('#Tabla2').DataTable();
    Tabla2.clear().draw();

    var Tabla3 = $('#Tabla3').DataTable();
    Tabla2.clear().draw();

    var Tabla4 = $('#Tabla4').DataTable();
    Tabla2.clear().draw();

    var Tabla5 = $('#Tabla5').DataTable();
    Tabla5.clear().draw();

    $.ajax({
        url: "/SolicitudesManiobra/ModalSeeSolicitudes",
        data: { Ajax: 1, IdSolicitud: SolicitudId },
        type: "POST",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("XSRF-TOKEN",
                $('input:hidden[name="__RequestVerificationToken"]').val());
        },
    }).done(function (result) {
        if (result != null) {
            if (result == "SessionExpirada") { SwalSessionExpirada() }
            else if (result == "Existe")
            {
                Swal.fire({
                    text: "Ya se encuentra recepcionada la solicitud que escaneo!",
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
                        $("#ModalSeeSolicitudes").modal("hide");
                    }
                });
            }
            else if (result != "Error")
            {
                var obj = JSON.parse(result);

                $("#SeeSolicitudes_AgenteCorreo").val(obj.DatosContacto[0].Correo);
                $("#SeeSolicitudes_Referencia").val(obj.DatosContacto[0].Patente);
                $("#SeeSolicitudes_Agencia").val(obj.CRM_Datos_CSF[0].RazonSocial);
                $("#SeeSolicitudes_AgenciaCalle").val(obj.CRM_Datos_CSF[0].Calle);
                $("#SeeSolicitudes_AgenciaCol").val(obj.CRM_Datos_CSF[0].Colonia);
                $("#SeeSolicitudes_Num").val(obj.CRM_Datos_CSF[0].NoExterior);
                $("#SeeSolicitudes_AgenciaCd").val(obj.CRM_Datos_CSF[0].Municipio);
                $("#SeeSolicitudes_AgenciaEstado").val(obj.CRM_Datos_CSF[0].EntidadFederativa);
                $("#SeeSolicitudes_AgenciaCp").val(obj.CRM_Datos_CSF[0].CodigoPostal);

                $("#SeeSolicitudes_Id").val(obj.SolicitudManiobra[0].Id);
                $("#SeeSolicitudes_IdCliente").val(obj.SolicitudManiobra[0].IdCliente);

                $("#SeeSolicitudes_DestinoFac").val(obj.SolicitudManiobra[0].IdDestinoFacturacion).trigger('change');
                DestinoFacturarSee(obj.SolicitudManiobra[0].IdDestinoFacturacion, obj.SolicitudManiobra[0].IdCliente)

                $("#SeeSolicitudes_Nombre").select2({ data: obj.Clientes });
                $("#SeeSolicitudes_Nombre").val(obj.SolicitudManiobra[0].IdConsignatario).trigger('change');

                $("#SeeSolicitudes_TipoRegimen").select2({ data: obj.Trafico });
                $("#SeeSolicitudes_TipoRegimen").val(obj.SolicitudManiobra[0].IdRegimen).trigger('change');

                $("#SeeSolicitudes_CFDI").select2({ data: obj.UsoCFDI });
                $("#SeeSolicitudes_CFDI").val(obj.SolicitudManiobra[0].IdUsoCFDI).trigger('change');

                $("#SeeSolicitudes_MetodoPago").select2({ data: obj.MetodoPago });
                $("#SeeSolicitudes_MetodoPago").val(obj.SolicitudManiobra[0].IdMetodoPago).trigger('change');

                $("#SeeSolicitudes_FormaPago").select2({ data: obj.FormaPago });
                $("#SeeSolicitudes_FormaPago").val(obj.SolicitudManiobra[0].IdFormaPago).trigger('change');

                $("#SeeSolicitudes_Servicios").select2({ data: obj.Servicios });
                $("#SeeSolicitudes_Servicios").val(obj.SolicitudManiobra[0].IdServicio).trigger('change');

                $("#SeeSolicitudes_Transportista").select2({ data: obj.Transportistas });
                $("#SeeSolicitudes_Transportista").val(obj.SolicitudManiobra[0].IdTransportista).trigger('change');

                $("#SeeSolicitudes_FechaCita").val(obj.SolicitudManiobra[0].FechaEntregaRaw);
                $("#SeeSolicitudes_HoraCita").val(obj.SolicitudManiobra[0].HoraEntrega);

                $("#SeeSolicitudes_BL").val(obj.SolicitudManiobra[0].BL);
                $("#SeeSolicitudes_Booking").val(obj.SolicitudManiobra[0].Booking);
                $("#SeeSolicitudes_Buque").val(obj.SolicitudManiobra[0].Buque);
                $("#SeeSolicitudes_NuViaje").val(obj.SolicitudManiobra[0].NumeroViaje);
                $("#SeeSolicitudes_ValorComercial").val(obj.SolicitudManiobra[0].ValorComercial);
                $("#SeeSolicitudes_Remitente").val(obj.SolicitudManiobra[0].Remitente);
                $("#SeeSolicitudes_Proveedor").val(obj.SolicitudManiobra[0].Proveedor);
                $("#SeeSolicitudes_Embarcador").val(obj.SolicitudManiobra[0].Embarcador);
                $("#SeeSolicitudes_FechaPago").val(obj.SolicitudManiobra[0].FechaPagoRaw);
                $("#SeeSolicitudes_Pesaje").val(obj.SolicitudManiobra[0].Pesaje);
                $("#SeeSolicitudes_CAAT").val(obj.SolicitudManiobra[0].CAAT);
                $("#SeeSolicitudes_NoPlaca").val(obj.SolicitudManiobra[0].Placas);
                $("#SeeSolicitudes_Operador").val(obj.SolicitudManiobra[0].Operador);

                var selectedArray = obj.SolicitudManiobra[0].IdSubServicios.split('|').map(id => id.trim());

                SeecadenaServicios = "";
                $("#SeeIdValuesSubServicios").val("");

                var printServicios = "";

                for (i = 0; i < obj.SubServicios.length; i++) {

                    // Revisar si el ID actual est� en el arreglo de valores seleccionados
                    let isChecked = selectedArray.includes(obj.SubServicios[i].id.toString()) ? "checked" : "";

                    printServicios = printServicios + `<tr><td><div class="form-check form-check-custom form-check-sm">` +
                        `<input type="checkbox" ${isChecked} id="IdSeeSubSeb-${obj.SubServicios[i].id}" value="${obj.SubServicios[i].id}" class="form-check-input border border-dark me-2" disabled>` +
                        `<label for="IdSeeSubSeb-${obj.SubServicios[i].id}">${obj.SubServicios[i].text}</label></div></td></tr>`;
                }
                $("#SeeTablaFiltroServicios").html(printServicios);

                SeeServiciosSelected = obj.SolicitudManiobra[0].IdSubServicios.split('|').map(id => id.trim());
                SeecadenaServicios = obj.SolicitudManiobra[0].IdSubServicios;
                $("#SeeIdValuesSubServicios").val(SeecadenaServicios);

                var Tabla2 = $('#Tabla2').DataTable();

                for (i = 0; i < obj.ArticulosModel.length; i++) {
                    printServicios =  `<input type="checkbox" id="IdArticulo-${obj.ArticulosModel[i].Id}" value="${obj.ArticulosModel[i].Id}" class="form-check-input border border-dark me-2">`;

                    var newRow = Tabla2.row.add([
                        printServicios,
                        obj.ArticulosModel[i].Almacen,
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
                    ]).draw(false).node();
                    $(newRow).addClass('align-middle');
                }

                KTApp.init();
                KTMenu.init();

                SeeSolicitud_DocumentsActuales = obj.CRM_SolicitudesFiles.length;

                var FileHtml = "";
                for (i = 0; i < obj.CRM_SolicitudesFiles.length; i++) {
                    FileHtml = FileHtml + `<div class="d-flex flex-stack bg-gray-100 p-2 mb-2">
                        <a class="text-primary fw-semibold fs-6 me-2"  onclick="EditSolicitudShowDocument(${obj.CRM_SolicitudesFiles[i].Id}, ${obj.CRM_SolicitudesFiles[i].IdSolicitud}, '${obj.CRM_SolicitudesFiles[i].Extension}', '${obj.CRM_SolicitudesFiles[i].Descripcion}' )" >${obj.CRM_SolicitudesFiles[i].Descripcion}</a>
                     </div>`;
                }

                $("#SeeSolicitudes_FileSaved").html(FileHtml);

                KTApp.init();
                KTMenu.init();
                $("#ModalSeeSolicitudes").modal("show");

                BlockModalSeeSolicitud.release()
            }
            else { toastr.error("Error al guardar, por favor contacta al administrador!"); }
        }
    }).fail(function (error) { toastr.error("Error de servidor, por favor contacta al administrador!"); });

}
function DestinoFacturarSee(Id, IdCliente) {

    if (Id == 0) {
        $("#SeeSolicitudes_Nombre").val(null).trigger('change');
        $("#SeeSolicitudes_RFC").val("");
        $("#SeeSolicitudes_DivCliente").addClass("d-none");
        $("#SeeSolicitudes_DivDomiAgencia").addClass("d-none");
        $("#SeeSolicitudes_DivDomiCliente").addClass("d-none");
    }
    else if (Id == 1) {
        $.ajax({
            url: "/Aprobador_SM/GetCatalogosSM",
            data: { Ajax: 1, IdCliente: IdCliente },
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

                    $("#SeeSolicitudes_Nombre").val(null).trigger('change');
                    $("#SeeSolicitudes_RFC").val(Obj.CRM_Datos_CSF[0].RFC);
                    $("#SeeSolicitudes_DivCliente").addClass("d-none");
                    $("#SeeSolicitudes_DivDomiAgencia").removeClass("d-none");
                    $("#SeeSolicitudes_DivDomiCliente").addClass("d-none");

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
        $("#SeeSolicitudes_DivCliente").removeClass("d-none");

        $("#SeeSolicitudes_DivDomiAgencia").addClass("d-none");
        $("#SeeSolicitudes_DivDomiCliente").removeClass("d-none");

    }
}
function GetClienteDataSee(Id) {

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

                    $("#SeeSolicitudes_RFC").val(Obj[0].RFC);
                    $("#SeeSolicitudes_C_Estado").val(Obj[0].EntidadFederativa);
                    $("#SeeSolicitudes_C_Ciudad").val(Obj[0].Municipio);
                    $("#SeeSolicitudes_C_Calle").val(Obj[0].Calle);
                    $("#SeeSolicitudes_C_Colonia").val(Obj[0].Colonia);
                    $("#SeeSolicitudes_C_Numero").val(Obj[0].NoExterior);
                    $("#SeeSolicitudes_C_Cp").val(Obj[0].CodigoPostal);

                    KTApp.init();
                    KTMenu.init()
                }
                else {
                    toastr.error("Error al guardar, por favor contacta al administrador!");
                }
            }
        }).fail(function (error) { toastr.error("Error de servidor, por favor contacta al administrador!"); });

    } else {
        $("#SeeSolicitudes_RFC").val("");
        $("#SeeSolicitudes_C_Estado").val("");
        $("#SeeSolicitudes_C_Ciudad").val("");
        $("#SeeSolicitudes_C_Calle").val("");
        $("#SeeSolicitudes_C_Colonia").val("");
        $("#SeeSolicitudes_C_Numero").val("");
        $("#SeeSolicitudes_C_Cp").val("");
    }
}
function AdaptarCamposByRegimenSee(Regimen) {
    if (Regimen == 1) {
        $("#DivSeeBLM").removeClass("d-none");
        $("#DivSeeBooking").addClass("d-none");
        $("#SeeSolicitudes_BL").val("");
        $("#SeeSolicitudes_Booking").val("N/A");
    } else if (Regimen == 2) {
        $("#DivSeeBLM").addClass("d-none");
        $("#DivSeeBooking").removeClass("d-none");
        $("#SeeSolicitudes_BL").val("N/A");
        $("#SeeSolicitudes_Booking").val("");
    } else {
        $("#DivSeeBLM").addClass("d-none");
        $("#DivSeeBooking").addClass("d-none");
        $("#SeeSolicitudes_BL").val("N/A");
        $("#SeeSolicitudes_Booking").val("N/A");
    }
}
function EditSolicitudShowDocument(Id, IdSolicitud, Extension, Nombre) {

    BlockModalSeeSolicitud.block()

    var link = document.createElement('a');
    ruta = `/Documents/CRM/FileSolicitudes/${IdSolicitud}/${Id}${Extension}`;
    link.href = ruta;
    link.download = `${Nombre}`; // Nombre personalizado para el archivo
    document.body.appendChild(link); // Agregar el enlace al DOM
    link.click(); // Activar la descarga
    document.body.removeChild(link); // Remover el enlace del DOM despu�s de descargar

    BlockModalSeeSolicitud.release()
}

// Guardar todas las firmas
function SaveChecadaTarja() {

    const formData = new FormData();

    var Tabla3 = $('#Tabla3').DataTable();
    var dataT3 = [];
    Tabla3.rows().every(function (rowIdx, tableLoop, rowLoop) {
        var rowData = this.data();
        var rowObject = {
            Recursos: rowData[1],
            Cantidad: rowData[2],
            Largo: rowData[3],
            Ancho: rowData[4],
            Alto: rowData[5],
        };
        dataT3.push(rowObject);
    });
    var JsonRecursos = JSON.stringify(dataT3);

    var Tabla4 = $('#Tabla4').DataTable();
    var dataT4 = [];
    Tabla4.rows().every(function (rowIdx, tableLoop, rowLoop) {
        var rowData = this.data();
        var rowObject = {
            Personal: rowData[1],
            Cantidad: rowData[2],
        };
        dataT4.push(rowObject);
    });
    var JsonPersonal = JSON.stringify(dataT4);

    var Tabla5 = $('#Tabla5').DataTable();
    var dataT5 = [];
    Tabla5.rows().every(function (rowIdx, tableLoop, rowLoop) {
        var rowData = this.data();
        var rowObject = {
            Equipo: rowData[1],
            Cantidad: rowData[2],
        };
        dataT5.push(rowObject);
    });
    var JsonEquipo = JSON.stringify(dataT5);

    formData.append("Ajax", 1);

    formData.append("Recursos", JsonRecursos);
    formData.append("Personal", JsonPersonal);
    formData.append("Equipo", JsonEquipo);

    // Aqu� aseg�rate de que el nombre coincida con lo que espera tu backend
    AddSolicitudes_ArchivosCargados.forEach(function (file, index) { formData.append("Fotos", file); });
    // Agregar cada firma como un archivo al FormData
    const firma1Blob = dataURLToBlob(firma1.getSignatureDataURL());
    formData.append("Firmas", firma1Blob, "firma1.png");
    const firma2Blob = dataURLToBlob(firma2.getSignatureDataURL());
    formData.append("Firmas", firma2Blob, "firma2.png");
    formData.append("IdSolicitud", $("#SeeSolicitudes_Id").val());
    formData.append("Articulos", cadenaArticulos);
    formData.append("Observaciones", $("#ObservacionChecador").val());
    formData.append("EstadoMercancia", $("#EstadoMercancia").val());

    $.ajax({
        url: "/SolicitudesManiobra/SaveRecepcionCarga",
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
                        window.location.reload();
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

//Modales Recursos utilizados
function ModalAddRecursos() {

    document.getElementById("AddRecursosForm").reset();

    var AddRecursos_Recurso = $("#AddRecursos_Recurso");
    $('#AddRecursos_Recurso').empty().trigger("change");
    AddRecursos_Recurso.append('<option></option>');

    var AddRecursos_UniMedida1 = $("#AddRecursos_UniMedida1");
    $('#AddRecursos_UniMedida1').empty().trigger("change");
    AddRecursos_UniMedida1.append('<option></option>');

    var AddRecursos_UniMedida2 = $("#AddRecursos_UniMedida2");
    $('#AddRecursos_UniMedida2').empty().trigger("change");
    AddRecursos_UniMedida2.append('<option></option>');

    var AddRecursos_UniMedida3 = $("#AddRecursos_UniMedida3");
    $('#AddRecursos_UniMedida3').empty().trigger("change");
    AddRecursos_UniMedida3.append('<option></option>');

    $.ajax({
        url: "/SolicitudesManiobra/GetModalRecursos",
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

                $("#AddRecursos_Recurso").select2({ data: obj.RecursosTipo });
                $("#AddRecursos_UniMedida1").select2({ data: obj.Tarja_UniMedida });
                $("#AddRecursos_UniMedida2").select2({ data: obj.Tarja_UniMedida });
                $("#AddRecursos_UniMedida3").select2({ data: obj.Tarja_UniMedida });

                $("#ModalAddRecursos").modal("show");
            }
            else { toastr.error("Error al guardar, por favor contacta al administrador!"); }
        }
    }).fail(function (error) { toastr.error("Error de servidor, por favor contacta al administrador!"); });

}
function AddRecursos() {
    var TablaId = 3;
    var Tabla = $(`#Tabla${TablaId}`).DataTable();

    var newRow = Tabla.row.add([
        `<a onclick="DeleteRecursos(${TablaId}, this)" class="btn btn-light-youtube me-2 p-2 pe-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Eliminar"><i class="fas fa-times fs-7 fw-bold"></i></a>`,
        getValueOrNA($('#AddRecursos_Recurso').find('option:selected').text()),
        getValueOrNA($("#AddRecursos_Cantidad").val()),
        `${getValueOrNA($("#AddRecursos_Largo").val())} | ${getValueOrNA($('#AddRecursos_UniMedida1').find('option:selected').text())}`,
        `${getValueOrNA($("#AddRecursos_Ancho").val())} | ${getValueOrNA($('#AddRecursos_UniMedida2').find('option:selected').text())}`,
        `${getValueOrNA($("#AddRecursos_Alto").val())} | ${getValueOrNA($('#AddRecursos_UniMedida3').find('option:selected').text())}`,
    ]).draw(false).node();
    $(newRow).addClass('align-middle');

    KTApp.init();
    KTMenu.init();

    toastr.success("Agregado correctamente.");

    $('#ModalAddRecursos').modal('hide');
}
function DeleteRecursos(TablaId, Row) {

    Swal.fire({
        text: "Esta seguro de eliminar el Recurso?",
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
            toastr.success("Recurso eliminado correctamente!");

        }
        else {
            $('.swal2-container').css('display', 'none');
        }
    });

}

// Modales Personal utilizados
function ModalAddPersonal() {

    document.getElementById("AddPersonalForm").reset();

    var AddPersonal_Personal = $("#AddPersonal_Personal");
    $('#AddPersonal_Personal').empty().trigger("change");
    AddPersonal_Personal.append('<option></option>');

    $.ajax({
        url: "/SolicitudesManiobra/GetModalPersonal",
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

                $("#AddPersonal_Personal").select2({ data: obj.Tarja_Puestos });

                $("#ModalAddPersonal").modal("show");
            }
            else { toastr.error("Error al guardar, por favor contacta al administrador!"); }
        }
    }).fail(function (error) { toastr.error("Error de servidor, por favor contacta al administrador!"); });

}
function AddPersonal() {
    var TablaId = 4;
    var Tabla = $(`#Tabla${TablaId}`).DataTable();

    var newRow = Tabla.row.add([
        `<a onclick="DeletePersonal(${TablaId}, this)" class="btn btn-light-youtube me-2 p-2 pe-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Eliminar"><i class="fas fa-times fs-7 fw-bold"></i></a>`,
        getValueOrNA($('#AddPersonal_Personal').find('option:selected').text()),
        getValueOrNA($("#AddPersonal_Cantidad").val()),
    ]).draw(false).node();
    $(newRow).addClass('align-middle');

    toastr.success("Agregado correctamente.");

    KTApp.init()
    KTMenu.init()

    $('#ModalAddPersonal').modal('hide');
}
function DeletePersonal(TablaId, Row) {

    Swal.fire({
        text: "Esta seguro de eliminar el Personal?",
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
            toastr.success("Personal eliminado correctamente!");

        }
        else {
            $('.swal2-container').css('display', 'none');
        }
    });

}

//Modales Equipos utilizados
function ModalAddEquipos() {

    document.getElementById("AddEquiposForm").reset();

    var AddEquipos_Equipos = $("#AddEquipos_Equipos");
    $('#AddEquipos_Equipos').empty().trigger("change");
    AddEquipos_Equipos.append('<option></option>');

    $.ajax({
        url: "/SolicitudesManiobra/GetModalEquipos",
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

                $("#AddEquipos_Equipos").select2({ data: obj.Tarja_Maquinaria });

                $("#ModalAddEquipos").modal("show");
            }
            else { toastr.error("Error al guardar, por favor contacta al administrador!"); }
        }
    }).fail(function (error) { toastr.error("Error de servidor, por favor contacta al administrador!"); });

}
function AddEquipos() {
    var TablaId = 5;
    var Tabla = $(`#Tabla${TablaId}`).DataTable();

    var newRow = Tabla.row.add([
        `<a onclick="DeleteEquipos(${TablaId}, this)" class="btn btn-light-youtube me-2 p-2 pe-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Eliminar"><i class="fas fa-times fs-7 fw-bold"></i></a>`,
        getValueOrNA($('#AddEquipos_Equipos').find('option:selected').text()),
        getValueOrNA($("#AddEquipos_Cantidad").val()),
    ]).draw(false).node();
    $(newRow).addClass('align-middle');

    toastr.success("Agregado correctamente.");

    KTApp.init()
    KTMenu.init()

    $('#ModalAddEquipos').modal('hide');
}
function DeleteEquipos(TablaId, Row) {

    Swal.fire({
        text: "Esta seguro de eliminar el Equipo?",
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
            toastr.success("Equipo eliminado correctamente!");

        }
        else {
            $('.swal2-container').css('display', 'none');
        }
    });

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////  FORMS VALIDATION ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//#region FORMS VALIDATION 
var ErrorMessege = "Campo obligatorio.";

var FormGetChecadas = document.getElementById('SeeSolicitudesForm');
var validatorCheck = FormValidation.formValidation(
    FormGetChecadas,
    {

        fields: {
            'IdcadenaArticulos': {
                validators: {
                    notEmpty: {
                        message: 'Check los articulos.'
                    }
                }
            },
            'ObservacionChecador': {
                validators: {
                    notEmpty: {
                        message: 'El campo es requerido.'
                    }
                }
            },
            'EstadoMercancia': {
                validators: {
                    notEmpty: {
                        message: 'El campo es requerido.'
                    }
                }
            },
            "Idcanvas1": {
                validators: {
                    callback: {
                        message: 'El campo es requerido.',
                        callback: function (input) {

                            if (firma1.isSignatureValid()) {
                                return true; //true es que no le pedira como requerido el campo cliente.
                            }
                            else {
                                return false;
                            }
                        }
                    }
                }
            },
            "Idcanvas2": {
                validators: {
                    callback: {
                        message: 'El campo es requerido.',
                        callback: function (input) {

                            if (firma2.isSignatureValid()) {
                                return true; //true es que no le pedira como requerido el campo cliente.
                            }
                            else {
                                return false;
                            }
                        }
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
var ButtonGetChecadas = document.getElementById('SeeSolicitudesButton');
ButtonGetChecadas.addEventListener('click', function (e) {
    e.preventDefault();

    if (validatorCheck) {
        validatorCheck.validate().then(function (status) {
            if (status == 'Valid') {
                ButtonGetChecadas.setAttribute('data-kt-indicator', 'on');
                ButtonGetChecadas.disabled = true;
                setTimeout(function () {
                    ButtonGetChecadas.removeAttribute('data-kt-indicator');
                    ButtonGetChecadas.disabled = false;

                    // Validar si el arreglo de archivos est� vac�o
                    if (AddSolicitudes_ArchivosCargados.length === 0) {
                        Swal.fire({
                            text: "Es obligatorio agregar las evidencias fotograficas!",
                            icon: "info",
                            buttonsStyling: false,
                            confirmButtonText: "Ok!",
                            customClass: {
                                confirmButton: "btn btn-primary"
                            }
                        });

                    } else {
                        SaveChecadaTarja()
                    }

                }, 1000);
            }
            else {
                ButtonGetChecadas.setAttribute('data-kt-indicator', 'on');
                ButtonGetChecadas.disabled = true;
                setTimeout(function () {
                    ButtonGetChecadas.removeAttribute('data-kt-indicator');
                    ButtonGetChecadas.disabled = false;

                    var alertMessage = "Revisa que los campos obligatorios no esten vacíos!";
                    toastr.warning(alertMessage);

                }, 150);
            }
        });
    }
});

//************************** START Validation Add Recursos **************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************
var AddRecursosForm = document.getElementById('AddRecursosForm');
var AddRecursosButton = document.getElementById('AddRecursosButton');
var AddRecurso_Validatator = FormValidation.formValidation(
    AddRecursosForm,
    {
        fields: {
            'AddRecursos_Recurso': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            },
            'AddRecursos_Cantidad': {
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
AddRecursosButton.addEventListener('click', function (e) {
    e.preventDefault();
    var ErrorMessege = "Campo obligatorio.";

    if (AddRecurso_Validatator) {
        AddRecurso_Validatator.validate().then(function (status) {
            if (status == 'Valid') {
                AddRecursosButton.setAttribute('data-kt-indicator', 'on');
                AddRecursosButton.disabled = true;
                setTimeout(function () {
                    AddRecursosButton.removeAttribute('data-kt-indicator');
                    AddRecursosButton.disabled = false;

                    AddRecursos()

                }, 100);
            }
            else {
                AddRecursosButton.setAttribute('data-kt-indicator', 'on');
                AddRecursosButton.disabled = true;
                setTimeout(function () {
                    AddRecursosButton.removeAttribute('data-kt-indicator');
                    AddRecursosButton.disabled = false;

                    var alertMessage = "Revisa que los campos obligatorios no esten vacíos!";
                    toastr.warning(alertMessage);

                }, 150);
            }
        });
    }
});
$(AddRecursosForm.querySelector('[name="AddRecursos_Recurso"]')).on('change', function () { AddRecurso_Validatator.revalidateField('AddRecursos_Recurso'); });
$(AddRecursosForm.querySelector('[name="AddRecursos_UniMedida1"]')).on('change', function () { AddRecurso_Validatator.revalidateField('AddRecursos_UniMedida1'); });
$(AddRecursosForm.querySelector('[name="AddRecursos_UniMedida2"]')).on('change', function () { AddRecurso_Validatator.revalidateField('AddRecursos_UniMedida2'); });
$(AddRecursosForm.querySelector('[name="AddRecursos_UniMedida3"]')).on('change', function () { AddRecurso_Validatator.revalidateField('AddRecursos_UniMedida3'); });

//************************** START Validation Add Personal **************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************
var AddPersonalForm = document.getElementById('AddPersonalForm');
var AddPersonalButton = document.getElementById('AddPersonalButton');
var AddPersonal_Validatator = FormValidation.formValidation(
    AddPersonalForm,
    {
        fields: {
            'AddPersonal_Personal': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            },
            'AddPersonal_Cantidad': {
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
AddPersonalButton.addEventListener('click', function (e) {
    e.preventDefault();
    if (AddPersonal_Validatator) {
        AddPersonal_Validatator.validate().then(function (status) {
            if (status == 'Valid') {
                AddPersonalButton.setAttribute('data-kt-indicator', 'on');
                AddPersonalButton.disabled = true;
                setTimeout(function () {
                    AddPersonalButton.removeAttribute('data-kt-indicator');
                    AddPersonalButton.disabled = false;

                    AddPersonal()

                }, 100);
            }
            else {
                AddPersonalButton.setAttribute('data-kt-indicator', 'on');
                AddPersonalButton.disabled = true;
                setTimeout(function () {
                    AddPersonalButton.removeAttribute('data-kt-indicator');
                    AddPersonalButton.disabled = false;

                    var alertMessage = "Revisa que los campos obligatorios no esten vacíos!";
                    toastr.warning(alertMessage);

                }, 150);
            }
        });
    }
});
$(AddPersonalForm.querySelector('[name="AddPersonal_Personal"]')).on('change', function () { AddPersonal_Validatator.revalidateField('AddPersonal_Personal'); });

//************************** START Validation Add Equipos **************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************
var AddEquiposForm = document.getElementById('AddEquiposForm');
var AddEquiposButton = document.getElementById('AddEquiposButton');
var AddEquipos_Validatator = FormValidation.formValidation(
    AddEquiposForm,
    {
        fields: {
            'AddEquipos_Equipos': {
                validators: {
                    notEmpty: {
                        message: ErrorMessege
                    }
                }
            },
            'AddEquipos_Cantidad': {
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
AddEquiposButton.addEventListener('click', function (e) {
    e.preventDefault();
    if (AddEquipos_Validatator) {
        AddEquipos_Validatator.validate().then(function (status) {
            if (status == 'Valid') {
                AddEquiposButton.setAttribute('data-kt-indicator', 'on');
                AddEquiposButton.disabled = true;
                setTimeout(function () {
                    AddEquiposButton.removeAttribute('data-kt-indicator');
                    AddEquiposButton.disabled = false;

                    AddEquipos()

                }, 100);
            }
            else {
                AddEquiposButton.setAttribute('data-kt-indicator', 'on');
                AddEquiposButton.disabled = true;
                setTimeout(function () {
                    AddEquiposButton.removeAttribute('data-kt-indicator');
                    AddEquiposButton.disabled = false;

                    var alertMessage = "Revisa que los campos obligatorios no esten vacíos!";
                    toastr.warning(alertMessage);

                }, 150);
            }
        });
    }
});
$(AddEquiposForm.querySelector('[name="AddEquipos_Equipos"]')).on('change', function () { AddEquipos_Validatator.revalidateField('AddEquipos_Equipos'); });
//#endregion