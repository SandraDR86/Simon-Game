//paso num 1 - creamos las variables
var colors = ["red", "blue", "green", "yellow"]; //Un array que tenga los 4 colores "red", "blue", "green", "yellow" .
var gameSequence = []; ////Array para almacenar la secuencia de colores creada por el juego aleatoriamente
var UserColor = []; //Array para almacenar la secuencia de colores insertada por el usuario
var level = 0; //Número entero que nos dice el nivel donde se encuentra el usuario

var started = false; //Crea variable started en false, para que al menos una vez entre a la condicional al presionar una tecla.

//paso num 2 - secuencia de colores aleatorios
function nextStepSequence() { //esta funcion es para añadir un paso mas a la secuencia del juego
    //paso 5, el h1 debe cambiar a level #level donde se encuentre el usuario

    level++; //Aumenta el nivel del usuario, cada vez que el juego calcule un nuevo color
    $("h1").text("Level " + level); //Cambia el valor del título y pone el valor del nivel donde se encuentra el usuario
    
    //9b al iniciar nextstepsequence debemos poner el array del jugador en vacio porque este tiene que volver a rellenarlo en cada nivel k pase
    UserColor = [];
    
    //Cáculo del número aleatorio
    var randomNumber = Math.floor(Math.random() * 4);
    var randomColor = colors[randomNumber];
    //paso 5 - incrementar en 1 la variable level

    gameSequence.push(randomColor);

    //verificamos que nos da un num aleatorio correcto para ello tenemos que llamar la funcion mas abajo

    //console.log(randomColor);
    // console.log(gameSequence);

    //paso3
    //con JQuery selecciono el ID (para llamar el ID es con el #, el color almacenado en la variable randomColor
    $("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
    //pone el efecto de flash para que el usuario identifique cuál tiene que memorizar

    //Reproducimos el sonido que lleva como nombre el color calculado aleatoriamente
    //PASO 7 se elimina el codigo de reproducir sonidos desde aqui y se llama a la funcion de reproducir audios segun el nombre del color calculado aleatoriamente
    // var audio = new Audio("./sounds/" + randomColor + ".mp3");
    // audio.play();

    playSound(randomColor)
}
//nextStepSequence()
//nextStepSequence()
//nextStepSequence()
//nextStepSequence()

//paso 4 - utilizar Jquery para detectar cuando una tecla ha sido  presionada, cuando ocurra por primera vez llamar a la función nextstepsequence

//Crea un event listener keydown donde si la variable started está en falso llama a la función nextStepSequence.
//La variable se inicializa en falso al inicio del juego, en cuanto el usuario presione una tecla debemos ponerla en falso.
//Así logramos que solo se realice una vez la acción, cuando el usuario presione una tecla
$(document).keydown(function () {
    if (started == false) { //aqui puedo decir tb !started, es para indicar k es falso
        nextStepSequence();
        started == true;
    }
});

//paso 6 - Con jQuery detecta cuál botón (color) ha presionado el usuario, realizando las acciones necesarias con este color

$(".btn").click(function () {
    var userChosenColor = this.id
    UserColor.push(userChosenColor) //Añade el color seleccionado por el usuario al final del arreglo que contiene la secuencia de colores seleccionada por el usuario
    playSound(userChosenColor) //Reproduce el sonido correspondiente al color seleccionado //console.log(UserColor);
    animatePress(userChosenColor) //Le damos la animación al botón que ha sido seleccionado, se le pasa por parámetro el color clickeado por el usuario
    checkAnswer();
});

// paso 7, crea una nueva funcion llamada playsound a la que se le pase un name por parametro y reproduzca el sonido que lleve ese name

function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3")
    audio.play(); //le damos play
}
//PASO 8 - crear una nueva funcion animatePress() a la cual le pasamos x parametro un color
//Función para animar al botón clickeado por el usuario, lleva como parámetro el color del botón
function animatePress(color) {
    //usar jquery para añadir la clase pressed al boton despues de ser presionado x el usuario
    $("#" + color).addClass("pressed") //Se selecciona el botón que tenga como id el color que ha clickeado el usuario y se le pone la clase pressed
    setTimeout(function () {
        $("#" + color).removeClass("pressed")
    }, 100); //luego de 100ms se quita la clase, para hacer el efecto del click
}

//PASO 9A - Crear una funcion que se llama checkAnswer para ir chequeando que sean iguales los valores introducidos x el usuario y los que se almacenan en el array de la secuencia del juego
function checkAnswer() {
    var lastPosition = UserColor.length - 1 //Última posición del array del usuario, es para saber con cuál elemento del array de valores aleatorios comparar
    //Se compara el último valor insertado por el usuario, que se encuentra en la última posición del array userSequence, con el valor que corresponde el array gameSequence, es decir con los dos valores que se encuentren en la misma posición de los dos array
    if (UserColor[lastPosition] === gameSequence[lastPosition]) {
        //El usuario eligió correctamente, en el próximo paso se hacen las demás acciones
        //9b Si el tamaño de los dos arrays son iguales, es decir ya el usuario seleccionó la cantidad de colores que tiene la secuencia total del juego, entonces ya podemos subir de nivel
        if (UserColor.length === gameSequence.length) {
            setTimeout(function () {
                nextStepSequence()
            }, 1000);
        }
    } else {
        //El usuario se equivocó
        playSound("wrong"); //Se reproduce el sonido llamando a la función

        $("body").addClass("game-over") //Se adiciona la clase game-over al body
        setTimeout(function () {
            //Esperar 200ms y volver a eliminar esta clase
            $("body").removeClass("game-over")
        }, 200);

        $("h1").text("Game-over, Press Any Key To Restart");//Cambiar el título
        startOver();//Se llama a la función para comenzar de nuevo el juego
    }
}


//paso 10 - Se vuelven a inicializar los valores de las variables para comenzar nuevamente el juego
function startOver() {
    level = 0; //EL nivel vuelve al cero
    started = false; //La variable que controla los eventos del teclado se pone en false para que el usuario pueda volver a comenzar presionando una tecla
    gameSequence = [];//La secuencia de valores aleatorios se vuelve a poner vacía pues el juego se reinicia completamente
}
