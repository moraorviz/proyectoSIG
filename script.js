
let usuario = {};
let ruta = {};
let map;
let kmlLayer;

var infowindow;
var OVIEDO;
var markers = [];

const MENSAJE_GEOLOC = "Cargado fichero KML (Google Maps API para JS)";
const MENSAJE_SERVICIO_WMS = "Cargado servicio WMS (fosas comunes)";
const MENSAJE_SERVICIO_PLACES = "Cargados bares de Oviedo (Google Servicio Places)";
const MENSAJE_ELEGIR = "Elige una acción";
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
mainArea.texto = document.querySelector(".texto");
mainArea.texto.innerHTML = MENSAJE_ELEGIR;

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

var servicioSitios;

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
    mainArea.texto.innerText = MENSAJE_GEOLOC;
}

function removerRuta() {
    console.log("Removiendo la ruta.")
    kmlLayer.setMap(null);
    kmlLayer = null;
    map.setZoom(7);
    mainArea.texto.innerText = MENSAJE_ELEGIR;
}

function mostrarWMS() {
    console.log("Mostrando capa WMS.");
    let overlayOptions = {
        getTileUrl: CapaWMS,
        tileSize: new google.maps.Size(256,256)
    }
    var overlayWMS = new google.maps.ImageMapType(overlayOptions);
    map.overlayMapTypes.push(overlayWMS);
    mainArea.texto.innerText = MENSAJE_SERVICIO_WMS;
}

function removerWMS() {
    console.log("Removiendo capa WMS");
    map.overlayMapTypes.clear();
    mainArea.texto.innerText = MENSAJE_ELEGIR;
}

function mostrarServicioMaps() {
    console.log("Mostrando servicio maps.");

    var request = {
        location: OVIEDO,
        radius: '500',
        type: ['bar']
    };

    servicioSitios = new google.maps.places.PlacesService(map);
    servicioSitios.nearbySearch(request, sitiosCallback);
}

function sitiosCallback(results, status) { 
    console.log("Ejecutando sitiosCallback");
    var respuesta = google.maps.places.PlacesServiceStatus;
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        console.log("Pintando resultados.");
        for (var i = 0; i < results.length; i++) {
          var place = results[i];
          crearMarcador(results[i]);
        }
        map.setZoom(15);
        map.setCenter(OVIEDO);
        mainArea.texto.innerText = MENSAJE_SERVICIO_PLACES;
    }
}

function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

function clearMarkers() {
    setMapOnAll(null);
}

function crearMarcador(place) {
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
    markers.push(marker);
}

function removerServicioMaps() {
    console.log("Removiendo servicio maps.");
    clearMarkers();
    map.setZoom(7);
    mainArea.texto.innerText = MENSAJE_ELEGIR;

}

function initMap() {
    console.log("Iniciando el mapa.");
    OVIEDO = new google.maps.LatLng(43.3625, -5.850278);
    const ASTURIAS_BOUNDS = {
        north: 43.67,
        south: 42.83,
        east: -4.44,
        west: -7.22
    };
    infowindow = new google.maps.InfoWindow();
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