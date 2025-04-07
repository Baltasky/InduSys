
$(document).ready(function () {
        if(window.innerWidth <= 992){$("#kt_app_sidebar").addClass("app-sidebar flex-column drawer drawer-start");}
    GetChecadasEmpleados();
});

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
//////////////////////////////////////////////// DATATABLES ///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var TablaEmpleados = function () {
    var table;
    var datatable;

    var initDatatable = function () {
        datatable = $(table).DataTable({
              "scrollY": 500,
             "scrollX": true,
            "info": true,
            'order': [],
            "ordering": false,
            'pageLength': 100,
            //'scrollCollapse': true,
            //"fixedColumns": {
            //    leftColumns: 3
            //},
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
                    "sLast": "último"
                },
                "oAria": {
                    "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                    "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                }
            },
            "columnDefs": [
                { "targets": 0, "className": "text-center" },
                { "targets": 1, "className": "text-center" },
            ],
        });
    }
    var exportButtons = () => {
        const documentTitle = 'Reporte de Marcaje de Empleados';
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
        }).container().appendTo($('#TablaEmpleados_buttons'));
        const exportButtons = document.querySelectorAll('#TablaEmpleados_export_menu [TablaEmpleados-export]');
        exportButtons.forEach(exportButton => {
            exportButton.addEventListener('click', e => {
                e.preventDefault();

                const exportValue = e.target.getAttribute('TablaEmpleados-export');
                var target = document.querySelector('div[id="TablaEmpleados_buttons"]');
                target = target.querySelector('.buttons-' + exportValue);
                target.click();
            });
        });
    }
    var handleSearchDatatable = () => {
        const filterSearch = document.querySelector('[data-kt-filter="searchEmpleado"]');
        filterSearch.addEventListener('keyup', function (e) {
            datatable.search(e.target.value).draw();
        });
    }

    return {
        init: function () {
            table = document.querySelector('#TablaEmpleados');

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
    TablaEmpleados.init();
});

//*************************************************************************************************** */
//************************************ Functions ************************************ */
//*************************************************************************************************** */
function GetChecadasEmpleados() {

    BlockPantalla.block()

    $.ajax({
        url: "/Empleados/GetChecadasEmpleados",
        data: { Ajax: 1, RangoFechas: $("#RangoFechas").val() },
        type: "POST",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("XSRF-TOKEN",
                $('input:hidden[name="__RequestVerificationToken"]').val());
        },
    }).done(function (result) {
        if (result != null) {
            if (result == "SessionExpirada") { SwalSessionExpirada() 
                BlockPantalla.release()
            }
            else if (result == "SinRegistros") {
                toastr.warning("No existen checadas registradas dentro del periodo seleccionado!");
                $("#CardFiltros").addClass("d-none");
                BlockPantalla.release()
            }
            else if (result != "Error")
            {
                var Obj = JSON.parse(result);

                var tEmpleados = $('#TablaEmpleados').DataTable();
                tEmpleados.clear().draw();

                for (var i = 0; i < Obj.length; i++) {

                    var newRow = tEmpleados.row.add([
                        Obj[i].Id,
                        `<div class="symbol symbol-35px"><img src="${Obj[i].RutaFoto}" class="rounded-3" alt="user" onclick="makeImageBig(this)"></div>`,
                        Obj[i].Nombre,
                        Obj[i].Ubicacion,
                        Obj[i].Departamento,
                        Obj[i].Puesto,
                        Obj[i].Segmento,
                        Obj[i].FechaEntrada,
                        Obj[i].FechaSalida,
                        Obj[i].Tiempo,
                        Obj[i].Observaciones,
                        Obj[i].UsuarioRegistro
                    ]).draw(false).node();

                    $(newRow).addClass('align-middle');
                }

                KTApp.init();
                KTMenu.init()

                $("#CardFiltros").removeClass("d-none");

                BlockPantalla.release()
            }
            else {
                toastr.error("Error al guardar, por favor contacta al administrador!");
            }
        }
    }).fail(function (error) { toastr.error("Error de servidor, por favor contacta al administrador!"); });
}

//*************************************************************************************************** */
//************************************ Form Validation ************************************ */
//*************************************************************************************************** */

var FormGetChecadas = document.getElementById('FormGetChecadas');
var validatorEditEmpleado = FormValidation.formValidation(
    FormGetChecadas,
    {

        fields: {
            'RangoFechas': {
                validators: {
                    notEmpty: {
                        message: 'El periodo es requerido.'
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
var ButtonGetChecadas = document.getElementById('ButtonGetChecadas');
ButtonGetChecadas.addEventListener('click', function (e) {
    e.preventDefault();

    if (validatorEditEmpleado) {
        validatorEditEmpleado.validate().then(function (status) {
            if (status == 'Valid') {
                ButtonGetChecadas.setAttribute('data-kt-indicator', 'on');
                ButtonGetChecadas.disabled = true;
                setTimeout(function () {
                    ButtonGetChecadas.removeAttribute('data-kt-indicator');
                    ButtonGetChecadas.disabled = false;

                    GetChecadasEmpleados()

                }, 1000);
            }
            else {
                ButtonGetChecadas.setAttribute('data-kt-indicator', 'on');
                ButtonGetChecadas.disabled = true;
                setTimeout(function () {
                    ButtonGetChecadas.removeAttribute('data-kt-indicator');
                    ButtonGetChecadas.disabled = false;

                }, 150);
            }
        });
    }
});