let myMap;

const init = ()=>{

    myMap = new ymaps.Map("map", {
        center: [55.725146, 37.646930],
        zoom: 10,
        controls: [],
    });

    const coords = [
        [55.90, 37.64],
        [55.80, 37.74],
        [55.55, 37.84],
        [55.70, 37.94],
    ];

    const myCollection = new ymaps.GeoObjectCollection({}, {
        draggable: false,
        iconLayout: 'default#image',
        iconImageHref: './image/map-section/marker.png',
        iconImageSize: [46, 57],
        iconImageOffset: [-50, -30]
    });

    coords.forEach(coord => {
        myCollection.add(new ymaps.Placemark(coord));
    })

    myMap.geoObjects.add(myCollection);

    myMap.behaviors.disable('scrollZoom');

}

ymaps.ready(init)