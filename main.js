/*function mostrarTexto() {
    // Obtener el texto del textarea
    var texto = document.getElementById('miInput').value;
    
    // Dividir el texto en palabras
    var palabras = texto.split(' ');
  
    // Iterar sobre las palabras y agruparlas de a 3
    for (let i = 0; i < palabras.length; i += 3) {
      let grupo = palabras.slice(i, i + 3);
      console.log(grupo);
    }
  }*/

let ultimaPosicion = 0;


function mostrarMain() {
    // Hacer visible el Main 2
    document.getElementById("main1").style.display = "none";
    document.getElementById("main2").style.display = "block";
    console.log("esta funcion funciona ");
    agregarPalabras();
    inicializarScroll();
    aplicarEscala();
}

function cerrarMain2() {
    // Ocultar el Main 2 y restablecer el input de texto
    document.getElementById("main2").style.display = "none";
    document.getElementById("main1").style.display = "block";
}

// Lógica del renderizado
function agregarPalabras() {
    let texto = document.getElementById('texto').value;
    let palabras = texto.split(' ');

    let containerPalabras = document.getElementById('container-palabras');

    containerPalabras.innerHTML = ''; // Limpia el contenido anterior

    palabras.forEach(function(palabra) {
        let palabraElemento = document.createElement('div');
        palabraElemento.classList.add('palabra');
        palabraElemento.textContent = palabra;

        containerPalabras.appendChild(palabraElemento);
    });
}

function inicializarScroll() {
    let contenedor = document.getElementById('container-palabras');
    // aca modifico lo de la barra de progreso 
    let progressBar = document.getElementById('progressBar');
    progressBar.addEventListener('input', function() {
        // Calcula la nueva posición basada en el valor de la barra de progreso
        let nuevaPosicion = (progressBar.value / 100) * contenedor.scrollHeight;

        // Actualiza la última posición
        ultimaPosicion = nuevaPosicion;

        // Actualiza la posición del contenedor
        contenedor.scrollTop = ultimaPosicion;
        
    });

    

    // Agrega el evento 'change' al elemento progressBar
    progressBar.addEventListener('change', function() {
        // Puedes hacer algo adicional cuando el usuario suelta la barra de progreso
        console.log('Valor de la barra de progreso:', progressBar.value);
    });
    // hasta aca 

    // modificando input velocidad palabras 
let inputRange = document.getElementById('palabrasPorMinuto');
let valorDinamico = parseFloat(inputRange.value);
let animacionActiva = true;
let velocidadAnimacion = valorDinamico;
let ultimaPosicion = 0;

inputRange.addEventListener('input', function() {
    valorDinamico = parseFloat(inputRange.value);
    velocidadAnimacion = valorDinamico;

    // Llama a la función animarScroll con la nueva velocidad
    animarScroll(velocidadAnimacion);
});

inputRange.addEventListener('change', function() {
    // Puedes hacer algo con el valor, por ejemplo, imprimirlo en la consola
});

// Función para actualizar la velocidad de desplazamiento
function updateScrollSpeed() {
    velocidadAnimacion = inputRange.value;
  }

  // Evento para detectar cambios en el control de velocidad
  inputRange.addEventListener('input', updateScrollSpeed);

let mitadContenedor = contenedor.clientHeight / 2;

function animarScroll(velocidad) {
    if (animacionActiva) {
        ultimaPosicion += velocidad;
        contenedor.scrollTop = ultimaPosicion;

        let progreso = (ultimaPosicion / contenedor.scrollHeight) * 100;
        progressBar.value = progreso;
        document.getElementById('progressText').textContent = `${Math.round(progreso)}%`;

        requestAnimationFrame(function() {
            animarScroll(velocidad);
        });
    }
}

// Inicia la animación con la velocidad inicial
animarScroll(velocidadAnimacion);




    function detenerAnimacion() {
        animacionActiva = false;
    }

    function reanudarAnimacion() {
        animacionActiva = true;
        animarScroll(valorDinamico);
    }

    contenedor.addEventListener('touchstart', function() {
        detenerAnimacion();
        ultimaPosicion = contenedor.scrollTop;
    });

    contenedor.addEventListener('touchend', function() {
        reanudarAnimacion();
    });

    contenedor.addEventListener('scroll', function() {
        ultimaPosicion = contenedor.scrollTop;
    });

    animarScroll(valorDinamico);

    function imprimirUltimaPosicion() {
        setInterval(function() {
            console.log(ultimaPosicion);
            console.log("mitad posicion" + mitadContenedor);
            console.log('Valor dinámico:', valorDinamico);
        }, 500);
    }
    imprimirUltimaPosicion();

   // botones de rrepro desde aqui 

// Variable para controlar el estado de la animación
let animacionPausada = false;

function retroceder() {
  console.log("Retroceder llamado");
  ultimaPosicion -= 0.1 * contenedor.clientHeight;
  contenedor.scrollTop = ultimaPosicion;

  // Actualiza la posición de la barra de desplazamiento
  let progreso = (ultimaPosicion / contenedor.scrollHeight) * 100;
  progressBar.value = progreso;

  // Si la animación está pausada, reanuda la animación
  if (animacionPausada) {
    animacionPausada = false;
    animarScroll(valorDinamico);
  }
}
  let pausastate = false;

function pausar() {
  // Cambia el estado a true o false al hacer clic en el botón
  pausastate = !pausastate;
  console.log(pausastate)
  // Llama a la función correspondiente según el estado
  if (pausastate) {
    detenerAnimacion();
  } else {
    reanudarAnimacion();
  }
}


function avanzar() {
  console.log("Avanzar llamado");
  ultimaPosicion += 0.1 * contenedor.clientHeight;
  contenedor.scrollTop = ultimaPosicion;

  // Actualiza la posición de la barra de desplazamiento
  let progreso = (ultimaPosicion / contenedor.scrollHeight) * 100;
  progressBar.value = progreso;

  // Si la animación está pausada, reanuda la animación
  if (animacionPausada) {
    animacionPausada = false;
    animarScroll(valorDinamico);
  }
}

document.getElementById('retrocederBtn').addEventListener('click', retroceder);
document.getElementById('pausarBtn').addEventListener('click', pausar);
document.getElementById('avanzarBtn').addEventListener('click', avanzar);


}

