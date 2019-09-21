
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
mainArea.botones.forEach(function(item) {
    item.addEventListener("click", handleBtn);
    item.addEventListener('mouseover', changeBackground);
    item.addEventListener('mouseout', restoreBackground);
});
const WMSURL = "http://mapadefosas.mjusticia.es/geoserver/wms?";
const WMSLAYERS = "INTERVENIDA,NOINTERV";

let CapaWMS = function(coord, zoom) {
    let proj = map.getProjection();
    let zfactor = Math.pow(2, zoom);
    let top = proj.fromPointToLatLng(new google.maps.Point(coord.x * 256 / zfactor, coord.y * 256 / zfactor) ); 
    let bot = proj.fromPointToLatLng(new google.maps.Point((coord.x + 1) * 256 / zfactor, (coord.y + 1) * 256 / zfactor)); 
    let bbox = top.lng() + "," + bot.lat() + "," + bot.lng() + "," + top.lat();
    let serviceURL = WMSURL + "SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&SRS=EPSG%3A4326&WIDTH=256&HEIGHT=256&FORMAT=image/png&TRANSPARENT=TRUE";
    serviceURL += "&LAYERS="+ WMSLAYERS;
    serviceURL += "&BBOX=" + bbox;
    return serviceURL;
}

function enableButtons() {
    mainArea.botones.forEach(function(item) {
        item.addEventListener("click", handleBtn);
    })
}

function disableOthers(name) {
    mainArea.botones.forEach(function(item) {
        if (!item.classList.contains(name)) {
            item.removeEventListener("click", handleBtn);
        }
    });
}

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
            e.target.classList.add("pulsado");
            disableOthers("accion1")
            mostrarRuta();
        } else {
            console.log("Ya esta pulsado el boton 1.");
            e.target.classList.remove("pulsado");
            enableButtons();
            removerRuta();
        }
    } else if (e.target.classList.contains("accion2")) {
        if (!e.target.classList.contains("pulsado")) {
            console.log("Se lanza la accion 2.");
            e.target.classList.add("pulsado");
            disableOthers("accion2");
            mostrarWMS();
        } else {
            console.log("Ya esta pulsado el boton 2.");
            e.target.classList.remove("pulsado");
            enableButtons();
            removerWMS();
        }
    } else {
        if (!e.target.classList.contains("pulsado")) {
            console.log("Se lanza la accion 3.");
            e.target.classList.add("pulsado");
            disableOthers("accion3");
            mostrarServicioMaps();
        } else {
            console.log("Ya esta pulsado el boton 3.");
            e.target.classList.remove("pulsado");
            enableButtons();
            removerServicioMaps();
        }
    } 
}

function mostrarRuta() {
    console.log("Mostrando ruta.");
    cargarRuta("http://15.188.2.85/ruta.kml");
}

function removerRuta() {
    console.log("Removiendo la ruta.")
    kmlLayer.setMap(null);
    kmlLayer = null;
    map.setZoom(7);
}

function mostrarWMS() {
    console.log("Mostrando capa WMS.");
    let overlayOptions = {
        getTileUrl: CapaWMS,
        tileSize: new google.maps.Size(256,256)
    }
    var overlayWMS = new google.maps.ImageMapType(overlayOptions);
    map.overlayMapTypes.push(overlayWMS);
}

function removerWMS() {
    console.log("Removiendo capa WMS");
    map.overlayMapTypes.clear();
}

function mostrarServicioMaps() {
    console.log("Mostrando servicio maps.");
}

function removerServicioMaps() {
    console.log("Removiendo servicio maps.");
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