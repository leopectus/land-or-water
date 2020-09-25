
let layers =
    "CARTO_POLY_OCEAN," +
    "CARTO_POLY_RIVER_DO1," +
    "CARTO_POLY_RIVER_DO2," +
    "CARTO_POLY_RIVER_DO3," +
    "CARTO_POLY_RIVER_DO4," +
    "CARTO_POLY_DO2," +
    "CARTO_POLY_DO3," +
    "CARTO_POLY_DO4";

let features = [
    "500116", //Ocean
    "500421", //Lake
    "500412", //River
    "507116", //Bay/Harbour
    "9997008", //Seaport/Harbour
];

let markerGroup = new H.map.Group();
let lastBubble;

function checkWater(lat, lng) {

    let url = "https://fleet.ls.hereapi.com/1/search/proximity.json" +
        "?layer_ids=" + layers +
        "&key_attributes=NAMES,NAMES,NAMES,NAMES,NAMES,NAMES,NAMES,NAMES" +
        "&apiKey=" + apiKey +
        "&proximity=" + lat + "," + lng;

    let isWater;
    let featureName;

    fetch(url)
        .then(response => response.json())
        .then(response => {

            let feature;
            if (response.geometries.length > 0) {
                feature = response.geometries[0].attributes.FEATURE_TYPE;

                if (features.includes(feature)) {
                    isWater = true;
                    let featureNames = response.geometries[0].attributes.NAMES;
                    featureName = featureNames.substring(5, featureNames.length);
                    let separator = '\u001E';
                    let index = featureName.indexOf(separator);

                    if (index != -1) {
                        featureName = featureName.substring(0, index);
                    }

                } else {
                    isWater = false;
                }

            } else {
                isWater = false;
            }

            let html;

            if (isWater) {
                html = '<div align="center">🌊 Water! 🌊</div><div align="center" style="width:250px">In fact, this is the <em>${FEATURE}!</em></div>';
                html = html.replace('${FEATURE}', featureName);
            } else {
                html = '<div align="center">🌲 Land! 🌲';
            }

            if (lastBubble != null) {
                lastBubble.close();
            }

            let bubble = new H.ui.InfoBubble({ lat: lat, lng: lng }, { content: html });
            lastBubble = bubble;
            ui.addBubble(bubble);

        }, error => {
            console.log(error);
        });

}