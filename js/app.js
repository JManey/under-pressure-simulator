/*----- constants -----*/
const InputChem1 = {};

/*----- app's state (variables) -----*/
let createdInputVessels = [];
let currentLevel = 1;
let newGasRat = null;

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
function createVessel(num,type){
    for(i=0; i<num; i++) {
        let divNew = document.createElement('div');
        divNew.classList.add(type);
        let progressNew = document.createElement('progress');
        progressNew.classList.add("max='100'", 'progressBar' + i)
        switch(type){
            case 'inputVessel':
                stage.append(divNew);
                progressNew.classList.add('brown')
                divNew.append(progressNew);
                let pump = document.createElement('div');
                pump.classList.add('pump'+i, 'pump');
                pump.id = 'pump' + i;
                stage.append(pump);
                break;
            case 'processVessel':
                stage.append(divNew);
                progressNew.classList.add('red');
                divNew.append(progressNew);
                let burner = document.createElement('div');
                burner.classList.add('burner'+i, 'burner');
                burner.id = 'burner' + i;
                stage.append(burner);
                break;
            case 'outputVessel':
                stage.append(divNew);
                progressNew.classList.add('green');
                divNew.append(progressNew);
                let outPump = document.createElement('div');
                outPump.classList.add('outPump'+i, 'pump');
                outPump.id = 'outPump' + i;
                stage.append(outPump);
                break;
        }
    }
}

function adjustTemp(){
    let newGasRate = prompt('Enter the gas flow rate, 0% to 100%', [50]);
    return newGasRate;
}
//negative event 1 gas restriction causes process temp to fall
//player needs to decrease rate to maintain temp and output quality
function event1() {
    let maxTemp = .6;
}
/*---model/data---*/
function level1 () {
    createVessel(1, 'inputVessel');
    createVessel(1, 'processVessel');
    createVessel(1, 'outputVessel');
    //initiate level paramenters
    //flow rate(input & output) = gpm, starting temp = degrees F  
        let initialInput = 80;
        let initialOutput = 70;
        let initialTemp = 140;
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


/*---controller---*/
function init () {
    level1();
}

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
// pump0.addEventListener('click', adjustPump());