function aplicarEscala() {
    let contenedor = document.getElementById("container-palabras");
    let palabras = document.querySelectorAll(".palabra");

    contenedor.addEventListener("scroll", function() {
        let mitadContenedor = contenedor.clientHeight / 2;
        let rangoInicio = mitadContenedor - (mitadContenedor * 0.2); // 40% del contenedor
        let rangoFin = mitadContenedor + (mitadContenedor * 0.2); // 60% del contenedor

        palabras.forEach(function(palabra) {
            // Calcular la posición de cada palabra
            let palabraOffsetTop = palabra.offsetTop + palabra.clientHeight / 2 - contenedor.scrollTop - mitadContenedor;

            // Aplicar escala solo cuando está en el rango del 40% al 60%
            if (palabraOffsetTop >= rangoInicio && palabraOffsetTop <= rangoFin) {
                // Calcular la distancia entre la posición de la palabra y el 50%
                let distancia = Math.abs(mitadContenedor - palabraOffsetTop);

                // Ajustar el tamaño de la palabra en relación con la distancia
                let escala = 1 + (1 - distancia / mitadContenedor);
                palabra.style.transform = "scale(" + escala + ")";
            } else {
                palabra.style.transform = "scale(1)";
            }
        });
    });

    
}



// Agregar eventos onclick
document.getElementById('boton').addEventListener('click', agregarPalabras);
document.getElementById('boton').addEventListener('click', inicializarScroll);
document.getElementById('boton').addEventListener('click', aplicarEscala);


