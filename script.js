
let usuario = {};
let ruta = {};

const ruta1 = {
    "nombre": "Ruta 1"
};

const mainArea = {} 
mainArea.controlPanel = document.querySelector(".controlpanel");
mainArea.mapa = document.querySelector(".mapa");
mainArea.botones = Array.from(document.querySelectorAll(".boton"));

mainArea.botones.forEach(function(item){
    item.addEventListener('click', handleBtn);
    item.addEventListener('mouseover', changeBackground);
    item.addEventListener('mouseout', restoreBackground);
})

function changeBackground(e) {
    console.log(e.target);
    e.target.style.backgroundColor = "grey";
}

function restoreBackground(e) {
    console.log(e.target);
    e.target.style.backgroundColor = "white";
}

function handleBtn(e){
    console.log(e.target);
    if (e.target.classList.contains("accion_1")){
        console.log("Se lanza la accion 1.");
        mostrarRuta();
    }
}

function mostrarRuta() {
    console.log("mostrando la ruta");
}

function initMap() {
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
        mapTypeId: 'satellite',
        disableDefaultUI: true
    });
}