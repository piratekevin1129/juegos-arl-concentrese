var i = 0
var j = 0
var k = 0

function getRand(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
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
		nuevo.push(posiciones_cajas[desorden[i]])
	}
	posiciones_cajas = nuevo
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
var posiciones_cajas = []

function setGame(){
	for(i = 0;i<total_parejas;i++){
		parejas_data.push({
			id:(i+1)
			img1:'',
			img2:''
		})
	}

	for(i = 0;i<(total_parejas*2);i++){
		posiciones_cajas.push((i+1))
	}

	unorderArrayElementos(posiciones_cajas.length)
	loadElementos(1)
}

function findObj(id){
	var inx = -1
	for(j = 0;j<parejas_data.length;j++){
		if(parejas_data[j].id==id){
			inx = j
		}
	}
	return inx
}

function loadElementos(e){
	if(e>total_parejas){
		putCajas()
		console.log(parejas_data)
	}else{
		loadElemento(e)
	}
}

function loadElemento(e){
	var img = new Image()
	img.onload = function(){
		img.onerror = null
		img.onload = null
		img = null

		//cargar segunda opción, si la hay
		var img2 = new Image()
		img2.onload = function(){
			img2.onerror = null
			img2.onload = null
			img2 = null
			parejas_data[e-1].img2 = '-2'
			loadElementos((e+1))
		}
		img2.onerror = function(){
			img2.onerror = null
			img2.onload = null
			img2 = null
			loadElementos((e+1))
		}
		img2.src = 'assets/images/elementos/'+e+'-2.png'
	}
	img.onerror = function(){
		img.onerror = null
		img.onload = null
		img = null
		console.log("Error loading img: "+e)
		loadElementos((e+1))
	}
	img.src = 'assets/images/elementos/'+e+'.png'
}


function putCajas(){
	var p = 0
	for(i = 0;i<parejas_data.length;i++){
		//var obj = findObj(u)
		var obj = parejas_data[i]

		var caja1 = document.createElement('div')
		caja1.className = 'caja caja-fill caja-pos-'+posiciones_cajas[p]
		caja1.id = 'caja-'+(p+1)
		caja1.setAttribute('occuped','yes')

		var h1 = ''
		h1+='<div id="caja-animada-'+(p+1)+'" class="spd_sprite caja-animada" width="123" height="100" frames="23" src="assets/images/cajita_sprite.png"></div>'
		h1+='<div id="caja-bola-'+(p+1)+'" class="caja-bola"><div style="background-image:url(assets/images/elementos/'+(p+1)+obj.img1+'.png)"></div><p>¡Esta caja esta vacía!</p></div>'
		h1+='<div id="caja-number-'+(p+1)+'" class="caja-number">'+(p+1)+'</div>'
		h1+='<div id="caja-zona-'+(p+1)+'"></div>'
		caja1.innerHTML = h1
		
		p++
		var caja2 = document.createElement('div')
		caja2.className = 'caja caja-fill caja-pos-'+posiciones_cajas[p]
		caja2.id = 'caja-'+(p+1)
		caja2.setAttribute('occuped','yes')

		var h2 = ''
		h2+='<div id="caja-animada-'+(p+1)+'" class="spd_sprite caja-animada" width="123" height="100" frames="23" src="assets/images/cajita_sprite.png"></div>'
		h2+='<div id="caja-bola-'+(p+1)+'" class="caja-bola"><div style="background-image:url(assets/images/elementos/'+(p+1)+obj.img2+'.png)"></div><p>¡Esta caja esta vacía!</p></div>'
		h2+='<div id="caja-number-'+(p+1)+'" class="caja-number">'+(p+1)+'</div>'
		h2+='<div id="caja-zona-'+(p+1)+'"></div>'
		caja2.innerHTML = h2

		getE('cajas').appendChild(caja1)
		getE('cajas').appendChild(caja2)

		p++
	}
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