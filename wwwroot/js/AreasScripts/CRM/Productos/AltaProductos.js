//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////  FUNCIONES DE ARRANQUE  /////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function () {
    if(window.innerWidth <= 992){$("#kt_app_sidebar").addClass("app-sidebar flex-column drawer drawer-start");}

    //GetProductos()

    $("#IdAddEmpFN").flatpickr();
    $("#IdEditEmpFN").flatpickr();

    //$('#IdAddEmpRFC').maxlength({
    //    warningClass: "badge badge-danger",
    //    limitReachedClass: "badge badge-success"
    //});

    //$('#IdAddEmpCURP').maxlength({
    //    warningClass: "badge badge-danger",
    //    limitReachedClass: "badge badge-success"
    //});

    $('#IdAddEmpNSS').maxlength({
        warningClass: "badge badge-danger",
        limitReachedClass: "badge badge-success"
    });

    //$('#IdEditEmpRFC').maxlength({
    //    warningClass: "badge badge-danger",
    //    limitReachedClass: "badge badge-success"
    //});

    //$('#IdEditEmpCURP').maxlength({
    //    warningClass: "badge badge-danger",
    //    limitReachedClass: "badge badge-success"
    //});

    $('#IdEditEmpNSS').maxlength({
        warningClass: "badge badge-danger",
        limitReachedClass: "badge badge-success"
    });


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
                { "targets": 2, "className": "text-center" },
                { "targets": 4, "className": "text-center" },
                { "targets": 5, "className": "text-center" },
                { "targets": 6, "className": "text-center" },
                { "targets": 7, "className": "text-center" },
                { "targets": 8, "className": "text-center" },
                { "targets": 9, "className": "text-center" },
                { "targets": 10, "className": "text-center" },
                { "targets": 12, "className": "text-center" },
            ],
            "scrollY": 500,
            "scrollX": true,
            "info": true,
            'order': [],
            "ordering": true,
            'pageLength': 100,
            'scrollCollapse': true,
            "fixedColumns": {
                leftColumns: 2
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
        const documentTitle = 'Reporte de Productos';
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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////  Star CRUD de Modales  ///////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//************** CRUD Productos **************************************** */
function GetProductos() {

    BlockPantalla.block()

    $.ajax({
        url: "/Productos/GetProductos",
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

                var tProductos = $('#Tabla1').DataTable();
                tProductos.clear().draw();

                for (var i = 0; i < Obj.length; i++) {
                    var ProductoJson = JSON.stringify(Obj[i]).replace(/"/g, '&quot;');
                    var Actions = Obj[i].Activo == true ? `<a onclick="DeleteProducto(${Obj[i].Id})" class="btn btn-light-youtube me-2 p-2 pe-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Eliminar"><i class="fas fa-times fs-7 fw-bold"></i></a>` +
                    `<a onclick="ModalEditProducto(${ProductoJson})" class="btn btn-light-warning me-2 p-2 pe-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Editar"><i class="fas fa-edit fs-6 fw-bold"></i></a>`
                    :`<a onclick="ActivarProducto( ${Obj[i].Id})"  class="btn btn-light-success me-2 p-2 pe-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Activar Producto"><i class="fas fa-check fs-7 fw-bold"></i></a>` +
                    `<a class="btn btn-light me-2 p-2 pe-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Producto Inactivo"><i class="fas fa-edit fs-6 fw-bold"></i></a>`;

                    var newRow = tProductos.row.add([
                        Actions,
                        Obj[i].Id,
                        `<div class="symbol symbol-35px"><img src="${Obj[i].RutaFoto}" class="rounded-3" alt="user" onclick="makeImageBig(this)"></div>`,
                        `${Obj[i].Nombre} ${Obj[i].ApellidoPaterno} ${Obj[i].ApellidoMaterno}`,
                        Obj[i].CURP,
                        Obj[i].RFC,
                        Obj[i].NSS,
                        Obj[i].TipoSangre,
                        Obj[i].FechaNacimiento,
                        Obj[i].Ubicacion,
                        Obj[i].Departamento,
                        Obj[i].Puesto,
                        Obj[i].Segmento,
                        Obj[i].Activo
                    ]).draw(false).node();

                    $(newRow).addClass('align-middle');

                    // Aplicar clase si Activo es false
                    if (Obj[i].Activo == false) {
                        $(newRow).addClass('align-middle bg-light-danger'); // Agrega la clase bg-rosa a la fila
                    }
                }

                KTApp.init();
                KTMenu.init();

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
function ModalNewProducto() {

    //$('#IdAddEmpNombre').val("");
    //$('#IdAddEmpApellPaterno').val("");
    //$('#IdAddEmpApellMaterno').val("");
    //$('#IdAddEmpCURP').val("");
    //$('#IdAddEmpRFC').val("");
    //$('#IdAddEmpNSS').val("");

    //var IdAddEmpSegmento = $("#IdAddEmpSegmento");
    //$('#IdAddEmpSegmento').empty().trigger("change");
    //IdAddEmpSegmento.append('<option></option>');

    //var IdAddEmpUbicacion = $("#IdAddEmpUbicacion");
    //$('#IdAddEmpUbicacion').empty().trigger("change");
    //IdAddEmpUbicacion.append('<option></option>');

    //var IdAddEmpPuesto = $("#IdAddEmpPuesto");
    //$('#IdAddEmpPuesto').empty().trigger("change");
    //IdAddEmpPuesto.append('<option></option>');

    //var IdAddEmpDepartamento = $("#IdAddEmpDepartamento");
    //$('#IdAddEmpDepartamento').empty().trigger("change");
    //IdAddEmpDepartamento.append('<option></option>');

    //var IdAddEmpTipoSangre = $("#IdAddEmpTipoSangre");
    //$('#IdAddEmpTipoSangre').empty().trigger("change");
    //IdAddEmpTipoSangre.append('<option></option>');

    //document.getElementById("AddProductoForm").reset();
    //$("input").removeClass("is-valid").removeClass("is-invalid");
    //$('[data-field]').remove();

    //$.ajax({
    //    url: "/Productos/ModalNewProducto",
    //    data: { Ajax: 1 },
    //    type: "POST",
    //    beforeSend: function (xhr) {
    //        xhr.setRequestHeader("XSRF-TOKEN",
    //            $('input:hidden[name="__RequestVerificationToken"]').val());
    //    },
    //}).done(function (result) {
    //    if (result != null) {
    //        if (result == "SessionExpirada") { SwalSessionExpirada() }
    //        else if (result != "Error") {
    //            var obj = JSON.parse(result);

    //            $("#IdAddEmpSegmento").select2({ data: obj.Segmentos });
    //            $("#IdAddEmpUbicacion").select2({ data: obj.Ubicaciones });
    //            $("#IdAddEmpPuesto").select2({ data: obj.Puestos });
    //            $("#IdAddEmpDepartamento").select2({ data: obj.Departamentos });
    //            $("#IdAddEmpTipoSangre").select2({ data: obj.TipoSangre });

    //            $("#IdAddImagen").css("background-image", `url('/Images/RecursosHumanos/FotoProductos/blank.png')`);
    //            $("#IdAddImagen").attr('image-value', 'blank.png');

                $("#AddProducto").modal("show");
    //        }
    //        else { toastr.error("Error al guardar, por favor contacta al administrador!"); }
    //    }
    //}).fail(function (error) { toastr.error("Error de servidor, por favor contacta al administrador!"); });
}
function SaveProducto() {

    var files = $('#IdAddFoto').prop("files");

    formData = new FormData();
    formData.append("perfilPicture", files[0]);
    formData.append("Ajax", 1);
    formData.append("Nombre", $('#IdAddEmpNombre').val());
    formData.append("ApellidoPaterno", $('#IdAddEmpApellPaterno').val());
    formData.append("ApellidoMaterno", $('#IdAddEmpApellMaterno').val());
    formData.append("IdDepartamento", $('#IdAddEmpDepartamento').val());
    formData.append("IdUbicacion", $('#IdAddEmpUbicacion').val());
    formData.append("IdPuesto", $('#IdAddEmpPuesto').val());
    formData.append("IdSegmento", $('#IdAddEmpSegmento').val());
    formData.append("CURP", $('#IdAddEmpCURP').val());
    formData.append("RFC", $('#IdAddEmpRFC').val());
    formData.append("NSS", $('#IdAddEmpNSS').val());
    formData.append("TipoSangre", $('#IdAddEmpTipoSangre').val());
    formData.append("FechaNacimiento", $('#IdAddEmpFN').val());

    $.ajax({
        url: "/Productos/SaveProducto",
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
            if (result == "Existe") {
                toastr.warning("Ya existe un Producto con la misma CURP!");
            }
            else if (result == "FotoNoPermitida") {
                toastr.warning("El formato de la foto es invalido!");
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

                        GetProductos()
                        $('#AddProducto').modal('hide');
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
function ModalEditProducto(Producto) {

    document.getElementById("EditProductoForm").reset();
    $("input").removeClass("is-valid").removeClass("is-invalid");
    $('[data-field]').remove();

    $.ajax({
        url: "/Productos/ModalNewProducto",
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

                $('#IdEditProducto').val(Producto.Id);
                $('#IdEditEmpNombre').val(Producto.Nombre);
                $('#IdEditEmpApellPaterno').val(Producto.ApellidoPaterno);
                $('#IdEditEmpApellMaterno').val(Producto.ApellidoMaterno);
                $('#IdEditEmpCURP').val(Producto.CURP);
                $('#IdEditEmpRFC').val(Producto.RFC);
                $('#IdEditEmpNSS').val(Producto.NSS);
                $('#IdEditEmpFN').val(Producto.FechaNacimiento);

                $("#IdEditEmpSegmento").select2({ data: obj.Segmentos });
                $('#IdEditEmpSegmento').val(Producto.SegmentoId).trigger('change');

                $("#IdEditEmpUbicacion").select2({ data: obj.Ubicaciones });
                $("#IdEditEmpUbicacion").val(Producto.UbicacionId).trigger('change');

                $("#IdEditEmpPuesto").select2({ data: obj.Puestos });
                $("#IdEditEmpPuesto").val(Producto.PuestoId).trigger('change');

                $("#IdEditEmpDepartamento").select2({ data: obj.Departamentos });
                $("#IdEditEmpDepartamento").val(Producto.DepartamentoId).trigger('change');

                $("#IdEditEmpTipoSangre").select2({ data: obj.TipoSangre });
                $("#IdEditEmpTipoSangre").val(Producto.TipoSangreId).trigger('change');

                $("#IdEditImagen").css("background-image", `url('/Images/RecursosHumanos/FotoProductos/${Producto.Foto}')`);
                $("#IdEditImagen").attr('image-value', Producto.Foto);

                KTApp.init();
                KTMenu.init()

                $("#EditProducto").modal("show");
            }
            else { toastr.error("Error al guardar, por favor contacta al administrador!"); }
        }
    }).fail(function (error) { toastr.error("Error de servidor, por favor contacta al administrador!"); });
}
function UpdateProducto() {

    var files = $('#IdEditFoto').prop("files");

    formData = new FormData();
    formData.append("perfilPicture", files[0]);
    formData.append("Ajax", 1);
    formData.append("Id", $('#IdEditProducto').val());
    formData.append("Nombre", $('#IdEditEmpNombre').val());
    formData.append("ApellidoPaterno", $('#IdEditEmpApellPaterno').val());
    formData.append("ApellidoMaterno", $('#IdEditEmpApellMaterno').val());
    formData.append("IdDepartamento", $('#IdEditEmpDepartamento').val());
    formData.append("IdUbicacion", $('#IdEditEmpUbicacion').val());
    formData.append("IdPuesto", $('#IdEditEmpPuesto').val());
    formData.append("IdSegmento", $('#IdEditEmpSegmento').val());
    formData.append("CURP", $('#IdEditEmpCURP').val());
    formData.append("RFC", $('#IdEditEmpRFC').val());
    formData.append("NSS", $('#IdEditEmpNSS').val());
    formData.append("TipoSangre", $('#IdEditEmpTipoSangre').val());
    formData.append("FechaNacimiento", $('#IdEditEmpFN').val());
    formData.append("FotoPefil", $('#IdEditImagen').attr('image-value'));

    $.ajax({
        url: "/Productos/UpdateProducto",
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
            if (result == "Existe") {
                toastr.warning("Ya existe un Producto con la misma CURP!");
            }
            else if (result == "FotoNoPermitida") {
                toastr.warning("El formato de la foto es invalido!");
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

                        GetProductos()
                        $('#EditProducto').modal('hide');
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
function DeleteProducto(Id) {
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
                url: "/Productos/OnOfUsuario",
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

                        GetProductos()
                        toastr.success("Se elimino correctamente!");

                    }
                    else { toastr.error("Error al eliminar, por favor contacta al administrador!"); }
                }
            }).fail(function (error) { toastr.error("Error de servidor, por favor contacta al administrador!"); });
        }
        else { $('.swal2-container').css('display', 'none'); }
    });

}
function ActivarProducto(Id) {
    Swal.fire({
        text: "Esta seguro de Reactivar el Registro?",
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
                url: "/Productos/OnOfUsuario",
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

                        GetProductos()
                        toastr.success("Se Activo correctamente!");

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

//************************** START Validation Add Producto ****************************************************************************************

var AddProductoForm = document.getElementById('AddProductoForm');

var validatorAddProducto = FormValidation.formValidation(
    AddProductoForm,
    {

        fields: {
            'IdAddEmpNombre': {
                validators: {
                    notEmpty: {
                        message: 'El campo es requerido.'
                    }
                }
            }, 'IdAddEmpApellPaterno': {
                validators: {
                    notEmpty: {
                        message: 'El campo es requerido.'
                    }
                }
            }, 'IdAddEmpApellMaterno': {
                validators: {
                    notEmpty: {
                        message: 'El campo es requerido.'
                    }
                }
            }, 'IdAddEmpDepartamento': {
                validators: {
                    notEmpty: {
                        message: 'El campo es requerido.'
                    }
                }
            }, 'IdAddEmpUbicacion': {
                validators: {
                    notEmpty: {
                        message: 'El campo es requerido.'
                    }
                }
            }, 'IdAddEmpPuesto': {
                validators: {
                    notEmpty: {
                        message: 'El campo es requerido.'
                    }
                }
            }, 'IdAddEmpSegmento': {
                validators: {
                    notEmpty: {
                        message: 'El campo es requerido.'
                    }
                }
            }, 'IdAddEmpCURP': {
                validators: {
                    notEmpty: {
                        message: 'El campo es requerido.'
                    }
                }
            }, 'IdAddEmpRFC': {
                validators: {
                    notEmpty: {
                        message: 'El campo es requerido.'
                    }
                }
            }, 'IdAddEmpNSS': {
                validators: {
                    notEmpty: {
                        message: 'El campo es requerido.'
                    }
                }
            }, 'IdAddEmpTipoSangre': {
                validators: {
                    notEmpty: {
                        message: 'El campo es requerido.'
                    }
                }
            }, 'IdAddEmpFN': {
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

var AddProductoButton = document.getElementById('AddProductoButton');

AddProductoButton.addEventListener('click', function (e) {
    e.preventDefault();

    if (validatorAddProducto) {
        validatorAddProducto.validate().then(function (status) {
            if (status == 'Valid') {
                AddProductoButton.setAttribute('data-kt-indicator', 'on');
                AddProductoButton.disabled = true;
                setTimeout(function () {
                    AddProductoButton.removeAttribute('data-kt-indicator');
                    AddProductoButton.disabled = false;

                    SaveProducto()

                }, 1000);
            }
            else {
                AddProductoButton.setAttribute('data-kt-indicator', 'on');
                AddProductoButton.disabled = true;
                setTimeout(function () {
                    AddProductoButton.removeAttribute('data-kt-indicator');
                    AddProductoButton.disabled = false;

                }, 150);
            }
        });
    }
});
//************************** END Validation Add Producto ****************************************************************************************

//************************** START Validation Edit Producto ****************************************************************************************
var EditProductoForm = document.getElementById('EditProductoForm');

var validatorEditProducto = FormValidation.formValidation(
    EditProductoForm,
    {

        fields: {
            'IdEditEmpNombre': {
                validators: {
                    notEmpty: {
                        message: 'El campo es requerido.'
                    }
                }
            }, 'IdEditEmpApellPaterno': {
                validators: {
                    notEmpty: {
                        message: 'El campo es requerido.'
                    }
                }
            }, 'IdEditEmpApellMaterno': {
                validators: {
                    notEmpty: {
                        message: 'El campo es requerido.'
                    }
                }
            }, 'IdEditEmpDepartamento': {
                validators: {
                    notEmpty: {
                        message: 'El campo es requerido.'
                    }
                }
            }, 'IdEditEmpUbicacion': {
                validators: {
                    notEmpty: {
                        message: 'El campo es requerido.'
                    }
                }
            }, 'IdEditEmpPuesto': {
                validators: {
                    notEmpty: {
                        message: 'El campo es requerido.'
                    }
                }
            }, 'IdEditEmpSegmento': {
                validators: {
                    notEmpty: {
                        message: 'El campo es requerido.'
                    }
                }
            }, 'IdEditEmpCURP': {
                validators: {
                    notEmpty: {
                        message: 'El campo es requerido.'
                    }
                }
            }, 'IdEditEmpRFC': {
                validators: {
                    notEmpty: {
                        message: 'El campo es requerido.'
                    }
                }
            }, 'IdEditEmpNSS': {
                validators: {
                    notEmpty: {
                        message: 'El campo es requerido.'
                    }
                }
            }, 'IdEditEmpTipoSangre': {
                validators: {
                    notEmpty: {
                        message: 'El campo es requerido.'
                    }
                }
            }, 'IdEditEmpFN': {
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

var EditProductoButton = document.getElementById('EditProductoButton');

EditProductoButton.addEventListener('click', function (e) {
    e.preventDefault();

    if (validatorEditProducto) {
        validatorEditProducto.validate().then(function (status) {
            if (status == 'Valid') {
                EditProductoButton.setAttribute('data-kt-indicator', 'on');
                EditProductoButton.disabled = true;
                setTimeout(function () {
                    EditProductoButton.removeAttribute('data-kt-indicator');
                    EditProductoButton.disabled = false;

                    UpdateProducto()

                }, 1000);
            }
            else {
                EditProductoButton.setAttribute('data-kt-indicator', 'on');
                EditProductoButton.disabled = true;
                setTimeout(function () {
                    EditProductoButton.removeAttribute('data-kt-indicator');
                    EditProductoButton.disabled = false;

                }, 150);
            }
        });
    }
});
//************************** END Validation Edit Producto ****************************************************************************************