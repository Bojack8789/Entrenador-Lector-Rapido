function mostrarMain() {
    // Hacer visible el Main 2
    document.getElementById("main1").style.display = "none";
    document.getElementById("main2").style.display = "block";
    console.log("esta funcion funciona ");
    agregarPalabras();
    scrollAutomatico();
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


//variables 

const containerPalabras = document.getElementById('container-palabras');




const progressBar = document.getElementById('progressBar');

const avanzarBtn = document.getElementById('avanzarBtn');
//btn pausa en la funcion de pausa PENDIENTE TRAER AQUI 
const retrocederBtn = document.getElementById('retrocederBtn');






let pausa = false; // Variable para controlar el estado de pausa


let inputVelocidad = document.getElementById('palabrasPorMinuto');
        velocidadPalabras = inputVelocidad.value;


//CONTROLADOR TOUCH Y SCROOLL FLUIDES 

  
    // Evento de touchstart para dispositivos táctiles
    containerPalabras.addEventListener('touchstart', function() {
        pausa = true;
      });
    
      // Evento de touchend para dispositivos táctiles
      containerPalabras.addEventListener('touchend', function() {
        pausa = false;
      });

      containerPalabras.addEventListener('wheel', function() {
        pausa = true;
        setTimeout(function() {
            pausa = false;
            console.log('¡Pausa cambiada a false!');
          }, 200); // 200 milisegundos es igual a 0.2 segundos
      });



     // scrollo auto 

     let velocidad = 1; // Valor inicial de velocidad

    function scrollAutomatico() {
      const containerPalabras = document.getElementById('container-palabras');
      const speed = 1000 / velocidad; // Calcula la velocidad en milisegundos

      if (!pausa) {
        containerPalabras.style.scrollBehavior = `scroll ${speed}ms linear`;
        containerPalabras.scrollTop += 1; // Scroll hacia abajo
      }

      // Llama recursivamente a la función para seguir el scroll
      setTimeout(scrollAutomatico, speed);
    }

    function cambiarVelocidad() {
      const inputVelocidad = document.getElementById('palabrasPorMinuto');
      velocidad = inputVelocidad.value;
    }

    


 // Actualizar el valor del input al desplazar el scroll del div
 containerPalabras.addEventListener('scroll', function () {
    const scrollPercentage = (containerPalabras.scrollTop / (containerPalabras.scrollHeight - containerPalabras.clientHeight)) * 100;
    progressBar.value = scrollPercentage;
  });

  // Actualizar el desplazamiento del div al cambiar el valor del input
  progressBar.addEventListener('input', function () {
    const scrollValue = (this.value / 100) * (containerPalabras.scrollHeight - containerPalabras.clientHeight);
    containerPalabras.scrollTop = scrollValue;
  });

  // Desplazar hacia adelante un 5% del scrollHeight al hacer clic en el botón de avanzar
  avanzarBtn.addEventListener('click', function () {
    const nuevoValor = containerPalabras.scrollTop + (0.05 * containerPalabras.scrollHeight);
    containerPalabras.scrollTop = nuevoValor;
    console.log("Nuevo scrollTop:", nuevoValor); });
     
    // Desplazar hacia atrás un 5% del scrollHeight al hacer clic en el botón de retroceder
  retrocederBtn.addEventListener('click', function () {
    const nuevoValor = containerPalabras.scrollTop - (0.05 * containerPalabras.scrollHeight);
    containerPalabras.scrollTop = nuevoValor;
    console.log("Nuevo scrollTop:", nuevoValor);
  });


// Controlador de eventos para el botón de pausa/reanudar
document.getElementById("pausaPlaybtn").addEventListener("click", function () {
    pausa = !pausa; // Cambia el estado de pausa al hacer clic en el botón
    console.log(pausa);
    // Cambia el ícono del botón según el estado de pausa
    
});



//HATA AQUI TODO PERFECTO ! 


//SCALA  y color 
//solo esta funcionando color 




 
  
let palabras = document.getElementsByClassName("palabra");

containerPalabras.addEventListener('scroll', function () {
  // Obtener la posición del centro del contenedor
  let containerHeight = containerPalabras.clientHeight;
  let containerScrollTop = containerPalabras.scrollTop;
  let containerCenter = containerHeight / 1.5;

  // Iterar sobre los elementos hijos
  for (let i = 0; i < palabras.length; i++) {
    let palabra = palabras[i];

    // Obtener la posición del elemento hijo relativa al contenedor
    let palabraTop = palabra.offsetTop - containerScrollTop;
    let palabraBottom = palabraTop + palabra.clientHeight;

    // Verificar si el elemento hijo está en la posición del medio del contenedor
    if (palabraTop <= containerCenter && palabraBottom >= containerCenter) {
      // Cambiar el color del elemento hijo
      palabra.style.color = 'red'; // Puedes ajustar el color según tus preferencias
    } else {
      // Restaurar el color original del elemento hijo
      palabra.style.color = ''; // Esto elimina el estilo de color, volviendo al original
    }
  }
});