function getTimeText(secs,flag){
    var minutos = 0
    var horas = 0
    var seconds = 0

    var segundos_txt = ""
    var horas_txt = ""
    var minutos_txt = ""

    if(secs<60){
        horas = 0
        minutos = 0
        seconds = secs
    }else{
        minutos = parseInt(secs/60)
        seconds = secs-(minutos*60)

        if(minutos>=60){
            horas = parseInt(minutos/60)
            minutos = minutos-(horas*60)
        }
    }

    if(horas>=0&&horas<=9){
        horas_txt = "0"+horas
    }else{
        horas_txt = horas
    }
    if(minutos>=0&&minutos<=9){
        minutos_txt = "0"+minutos
    }else{
        minutos_txt = minutos
    }
    if(seconds>=0&&seconds<=9){
        segundos_txt = "0"+seconds
    }else{
        segundos_txt = seconds
    }

    if(flag!=null&&flag!=undefined){
		if(flag){
			return minutos_txt+':'+segundos_txt
		}else{
			return horas_txt+':'+minutos_txt+':'+segundos_txt
		}
    }else{
    	return horas_txt+':'+minutos_txt+':'+segundos_txt
    }    
}

var time_scorm = 0
var animacion_reloj = null

function iniciarReloj(){	
    time_scorm = 3*60
    //time_scorm = 30
	document.getElementById('tiempo-txt').innerHTML = '00:00'
	animacion_reloj = setInterval(animacionReloj,1000)
}
function pararReloj(){
	clearInterval(animacion_reloj)
}
function reanudarReloj(){
    animacion_reloj = setInterval(animacionReloj,1000)
}
function animacionReloj(){
	time_scorm-=1
	if(time_scorm<0){
		pararReloj()
		endGame()
	}else{
		document.getElementById('tiempo-txt').innerHTML = getTimeText(time_scorm,true)	
	}
	
}
function getRelojTime(){
	return time_scorm
}