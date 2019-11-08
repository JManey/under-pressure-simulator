/*----- constants -----*/

const winQuality = 95;
const winQuality2 = 95;
const tempGradient = .28;

/*----- app's state (variables) -----*/

let newGasRate = 30;
let newGasRate2 = 40;
let newFluidPercent = 35;
let fluidRate = newFluidPercent / 100 * 320;
let maxGasRate = 100;
let maxFluidRate = 100;
let quality = null;
let quality2 = null;
let fluidTemp = tempGradient * (fluidRate / 100 * 320);
let currentTemp = ((newGasRate / 100 * 400) - ((1 - tempGradient)) * fluidTemp);
let currentTemp2 = ((newGasRate2 / 100 * 400) - (1 - tempGradient));

/*----- cached element references -----*/

let stage = document.getElementById('stage');
let controls = document.getElementById('controls');
let pump0 = document.getElementById('pump0');
let burner0 = document.getElementById('burner0');
let burner01 =document.getElementById('burner1');
let chart1 = document.querySelector('h5');
let sliderDiv = document.getElementById('sliderDiv');
let message = document.querySelector('h5');

/*----- functions -----*/

function adjustTemp() {
    newGasRate = parseInt(burner0.value);
    updateTemps();
    updateTemps2();
    checkQuality();
    checkQualityLvl2();
    return newGasRate;
}
function adjustTemps2() {
    newGasRate2 = parseInt(document.getElementById('burner1').value);
    updateTemps2();
    checkQuality();
    checkQualityLvl2();
    return newGasRate2;
}
function adjustRate() {
    newFluidPercent = parseInt(pump0.value);
    fluidRate = newFluidPercent / 100 * 320;
    updateTemps();
    updateTemps2();
    checkQuality();
    checkQualityLvl2();
    return newFluidPercent;
}
function level1 () {
    level1Chart();
    checkQuality();  
}
function level2 () {
    checkQuality();
    checkQualityLvl2();
    level2Chart();
    if(document.getElementById('burner1') === null){
        level2Slider();
    }
}
function updateTemps() {
    fluidTemp = tempGradient * (fluidRate / 100 * 320);
    currentTemp = ((newGasRate / 100 * 400) - ((1 - tempGradient)) * fluidTemp);
    if(currentTemp <= 0) {
        currentTemp = 0;
    }
}
function updateTemps2() {
    fluidTemp2 = (tempGradient-.06) * (fluidRate / 100 * 520);
    currentTemp2 = ((newGasRate2 / 100 * 400) + ((1-tempGradient) * fluidTemp2));
    if(currentTemp2 <= 0) {
        currentTemp2 = 0;
    }
    return currentTemp2;
}
function checkQuality(){
    if(currentTemp > 140 && currentTemp < 160) {
        quality = 100 - Math.abs(currentTemp-150);
    } else {
        quality = 100 - (Math.abs(currentTemp-150)*1.16);
    }
    if(quality < 1){
        quality = 0;
    }
    if(quality2 === null || quality2 === 0) {
    checkQualityForWin();
    return quality;
    }
}
function checkQualityLvl2() {
    
    if(currentTemp2 > 211 && currentTemp2 < 231) {
        quality2 = 100 - Math.abs(currentTemp2-221);
    } else {
        quality2 = 100 - (Math.abs(currentTemp2-221) * 1.27);
    }
    if(quality2 < 1){
        quality2 = 0;
    }
    checkQualityForWin2();
}
function checkQualityForWin() {
    if(quality >= winQuality){
        message.textContent = 'Congrats You Won Level 1!!!'
        message.style.color = 'blue';
        message.style.fontSize = '75px';
        //reset button when you win
        let reset = document.createElement('button');
        reset.textContent = "Reset";
        reset.classList.add('levelButtons');
        reset.onclick = refreshPage;
        message.appendChild(reset);
    }   else return;
}
function checkQualityForWin2() {
    if(quality >= winQuality && quality2 >= winQuality2){
        message.textContent = 'Congrats You Won Level 2!!!'
        message.style.color = 'blue';
        message.style.fontSize = '75px';
        //reset button if you win
        let reset = document.createElement('button');
        reset.textContent = "Reset";
        reset.classList.add('levelButtons');
        reset.onclick = refreshPage;
        message.appendChild(reset);
    }   else return;
}
function refreshPage() {
    scrollTo(0,0);
    window.location.reload();
}
////create and insert adjustable slider only for level 2
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
    stage.appendChild(extraSliderDiv);
    extraSliderDiv.appendChild(label);
}

/*---model/data---*/
/*---dynamic charts---*/

function level1Chart() {
    var dps = []; // dataPoints
    var dpsPump = []; // pumpDataPoints
    var dpsQuality = []; // quality data
    var chart = new CanvasJS.Chart("chartContainer", {
        title :{
            text: ""
        },
        backgroundColor: 'rgba(0,0,0,.6)', // <--make background slighty transparent, the default is white
        
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
        axisY2: [{ // <-- axisY2 is the right side y axis
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
    var updateInterval = 1000;
    var dataLength = 20; // number of dataPoints visible at any point
    
    var updateChart = function (count) {
    
        count = count || 1;
    
        for (var j = 0; j < count; j++) {
            yVal = currentTemp; // <--temp1
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
            yVal = fluidRate; // <--fluid rate
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
            yVal = quality; //<--quality
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
//////////////end chart stuff level 1
///////////// create chart 2
function level2Chart() {
        var dps = []; // dataPoints
        var dpsBurner2 = [];
        var dpsPump = []; // pumpDataPoints
        var dpsQuality = []; 
        var dpsQuality2 = [];
        var chart = new CanvasJS.Chart("chartContainer", {
            title :{
                text: ""
            },
            backgroundColor: 'rgba(0,0,0,.6)',
            
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
                dataPoints: dps, /// <--dps is the array containing data for the graph
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
                     {
                        type: "line",
                        axisYType: 'secondary',
                        markerType: "triangle",
                        lineColor: "green",
                        markerColor: "yellow",
                        dataPoints: dpsQuality2,
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
        var updateInterval = 1000; //<--graph update speed = 1sec
        var dataLength = 20; // number of dataPoints visible at any point
        
        var updateChart = function (count) {
        
            count = count || 1;
        
            for (var j = 0; j < count; j++) {
                yVal = currentTemp; // <--- assign data from game to yVal and push it to the dps array
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
            for (var j = 0; j < count; j++) {
                yVal = quality2;
                dpsQuality2.push({
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
    //////////////end chart stuff level 2

/*---ui controller---*/

function init(num) {
    if(num === 1){
        level1();
    } else if(num === 2) {
        level2();
    } else return;
}

/*----- event listeners -----*/
//burner0 temp
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
    if(event.target.id === 'pump0') {
        adjustRate();
        updateTemps();
        checkQuality();
    }
});
//get burner1 temp
stage.addEventListener('click', function(event){
    if(event.target.id === 'burner1') {
        adjustTemps2();
        updateTemps2();
        checkQuality();
        checkQualityLvl2();
    }
});