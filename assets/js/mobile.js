var ismobile = false
var isresponsive = false
var actual_dimension = 1
var tra_contenedor = document.getElementById('tra_contenedor')
var instrucciones_label = ""

function prepareWindow(){
    ismobile = isMobileDevice()
    //ismobile = true

    if(window.innerWidth<560){
    	isresponsive = true
    }
    //ismobile = true
    console.log(ismobile,isresponsive)
    //document.getElementById('instrucciones_txt').innerHTML = instrucciones_label
}

function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};


/////////////////////////////AUDIO/////////////////////////
function loadAudio(data){
    var url = data.src

    var audio_fx = null
    audio_fx = document.createElement('audio')
    audio_fx.setAttribute('src',url)
    audio_fx.load()
    audio_fx.addEventListener('loadeddata',function(){
        //alert("cargo")
        data.callBack(audio_fx)
    })
    audio_fx.addEventListener('error',function(){
        data.callBack(null)
    })
}