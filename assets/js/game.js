var i = 0
var j = 0
var k = 0

function getRand(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
}


var game = getE('game')
var game_scene = getE('game-scene')
game_scene.style.visibility = 'hidden'
var game_rect = game.getBoundingClientRect()


function setInstrucciones(start){
	var html = ''
	if(ismobile){
		html+='<div class="modal-instrucciones-gif"><img src="assets/images/instrucciones_sp.gif" /></div>'
	}else{
		html+='<div class="modal-instrucciones-gif"><img src="assets/images/instrucciones_pc.gif" /></div>'
	}
	
	html+='<p>Bienvenido, <span>ARL SURA</span> te invita a poner a prueba tu nivel de conocimiento por medio del juego interactivo:</p>'
	html+='<p><span>"Arma las parejas de los equipo de protección personal"</span></p>'
	html+='<p>Para hacerlo debes hacer clic en las cajas que se encuentran en el escenario, pero no te apresures y concéntrate, para que lo realices en el tiempo previsto.</p>'
	html+='<p><span>¡Animo! empieza a jugar.</span></p>'

    if(ismobile){
    	
    }else{
    	
    }

    if(start){
    	setModal({
	    	close:false,
			title:'Instrucciones',
			content:html,
			button:true,
			value:'jugar',
			final:false,
			action:'empezarJuego'
	    })
    }else{
    	setModal({
	    	close:false,
			title:'Instrucciones',
			content:html,
			button:true,
			value:'aceptar',
			final:false,
			action:'seguirJuego'
	    })
    }
}

var animacion_swipe = null
function empezarJuego(){
	getE('cargador').className = 'cargador-on'
	unsetModal(function(){
		game_scene.style.visibility = 'visible'
		getE('home-scene').style.display = 'none'

		setTooltip({
			content:'<p>Encuentra las parejas antes de que se acabe el tiempo.</p>',
			delay:4000
		})
		
		getE('cargador').className = 'cargador-off'

		if(isresponsive){
			/*getE('cursor-swipe').classList.add('cursor-swipe-animation-1')
			getE('fondo-casilleros').classList.add('cursor-swipe-animation-2')
			getE('casilleros').classList.add('cursor-swipe-animation-2')
			getE('personaje').classList.add('cursor-swipe-animation-3')
			
			animacion_swipe = setTimeout(function(){
				getE('cursor-swipe').classList.remove('cursor-swipe-animation-1')
				getE('fondo-casilleros').classList.remove('cursor-swipe-animation-2')
				getE('casilleros').classList.remove('cursor-swipe-animation-2')
				getE('personaje').classList.remove('cursor-swipe-animation-3')
				getE('cursor-swipe').style.display = 'none'

				clearTimeout(animacion_swipe)
				animacion_swipe = null

				iniciarReloj()
			},6000)*/
		}else{
			iniciarReloj()
		}
	})
}

var parejas_data = []
var total_parejas = 8

function setGame(){
	loadElementos()
}

function loadElementos(){

}

function loadElemento(e){
	var img = new Image()
	img.onload = function(){

	}
	img
}


function unorderArrayElementos(long){
	var desorden = []
	while(desorden.length<long){
		var a = getRand(0,(long-1))
		var a_exists = desorden.includes(a)
		while(a_exists){
			a = getRand(0,(long-1))
			a_exists = desorden.includes(a)
		}
		desorden.push(a)
	}

	var nuevo = []
	for(i = 0;i<long;i++){
		nuevo.push(lista_elementos[desorden[i]])
	}
	lista_elementos = nuevo
}


/////////////////COMPROBAR////////////////


function endGame(){
	setAlerta({
		top:'92%',
		left:[10,'%',2],
		direction:'left',
		content:'<p>El tiempo se ha acabado <span>¡Vuelve a intentarlo!</span>.</p>',
		delay:3000,
		callback:reiniciarJuego
	})
}

function repeatGame(){//repetir por ganar el juego
	location.reload()
	//unsetModal(function(){
		
	//})
}

function reiniciarJuego(){//reiniciar, por acabarse el tiempo
	
}

function continuarJuego(){
	reanudarReloj()
}
function seguirJuego(){//funcion para el modal
	unsetModal(function(){
		continuarJuego()
	})
}

function verAyuda(){
	pararReloj()
	setInstrucciones(false)
}

function getE(idname){
	return document.getElementById(idname)
}