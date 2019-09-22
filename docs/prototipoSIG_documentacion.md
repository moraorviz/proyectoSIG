# Creación del prototipo
- El prototipo constará de una aplicación web cliente hecha con javascript.
- Requisitos GUI.
    - En el panel de control aparecerán tres botones que permiten iniciar el caso de uso principal.
    - Tras hacer click en un botón éste quedará activado y se lanzará la acción correspondiente,
    quedando desactivados el resto de botones.
    - Al volver a hacer click sobre el botón se restaurará el estado inicial y se podrá volver a 
    lanzar una nueva acción.
- Requisitos funcionales.
    - Generales.
        - Se cargará el mapa base con la API de Google maps.
        - En la página principal se podrá visualizar un mapa delimitado al Principado de Asturias.
        - El mapa tendrá un estilo acorde a las necesidades del prototipo.
        - El mapa hará uso de otros servicios tanto de Google Cloud como WMS.
    - Creación de elementos geolocalizados.
        - El portal cargará los datos KML de la ruta especificada y los añadirá sobre el mapa
        utilizando la prestación de capas KML de la API de Google Maps para javascript.
        - El mapa mostrará la ruta de forma visual cuando el usuario pulse el Geolocalización.
            - Los puntos de interés de la ruta (puentes) aparecerán señalados con un marcador.
            - Al hacer click en el marcador se mostrará una breve descripción.
            - La información de la ruta desaparecerá si el usuario vuelve a pulsar el botón, 
            devolviendo al mapa a su estado inicial.
    - Consumo de un servicio WMS estándar externo.
        - Se hará una petición al servicio del Ministerio de Justicia para mostrar la posición
        de las fosas comunes intervenidas y no intervenidas (interés histórico).
        - El fichero recuperado será en formato png con los puntos representados sobre el mapa.
        Ésta capa extra de información se representará sobre el mapa original tras darle al botón
        Servicio WMS.
    - Consumo del servicio de Google Maps.
        - Tras habilitarla en el panel de control Google Cloud, se hará uso de la api Google Places
        para consultar y recuperar información hacerla de la localización geográfica de los bares
        de Oviedo en un radio de cincuenta kilómetros. Posteriormente se representarán sobre el mapa.


    