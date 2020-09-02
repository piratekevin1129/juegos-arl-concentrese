var i = 0
var j = 0
var k = 0

function getRand(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function unorderArrayElementos(long,test){
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
		nuevo.push(test[desorden[i]])
	}
	return nuevo
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
			//iniciarReloj()
		}
	})
}

var parejas_data = []
var total_parejas = 8
var posiciones_cajas = []
var boxes = []

function setGame(){
	for(i = 0;i<total_parejas;i++){
		parejas_data.push({
			id:(i+1),
			img1:'',
			img2:'',
			width:0,
			height:0,
			width2:0,
			height2:0
		})
	}

	for(i = 0;i<(total_parejas*2);i++){
		posiciones_cajas.push((i+1))
	}

	posiciones_cajas = unorderArrayElementos(posiciones_cajas.length,posiciones_cajas)
	loadElementos(1)
}

function findObj(id){
	var inx = -1
	for(j = 0;j<parejas_data.length;j++){
		if(parejas_data[j].id==id){
			inx = j
		}
	}
	return parejas_data[inx]
}

function loadElementos(e){
	if(e>total_parejas){
		putRopas()
		putCajas()
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
		parejas_data[e-1].width = this.width
		parejas_data[e-1].height = this.height
		parejas_data[e-1].width2 = this.width
		parejas_data[e-1].height2 = this.height

		//cargar segunda opción, si la hay
		var img2 = new Image()
		img2.onload = function(){
			img2.onerror = null
			img2.onload = null
			img2 = null
			parejas_data[e-1].img2 = '-2'
			parejas_data[e-1].width2 = this.width
			parejas_data[e-1].height2 = this.height
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

function putRopas(){
	for(i = 0;i<parejas_data.length;i++){
		var ropa1 = document.createElement('div')
		ropa1.id = 'ropa'+parejas_data[i].id+'-p1'
		ropa1.className = 'ropa ropa-off ropa-'+(i+1)+'-p1'
		ropa1.style.width = parejas_data[i].width+'px'
		ropa1.style.height = parejas_data[i].height+'px'
		ropa1.style.transform = 'translateX(-50%) translateY(-50%)'
		ropa1.style.mozTransform = 'translateX(-50%) translateY(-50%)'
		ropa1.style.webkitTransform = 'translateX(-50%) translateY(-50%)'
		ropa1.style.backgroundImage = 'url(assets/images/elementos/'+(i+1)+parejas_data[i].img1+'.png)'

		var ropa2 = document.createElement('div')
		ropa2.id = 'ropa'+parejas_data[i].id+'-p2'
		ropa2.className = 'ropa ropa-off ropa-'+(i+1)+'-p2'
		ropa2.style.width = parejas_data[i].width2+'px'
		ropa2.style.height = parejas_data[i].height2+'px'
		ropa2.style.transform = 'translateX(-50%) translateY(-50%)'
		ropa2.style.mozTransform = 'translateX(-50%) translateY(-50%)'
		ropa2.style.webkitTransform = 'translateX(-50%) translateY(-50%)'
		ropa2.style.backgroundImage = 'url(assets/images/elementos/'+(i+1)+parejas_data[i].img2+'.png)'

		
		getE('personaje-ropas').appendChild(ropa1)
		getE('personaje-ropas').appendChild(ropa2)
	}
}

function putCajas(){
	var p = 0
	var numeros_cajas = unorderArrayElementos(posiciones_cajas.length,posiciones_provisorias)
	for(i = 0;i<parejas_data.length;i++){
		var obj = parejas_data[i]

		var caja1 = document.createElement('div')
		caja1.className = 'caja caja-closed caja-fill caja-pos-'+posiciones_cajas[p]
		caja1.id = 'caja-'+(p+1)
		caja1.setAttribute('occuped','yes')
		caja1.setAttribute('pair',obj.id)
		caja1.setAttribute('pos',posiciones_cajas[p])

		console.log(posiciones_cajas[p])
		var h1 = ''
		h1+='<div id="caja-animada-'+(p+1)+'" class="spd_sprite caja-animada" width="123" height="100" frames="13" src="assets/images/cajita_sprite.png"></div>'
		h1+='<div id="caja-bola-'+(p+1)+'" class="caja-bola"><div style="background-image:url(assets/images/elementos/'+(i+1)+obj.img1+'.png)"></div><p>¡Esta caja esta vacía!</p></div>'
		h1+='<div id="caja-number-'+(p+1)+'" class="caja-number">'+posiciones_cajas[p]+'</div>'
		h1+='<div id="caja-zona-'+(p+1)+'" class="caja-zona" onclick="clickZona('+(p+1)+')"></div>'
		caja1.innerHTML = h1
		
		p++
		var caja2 = document.createElement('div')
		caja2.className = 'caja caja-closed caja-fill caja-pos-'+posiciones_cajas[p]
		caja2.id = 'caja-'+(p+1)
		caja2.setAttribute('occuped','yes')
		caja2.setAttribute('pair',obj.id)
		caja2.setAttribute('pos',posiciones_cajas[p])

		var h2 = ''
		h2+='<div id="caja-animada-'+(p+1)+'" class="spd_sprite caja-animada" width="123" height="100" frames="13" src="assets/images/cajita_sprite.png"></div>'
		h2+='<div id="caja-bola-'+(p+1)+'" class="caja-bola"><div style="background-image:url(assets/images/elementos/'+(i+1)+obj.img2+'.png)"></div><p>¡Esta caja esta vacía!</p></div>'
		h2+='<div id="caja-number-'+(p+1)+'" class="caja-number">'+posiciones_cajas[p]+'</div>'
		h2+='<div id="caja-zona-'+(p+1)+'" class="caja-zona" onclick="clickZona('+(p+1)+')"></div>'
		caja2.innerHTML = h2

		getE('cajas').appendChild(caja1)
		getE('cajas').appendChild(caja2)

		p++

		boxes.push(caja1)
		boxes.push(caja2)
	}

	//load sprites
	var cajas_animadas = getE('cajas').getElementsByClassName('caja-animada')
	function loadSprite(s){
		if(s==cajas_animadas.length){

			////////AQUI EMPIEZA TODOO///////
			
			animation_start = setTimeout(function(){
				clearTimeout(animation_start)
				animation_start = null

				getE('cargador').className = 'cargador-off'	


				//setInstrucciones(true)
				empezarJuego()
			},1000)
		}else{
			spdLoadSprite({idname:cajas_animadas[s].id,autoplay:'off',callBack:function(){
				spdCreateAnimation({id:s,sprite:cajas_animadas[s].id})
				loadSprite((s+1))
			}})
		}
	}
	loadSprite(0)
}


///////////FUNCIONES CAJA////////////
var caja_abierta_1 = null
var caja_abierta_inx_1 = -1
var caja_abierta_2 = null
var caja_abierta_inx_2 = -1
var animacion_delay_box = null

var prenda1 = getE('prenda1');
var prenda2 = getE('prenda2');

function clickZona(ident){
	if(caja_abierta_1==null||caja_abierta_2==null){
		var indx = ident-1
		var caja = getE('caja-'+ident)

		if(caja_abierta_1==null){
			caja_abierta_1 = caja
			caja_abierta_inx_1 = indx
		}else{
			caja_abierta_2 = caja
			caja_abierta_inx_2 = indx
		}
		
		if(caja.className.indexOf('closed')!=-1){
			spdPlayAnimation({frame:1,stop:7,loop:false,callBack:function(){
				//abrir bola
				caja.classList.remove('caja-closed')
				caja.classList.add('caja-opened')
				
				if(caja_abierta_2!=null){
					//ya se abrió la 2
					
					//esperamos un poco para comprobar si son iguales
					animacion_delay_box = setTimeout(function(){
						clearTimeout(animacion_delay_box)
						animacion_delay_box = null

						if(caja_abierta_2.getAttribute('pair')==caja_abierta_1.getAttribute('pair')){
							var pareja = caja_abierta_1.getAttribute('pair')
							console.log("iguales")

							var obj_caja1 = caja_abierta_1.getElementsByClassName('caja-bola')[0].getElementsByTagName('div')[0]
							var obj_caja2 = caja_abierta_2.getElementsByClassName('caja-bola')[0].getElementsByTagName('div')[0]

							var origen1 = {
								x:obj_caja1.getBoundingClientRect().left-game_rect.left,
								y:obj_caja1.getBoundingClientRect().top-game_rect.top,
								w:obj_caja1.offsetWidth,
								h:obj_caja1.offsetHeight
							}
							var origen2 = {
								x:obj_caja2.getBoundingClientRect().left-game_rect.left,
								y:obj_caja2.getBoundingClientRect().top-game_rect.top,
								w:obj_caja2.offsetWidth,
								h:obj_caja2.offsetHeight
							}

							var obj_ropa1 = getE('ropa'+caja_abierta_1.getAttribute('pair')+'-p1')
							var obj_ropa2 = getE('ropa'+caja_abierta_2.getAttribute('pair')+'-p2')

							var destino1 = {
								x:obj_ropa1.getBoundingClientRect().left-game_rect.left,
								y:obj_ropa1.getBoundingClientRect().top-game_rect.top,
								w:obj_ropa1.offsetWidth,
								h:obj_ropa1.offsetHeight,
							}
							var destino2 = {
								x:obj_ropa2.getBoundingClientRect().left-game_rect.left,
								y:obj_ropa2.getBoundingClientRect().top-game_rect.top,
								w:obj_ropa2.offsetWidth,
								h:obj_ropa2.offsetHeight,
							}

							prenda1.className = 'prenda-move-on'
							prenda1.style.width = origen1.w+'px'
							prenda1.style.height = origen1.h+'px'
							prenda1.style.left = origen1.x+'px'
							prenda1.style.top = origen1.y+'px'
							prenda1.style.backgroundImage = obj_caja1.style.backgroundImage

							prenda2.className = 'prenda-move-on'
							prenda2.style.width = origen2.w+'px'
							prenda2.style.height = origen2.h+'px'
							prenda2.style.left = origen2.x+'px'
							prenda2.style.top = origen2.y+'px'
							prenda2.style.backgroundImage = obj_caja2.style.backgroundImage

							//desorganizar
							for(j = 0;j<boxes.length;j++){
								var posiciones_provisorias = unorderArrayElementos(posiciones_provisorias.length,posiciones_provisorias)
								var pos_actual = boxes[j].getAttribute('pos')
								boxes[j].classList.remove(pos_actual)
								boxes[j].classList.add('caja-pos-'+posiciones_provisorias[j])
							}
							
							animacion_delay_box = setTimeout(function(){
								clearTimeout(animacion_delay_box)
								animacion_delay_box = null

								prenda1.style.width = destino1.w+'px'
								prenda1.style.height = destino1.h+'px'
								prenda1.style.left = destino1.x+'px'
								prenda1.style.top = destino1.y+'px'

								prenda2.style.width = destino2.w+'px'
								prenda2.style.height = destino2.h+'px'
								prenda2.style.left = destino2.x+'px'
								prenda2.style.top = destino2.y+'px'

								animacion_delay_box = setTimeout(function(){
									clearTimeout(animacion_delay_box)
									animacion_delay_box = null

									prenda2.className = 'prenda-move-off'
									prenda1.className = 'prenda-move-off'

									obj_ropa1.classList.remove('ropa-off')
									obj_ropa1.classList.add('ropa-on')

									//poner ropas visibles
									var pareja_obj = findObj(pareja)
									if(pareja_obj.img2=='-2'){
										obj_ropa2.classList.remove('ropa-off')
										obj_ropa2.classList.add('ropa-on')
									}

									caja_abierta_1.classList.remove('caja-opened')
									caja_abierta_1.classList.add('caja-closed')
									caja_abierta_2.classList.remove('caja-opened')
									caja_abierta_2.classList.add('caja-closed')

									spdPlayAnimation({frame:8,stop:0,loop:false,callBack:function(){
										//poner cajas vacias
										caja_abierta_1.classList.remove('caja-fill')
										caja_abierta_1.classList.add('caja-empty')
										caja_abierta_1.setAttribute('occuped','no')
										caja_abierta_2.classList.remove('caja-fill')
										caja_abierta_2.classList.add('caja-empty')
										caja_abierta_2.setAttribute('occuped','no')

										caja_abierta_1 = null
										caja_abierta_inx_1 = -1
										caja_abierta_2 = null
										caja_abierta_inx_2 = -1
									}},caja_abierta_inx_1)
									spdPlayAnimation({frame:8,stop:0,loop:false},caja_abierta_inx_2)
								},700)
							},50)
						}else{
							console.log("no iguales")

							caja_abierta_1.classList.remove('caja-opened')
							caja_abierta_1.classList.add('caja-closed')
							caja_abierta_2.classList.remove('caja-opened')
							caja_abierta_2.classList.add('caja-closed')

							spdPlayAnimation({frame:8,stop:0,loop:false,callBack:function(){
								caja_abierta_1 = null
								caja_abierta_inx_1 = -1
								caja_abierta_2 = null
								caja_abierta_inx_2 = -1
							}},caja_abierta_inx_1)
							spdPlayAnimation({frame:8,stop:0,loop:false},caja_abierta_inx_2)
						}
					},500)
				}
			}},indx)
		}
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