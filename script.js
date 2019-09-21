
let usuario = {};
let ruta = {};
let map;

const ruta1 = {
    "nombre": "Ruta 1"
};

const mainArea = {} 
mainArea.controlPanel = document.querySelector(".controlpanel");
mainArea.mapa = document.querySelector(".mapa");
mainArea.mapa.style.overflow = "hidden";
mainArea.mapa.style.float = "left";
mainArea.botones = Array.from(document.querySelectorAll(".boton"));
mainArea.botones.forEach(function(item){
    item.addEventListener('click', handleBtn);
    item.addEventListener('mouseover', changeBackground);
    item.addEventListener('mouseout', restoreBackground);
})

function changeBackground(e) {
    e.target.style.backgroundColor = "grey";
}

function restoreBackground(e) {
    if (!e.target.classList.contains("pulsado")) {
        e.target.style.backgroundColor = "white";
    }
}

function handleBtn(e){
    if (e.target.classList.contains("pulsado")) {
        e.target.classList.remove("pulsado");
    } else {
        e.target.classList.add("pulsado");
    }
    if (e.target.classList.contains("accion1")){
        console.log("Se lanza la accion 1.");
        mostrarRuta();
    }
}

function mostrarRuta() {
    console.log("mostrando ruta");
    cargarRuta("http://15.188.2.85/ruta.kml");
}

function initMap() {
    console.log("Iniciando el mapa.");
    let OVIEDO = new google.maps.LatLng(43.3625, -5.850278);
    let ASTURIAS_BOUNDS = {
        north: 43.67,
        south: 42.83,
        east: -4.44,
        west: -7.22
    };
    map = new google.maps.Map(mainArea.mapa, {
        center: OVIEDO,
        restriction: {
            latLngBounds: ASTURIAS_BOUNDS,
            strictBounds: false
        },
        zoom: 7, 
        mapTypeId: "satellite",
        disableDefaultUI: true 
    });
}

function cargarRuta(src) {
    let centroRuta = new google.maps.LatLng(43.389983, -5.815829);
    //map.setCenter(centroRuta);
    //map.setZoom(10);
    let kmlLayer = new google.maps.KmlLayer({
        url: src,
        supressInfoWindows: true,
        preserveViewport: true,
        map: map
    });
}