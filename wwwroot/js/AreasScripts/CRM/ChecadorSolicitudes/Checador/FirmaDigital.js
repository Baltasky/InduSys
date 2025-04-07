// Configuración dinámica para múltiples canvas
function configureCanvas(canvasId) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = "#000"; // Color de la línea
    ctx.lineWidth = 2; // Grosor de la línea
    let isDrawing = false;

    // Rellenar el fondo del canvas con blanco
    function fillBackground() {
        ctx.fillStyle = "#FFF"; // Color blanco
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Funciones para manejar el dibujo
    function startDrawing(e) {
        isDrawing = true;
        ctx.beginPath();
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        ctx.moveTo(x, y);
    }

    function draw(e) {
        if (!isDrawing) return;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        ctx.lineTo(x, y);
        ctx.stroke();
    }

    function stopDrawing() {
        isDrawing = false;
    }

    // Eventos para dispositivos táctiles
    canvas.addEventListener("touchstart", (e) => {
        e.preventDefault();
        startDrawing(e.touches[0]);
    });

    canvas.addEventListener("touchmove", (e) => {
        e.preventDefault();
        draw(e.touches[0]);
    });

    canvas.addEventListener("touchend", stopDrawing);

    // Eventos para dispositivos con ratón
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseout", stopDrawing);

    // Limpiar el lienzo
    function clearCanvas() {
        fillBackground(); // Rellena con blanco antes de limpiar
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    // Obtener la imagen de la firma como DataURL
    function getSignatureDataURL() {
        return canvas.toDataURL("image/png");
    }

    function isSignatureValid() {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;

        let isSigned = false;
        for (let i = 0; i < pixels.length; i += 4) {
            // Verificar si el píxel es diferente del blanco (R:255, G:255, B:255, A:255)
            if (pixels[i] !== 255 || pixels[i + 1] !== 255 || pixels[i + 2] !== 255 || pixels[i + 3] !== 255) {
                isSigned = true;
                break;
            }
        }
        return isSigned;
    }

    // Rellena el fondo con blanco al cargar
    fillBackground();

    return {
        clearCanvas,
        getSignatureDataURL,
        isSignatureValid
    };
}

// Configuración para cada canvas
const firma1 = configureCanvas("canvas1");
const firma2 = configureCanvas("canvas2");
//const firma3 = configureCanvas("canvas3");

// Convertir DataURL a Blob
function dataURLToBlob(dataURL) {
    const parts = dataURL.split(",");
    const byteString = atob(parts[1]);
    const mimeString = parts[0].split(":")[1].split(";")[0];

    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mimeString });
}

// Función utilitaria para validar si se realizó una firma

