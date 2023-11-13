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
  var myElement = document.getElementById('boton');
  console.log(myElement);


function mostrarMain() {
    // Hacer visible el Main 2
    document.getElementById("main1").style.display = "none";
    document.getElementById("main2").style.display = "block";
    console.log("esta funcion funciona ")
    agregarPalabras();
    inicializarScroll();
    aplicarEscala();

  }

  function cerrarMain2() {
    // Ocultar el Main 2 y restablecer el input de texto
    document.getElementById("main2").style.display = "none";
    document.getElementById("main1").style.display = "block";}



    // a partir de aquei va la logica del renderizado 

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
      let animacionActiva = true;
      let ultimaPosicion = 0;
      let velocidadAnimacion = 3; // Puedes ajustar la velocidad según tus necesidades
      
      //modificado
      let mitadContenedor = contenedor.clientHeight / 2;
      
      //modificado
      function animarScroll() {
          if (animacionActiva) {
              ultimaPosicion += velocidadAnimacion; // Modificar la velocidad aquí
              contenedor.scrollTop = ultimaPosicion;
              requestAnimationFrame(animarScroll);
          }
      }
    
      function detenerAnimacion() {
          animacionActiva = false;
      }
    
      function reanudarAnimacion() {
          animacionActiva = true;
          animarScroll();
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
    
      animarScroll();
    
      function imprimirUltimaPosicion() {
          setInterval(function() {
            console.log(ultimaPosicion);
            console.log("mitad posicion" + mitadContenedor);
          }, 500);
      }
      imprimirUltimaPosicion();
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
    