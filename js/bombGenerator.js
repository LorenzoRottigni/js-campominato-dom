
function bombPlacer(bombNumber, gridSize) {
    const bombPositionsArray = []
    for (let i = 0; i < bombNumber; i++) {
        do{//do while generated int is already in array
            randomInt = Math.floor(Math.random() * gridSize);
        }while(isExisting(randomInt, bombPositionsArray))
        //push rand int in bomb array
        bombPositionsArray.push(randomInt);
        //get the bomb indexed box
        const bombTarget = document.querySelector('#box-'+bombPositionsArray[i])
        //add bomb event to indexed box
        
        bombTarget.firstChild.addEventListener('click', () => {
            bombTarget.lastChild.src = '../img/bomb.png'
            bombTarget.firstChild.textContent = ''
            bombTarget.style.backgroundColor = 'red'
            endGameAnimation('LOST', gridSize);
            scoreOutput.textContent = ''
        })
    }
}

//checks if the number is already in the array
function isExisting(number, array){
    for (let i = 0; i < array.length; i++) {
        if(array[i] === number){
            return true;
        }        
    }
    return false;
}

//animation game esit
function endGameAnimation(esit, gridSize){
    //get the whole grid section
    const animatedElement = document.getElementById('game-container')
    animatedElement.style.transition = '2s'
    animatedElement.style.opacity = '0'
    animatedElement.style.transform = 'translateX(-100%)'
    //get the top score counter
    const scoreContainer = document.querySelector('.score-container');
    scoreContainer.transition = '2s'
    //create new div for output
    const loseContainer = document.createElement('div');
    loseContainer.classList.add('lose-container','bg-light', 'p-5', 'shadow', 'rounded');
    //add WON or LOST string param to output string
    loseContainer.textContent = 'YOU ' + esit + '! Score: ' + scoreOutput.textContent
    //create new reset button
    const loseButton = document.createElement('button')
    loseButton.classList.add('btn','btn-outline-success')
    loseButton.textContent = 'Play again'
    loseButton.addEventListener('click', () => {
        loseContainer.style.display = 'none'
        animatedElement.style.opacity = '1'
        animatedElement.style.transform = 'translateX(0)'
        writeGrid(gridSize);
        bombPlacer(16,gridSize);
        scoreOutput.textContent = '0'
    })
    //append reset button to output container
    loseContainer.appendChild(loseButton);
    //append lose container to main
    document.querySelector('main').appendChild(loseContainer)
}