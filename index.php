<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
   
    <!--Jquery-->
    <script src="https://code.jquery.com/jquery-3.4.1.min.js" crossorigin="anonymous"></script>
    
    <!--FONT AWASOME-->
    <script src="https://kit.fontawesome.com/a6f44a68f2.js" crossorigin="anonymous"></script>

    <!--Estilos propios-->
    <link href="assets/css/fonts.css" rel="stylesheet" type="text/css" />
    <link href="assets/css/reset.css" rel="stylesheet" type="text/css" />
    <link href="assets/css/master.css?action=getTime&bogus=<?php echo rand(100,999) ?>" rel="stylesheet" type="text/css" />
    <link href="assets/css/responsive.css?action=getTime&bogus=<?php echo rand(100,999) ?>" rel="stylesheet" type="text/css" />

    <!--Libreria spider-->
    <link rel="stylesheet" type="text/css" href="assets/spider/sprites/sprite.css" />
    <link rel="stylesheet" type="text/css" href="assets/spider/sprites/fotograma.css" />
    <title>Concéntrese</title>
</head>
<body>
    <div id="container">
        <header>
            <div class="row row-header1">
                <div class="logo-sura">
                </div>
                <div class="titulo">
                    <h1><span>Módulos Interactivos:</span> Prevención de Riesgos</h1>
                </div>
            </div>
            <div class="row row-header2">
                <div class="logo-arl"></div>
                <div id="oficio-title">
                    <h2 id="oficio-title-txt"></h2>
                </div>
            </div>
        </header>

        <div id="game">
            <div class="fondo"></div>
            <div id="game-scene">
                <div id="game-wrapper">
                    <div id="cajas"></div>
                    
                    <div id="fondo-win" class="fondo-win-off">
                        <div id="fondo-win-img"></div>
                        <div id="polvora-content"></div>
                        <h1 id="titulo-win">¡Muy Bien!</h1>
                    </div>

                    <div id="personaje">
                        <div id="personaje-main" class="personaje-1"><div class="personaje-ojos"></div></div>
                        <div id="personaje-ropas">
                            
                        </div>
                    </div>
                </div>

                <div id="prenda1" class="prenda-move-off"></div>
                <div id="prenda2" class="prenda-move-off"></div>
                <div id="cursor-swipe"></div>
            </div>
            <div id="home-scene">
                <div id="personaje-home" class="personaje-1"><div class="personaje-ojos"></div></div>
            </div>

        </div>

        <div id="tooltip" class="tooltip-off"></div>

        <div id="modal" class="modal-on">
            <div id="modal-box">
                <button id="modal-close-btn"></button>
                <h2 id="modal-title">Instrucciones</h2>
                <div id="modal-content">
                </div>
                <button id="modal-button">jugar</button>
            </div>
        </div>

        <div id="alerta" class="alerta-off">
            <div id="alerta-box" class="alerta-right alerta-right-off">
                <p>Alerta</p>
            </div>
        </div>

        <div id="cargador" class="cargador-on">
            <div class="cargador-img"></div>
            <div class="cargador-txt">Cargando...</div>
        </div>
    </div>

<script src="assets/spider/sprites/sprite.js"></script>
<script src="assets/spider/sprites/fotograma.js"></script>
<script src="assets/js/mobile.js"></script>
<script src="assets/js/timer.js"></script>
<script src="assets/js/modal.js"></script>
<script src="assets/js/game.js?option=getTime&bogus=<?php rand(100,999)?>"></script>
<script>

var boton_mp3 = null

var animation_start = null
window.onload = function(){
    loadAudio({src:'assets/media/boton.mp3',callBack:function(data){
    boton_mp3 = data
    /*loadAudio({src:'assets/media/abrir.mp3',callBack:function(data){
    abrir_mp3 = data
    loadAudio({src:'assets/media/alarma.mp3',callBack:function(data){
    alarma_mp3 = data
    loadAudio({src:'assets/media/coger.mp3',callBack:function(data){
    coger_mp3 = data
    loadAudio({src:'assets/media/cronometro.mp3',callBack:function(data){
    cronometro_mp3 = data
    cronometro_mp3.addEventListener('ended',function(){cronometro_mp3.play()},false)
    loadAudio({src:'assets/media/ganar.mp3',callBack:function(data){
    ganar_mp3 = data*/

        prepareWindow()
        setGame()
    /*}})
    }})
    }})
    }})
    }})*/
    }})
}
    
</script>
</body>


</html>