import {totalfotos,nombreCarpetas} from './api.js'
var ctx = document.getElementById('myChart').getContext('2d');

var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: nombreCarpetas,
        datasets: [{
            label: 'Álbumes',
            backgroundColor: '#41b3f9',
            borderColor: 'blue',
            data: totalfotos
        }]
    },

    // Configuration options go here
    options: {}
});