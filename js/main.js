let scoreOutput = document.querySelector('.score-container h2');
//GENERATION_KEY = number of boxes desired
function writeGrid(GENERATION_KEY){
    //k identifier of row
    let k = 0;
    //row to append child boxes
    let row;
    //parent containing boxes
    const parent = document.getElementById('box-parent')
    //number of boxes in each row
    const generationKeyDivider = Math.sqrt(GENERATION_KEY)
    parent.textContent = '';
    //i identifier for single box inside row[k]
    for (let i = 0; i < GENERATION_KEY; i++) {//loop until requested from caller
        if((i%generationKeyDivider) === 0){//if the divider is a divider of i generate a new row containing $generationKeyDivider boxes
            k++;
            //create new row
            const boxRow = document.createElement("div");
            //add classes to new row
            boxRow.classList.add('box-row','d-flex','flex-wrap','justify-content-center','shadow');
            //set id of new row
            boxRow.setAttribute('id', 'row-'+ k);
            //ad new row to row container
            parent.appendChild(boxRow);
        }
        //create new box
        const box = document.createElement("div");
        //add id to new box
        box.setAttribute('id','box-'+i)
        //add classes to new box
        box.classList.add('box1x1','ratio','ratio1x1','rounded','shadow')
        //ad text to new box
        box.innerHTML = '<span class="super-center text-white fs-3 d-flex justify-content-center align-items-center" >' + (i + 1) + '</span>';
        //create new wooden box image
        const boxImg = document.createElement("img");
        //set wooden box image source
        boxImg.src = "../img/wooden-box.png";
        //append wooden box image to new box
        box.appendChild(boxImg)
        //add click listener on new box
        box.addEventListener('click', () => {
            box.lastChild.src = '../img/wooden-box-alt.png'
            let currentScore = parseInt(scoreOutput.textContent)+1;
            if(currentScore === (GENERATION_KEY - 16)){
                endGameAnimation('WON');
            }
            scoreOutput.textContent = currentScore
        })
        //get target for new box
        row = document.getElementById('row-' + k)
        //append new box to the indexed row
        row.appendChild(box);
    }
}



//add event listener to boxes
//setEventListeners();
//get level selector
const choosenLevel = document.querySelector('select');
//at level selector input change
choosenLevel.addEventListener('change', () => {
    switch(choosenLevel.value){
        //case 1 10x10
        case '1':
            writeGrid(100);
            bombPlacer(16,100);
            break;
        //case 1 9x9
        case '2':
            writeGrid(81);
            bombPlacer(16,81);
            break;
        //case 1 7x7
        case '3':
            writeGrid(49);
            bombPlacer(16,49);
            break;
        default:
            document.write("there's a client side error")
    }
})
//write default grid 100 boxws = 10x10
const headerButton = document.querySelector('header button');
headerButton.addEventListener('click', () => {
    writeGrid(100);
    bombPlacer(16,100);
})