/*----- constants -----*/
const InputChem1 = {};
const winQuality = 90;

/*----- app's state (variables) -----*/
let createdInputVessels = [];
let currentLevel = 1;
let newGasRate = null;
let newFluidRate = null;
let maxGasRate = 100;
let maxFluidRate = 100;
let quality = level1Quality();

/*----- cached element references -----*/
let stage = document.getElementById('stage');
let inputVessel = document.getElementById('inputs');
let processVessel = document.getElementById('processes');
let outputVessel = document.getElementById('outputs');
let controls = document.getElementById('controls');
let pump0 = document.getElementById('pump0');
let burner0 = document.getElementById('burner0');
// let outPump0 = document.getElementById('outPump0');

/*----- functions -----*/

function adjustTemp(){
    newGasRate = parseInt(prompt('Enter the gas flow rate, 0% to 100%', [50]));
    return newGasRate;
}
function adjustRate(){
    newFluidRate = parseInt(prompt('Enter the fluid flow rate, 0% to 100%', [50]));
    return newFluidRate;
}

//negative event 1 gas restriction causes process temp to fall
//player needs to decrease rate to maintain temp and output quality
function event1() {
    if(newGasRate > 60) {newGasRate = 60;}
    let maxGasRate = 60;
}
/*---model/data---*/
function level1 () {
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
function level1Quality(){
    let quality = (newGasRate * .4) + (newFluidRate * .6);
    return quality;
}
function checkQualityForWin() {
    if(level1Quality() >= winQuality){
        return alert('game is won');
    }   else return alert(`Keep trying current quality is ${quality}`);
}

/*---controller---*/
function init () {
    level1();
}
// setInterval(checkQualityForWin, 1000 * 20);

/*---ui controller---*/
//generate level 1

init(currentLevel);


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
        // console.log(newFluidRate);
    }
});