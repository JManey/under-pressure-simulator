/*----- constants -----*/
const InputChem1 = {};

/*----- app's state (variables) -----*/
let createdInputVessels = [];

/*----- cached element references -----*/
let stage = document.getElementById('stage');
let inputs = document.getElementById('inputs')

/*----- event listeners -----*/
//input for temp
//input for flow rate
/*----- functions -----*/
let inputVessel = function(num) {
    for(i=0; i<num; i++) {
        let divNew = document.createElement("div")
        divNew.classList.add('inputVessel');
        inputs.append(divNew);
    }
}
// inputs.append(document.createElement("div"));

/*---model/data---*/


/*---controller---*/
function init () {
    inputVessel(2);
}

/*---ui controller---*/
//generate level 1

init();
