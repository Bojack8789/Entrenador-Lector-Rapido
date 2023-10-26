let intervalo;
let palabras = [];
let indice = 0;
let pausado = false;
let palabrasPorMinuto = 100; // Valor por defecto

function mostrarTexto() {
    palabras = document.getElementById("miInput").value.split(' ');

    let tiempoPorPalabra = (60 / palabrasPorMinuto * 1000)*4;
    console.log(palabrasPorMinuto + "  " + tiempoPorPalabra);

    intervalo = setInterval(renderizarGrupo, tiempoPorPalabra);
}

function pausarTexto() {
    pausado = !pausado;

    if (pausado) {
        document.getElementById("pausarBtn").textContent = "Continuar";
    } else {
        document.getElementById("pausarBtn").textContent = "Pausar";
        renderizarGrupo();
    }
}


document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.icon-button-repro-pausa').addEventListener('click', function() {
        var playIcon = this.querySelector('svg:nth-child(2)');
        var pauseIcon = this.querySelector('svg:nth-child(1)');

        if (playIcon.style.display === 'none' || playIcon.style.display === '') {
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
        } else {
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
        }
    });
});




function retroceder10Palabras() {
    indice = Math.max(0, indice - 10);
    renderizarGrupo();
}

function avanzar10Palabras() {
    indice = Math.min(palabras.length, indice + 10);
    renderizarGrupo();
}

function actualizarPalabrasPorMinuto() {
    palabrasPorMinuto = parseInt(document.getElementById("palabrasPorMinuto").value);
    document.getElementById("valorActual").textContent = palabrasPorMinuto;
}

function actualizarProgreso() {
    if (palabras) {
        let progreso = Math.round((indice / palabras.length) * 100);
        document.getElementById("progressBar").value = progreso;
        document.getElementById("progressText").textContent = progreso + "%";
    }
}

function renderizarGrupo() {
    if (pausado) return;

    let grupo = palabras.slice(indice, indice + 3).join(' ');

    let textoRenderizado = document.getElementById("textoRenderizado");
    textoRenderizado.textContent = grupo;

    if (indice + 3 < palabras.length) {
        indice += 3;
    } else {
        clearInterval(intervalo);
        document.getElementById("mostrarBtn").disabled = false;
    }

    actualizarProgreso(); // Actualizar el progreso después de cada renderización
}

document.addEventListener('DOMContentLoaded', function() {
    const barraRango = document.getElementById('palabrasPorMinuto');
    const spanValor = document.getElementById('valorActual');
    const progressBar = document.getElementById('progressBar');

    barraRango.addEventListener('input', function() {
        actualizarPalabrasPorMinuto();
    });

    barraRango.addEventListener('change', function() {
        clearInterval(intervalo);
        if (!isNaN(palabrasPorMinuto)) {
            let tiempoPorPalabra = 60 / palabrasPorMinuto * 1000;
            intervalo = setInterval(renderizarGrupo, tiempoPorPalabra);
        }
    });

    progressBar.addEventListener('input', function() {
        let nuevoIndice = Math.round((palabras.length - 1) * (progressBar.value / 100));
        indice = nuevoIndice;
        renderizarGrupo();
    });

    actualizarPalabrasPorMinuto();

    document.getElementById("mostrarBtn").addEventListener('click', mostrarTexto);
    document.getElementById("pausarBtn").addEventListener('click', pausarTexto);
    document.getElementById("retrocederBtn").addEventListener('click', retroceder10Palabras);
    document.getElementById("avanzarBtn").addEventListener('click', avanzar10Palabras);
});
