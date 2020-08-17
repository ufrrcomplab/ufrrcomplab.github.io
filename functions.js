
mapboxgl.accessToken = 'pk.eyJ1IjoiZGllZ29jb3N0YTc3MTEiLCJhIjoiY2p1bGJ0ZHNzMjU5dTQ5cHBybnB5N2h3ZiJ9.mEmQDBEUJLPF66aPKYqQLw';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/satellite-v9',
            // zoom: 5,
            // minZoom: 5,
            center: [-60.660,1.500],
            maxBounds: ([[-69.935304,-13.287696],[-53.768616,16.067365]])
        });

var directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        steps: false,
        geometries: 'polyline',
        profile: 'driving',
        controls: { instructions: false }
      });

var shapefile,name,coordinates;

map.on('load', function() {

    map.addLayer({
        id: 'solos',
        type: 'fill',
        source: {
            type: 'vector',
            url: 'mapbox://diegocosta7711.7gdn6lnk'
        },
        layout: {
            'visibility': 'none'
        },
            //filter: ['==', 'SIGLA', 'GXbd4'],
        paint: {
            'fill-color': [
            'interpolate',
            ['linear'],
            ['get', 'Id'],
            0,'#d7191c',
            1,'#da2421',
            2,'#dd3026',
            3,'#e03b2c',
            4,'#e34731',
            5,'#e65236',
            6,'#e95e3c',
            7,'#ec6941',
            8,'#ef7546',
            9,'#f2804c',
            10,'#f58c51',
            11,'#f89756',
            12,'#fba35c',
            13,'#fdae61',
            14,'#feb468',
            15,'#febb6f',
            16,'#fec177',
            17,'#fec77e',
            18,'#fecd85',
            19,'#fed48c',
            20,'#ffda94',
            21,'#ffe09b',
            22,'#ffe6a2',
            23,'#ffeda9',
            24,'#fff3b1',
            27,'#fff9b8',
            28,'#ffffbf',
            29,'#f9fdbd',
            30,'#f3fabb',
            31,'#ecf8b9',
            32,'#e6f5b7',
            33,'#dff2b5',
            34,'#d9f0b3',
            36,'#d2edb1',
            38,'#cceaaf',
            42,'#c5e8ac',
            43,'#bfe5ab',
            46,'#b8e3a8',
            47,'#b2e0a6',
            48,'#abdda4',
            49,'#bfe5ac',
            50,'#97cfa8',
            51,'#8ec9a9',
            53,'#bfe5ad',
            54,'#7abbad',
            55,'#70b4ae',
            56,'#66adb0',
            57,'#5ca6b2',
            58,'#bfe5ae',
            59,'#4898b5',
            60,'#3e91b7',
            62,'#358ab9'
            ],
            'fill-outline-color':'#000000',
        },
        'source-layer': 'solos',
    });

    map.addLayer({
        id: 'militar',
        type: 'fill',
        source: {
            type: 'vector',
            url: 'mapbox://diegocosta7711.d9y4274j'
        },
        layout: {
            'visibility': 'none'
        },
        paint: {
            'fill-color': "hsl(79, 72%, 37%)"
        },
        'source-layer': 'militar'
    });

    map.addLayer({
        id: 'terras_indigenas',
        type: 'fill',
        source: {
            type: 'vector',
            url: 'mapbox://diegocosta7711.d7s1lxm8'
        },
        layout: {
            'visibility': 'none'
        },
        paint: {
            'fill-color': "hsl(26, 63%, 33%)"
        },
        'source-layer': 'terras_indigenas'
    });

    map.addLayer({
        id: 'bacias',
        type: 'fill',
        source: {
            type: 'vector',
            url: 'mapbox://diegocosta7711.bgxd3h7c'
        },
        layout: {
            'visibility': 'none'
        },
        paint: {
            'fill-color': [
            'interpolate',
            ['linear'],
            ['get', 'ORDEM'],
            1,'#57a0cf',
			2,'#a3cce3', 
			3,'#1e6eb3',
			4,'#3383bf',
			5,'#dfecf8',
			6,'#0d58a1',
			7,'#084b94',
			8,'#d0e2f3',
			9,'#3e8ec4',
			10,'#4a97c9',
			11,'#b0d2e8',
			12,'#1563aa',
			13,'#f7fbff',
			14,'#2879b9',
			15,'#c8ddf0',
			16,'#eff6fd',
			17,'#e7f1fa',
			18,'#bcd7ec',
			19,'#d8e7f5',
			20,'#83bcdc',
			21,'#73b3d8',
			22,'#94c5df',
			23,'#083d7f',
			24,'#64a9d4'
			],
			'fill-outline-color':'#000000',
		},           
        'source-layer': 'bacias',
    });

    map.addLayer({
        id: 'limites_municipais',
        type: 'line',
        source: {
            type: 'vector',
            url: 'mapbox://diegocosta7711.1ckmjr21'
        },
        layout: {
            'visibility': 'visible'
        },
        paint: {
            'line-color':"hsl(352°, 0%, 0%)",
            'line-width': 2
        },
        'source-layer': 'limites_municipais'
    });

    // When a click event occurs on a feature in the states layer, open a popup at the
    // location of the click, with description HTML from its properties.
    map.on('click', 'solos', function(e) {
        new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(e.features[0].properties["SIGLA"])
        .addTo(map);
    });
    map.on('click', 'terras_indigenas', function(e) {
        new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(e.features[0].properties["NOMEABREV"])
        .addTo(map);
    });
    map.on('click', 'bacias', function(e) {
        new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(e.features[0].properties["NOME_BAC"])
        .addTo(map);
    });

    // Change the cursor to a pointer when the mouse is over the states layer.
    map.on('mouseenter', 'solos', function() {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'solos', function() {
        map.getCanvas().style.cursor = '';
    });

});

function removeProperty(){
    if (map.getLayer('property')) {
        map.removeLayer('property');
        map.removeSource('property');
    }
}

function loadProperty() {
    removeProperty();

    map.addSource('property', {
        'type': 'geojson',
        'data': {
            'type': 'Feature',
            'geometry': {
                'type': 'Polygon',
                'coordinates': coordinates
            }
        }
    });
    
    map.addLayer({
        'id': 'property',
        'type': 'line',
        'source': 'property',
        'layout': {
            'visibility': 'visible'
        },
        'paint': {
            'line-color': '#fff',
            'line-width': 2
        }
    });

    var mid = Math.floor((coordinates[0].length)/2);

    map.flyTo({
    	center: coordinates[0][mid],
    	zoom: 9,
    	speed: 0.7,
    	curve: 1,
    	easing(t) {
    		return t;
    	}
    });

}

function hideOrShowLayer(name) {
    var visibility = map.getLayoutProperty(name, 'visibility');

    if (visibility === 'visible') {
        map.setLayoutProperty(name, 'visibility', 'none');
        this.className = '';
    } else {
        this.className = 'active';
        map.setLayoutProperty(name, 'visibility', 'visible');
    }
}

var callRoute = 0; //if 0 when clicked turns on when 1 turns off

function showRoute() {
    if(callRoute == 0){
        map.addControl(directions,'bottom-right');
        var instructions = document.createElement("P");
        instructions.innerHTML = "Clique em dois lugares no mapa para calcular a distância";
        instructions.id = "instructions";
        document.getElementById("distance").appendChild(instructions); 
        directions.on('route', function(ev) {
            distance = ev.route[0]['distance']/1000;
            instructions.innerHTML = "Distância: "+distance.toFixed(2)+" km";
        });
        callRoute = 1;
    } else {        
        map.removeControl(directions,'bottom-right');
        var element = document.getElementById("instructions");
        if(element){
            element.remove(); 
        }
        //map.removeSource(directions);
        callRoute = 0
    }
}

function loadInfos(){
    const url1 = "https://api.mapbox.com/v4/diegocosta7711.7gdn6lnk/tilequery/";
    const url2 = ".json?limit=20&access_token=pk.eyJ1IjoiZGllZ29jb3N0YTc3MTEiLCJhIjoiY2p1bGJ0ZHNzMjU5dTQ5cHBybnB5N2h3ZiJ9.mEmQDBEUJLPF66aPKYqQLw"
    var args,url;
    var soils = [];
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            response = JSON.parse(xhr.response);
            soil = response.features[0]['properties']['SIGLA'];
            if(soils.includes(soil)) {

            } else{
                soils.push(soil);
            }
        }
    };

    for(let i=0; i<coordinates[0].length; i++) {
        args = String(coordinates[0][i][0]) +","+ String(coordinates[0][i][1])
        url = url1+args+url2;
        xhr.open("GET", url, false);
        xhr.send();
    }
}

function analysisShape(file) {
    if(file["length"] === 0) {
        return;
    }
    if(file[0].type !== "application/geo+json") {
        var warning = document.createElement("P");
        warning.innerHTML = "Desculpe mas apenas arquivos do tipo geojson são aceitos.";
        warning.id = "warning_id";
        document.getElementById("analysis").appendChild(warning); 

        return;
    }

    var element = document.getElementById("warning_id");
    if(element){
        element.remove(); 
    }
    
    const url = "https://backend-rr-solos-mapa.herokuapp.com/readfile";
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            shapefile = JSON.parse(xhr.response);
            name = shapefile["name"];
            coordinates = shapefile["features"][0]["geometry"]["coordinates"][0];

            loadProperty();
            loadInfos();
        }
    };

    var fd = new FormData()
    xhr.open("POST", url, true);

    fd.append('shape', file[0]);    
    xhr.send(fd);
    
}

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}
