/*----- constants -----*/
const InputChem1 = {};

/*----- app's state (variables) -----*/
let createdInputVessels = {};

/*----- cached element references -----*/
let stage = document.getElementById('stage');
let inputs = document.getElementById('inputs')

/*----- event listeners -----*/
//input for temp
//input for flow rate
/*----- functions -----*/
let inputVessel = function(num) {
    for(i=0; i<num; i++) {
        createdInputVessels = i[document.createElement("div")];
        createdInputVessels[i].classList.add('inputVessel')
    }
    inputs.appendChild(createdInputVessels)
}


/*---model/data---*/


/*---controller---*/


/*---ui controller---*/
//generate level 1
