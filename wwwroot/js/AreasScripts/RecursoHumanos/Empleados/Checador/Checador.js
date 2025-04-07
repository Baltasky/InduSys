
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
  if (respuesta) 
  {
      console.log(respuesta)
      if (respuesta.includes("E_CURP"))
      {
          var Obj = JSON.parse(respuesta);
          GetInfEmpleado(Obj[0].Id)

          activarSonido();
          //encenderCamara();    
          cerrarCamara();   
      }
      else
      {
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


//*************************************************************************************************** */
//************************************ Functions ************************************ */
//*************************************************************************************************** */
$(document).ready(function () {
        if(window.innerWidth <= 992){$("#kt_app_sidebar").addClass("app-sidebar flex-column drawer drawer-start");}
});
$(document).ready(function () {
    // Detecta el cambio en los radios
    $('input[name="TipoChecada"]').change(function () {
        // Asigna el valor del radio seleccionado al input oculto
        $('#TipoChecadaValue').val($(this).val());
    });
});

function GetInfEmpleado(Id) {

    document.getElementById("EditEmpleadoForm").reset();
    $("input").removeClass("is-valid").removeClass("is-invalid");
    $('[data-field]').remove();

    $.ajax({
        url: "/Empleados/GetInfEmpleado",
        data: { Ajax: 1, Id: Id },
        type: "POST",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("XSRF-TOKEN",
                $('input:hidden[name="__RequestVerificationToken"]').val());
        },
    }).done(function (result) {
        if (result != null) {
            if (result == "SessionExpirada")
            {
                SwalSessionExpirada()
            }
            else if (result == "NoExiste")
            {
                Swal.fire({
                    text: "El empleado no esta activo!",
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
            else if (result != "Error")
            {
                var Obj = JSON.parse(result);

                $('#IdEditEmpleado').val(Obj[0].Id);
                $('#IdEditEmpNombre').val(Obj[0].Nombre);
                $('#IdEditEmpApellPaterno').val(Obj[0].ApellidoPaterno);
                $('#IdEditEmpApellMaterno').val(Obj[0].ApellidoMaterno);
                $('#IdEditEmpCURP').val(Obj[0].CURP);
                $('#IdEditEmpRFC').val(Obj[0].RFC);
                $('#IdEditEmpNSS').val(Obj[0].NSS);
                $('#IdEditEmpSegmento').val(Obj[0].Segmento);
                $("#IdEditEmpUbicacion").val(Obj[0].Ubicacion);
                $("#IdEditEmpPuesto").val(Obj[0].Puesto);
                $("#IdEditEmpDepartamento").val(Obj[0].Departamento);
                $("#IdEditEmpTipoSangre").val(Obj[0].TipoSangre);
                $("#IdEditImagen").css("background-image", `url('/Images/RecursosHumanos/FotoEmpleados/${Obj[0].Foto}')`);

                KTApp.init();
                KTMenu.init()

                $("#EditEmpleado").modal("show");
            }
            else {
                toastr.error("Error al guardar, por favor contacta al administrador!");
            }
        }
    }).fail(function (error) { toastr.error("Error de servidor, por favor contacta al administrador!"); });
}

function GuardarChecada() {

    $.ajax({
        url: "/Empleados/GuardarChecada",
        data: {
            Ajax: 1, Id: $('#IdEditEmpleado').val(),
            TipoChecada: $('#TipoChecadaValue').val(),
            Observaciones: $('#Observaciones').val(),
        },
        type: "POST",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("XSRF-TOKEN",
                $('input:hidden[name="__RequestVerificationToken"]').val());
        },
    }).done(function (result) {
        if (result != null) {

            if (result == "SessionExpirada")
            {
                SwalSessionExpirada()
            }
            else if (result == "Existe")
            {
                toastr.info("El empleado ya capturo su entrada hoy!");
            }
            else if (result == "NoExiste") {
                toastr.info("No se puede capturo la salida ya que no tiene entrada registrada!");
            }
            else if (result != "Error")
            {
                Swal.fire({
                    text: "Checada Guardada correctamente!",
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

                        $('#EditEmpleado').modal('hide');
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

//*************************************************************************************************** */
//************************************ Form Validation ************************************ */
//*************************************************************************************************** */

var EditEmpleadoForm = document.getElementById('EditEmpleadoForm');
var validatorEditEmpleado = FormValidation.formValidation(
    EditEmpleadoForm,
    {

        fields: {
            'TipoChecadaValue': {
                validators: {
                    notEmpty: {
                        message: 'Seleccione un check.'
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
var EditEmpleadoButton = document.getElementById('EditEmpleadoButton');
EditEmpleadoButton.addEventListener('click', function (e) {
    e.preventDefault();

    if (validatorEditEmpleado) {
        validatorEditEmpleado.validate().then(function (status) {
            if (status == 'Valid') {
                EditEmpleadoButton.setAttribute('data-kt-indicator', 'on');
                EditEmpleadoButton.disabled = true;
                setTimeout(function () {
                    EditEmpleadoButton.removeAttribute('data-kt-indicator');
                    EditEmpleadoButton.disabled = false;

                    GuardarChecada()

                }, 1000);
            }
            else {
                EditEmpleadoButton.setAttribute('data-kt-indicator', 'on');
                EditEmpleadoButton.disabled = true;
                setTimeout(function () {
                    EditEmpleadoButton.removeAttribute('data-kt-indicator');
                    EditEmpleadoButton.disabled = false;

                }, 150);
            }
        });
    }
});