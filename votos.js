var data, layout;
Plotly.d3.csv('votos_por_predio.csv', function (err, rows){

    function unpack(rows, key) {
    return rows.map(function(row) { return row[key]; });
    }
    data = {visible: true};
    data.lat = unpack(rows, 'NR_LATITUDE');
    data.lon = unpack(rows, 'NR_LONGITUDE');
    data.text = rows.map(function(row){
        return (Math.round(row.per_lula * 100 * 100)/100 + '% para Lula<br>' + 
                row.NR_LOCAL_VOTACAO + ' código prédio<br>' + 
                row.CD_MUNICIPIO  + ' código cidade<br>' + 
                row['13'] + ' votos Lula<br>' + 
                row['22'] + ' votos Bolsonaro<br>' + 
                row.NM_LOCAL_VOTACAO + ', ' +row.NM_BAIRRO)
    });
    data.type = 'scattermapbox';
    data.hoverinfo= "text";
    data.mode = "markers";
    data.subplot = "mapbox";
    data.marker = {symbol: 'circle', opacity: 1, sizemode: 'area', size: unpack(rows, 'validos'), color : unpack(rows, 'per_lula'), colorscale: 'Bluered', sizeref: 50, sizemin:1};
    layout = {mapbox: { accesstoken:'pk.eyJ1IjoiY2hpY29jdmVuYW5jaW8iLCJhIjoiY2l2bGY4NGtrMGFodjJ6bGJwNGp5YW91aSJ9.Z2U9F6OCm96k8uzS6eiGJQ', center:{lon: -44.29679189209759, lat: -2.5450488657873223}, zoom: 11.681942092423549},
    // width: 926,
        height: 720
        };
    
    Plotly.plot('map', [data], layout, {showlink: false});
    
});
