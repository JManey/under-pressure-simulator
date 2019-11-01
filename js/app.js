/*----- constants -----*/
const InputChem1 = {};

/*----- app's state (variables) -----*/
let createdInputVessels = [];
let currentLevel = 1;

/*----- cached element references -----*/
let stage = document.getElementById('stage');
let inputVessel = document.getElementById('inputs')
let processVessel = document.getElementById('processes')
let outputVessel = document.getElementById('outputs')

/*----- event listeners -----*/
//input for temp
//input for flow rate
/*----- functions -----*/
function createVessel(num,type){
    for(i=0; i<num; i++) {
        let divNew = document.createElement('div');
        divNew.classList.add(type);
        let progressNew = document.createElement('progress');
        progressNew.classList.add("max='100'", 'progressBar' + i)
        switch(type){
            case 'inputVessel':
                inputVessel.append(divNew);
                divNew.append(progressNew);
                break;
            case 'processVessel':
                processVessel.append(divNew);
                divNew.append(progressNew);
                break;
            case 'outputVessel':
                outputVessel.append(divNew);
                divNew.append(progressNew);

                break;
        }
    }
}



//     for(i=0; i<num; i++) {
//         let divNew = document.createElement("div")
//         divNew.classList.add('inputVessel');
//         inputs.append(divNew);
//     }
// }

// let processVessel = function(num,type) {
//     for(i=0; i<num; i++) {
//         let divNew = document.createElement("div")
//         divNew.classList.add(type);
//         processes.append(divNew);
//     }
// }

// let outputVessel = function(num) {
//     for(i=0; i<num; i++) {
//         let divNew = document.createElement("div")
//         divNew.classList.add('outputVessel');
//         outputs.append(divNew);
//     }
// }


/*---model/data---*/
function level1 () {
    // inputVessel(1, inputVessel);
    // processVessel(1);
    // outputVessel(1);
    createVessel(1, 'inputVessel');
    createVessel(1, 'processVessel');
    createVessel(1, 'outputVessel');
}
function level2 () {
    createVessel(1, 'inputVessel');
    createVessel(2, 'processVessel');
    createVessel(1, 'outputVessel');
}


/*---controller---*/
function init () {
    level2();
}

/*---ui controller---*/
//generate level 1

init(currentLevel);
