/*----- constants -----*/
// var Chart = require('chart.js');
const InputChem1 = {};
const winQuality = 90;
const tempGradient = .58;

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
stage.addEventListener('click', function(event){
    // console.log(event.target.id);
    if(event.target.id === 'burner0') {
        adjustTemp();
    }
});
//input for flow rate
stage.addEventListener('click', function(event){
    // console.log(event.target.id);
    if(event.target.id === 'pump0') {
        adjustRate();
        updateTemps();
        // console.log(newFluidRate);
    }
});
stage.addEventListener('click', function(event) {
    if(event.target.id === 'output0') {
    updateTemps();
    checkQuality();
    alert(`Current output quality is: ${quality}%.`);
    }
});
stage.addEventListener('click', function(event) {
    if(event.target.id === 'input0') {
    updateTemps();
    checkQuality();
    alert(`Current input rate is: ${fluidRate} gpm`);
    }
});
stage.addEventListener('click', function(event) {
    if(event.target.id === 'burner') {
        currentTemp = ((newGasRate / 100 * 600) - ((1 - tempGradient)) * fluidTemp);
        updateTemps();
    alert(`Current heater temperature is ${currentTemp} degrees F.`);
    }
});

/*----- functions -----*/

function adjustTemp(){
    newGasRate = parseInt(prompt(`Current gas flow rate ${newGasRate}%, enter desired gas rate from 1% to 100%`));
    updateTemps();
    return newGasRate;
}
function adjustRate(){
    newFluidPercent = parseInt(prompt(`Current pump output ${newFluidPercent}%, enter desired pump output from 1% to 100%`));
    fluidRate = newFluidPercent / 100 * 252;
    updateTemps();
    return newFluidPercent;
}

//negative event 1 gas restriction causes process temp to fall
//player needs to decrease rate to maintain temp and output quality
function event1() {
    if(newGasRate > 60) {newGasRate = 60;}
    let maxGasRate = 60;
}
/*---model/data---*/
function level1 () {
    checkQuality();
    // createVessel(1, 'inputVessel');
    // createVessel(1, 'processVessel');
    // createVessel(1, 'outputVessel');
    // //initiate level paramenters
    // //flow rate(input & output) = gpm, starting temp = degrees F  
    //     newFlowRate = 40;
    //     newGasRate = 44;
    //call negative event function
        //level1 event heating gas shortage
        // after 10 seconds => console.log('Oh no the heating gas pressure dropped, the max heat is limited to 60%.')
        //player needs to reduce the rate to maintain the process temp or the output quality will decrease
        //ideal temp = 143
        //ideal input = 147
        //ideal output 115
        //after event temp decreases to 112 over 9 sec
        //quality will decrease by a % with the temp change.

}
function level2 () {
    createVessel(1, 'inputVessel');
    createVessel(2, 'processVessel');
    createVessel(1, 'outputVessel');
}
function updateTemps() {
    fluidTemp = tempGradient * (fluidRate / 100 * 252);
    currentTemp = ((newGasRate / 100 * 600) - ((1 - tempGradient)) * fluidTemp);
}
function checkQuality(){
    //temp should stay between 280 - 300 degrees
    quality = (newGasRate * .4) + (fluidRate * .6);
    return quality;
}
function checkQualityForWin() {
    if(level1Quality() >= winQuality){
        return alert('game is won');
    }   else return alert(`Keep trying current quality is ${quality}`);
}

//////////////add a dynamic chart
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

//////////////end chart stuff

/*---controller---*/
function init () {
    level1();
    // generateChart();
}
// setInterval(checkQualityForWin, 1000 * 20);

/*---ui controller---*/
//generate level 1

init(currentLevel);
