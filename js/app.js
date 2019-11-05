/*----- constants -----*/
// var Chart = require('chart.js');
const InputChem1 = {};
const winQuality = 95;
const tempGradient = .48;

/*----- app's state (variables) -----*/
let createdInputVessels = [];
let currentLevel = 1;
let newGasRate = 40;
let newFluidPercent = 40;
let fluidRate = newFluidPercent / 100 * 252;
let maxGasRate = 100;
let maxFluidRate = 100;
let quality = null;
let fluidTemp = tempGradient * (fluidRate / 100 * 252);
let currentTemp = ((newGasRate / 100 * 600) - ((1 - tempGradient)) * fluidTemp);

/*----- cached element references -----*/
let stage = document.getElementById('stage');
let inputVessel = document.getElementById('inputs');
let processVessel = document.getElementById('processes');
let outputVessel = document.getElementById('output0');
let controls = document.getElementById('controls');
let pump0 = document.getElementById('pump0');
let burner0 = document.getElementById('burner0');
let chart1 = document.querySelector('h5');

// let outPump0 = document.getElementById('outPump0');

/*----- event listeners -----*/
//input for burner0 temp
window.addEventListener('click', function(event){
    if(event.target.id === 'mainButtons')
    level1();
})
stage.addEventListener('click', function(event){
    // console.log(event.target.id);
    if(event.target.id === 'burner0') {
        adjustTemp();
        updateTemps();
        checkQuality();
    }
});
//input for flow rate
stage.addEventListener('click', function(event){
    // console.log(event.target.id);
    if(event.target.id === 'pump0') {
        adjustRate();
        updateTemps();
        checkQuality();
        // console.log(newFluidRate);
    }
});


/*----- functions -----*/

function adjustTemp() {
    newGasRate = parseInt(burner0.value);
    updateTemps();
    checkQuality();
    return newGasRate;
}
function adjustRate() {
    newFluidPercent = parseInt(pump0.value);
    fluidRate = newFluidPercent / 100 * 252;
    updateTemps();
    checkQuality();
    return newFluidPercent;
}

// function event1() {
//     if(newGasRate > 60) {newGasRate = 60;}
//     let maxGasRate = 60;
// }

function navBars() {
   let navBar = document.createElement('nav')
   let homeButton = document.createElement('a');
   navBar.appendChild(homeButton);
   document.body.prepend('navBar');
}


/*---model/data---*/
function level1 () {
    navBars();
    level1Chart();
    checkQuality();
   
   
}
function level2 () {
    navBars();
    checkQualityLvl2();
    level2Chart();
}
function updateTemps() {
    fluidTemp = tempGradient * (fluidRate / 100 * 252);
    currentTemp = ((newGasRate / 100 * 400) - ((1 - tempGradient)) * fluidTemp);
    return fluidTemp;
}
function checkQuality(){
    if(currentTemp > 140 && currentTemp < 160) {
        quality = 100 - Math.abs(currentTemp-150);
    } else {
        quality = 100 - 10 - currentTemp * .3;
    }
    checkQualityForWin();
    return quality;
}
function checkQualityForWin() {
    if(quality >= winQuality){
        return alert('game is won');
    }   else return;
}

//////////////add a dynamic chart
//start when page loads
function level1Chart() {
window.onload = function () {
    var dps = []; // dataPoints
    var dpsPump = []; // pumpDataPoints
    var dpsQuality = []; 
    var chart = new CanvasJS.Chart("chartContainer", {
        title :{
            text: "Current Production"
        },
        
        axisY: [
            {
            title: 'Temperature',
            titleFontColor: 'red',
            labelFontColor: 'red',
            includeZero: true,
            },
            {
            title: 'Rate in GPM',
            labelFontColor: 'blue',
            titleFontColor: 'blue',
            includeZero: true,
            },
        ],
        data: [
            {
            type: "line",
            axisYIndex: 0,
            lineColor: "red",
            markerColor: "red",
            dataPoints: dps,
            },
            {
            type: "line",
            axisYIndex: 1,
            lineColor: "blue",
            markerColor: "blue",
            dataPoints: dpsPump,
            },
            {
                    type: "line",
                    axisYType: 'secondary',
                    lineColor: "green",
                    markerColor: "green",
                    dataPoints: dpsQuality,
                 },
        ], 
        axisY2: [{
            title: 'Quality',
            includeZero: true,
        }], 
        // data: [      
        //  {
        //     type: "line",
        //     axisYType: 'secondary',
        //     lineColor: "green",
        //     markerColor: "green",
        //     dataPoints: dpsQuality,
        //  }],
        
    
    });
    
    var xVal = 0;
    var yVal = 100; 
    var updateInterval = 2000;
    var dataLength = 20; // number of dataPoints visible at any point
    
    var updateChart = function (count) {
    
        count = count || 1;
    
        for (var j = 0; j < count; j++) {
            yVal = currentTemp;
            dps.push({
                x: xVal,
                y: yVal
            });
            xVal++;
        }
    
        if (dps.length > dataLength) {
            dps.shift();
        }
        for (var j = 0; j < count; j++) {
            yVal = fluidRate;
            dpsPump.push({
                x: xVal,
                y: yVal
            });
            xVal++;
        }
        if (dpsPump.length > dataLength) {
            dpsPump.shift();
        }
        for (var j = 0; j < count; j++) {
            yVal = quality;
            dpsQuality.push({
                x: xVal,
                y: yVal
            });
            xVal++;
        }
        if (dpsQuality.length > dataLength) {
            dpsQuality.shift();
        }
    
        chart.render();
    };
    
    updateChart(dataLength);
    setInterval(function(){updateChart()}, updateInterval);
    
    }
}
//////////////end chart stuff

/*---controller---*/
function init(num) {
    if(num === 1){
        level1();
    } else if(num === 2) {
        level2();
    } else return;
    
}
window.onload = navBars();
// setInterval(checkQualityForWin, 1000 * 20);

/*---ui controller---*/
//generate level 1

init();
level1();
level1Chart();
