/*----- constants -----*/
// var Chart = require('chart.js');
const InputChem1 = {};
const winQuality = 95;
const tempGradient = .48;

/*----- app's state (variables) -----*/
let createdInputVessels = [];
let currentLevel = 1;
let newGasRate = 50;
let newGasRate2 = 25;
let newFluidPercent = 35;
let fluidRate = newFluidPercent / 100 * 252;
let maxGasRate = 100;
let maxFluidRate = 100;
let quality = null;
let fluidTemp = tempGradient * (fluidRate / 100 * 252);
let currentTemp = ((newGasRate / 100 * 400) - ((1 - tempGradient)) * fluidTemp);
let currentTemp2 = ((newGasRate2 / 100 * 800) - ((1 - tempGradient)) * fluidTemp);

/*----- cached element references -----*/
let stage = document.getElementById('stage');
let inputVessel = document.getElementById('inputs');
let processVessel = document.getElementById('processes');
let outputVessel = document.getElementById('output0');
let controls = document.getElementById('controls');
let pump0 = document.getElementById('pump0');
let burner0 = document.getElementById('burner0');
let chart1 = document.querySelector('h5');
let sliderDiv = document.getElementById('sliderDiv');

// let outPump0 = document.getElementById('outPump0');

/*----- event listeners -----*/
//input for burner0 temp
window.addEventListener('click', function(event){
    if(event.target.id === 'level1') {
        init(1);
        return;
        // level1();
    } else if(event.target.id === 'level2') {
        init(2);
        return;
        // level2();
    }

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
    newGasRate2 = parseInt(burner1.value);
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

/*---model/data---*/
function level1 () {
    level1Chart();
    checkQuality();  
}
function level2 () {
    checkQualityLvl2();
    level2Chart();
    level2Slider();
}
function updateTemps() {
    fluidTemp = tempGradient * (fluidRate / 100 * 252);
    currentTemp = ((newGasRate / 100 * 400) - ((1 - tempGradient)) * fluidTemp);
    currentTemp2 = ((newGasRate / 100 * 800) - ((1 - tempGradient - .18)) * fluidTemp);
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
function checkQualityLvl2() {
    if(currentTemp > 196 && currentTemp < 186) {
        quality = 100 - Math.abs(currentTemp-191);
    } else {
        quality = 100 - 10 - currentTemp * .2;
    }
    checkQualityForWin();
}
function checkQualityForWin() {
    if(quality >= winQuality){
        return alert('game is won');
    }   else return;
}
function level2Slider() {
    let extraSliderDiv = document.createElement('div');
    extraSliderDiv.classList.add('sliders');
    let input3 = document.createElement('input');
    input3.type = "range";
    input3.classList.add('burner');
    input3.id = 'burner1';
    let label = document.createElement('label');
    label.textContent = "Temperature Adjust 2";
    label.for = input3;
    extraSliderDiv.appendChild(input3);
    sliderDiv.appendChild(extraSliderDiv);
    sliderDiv.appendChild(label);
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
        backgroundColor: 'rgba(111,106,106,.2)',
        
        axisY: [
            {
            title: 'Temperature',
            titleFontColor: 'red',
            labelFontColor: 'red',
            includeZero: true,
            minimum: 0,
            maximum: 500,
            },
            {
            title: 'Rate in GPM',
            labelFontColor: 'blue',
            titleFontColor: 'blue',
            includeZero: true,
            minimum: 0,
            maximum: 300,
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
            labelFontColor: 'green',
            titleFontColor: 'green',
            includeZero: true,
            minimum: 0,
            maximum: 100,
        }], 
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
//////////////end chart stuff level 1

function level2Chart() {
    window.onload = function () {
        var dps = []; // dataPoints
        var dpsBurner2 = [];
        var dpsPump = []; // pumpDataPoints
        var dpsQuality = []; 
        var chart = new CanvasJS.Chart("chartContainer", {
            title :{
                text: "Current Production"
            },
            backgroundColor: 'rgba(111,106,106,.2)',
            
            axisY: [
                {
                title: 'Temperature',
                titleFontColor: 'red',
                labelFontColor: 'red',
                includeZero: true,
                minimum: 0,
                maximum: 500,
                },
                {
                title: 'Rate in GPM',
                labelFontColor: 'blue',
                titleFontColor: 'blue',
                includeZero: true,
                minimum: 0,
                maximum: 300,
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
                    axisYIndex: 0,
                    lineColor: "red",
                    markerColor: "orange",
                    dataPoints: dpsBurner2,
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
                labelFontColor: 'green',
                titleFontColor: 'green',
                includeZero: true,
                minimum: 0,
                maximum: 100,
            }], 
           
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
                yVal = currentTemp2;
                dpsBurner2.push({
                    x: xVal,
                    y: yVal
                });
                xVal++;
            }
        
            if (dpsBurner2.length > dataLength) {
                dpsBurner2.shift();
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
    //////////////end chart stuff level 2

/*---controller---*/
function init(num) {
    if(num === 1){
        level1();
    } else if(num === 2) {
        level2();
    } else return;
    
}
// setInterval(checkQualityForWin, 1000 * 20);

/*---ui controller---*/
//generate level 1
//extra slider for level 2

