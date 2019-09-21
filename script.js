
let usuario = {};
let ruta = {};
let map;
let kmlLayer;

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

    if (e.target.classList.contains("accion1")) {
        if (!e.target.classList.contains("pulsado")) {
            console.log("Se lanza la accion 1.");
            mostrarRuta();
        } else {
        console.log("Ya esta pulsado.");
        removerRuta();
        }
    }

    if (e.target.classList.contains("pulsado")) {
        e.target.classList.remove("pulsado");
    } else {
        e.target.classList.add("pulsado");
    }
}

function mostrarRuta() {
    console.log("mostrando ruta");
    cargarRuta("http://15.188.2.85/ruta.kml");
}

function removerRuta() {
    kmlLayer.setMap(null);
    kmlLayer = null;
    map.setZoom(7);
}

function initMap() {
    console.log("Iniciando el mapa.");
    const OVIEDO = new google.maps.LatLng(43.3625, -5.850278);
    const ASTURIAS_BOUNDS = {
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
    kmlLayer = new google.maps.KmlLayer({
        url: src,
        supressInfoWindows: true,
        preserveViewport: false,
        map: map
    });
    map.setCenter(centroRuta);
    map.setZoom(10);
}